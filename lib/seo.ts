import type { Metadata } from "next"
import { creator } from "./creator-data"

export const siteUrl = "https://andypratama.co"

export const socialLinks: Record<string, string> = {
  github: creator.links.github,
  linkedin: creator.links.linkedin,
  instagram: creator.links.instagram,
  twitter: creator.links.twitter,
  tiktok: creator.links.tiktok,
  youtube: creator.links.youtube,
}

export function pageMetadata({
  title,
  description,
  path = "/",
}: {
  title: string
  description: string
  path?: string
}): Metadata {
  const url = `${siteUrl}${path}`
  return {
    title: `${title} — ${creator.name}`,
    description,
    openGraph: { title: `${title} — ${creator.name}`, description, type: "website", url },
    twitter: { card: "summary_large_image", title: `${title} — ${creator.name}`, description },
    alternates: { canonical: url },
  }
}
