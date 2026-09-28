import { NextResponse } from "next/server"
import { blobEnabled, storageKind } from "@/lib/content-backend"

export async function GET() {
  return NextResponse.json({
    storage: storageKind(),
    blob: blobEnabled(),
    email: Boolean(process.env.RESEND_API_KEY),
  })
}
