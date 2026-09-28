import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, Check, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { genderTones } from "@/lib/creator-data"
import { pageMetadata } from "@/lib/seo"
import { getSiteContent } from "@/lib/site-content"
import { socialIcon, type SocialKey } from "@/components/site/icons"
import { Breadcrumbs } from "@/components/site/breadcrumbs"
import { MediaKitJsonLd } from "@/components/site/json-ld"
import { PrintButton } from "@/components/site/print-button"
import { ThemeToggleIsland } from "@/components/site/theme-toggle-island"

export const dynamic = "force-dynamic"

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent()
  return pageMetadata({
    title: "Media Kit",
    description: `Media kit for ${content.creator.name}: audience, platform reach, past campaigns, collaboration packages and contact details.`,
    path: "/media-kit",
    siteName: content.creator.name,
  })
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="border-t border-hairline pt-4">
      <p data-numeric className="text-[clamp(1.5rem,3vw,2rem)] leading-none font-semibold tracking-tighter">
        {value}
      </p>
      <p className="mt-1.5 text-xs text-ink-muted">{label}</p>
      {sub && <p className="mt-0.5 text-[11px] text-ink-subtle">{sub}</p>}
    </div>
  )
}

function BarRow({ label, value, tone }: { label: string; value: number; tone?: string }) {
  const tones: Record<string, string> = {
    brand: "bg-brand",
    "brand-2": "bg-brand-2",
    "brand-3": "bg-brand-3",
  }
  return (
    <li>
      <div className="flex items-center justify-between text-sm">
        <span className="text-ink-muted">{label}</span>
        <span data-numeric className="font-medium">
          {value}%
        </span>
      </div>
      <span className="mt-1.5 block h-1.5 w-full overflow-hidden rounded-full bg-surface-3">
        <span
          className={`block h-full rounded-full ${tones[tone ?? "brand"]}`}
          style={{ width: `${Math.max(3, value)}%` }}
        />
      </span>
    </li>
  )
}

export default async function MediaKitPage() {
  const content = await getSiteContent()
  const { creator, audience, brands, packages, platformStats, featuredContent, caseStudy, testimonials } = content
  const socialLinks: Record<string, string> = creator.links

  return (
    <div className="grain min-h-dvh">
      <MediaKitJsonLd
        creator={creator}
        brands={brands}
        platformStats={platformStats}
        updated={audience.updated}
      />

      <header className="no-print sticky top-0 z-40 px-4 pt-3">
        <div className="glass shell flex items-center justify-between rounded-full border border-hairline py-1.5 pr-2 pl-4 shadow-plate">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="size-4" />
            Back to site
          </Link>
          <div className="no-print flex items-center gap-1.5">
            <ThemeToggleIsland />
            <PrintButton />
            <Button
              size="lg"
              className="h-9 rounded-full px-4 text-sm"
              nativeButton={false}
              render={<a href={`mailto:${creator.email}?subject=Media%20kit%20request`} />}
            >
              <Mail className="size-4" />
              Request rates
            </Button>
          </div>
        </div>
      </header>

      <main id="main" className="px-4 py-10 sm:py-14">
        <div className="shell space-y-4">
          <Breadcrumbs
            trail={[
              { name: "Home", path: "/" },
              { name: "Media Kit", path: "/media-kit" },
            ]}
          />
          {/* Section 1 — header, top 20% */}
          <section className="ring-gradient glow-top relative overflow-hidden rounded-[2rem] p-7 sm:p-10">
            <div className="mesh pointer-events-none absolute inset-0 -z-10 opacity-70" />
            <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-5">
                <div className="relative size-24 shrink-0 overflow-hidden rounded-2xl sm:size-28">
                  <Image
                    src={creator.portrait || "/creator-portrait.png"}
                    alt={`${creator.name}`}
                    fill
                    priority
                    sizes="112px"
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <p className="text-[11px] font-medium tracking-[0.2em] text-brand uppercase">
                    Media Kit · {audience.updated}
                  </p>
                  <h1 className="mt-2 text-[clamp(1.75rem,4.5vw,2.75rem)] leading-[1.05] font-semibold tracking-tight">
                    {creator.name}
                  </h1>
                  <p className="mt-1 text-ink-muted">{creator.role}</p>
                  <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="size-3.5" />
                      {creator.location}
                    </span>
                    <span>{creator.timezone}</span>
                    <span className="text-ok">{creator.availability}</span>
                  </p>
                </div>
              </div>

              <ul className="flex shrink-0 flex-col gap-2">
                {(["tiktok", "instagram", "youtube", "twitter"] as SocialKey[]).map((k) => {
                  const Icon = socialIcon[k]
                  if (!Icon) return null
                  return (
                    <li key={k}>
                      <a
                        href={socialLinks[k]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-3.5 py-1.5 text-sm transition-colors hover:border-brand hover:text-brand"
                      >
                        <Icon className="size-4" />
                        {creator.socials[k]}
                        <ArrowUpRight className="size-3.5 text-ink-subtle" />
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>

            <p className="mt-8 max-w-3xl text-pretty text-lg leading-relaxed text-ink-muted">
              {creator.positioning}
            </p>
          </section>

          {/* Section 2 — numbers, middle 40% */}
          <section className="grid gap-4 lg:grid-cols-3">
            <div className="plate rounded-3xl p-6 sm:p-7">
              <h2 className="text-[11px] font-medium tracking-[0.18em] text-ink-subtle uppercase">
                Platform performance
              </h2>
              <div className="mt-6 grid grid-cols-2 gap-5">
                {platformStats.slice(0, 3).map((s) => (
                  <Stat
                    key={s.platform}
                    label={`${s.platform} ${s.label.toLowerCase()}`}
                    value={`${s.value}${s.suffix}`}
                    sub={s.sub}
                  />
                ))}
                <Stat label="Median audience age" value={String(audience.medianAge)} />
              </div>

              <h3 className="mt-8 text-[11px] font-medium tracking-[0.18em] text-ink-subtle uppercase">
                Averages, not outliers
              </h3>
              <ul className="mt-4 space-y-3">
                {audience.averages.map((a) => (
                  <li key={a.label} className="flex items-baseline justify-between gap-3 text-sm">
                    <span className="text-ink-muted">{a.label}</span>
                    <span data-numeric className="font-semibold">
                      {a.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="plate rounded-3xl p-6 sm:p-7">
              <h2 className="text-[11px] font-medium tracking-[0.18em] text-ink-subtle uppercase">
                Audience
              </h2>
              <ul className="mt-6 space-y-4">
                {audience.age.map((a) => (
                  <BarRow key={a.label} label={a.label} value={a.value} />
                ))}
              </ul>

              <h3 className="mt-8 text-[11px] font-medium tracking-[0.18em] text-ink-subtle uppercase">
                Gender split
              </h3>
              <div className="mt-3 flex h-2.5 overflow-hidden rounded-full bg-surface-3">
                {audience.gender.map((g, i) => (
                  <span
                    key={g.label}
                    className={genderTones[i % genderTones.length]}
                    style={{ width: `${g.value}%` }}
                  />
                ))}
              </div>
              <ul className="mt-3 space-y-1.5">
                {audience.gender.map((g, i) => (
                  <li key={g.label} className="flex items-center gap-2 text-sm text-ink-muted">
                    <span
                      className={`size-2 rounded-full ${genderTones[i % genderTones.length]}`}
                      aria-hidden="true"
                    />
                    <span data-numeric className="font-medium text-ink">
                      {g.value}%
                    </span>
                    {g.label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="plate rounded-3xl p-6 sm:p-7">
              <h2 className="text-[11px] font-medium tracking-[0.18em] text-ink-subtle uppercase">
                Top locations
              </h2>
              <ul className="mt-6 space-y-4">
                {audience.locations.map((l) => (
                  <BarRow key={l.label} label={l.label} value={l.value} tone="brand-2" />
                ))}
              </ul>

              <h3 className="mt-8 text-[11px] font-medium tracking-[0.18em] text-ink-subtle uppercase">
                Interests
              </h3>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {audience.interests.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-hairline bg-surface-2 px-2.5 py-1 text-xs text-ink-muted"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Section 2b — selected work */}
          <section className="plate rounded-3xl p-6 sm:p-7">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-[11px] font-medium tracking-[0.18em] text-ink-subtle uppercase">
                  Selected work
                </h2>
                <p className="mt-2 text-lg font-semibold tracking-tight">Top-performing pieces</p>
              </div>
              <Link
                href="/#content"
                className="inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"
              >
                View all <ArrowUpRight className="size-4" />
              </Link>
            </div>
            <ul className="mt-6 grid gap-4 sm:grid-cols-3">
              {featuredContent.map((f) => {
                const Icon = socialIcon[f.platform.toLowerCase() as SocialKey]
                return (
                  <li key={f.title}>
                    <a
                      href={f.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block overflow-hidden rounded-2xl border border-hairline bg-surface-2 transition-transform duration-500 hover:-translate-y-1"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={f.thumb || "/placeholder.svg"}
                          alt={`${f.title} — ${f.product} on ${f.platform}`}
                          fill
                          sizes="(max-width: 640px) 100vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
                          {Icon && <Icon className="size-3" />}
                          {f.platform}
                        </span>
                      </div>
                      <div className="p-4">
                        <p className="text-[11px] text-ink-subtle">{f.product}</p>
                        <p className="mt-0.5 line-clamp-2 text-sm leading-snug font-medium">{f.title}</p>
                        <p className="mt-2 text-[13px] text-ink-muted">
                          <span data-numeric className="font-semibold text-ink">{f.views}</span> views ·{" "}
                          <span data-numeric className="font-semibold text-ink">{f.engagement}</span> eng.
                        </p>
                      </div>
                    </a>
                  </li>
                )
              })}
            </ul>
          </section>

          {/* Section 2c — case study */}
          <section className="plate overflow-hidden rounded-3xl">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
              <div className="p-6 sm:p-8">
                <p className="text-[11px] font-medium tracking-[0.2em] text-brand uppercase">Case study</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight">{caseStudy.brand}</h2>
                <p className="mt-1 text-ink-muted">{caseStudy.campaign}</p>
                <p className="mt-4 max-w-md text-pretty text-sm leading-relaxed text-ink-muted">
                  <span className="font-medium text-ink">Objective — </span>
                  {caseStudy.objective}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {caseStudy.deliverables.map((d) => (
                    <li
                      key={d}
                      className="rounded-full border border-hairline bg-surface-2 px-3 py-1 text-xs font-medium text-ink-muted"
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid gap-px bg-hairline sm:grid-cols-3 lg:grid-cols-1 lg:border-l lg:border-hairline">
                {caseStudy.results.map((r) => (
                  <div key={r.label} className="flex flex-col justify-center bg-surface p-5">
                    <p data-numeric className="text-2xl font-semibold tracking-tight text-gradient sm:text-3xl">
                      {r.value}
                    </p>
                    <p className="mt-0.5 text-sm text-ink-muted">{r.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 3 — proof + rate card */}
          <section className="grid gap-4 lg:grid-cols-[1.25fr_1fr]">
            <div className="plate rounded-3xl p-6 sm:p-7">
              <h2 className="text-[11px] font-medium tracking-[0.18em] text-ink-subtle uppercase">
                Past campaigns
              </h2>
              <ul className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2">
                {brands.map((b) => (
                  <li key={b.name} className="bg-surface p-4">
                    <p className="font-medium">{b.name}</p>
                    <p className="mt-0.5 text-xs text-ink-subtle">{b.campaign}</p>
                    <p data-numeric className="mt-2 text-sm font-medium text-brand">
                      {b.result}
                    </p>
                  </li>
                ))}
              </ul>

              <h2 className="mt-8 text-[11px] font-medium tracking-[0.18em] text-ink-subtle uppercase">
                Rate card
              </h2>
              <ul className="mt-4 space-y-3">
                {packages.map((p) => (
                  <li
                    key={p.name}
                    className="flex items-baseline justify-between gap-3 rounded-2xl border border-hairline bg-surface-2 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-semibold">{p.name}</p>
                      <p className="text-xs text-ink-muted">{p.note}</p>
                    </div>
                    <p data-numeric className="text-sm font-semibold text-brand">
                      {p.price === "Custom" ? "Custom" : `from ${p.price}`}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="plate flex flex-col rounded-3xl p-6 sm:p-7">
              <h2 className="text-[11px] font-medium tracking-[0.18em] text-ink-subtle uppercase">
                Collaboration formats
              </h2>
              <ul className="mt-6 space-y-5">
                {packages.map((p) => (
                  <li key={p.name} className="border-t border-hairline pt-4 first:border-0 first:pt-0">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="font-medium">{p.name}</p>
                      <p data-numeric className="text-sm font-semibold text-brand">
                        {p.price === "Custom" ? "Custom" : `from ${p.price}`}
                      </p>
                    </div>
                    <p className="mt-0.5 text-sm text-ink-muted">{p.note}</p>
                    <ul className="mt-2.5 space-y-1.5">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-[13px] text-ink-muted">
                          <Check className="size-3.5 shrink-0 text-brand" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-3 w-full rounded-full"
                      nativeButton={false}
                      render={
                        <a href={`mailto:${creator.email}?subject=${p.name}%20package%20inquiry`} />
                      }
                    >
                      Book {p.name}
                    </Button>
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-hairline pt-4 text-xs leading-relaxed text-ink-subtle">
                Full rate card, usage rights and exclusivity terms are quoted per campaign —{" "}
                <a href="/#contact" className="font-medium text-brand underline underline-offset-2">
                  just send a brief
                </a>
                .
              </p>
            </div>
          </section>

          {/* Section 3b — process + terms */}
          <section className="grid gap-4 lg:grid-cols-[1.25fr_1fr]">
            <div className="plate rounded-3xl p-6 sm:p-7">
              <h2 className="text-[11px] font-medium tracking-[0.18em] text-ink-subtle uppercase">
                How we&apos;ll work together
              </h2>
              <ol className="mt-6 space-y-5">
                {[
                  { t: "Share your brief", d: "Product, goal, deadline and budget range — via email or WhatsApp." },
                  { t: "Scope & quote", d: `Concept, deliverables and a fixed quote — usually within ${creator.responseTime}.` },
                  { t: "Production", d: "Shoot, edit and a review round as listed in your package." },
                  { t: "Launch & report", d: "Posting plus a performance summary: views, engagement and clicks." },
                ].map((s, i) => (
                  <li key={s.t} className="flex gap-4">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-soft text-sm font-semibold text-brand">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-medium">{s.t}</p>
                      <p className="mt-0.5 text-sm text-ink-muted">{s.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="plate rounded-3xl p-6 sm:p-7">
              <h2 className="text-[11px] font-medium tracking-[0.18em] text-ink-subtle uppercase">
                Good to know
              </h2>
              <ul className="mt-6 space-y-3.5 text-sm">
                {[
                  "Usage rights & exclusivity are quoted per brief.",
                  "Revisions included as listed in each package.",
                  "Rates here are indicative and confirmed per scope.",
                  `Quote turnaround: ${creator.responseTime}.`,
                  `Based in ${creator.location} (${creator.timezone}).`,
                ].map((t) => (
                  <li key={t} className="flex gap-2.5 text-ink-muted">
                    <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                    {t}
                  </li>
                ))}
              </ul>
              <Button
                className="mt-6 w-full rounded-full"
                nativeButton={false}
                render={<a href={creator.links.whatsapp} target="_blank" rel="noopener noreferrer" />}
              >
                Chat on WhatsApp
                <ArrowUpRight className="size-4" />
              </Button>
            </div>
          </section>

          {/* Section 3c — testimonials */}
          <section className="plate rounded-3xl p-6 sm:p-7">
            <h2 className="text-[11px] font-medium tracking-[0.18em] text-ink-subtle uppercase">
              What partners say
            </h2>
            <ul className="mt-6 grid gap-4 lg:grid-cols-3">
              {testimonials.map((t) => (
                <li key={t.name} className="flex flex-col rounded-2xl border border-hairline bg-surface-2 p-5">
                  <blockquote className="flex-1 text-pretty text-sm leading-relaxed">
                    “{t.quote}”
                  </blockquote>
                  <p className="mt-4 border-t border-hairline pt-3 text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-ink-muted">
                    {t.title}, {t.company}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 4 — CTA footer */}
          <section className="ring-gradient glow-top relative overflow-hidden rounded-[2rem] p-7 sm:p-10">
            <div className="mesh pointer-events-none absolute inset-0 -z-10 opacity-60" />
            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div>
                <h2 className="text-balance text-[clamp(1.5rem,3.5vw,2.25rem)] leading-tight font-semibold tracking-tight">
                  Want the deck with the campaign results?
                </h2>
                <p className="mt-2 max-w-lg text-pretty text-ink-muted">
                  Email me with your product, goal and deadline. I&apos;ll send the full deck plus a
                  scope and quote — usually within {creator.responseTime}.
                </p>
              </div>
              <div className="no-print flex shrink-0 flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="h-11 rounded-full px-6"
                  nativeButton={false}
                  render={
                    <a href={`mailto:${creator.email}?subject=Media%20kit%20request`} />
                  }
                >
                  <Mail className="size-4" />
                  {creator.email}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-11 rounded-full bg-surface/70 px-6 backdrop-blur"
                  nativeButton={false}
                  render={<a href={creator.links.whatsapp} target="_blank" rel="noopener noreferrer" />}
                >
                  WhatsApp
                  <ArrowUpRight className="size-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="no-print h-11 rounded-full bg-surface/70 px-6 backdrop-blur"
                  nativeButton={false}
                  render={<Link href="/#contact" />}
                >
                  <Mail className="size-4" />
                  Send a brief
                </Button>
              </div>
            </div>

            <p className="mt-8 border-t border-hairline pt-5 text-xs text-ink-subtle">
              Figures in this media kit are placeholder values for demonstration. Analytics last
              updated {audience.updated}. Rates are indicative and confirmed per brief.
            </p>
            <p className="print-only mt-3 text-xs text-ink-muted">
              Contact: {creator.email} · {creator.links.whatsapp}
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
