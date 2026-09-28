import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"
import { isValidContent } from "@/lib/site-content"
import { getSiteContent, resetSiteContent, saveSiteContent, storageKind } from "@/lib/site-content"

function adminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? "admin123"
}

function authorized(req: Request): boolean {
  return req.headers.get("x-admin-password") === adminPassword()
}

export async function GET() {
  const content = await getSiteContent()
  return NextResponse.json(content)
}

export async function PUT(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }
  if (!isValidContent(body)) {
    return NextResponse.json({ error: "Invalid content shape" }, { status: 400 })
  }
  const { persisted } = await saveSiteContent(body)
  revalidatePath("/", "layout")
  return NextResponse.json({ ok: true, persisted, storage: storageKind() })
}

export async function DELETE(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  await resetSiteContent()
  revalidatePath("/", "layout")
  return NextResponse.json({ ok: true })
}
