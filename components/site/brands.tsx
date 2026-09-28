import { Check } from "lucide-react"
import type { Brand, CaseStudy } from "@/lib/content-types"
import { CountUp } from "./count-up"
import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"

export function Brands({ brands, caseStudy }: { brands: Brand[]; caseStudy: CaseStudy }) {
  return (
    <section id="brands" className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Collaborations"
          title="Brands I've worked with."
          description="Trusted by teams that care about authentic content and real results."
        />

        <ul className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-hairline bg-hairline sm:grid-cols-3">
          {brands.map((b, i) => (
            <li key={b.name}>
              <Reveal delay={(i % 3) * 50} className="h-full">
                <div className="flex h-full flex-col justify-between gap-6 bg-surface p-6">
                  <span className="text-lg font-semibold tracking-tight">{b.name}</span>
                  <div>
                    <p className="text-xs text-ink-subtle">{b.campaign}</p>
                    <p data-numeric className="mt-1 text-sm font-medium text-brand">{b.result}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        {/* Case study */}
        <Reveal className="mt-6">
          <article className="plate overflow-hidden rounded-3xl">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
              <div className="p-7 sm:p-10">
                <p className="text-[11px] font-medium tracking-[0.2em] text-brand uppercase">
                  Case study
                </p>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                  {caseStudy.brand}
                </h3>
                <p className="mt-1 text-ink-muted">{caseStudy.campaign}</p>
                <p className="mt-6 max-w-md text-pretty text-ink-muted">
                  <span className="font-medium text-ink">Objective — </span>
                  {caseStudy.objective}
                </p>

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <div>
                    <p className="text-xs tracking-wide text-ink-subtle uppercase">Strategy</p>
                    <ul className="mt-3 space-y-2">
                      {caseStudy.strategy.map((s) => (
                        <li key={s} className="flex gap-2 text-sm text-ink-muted">
                          <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs tracking-wide text-ink-subtle uppercase">Deliverables</p>
                    <ul className="mt-3 flex flex-wrap gap-2">
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
                </div>
              </div>

              <div className="relative grid gap-px bg-hairline sm:grid-cols-3 lg:grid-cols-1 lg:border-l lg:border-hairline">
                {caseStudy.results.map((r) => (
                  <div
                    key={r.label}
                    className="flex flex-col justify-center bg-surface p-6 text-center lg:text-left"
                  >
                    <p data-numeric className="text-3xl font-semibold tracking-tight text-gradient sm:text-4xl">
                      {r.value}
                    </p>
                    <p className="mt-1 text-sm text-ink-muted">{r.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
