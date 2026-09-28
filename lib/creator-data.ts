// Structured, easily-replaceable content for the portfolio.
// All figures are clearly-marked PLACEHOLDER values — swap with real data.

export const creator = {
  name: "Andy Pratama",
  first: "Andy",
  role: "Creator & Affiliate Marketer",
  tagline: "Content that connects. Products that convert.",
  intro:
    "I create authentic short-form content that helps brands reach the right audience and turn attention into measurable action.",
  positioning:
    "Short-form creator focused on honest product storytelling — reviews, lifestyle integration and affiliate-first content that holds attention and drives clicks.",
  location: "Jakarta, Indonesia",
  timezone: "GMT+7 · Jakarta",
  availability: "Available for brand collaborations",
  responseTime: "24–48 hours",
  yearsCreating: 5,
  niche: ["Technology", "Lifestyle"],
  email: "hello@andypratama.co",
  socials: {
    tiktok: "@andypratama",
    instagram: "@andy.pratama",
    youtube: "@andypratama",
    github: "@andypratama",
    linkedin: "andypratama",
    twitter: "@andypratama",
  },
  links: {
    tiktok: "https://tiktok.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
    whatsapp: "https://wa.me/6280000000000",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
  },
} as const

export const platformStats = [
  { platform: "TikTok", value: 125, suffix: "K+", label: "Followers", sub: "4.8M monthly views" },
  { platform: "Instagram", value: 62, suffix: "K+", label: "Followers", sub: "2.1M monthly reach" },
  { platform: "YouTube", value: 38, suffix: "K+", label: "Subscribers", sub: "1.4M monthly views" },
  { platform: "Affiliate", value: 3200, suffix: "+", label: "Conversions", sub: "Across 40+ campaigns" },
] as const

export const metrics = [
  { label: "Avg. engagement rate", value: 7, suffix: ".4%", trend: "+1.8pt vs. niche avg." },
  { label: "Total monthly reach", value: 4, suffix: ".8M", trend: "+38% last 90 days" },
  { label: "Avg. link click-through", value: 5, suffix: ".2%", trend: "+0.9pt QoQ" },
  { label: "Affiliate conversion rate", value: 3, suffix: ".6%", trend: "Above category median" },
] as const

// 12 months of relative reach index (placeholder shape for the chart).
export const reachSeries = [
  32, 38, 41, 47, 44, 52, 58, 61, 57, 68, 74, 82,
] as const

export const featuredContent = [
  {
    platform: "TikTok",
    title: "3 things I wish I knew before buying this",
    thumb: "/content-1.png",
    views: "2.4M",
    engagement: "8.2%",
    product: "Wireless Earbuds",
    href: "https://tiktok.com",
  },
  {
    platform: "Instagram",
    title: "My honest 30-day skincare results",
    thumb: "/content-2.png",
    views: "980K",
    engagement: "6.9%",
    product: "Skincare Serum",
    href: "https://instagram.com",
  },
  {
    platform: "YouTube",
    title: "The desk setup that actually made me productive",
    thumb: "/content-3.png",
    views: "1.3M",
    engagement: "7.5%",
    product: "Desk Accessories",
    href: "https://youtube.com",
  },
] as const

export const categories = [
  { n: "01", title: "Product Reviews", body: "Authentic product experiences designed to build trust." },
  { n: "02", title: "Lifestyle Content", body: "Natural product integration into everyday life." },
  { n: "03", title: "Tutorials", body: "Useful educational content that demonstrates products." },
  { n: "04", title: "UGC", body: "Authentic user-generated content for brand campaigns." },
  { n: "05", title: "Affiliate Content", body: "Content optimized for product discovery and conversion." },
  { n: "06", title: "Unboxing", body: "High-quality product introduction and first impressions." },
] as const

export const brands = [
  { name: "Northwind", campaign: "Product launch", result: "1.2M views" },
  { name: "Lumen", campaign: "Always-on UGC", result: "6.8% eng." },
  { name: "Verre", campaign: "Affiliate drop", result: "3.2K clicks" },
  { name: "Kai Studio", campaign: "Seasonal", result: "890K reach" },
  { name: "Monogram", campaign: "Review series", result: "4.1% CTR" },
  { name: "Atlas", campaign: "Long-term", result: "12 videos" },
] as const

export const caseStudy = {
  brand: "Northwind Audio",
  campaign: "Flagship earbuds launch",
  objective: "Increase launch-week awareness among Gen Z audiences.",
  strategy: [
    "Short-form educational content on real-world usage",
    "Authentic storytelling around sound quality",
    "Clear CTA to affiliate landing page",
  ],
  deliverables: ["3 TikTok videos", "2 Instagram Reels", "5 Story frames"],
  results: [
    { value: "1.2M+", label: "Total views" },
    { value: "8.4%", label: "Engagement" },
    { value: "3,200+", label: "Link clicks" },
  ],
} as const

export const services = [
  { n: "01", title: "Sponsored Content", body: "Custom content that features your product naturally." },
  { n: "02", title: "UGC Content", body: "Creator-style content for your brand's own channels." },
  { n: "03", title: "Affiliate Campaign", body: "Performance-driven content using affiliate links." },
  { n: "04", title: "Product Review", body: "Honest, informative, product-focused content." },
  { n: "05", title: "Product Launch", body: "Launch campaigns designed to generate awareness." },
  { n: "06", title: "Long-Term Partnership", body: "Ongoing content partnerships with your brand." },
] as const

export const packages = [
  {
    name: "Starter",
    price: "$450",
    note: "1 short-form video",
    features: ["Concept & script", "Production", "Editing", "1 revision"],
    featured: false,
  },
  {
    name: "Growth",
    price: "$1,200",
    note: "3 short-form videos",
    features: ["Creative direction", "Production", "Editing", "Cross-platform adaptation"],
    featured: true,
  },
  {
    name: "Campaign",
    price: "Custom",
    note: "Let's discuss",
    features: ["Strategy", "Multiple deliverables", "Multi-platform", "Reporting"],
    featured: false,
  },
] as const

export const testimonials = [
  {
    quote:
      "Working with Andy made our product launch feel authentic while still delivering measurable results. The content overperformed our targets.",
    name: "Sarah Lim",
    title: "Marketing Manager",
    company: "Northwind Audio",
  },
  {
    quote:
      "Clear communication, sharp creative instincts, and content that actually converts. One of the few creators who thinks like a marketer.",
    name: "Devon Rae",
    title: "Brand Partnerships",
    company: "Lumen",
  },
  {
    quote:
      "The reporting after the campaign was genuinely useful. We knew exactly what worked and reinvested into a long-term partnership.",
    name: "Priya Nair",
    title: "Growth Lead",
    company: "Verre",
  },
] as const

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Analytics", href: "#analytics" },
  { label: "Content", href: "#content" },
  { label: "Brands", href: "#brands" },
  { label: "Services", href: "#services" },
] as const

// ---- Media kit extensions (placeholder values, safe to swap) ----

export const faqPageUrl = "/#contact"

export const genderTones = ["bg-brand", "bg-brand-2", "bg-brand-3"] as const

export const audience = {
  updated: "September 2026",
  medianAge: 24,
  averages: [
    { label: "Avg. views / video", value: "380K" },
    { label: "Avg. engagement rate", value: "7.4%" },
    { label: "Avg. link CTR", value: "5.2%" },
    { label: "Posting cadence", value: "4–5x / week" },
  ],
  age: [
    { label: "18–24", value: 48 },
    { label: "25–34", value: 32 },
    { label: "35–44", value: 14 },
    { label: "45+", value: 6 },
  ],
  gender: [
    { label: "Female", value: 54 },
    { label: "Male", value: 43 },
    { label: "Other", value: 3 },
  ],
  locations: [
    { label: "Jakarta", value: 38 },
    { label: "Surabaya", value: 18 },
    { label: "Bandung", value: 16 },
    { label: "Medan", value: 12 },
    { label: "Other", value: 16 },
  ],
  interests: ["Tech gadgets", "Skincare", "Home setup", "Lifestyle", "Deals", "UGC"],
} as const

// Alias kept for media-kit readability — same source as `brands`.
export const brandNames = brands
