import Image from "next/image"
import { MapPin, Sparkles } from "lucide-react"
import type { Creator } from "@/lib/content-types"
import { Reveal } from "./reveal"

export function About({ creator }: { creator: Creator }) {
  const facts = [
    { label: "Location", value: creator.location },
    { label: "Primary platforms", value: "TikTok, Instagram, YouTube" },
    { label: "Content niche", value: creator.niche.join(" & ") },
    { label: "Creating since", value: `${2026 - creator.yearsCreating}` },
  ]
  return (
    <section id="about" className="px-4 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <Reveal>
          <div className="relative mx-auto aspect-square w-full max-w-sm">
            <div className="plate relative h-full w-full overflow-hidden rounded-[1.75rem]">
              <Image
                src={creator.portrait || "/creator-portrait.png"}
                alt={`${creator.name} in studio`}
                fill
                sizes="(max-width: 1024px) 80vw, 34vw"
                className="object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-4 -right-3 flex items-center gap-2 rounded-2xl border border-hairline bg-surface px-3.5 py-2.5 shadow-lift">
              <span className="size-2 rounded-full bg-ok animate-breathe" />
              <span className="text-xs font-medium text-ink-muted">{creator.availability}</span>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.2em] text-brand uppercase">
              <Sparkles className="size-3.5" /> About
            </p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="mt-3 text-[clamp(1.9rem,4.5vw,3rem)] leading-tight font-semibold tracking-tight">
              {creator.name}
            </h2>
            <p className="mt-1 text-lg text-ink-muted">{creator.role}</p>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-ink-muted">
              I create engaging content around {creator.niche.join(" and ").toLowerCase()},
              helping audiences discover products that are genuinely useful while helping
              brands build awareness and drive measurable conversions.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline">
              {facts.map((f) => (
                <div key={f.label} className="bg-surface p-5">
                  <dt className="flex items-center gap-1.5 text-xs tracking-wide text-ink-subtle uppercase">
                    {f.label === "Location" && <MapPin className="size-3.5" />}
                    {f.label}
                  </dt>
                  <dd className="mt-1.5 font-medium">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
