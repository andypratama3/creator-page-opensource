import type { PlatformStat } from "@/lib/content-types"
import { CountUp } from "./count-up"
import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"

export function PlatformStats({ items }: { items: PlatformStat[] }) {
  if (items.length === 0) return null
  return (
    <section className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Social proof"
          title="Audience across every platform."
          description="A combined, engaged audience built on consistency and trust. Figures are placeholder values — easily swapped for live data."
        />

        <ul className="no-scrollbar mt-12 flex snap-x gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4">
          {items.map((s, i) => (
            <li key={s.platform} className="min-w-[70%] snap-start sm:min-w-0">
              <Reveal delay={i * 70} className="h-full">
                <div className="plate group h-full rounded-3xl p-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1">
                  <p className="text-xs font-medium tracking-[0.18em] text-ink-subtle uppercase">
                    {s.platform}
                  </p>
                  <p className="mt-6 text-4xl font-semibold tracking-tight">
                    <CountUp to={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-1 text-sm font-medium text-ink">{s.label}</p>
                  <p className="mt-3 text-sm text-ink-muted">{s.sub}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
