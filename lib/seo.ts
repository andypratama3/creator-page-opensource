import type { Metadata } from "next"

export const siteUrl = "https://andypratama.co"

export function pageMetadata({
  title,
  description,
  path = "/",
  siteName,
}: {
  title: string
  description: string
  path?: string
  siteName?: string
}): Metadata {
  const url = `${siteUrl}${path}`
  const full = siteName ? `${title} — ${siteName}` : title
  return {
    title: full,
    description,
    openGraph: { title: full, description, type: "website", url },
    twitter: { card: "summary_large_image", title: full, description },
    alternates: { canonical: url },
  }
}
