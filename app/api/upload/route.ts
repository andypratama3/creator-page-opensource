import { mkdir, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { put } from "@vercel/blob"
import { NextResponse } from "next/server"
import { blobEnabled } from "@/lib/content-backend"

const MAX_BYTES = 4 * 1024 * 1024 // 4 MB

function adminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? "admin123"
}

function slug(name: string): string {
  const base = name.split("/").pop()?.split("\\").pop() ?? "upload"
  const cleaned = base.toLowerCase().replace(/[^a-z0-9.]+/g, "-").replace(/^-+|-+$/g, "")
  return cleaned || "upload"
}

export async function POST(req: Request) {
  if (req.headers.get("x-admin-password") !== adminPassword()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  let file: File | null = null
  try {
    const form = await req.formData()
    const v = form.get("file")
    if (v instanceof File) file = v
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 })
  }
  if (!file || file.size === 0) {
    return NextResponse.json({ error: "File kosong." }, { status: 400 })
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Hanya file gambar." }, { status: 400 })
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Maksimal 4 MB." }, { status: 400 })
  }

  const name = `${Date.now()}-${slug(file.name)}`
  try {
    if (blobEnabled()) {
      const blob = await put(`uploads/${name}`, file, { access: "public" })
      return NextResponse.json({ url: blob.url })
    }
    if (process.env.VERCEL) {
      return NextResponse.json(
        { error: "Blob store belum disambungkan. Sambungkan Vercel Blob di dashboard." },
        { status: 500 },
      )
    }
    const dir = join(process.cwd(), "public", "uploads")
    await mkdir(dir, { recursive: true })
    await writeFile(join(dir, name), Buffer.from(await file.arrayBuffer()))
    return NextResponse.json({ url: `/uploads/${name}` })
  } catch (e) {
    console.error("upload failed", e)
    return NextResponse.json({ error: "Upload gagal." }, { status: 500 })
  }
}
