import { mkdir, readFile, unlink, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { kv } from "@vercel/kv"
import type { SiteContent } from "./content-types"

const KEY = "site:content"
const FILE = join(process.cwd(), "data", "content.json")

export type StorageKind = "kv" | "file"

function kvEnabled(): boolean {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
}

/** Where data currently persists. "kv" on Vercel (permanent), "file" locally/on VPS. */
export function storageKind(): StorageKind {
  return kvEnabled() ? "kv" : "file"
}

export function blobEnabled(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN)
}

export async function backendLoad(): Promise<unknown | null> {
  if (kvEnabled()) {
    try {
      return (await kv.get<unknown>(KEY)) ?? null
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
  if (kvEnabled()) {
    await kv.set(KEY, content)
    return { persisted: true }
  }
  await mkdir(dirname(FILE), { recursive: true })
  await writeFile(FILE, JSON.stringify(content, null, 2) + "\n", "utf8")
  // Serverless filesystems (Vercel without KV) accept the write but discard it.
  const ephemeral = Boolean(process.env.VERCEL)
  return { persisted: !ephemeral }
}

export async function backendReset(): Promise<void> {
  if (kvEnabled()) {
    try {
      await kv.del(KEY)
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
