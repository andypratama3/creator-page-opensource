import { siteUrl } from "@/lib/seo"
import type { Brand, Creator, PlatformStat } from "@/lib/content-types"

export function MediaKitJsonLd({
  creator,
  brands,
  platformStats,
  updated,
}: {
  creator: Creator
  brands: Brand[]
  platformStats: PlatformStat[]
  updated: string
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateModified: updated,
    mainEntity: {
      "@type": "Person",
      name: creator.name,
      jobTitle: creator.role,
      address: creator.location,
      email: `mailto:${creator.email}`,
      url: `${siteUrl}/media-kit`,
      sameAs: [creator.links.tiktok, creator.links.instagram, creator.links.youtube],
    },
    about: {
      "@type": "ItemList",
      itemListElement: platformStats.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `${s.platform} ${s.label}: ${s.value}${s.suffix}`,
      })),
    },
    mentions: brands.map((b) => ({ "@type": "Brand", name: b.name })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
