// Mutable, admin-editable content schema.
// This file is client-safe (no Node APIs) — it can be imported by /admin.

export interface Creator {
  name: string
  first: string
  role: string
  tagline: string
  intro: string
  positioning: string
  location: string
  timezone: string
  availability: string
  responseTime: string
  yearsCreating: number
  niche: string[]
  email: string
  portrait: string
  socials: Record<string, string>
  links: Record<string, string>
}

export interface PlatformStat {
  platform: string
  value: number
  suffix: string
  label: string
  sub: string
}

export interface Metric {
  label: string
  value: number
  suffix: string
  trend: string
}

export interface FeaturedItem {
  platform: string
  title: string
  thumb: string
  views: string
  engagement: string
  product: string
  href: string
}

export interface Category {
  n: string
  title: string
  body: string
}

export interface Brand {
  name: string
  campaign: string
  result: string
}

export interface CaseStudy {
  brand: string
  campaign: string
  objective: string
  strategy: string[]
  deliverables: string[]
  results: { value: string; label: string }[]
}

export interface Service {
  n: string
  title: string
  body: string
}

export interface Package {
  name: string
  price: string
  note: string
  features: string[]
  featured: boolean
}

export interface Testimonial {
  quote: string
  name: string
  title: string
  company: string
}

export interface Audience {
  updated: string
  medianAge: number
  averages: { label: string; value: string }[]
  age: { label: string; value: number }[]
  gender: { label: string; value: number }[]
  locations: { label: string; value: number }[]
  interests: string[]
}

export interface SiteContent {
  creator: Creator
  platformStats: PlatformStat[]
  metrics: Metric[]
  reachSeries: number[]
  featuredContent: FeaturedItem[]
  categories: Category[]
  brands: Brand[]
  caseStudy: CaseStudy
  services: Service[]
  packages: Package[]
  testimonials: Testimonial[]
  audience: Audience
}
