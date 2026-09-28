import type { Metadata } from "next"

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://andypratama.co"

export function pageMetadata({
  title,
  description,
  path = "/",
  siteName,
  image,
}: {
  title: string
  description: string
  path?: string
  siteName?: string
  image?: string
}): Metadata {
  const url = `${siteUrl}${path}`
  const full = siteName ? `${title} — ${siteName}` : title
  return {
    // absolute: bypass layout template (which would append the name twice)
    title: { absolute: full },
    description,
    openGraph: {
      title: full,
      description,
      type: "website",
      url,
      siteName,
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: full,
      description,
      ...(image ? { images: [image] } : {}),
    },
    alternates: { canonical: url },
  }
}
