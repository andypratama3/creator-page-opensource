import {
  audience,
  brands,
  caseStudy,
  categories,
  creator,
  featuredContent,
  metrics,
  packages,
  platformStats,
  reachSeries,
  services,
  testimonials,
} from "./creator-data"
import { backendLoad, backendReset, backendSave, storageKind } from "./content-backend"
import type { SiteContent } from "./content-types"

export const CONTENT_PATH = "data/content.json (local) · Vercel KV (production)"

// Factory defaults — sourced from lib/creator-data.ts so the template
// still works even if no saved content exists yet.
export const defaultContent: SiteContent = {
  creator: {
    name: creator.name,
    first: creator.first,
    role: creator.role,
    tagline: creator.tagline,
    intro: creator.intro,
    positioning: creator.positioning,
    location: creator.location,
    timezone: creator.timezone,
    availability: creator.availability,
    responseTime: creator.responseTime,
    yearsCreating: creator.yearsCreating,
    niche: [...creator.niche],
    email: creator.email,
    portrait: "/creator-portrait.png",
    socials: { ...creator.socials },
    links: { ...creator.links },
  },
  platformStats: platformStats.map((s) => ({ ...s, value: Number(s.value) })),
  metrics: metrics.map((m) => ({ ...m, value: Number(m.value) })),
  reachSeries: [...reachSeries].map(Number),
  featuredContent: featuredContent.map((c) => ({ ...c })),
  categories: categories.map((c) => ({ ...c })),
  brands: brands.map((b) => ({ ...b })),
  caseStudy: {
    brand: caseStudy.brand,
    campaign: caseStudy.campaign,
    objective: caseStudy.objective,
    strategy: [...caseStudy.strategy],
    deliverables: [...caseStudy.deliverables],
    results: caseStudy.results.map((r) => ({ ...r })),
  },
  services: services.map((s) => ({ ...s })),
  packages: packages.map((p) => ({
    name: p.name,
    price: p.price,
    note: p.note,
    features: [...p.features],
    featured: p.featured,
  })),
  testimonials: testimonials.map((t) => ({ ...t })),
  audience: {
    updated: audience.updated,
    medianAge: audience.medianAge,
    averages: audience.averages.map((a) => ({ ...a })),
    age: audience.age.map((a) => ({ ...a, value: Number(a.value) })),
    gender: audience.gender.map((g) => ({ ...g, value: Number(g.value) })),
    locations: audience.locations.map((l) => ({ ...l, value: Number(l.value) })),
    interests: [...audience.interests],
  },
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null
}

export function isValidContent(v: unknown): v is SiteContent {
  if (!isRecord(v) || !isRecord(v.creator)) return false
  const c = v as unknown as Partial<SiteContent>
  return Array.isArray(c.packages) && typeof c.creator === "object"
}

export async function getSiteContent(): Promise<SiteContent> {
  const raw = await backendLoad()
  if (!isValidContent(raw)) return defaultContent
  // Shallow-merge over defaults so newly added fields never crash old saves.
  return { ...defaultContent, ...raw }
}

export async function saveSiteContent(content: SiteContent): Promise<{ persisted: boolean }> {
  return backendSave(content)
}

export async function resetSiteContent(): Promise<void> {
  await backendReset()
}

export { storageKind }
