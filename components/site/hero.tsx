import Image from "next/image"
import { ArrowRight, Play, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Creator } from "@/lib/content-types"
import { InstagramIcon, TikTokIcon } from "./icons"
import { Reveal } from "./reveal"

export function Hero({ creator }: { creator: Creator }) {
  return (
    <section id="top" className="relative overflow-hidden px-4 pt-32 pb-16 sm:pt-40 sm:pb-24">
      {/* ambient brand glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-60 blur-3xl animate-drift"
        style={{
          background:
            "radial-gradient(closest-side, var(--brand-soft), transparent 70%)",
        }}
      />

      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-3 py-1.5 text-[11px] font-medium tracking-[0.18em] text-ink-muted uppercase">
              <span className="size-1.5 rounded-full bg-brand animate-breathe" />
              Creator • Affiliate • Content
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 text-balance text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.95] font-semibold tracking-tight">
              Content that connects.{" "}
              <span className="text-gradient">Products that convert.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-ink-muted">
              {creator.intro}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg" className="group rounded-full px-5" nativeButton={false} render={<a href="#contact" />}>
                Work With Me
                <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-5"
                nativeButton={false}
                render={<a href="#content" />}
              >
                <Play />
                View My Content
              </Button>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <dl className="mt-12 flex max-w-md items-center gap-8">
              <div>
                <dt className="text-xs tracking-wide text-ink-subtle uppercase">Reach</dt>
                <dd data-numeric className="mt-1 text-2xl font-semibold">4.8M</dd>
              </div>
              <div className="h-8 w-px bg-hairline" />
              <div>
                <dt className="text-xs tracking-wide text-ink-subtle uppercase">Engagement</dt>
                <dd data-numeric className="mt-1 text-2xl font-semibold">7.4%</dd>
              </div>
              <div className="h-8 w-px bg-hairline" />
              <div>
                <dt className="text-xs tracking-wide text-ink-subtle uppercase">Conversions</dt>
                <dd data-numeric className="mt-1 text-2xl font-semibold">3.2K</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal delay={160} className="relative">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
            <div className="absolute inset-0 rotate-3 rounded-[2rem] bg-brand-soft" aria-hidden="true" />
            <div className="plate relative h-full w-full overflow-hidden rounded-[2rem]">
              <Image
                src={creator.portrait || "/creator-portrait.png"}
                alt={`Portrait of ${creator.name}, ${creator.role}`}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover"
              />
            </div>

            {/* floating composition chips */}
            <div className="absolute -left-3 top-8 flex items-center gap-2 rounded-2xl border border-hairline bg-surface/90 px-3 py-2 shadow-lift backdrop-blur animate-float">
              <TikTokIcon className="size-4" />
              <div className="leading-tight">
                <p data-numeric className="text-sm font-semibold">2.4M</p>
                <p className="text-[10px] text-ink-subtle">views</p>
              </div>
            </div>

            <div
              className="absolute -right-3 top-1/3 flex items-center gap-2 rounded-2xl border border-hairline bg-surface/90 px-3 py-2 shadow-lift backdrop-blur animate-float"
              style={{ animationDelay: "1.2s" }}
            >
              <span className="grid size-7 place-items-center rounded-full bg-brand-soft text-brand">
                <TrendingUp className="size-4" />
              </span>
              <div className="leading-tight">
                <p data-numeric className="text-sm font-semibold">+38%</p>
                <p className="text-[10px] text-ink-subtle">growth</p>
              </div>
            </div>

            <div
              className="absolute -bottom-3 left-10 flex items-center gap-2 rounded-2xl border border-hairline bg-surface/90 px-3 py-2 shadow-lift backdrop-blur animate-float"
              style={{ animationDelay: "0.6s" }}
            >
              <InstagramIcon className="size-4" />
              <div className="leading-tight">
                <p data-numeric className="text-sm font-semibold">6.9%</p>
                <p className="text-[10px] text-ink-subtle">engagement</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
