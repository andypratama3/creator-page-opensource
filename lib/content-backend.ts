import { mkdir, readFile, unlink, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { createClient, kv as vercelKv } from "@vercel/kv"
import type { SiteContent } from "./content-types"

const KEY = "site:content"
const FILE = join(process.cwd(), "data", "content.json")

type KvClient = typeof vercelKv

let cached: KvClient | null | undefined

function getKv(): KvClient | null {
  if (cached !== undefined) return cached
  // Native Vercel KV vars…
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    cached = vercelKv
  } else if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    // …or Upstash Marketplace Redis (same protocol, different var names).
    cached = createClient({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  } else {
    cached = null
  }
  return cached
}

export type StorageKind = "kv" | "file"

function kvEnabled(): boolean {
  return getKv() !== null
}

/** Where data currently persists. "kv" on Vercel (permanent), "file" locally/on VPS. */
export function storageKind(): StorageKind {
  return kvEnabled() ? "kv" : "file"
}

export function blobEnabled(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN)
}

export async function backendLoad(): Promise<unknown | null> {
  const client = getKv()
  if (client) {
    try {
      return (await client.get<unknown>(KEY)) ?? null
    } catch {
      return null
    }
  }
  try {
    return JSON.parse(await readFile(FILE, "utf8")) as unknown
  } catch {
    return null
  }
}

export async function backendSave(content: SiteContent): Promise<{ persisted: boolean }> {
  const client = getKv()
  if (client) {
    await client.set(KEY, content)
    return { persisted: true }
  }
  await mkdir(dirname(FILE), { recursive: true })
  await writeFile(FILE, JSON.stringify(content, null, 2) + "\n", "utf8")
  // Serverless filesystems (Vercel without KV) accept the write but discard it.
  const ephemeral = Boolean(process.env.VERCEL)
  return { persisted: !ephemeral }
}

export async function backendReset(): Promise<void> {
  const client = getKv()
  if (client) {
    try {
      await client.del(KEY)
    } catch {
      // Ignore — read path already falls back to defaults.
    }
    return
  }
  try {
    await unlink(FILE)
  } catch {
    // Already at defaults — nothing to do.
  }
}
