import { ImageResponse } from "next/og"
import { OgCard } from "@/lib/og-card"
import { getSiteContent } from "@/lib/site-content"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const dynamic = "force-dynamic"

export default async function OgImage() {
  const content = await getSiteContent()
  const c = content.creator
  return new ImageResponse(
    (
      <OgCard
        eyebrow="CREATOR • AFFILIATE • CONTENT"
        name={c.name}
        sub={`${c.role} — ${c.tagline}`}
        stats={content.platformStats}
      />
    ),
    { ...size },
  )
}
