import { ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Package, Service } from "@/lib/content-types"
import { cn } from "@/lib/utils"
import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"

export function Services({ services, packages }: { services: Service[]; packages: Package[] }) {
  return (
    <section id="services" className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Services"
          title="Ways we can work together."
          description="Flexible collaboration formats designed around your goals and budget."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.n} delay={(i % 3) * 60} className="h-full">
              <div className="plate group flex h-full flex-col rounded-3xl p-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <span className="grid size-10 place-items-center rounded-xl bg-brand-soft text-sm font-semibold text-brand">
                    {s.n}
                  </span>
                  <ArrowRight className="size-4 text-ink-subtle transition-all group-hover:translate-x-0.5 group-hover:text-brand" />
                </div>
                <h3 className="mt-6 text-lg font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-ink-muted">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Packages */}
        <div className="mt-16">
          <Reveal>
            <h3 className="text-center text-xl font-semibold tracking-tight">
              Simple, transparent packages
            </h3>
            <p className="mx-auto mt-2 max-w-md text-center text-sm text-ink-muted">
              Starting rates below — placeholder figures. Custom scopes always available.
            </p>
          </Reveal>

          <div className="mt-8 grid items-stretch gap-4 lg:grid-cols-3">
            {packages.map((p, i) => (
              <Reveal key={p.name} delay={i * 80} className="h-full">
                <div
                  className={cn(
                    "relative flex h-full flex-col rounded-3xl p-7",
                    p.featured
                      ? "border border-brand/40 bg-surface shadow-lift ring-1 ring-brand/20"
                      : "plate",
                  )}
                >
                  {p.featured && (
                    <span className="absolute -top-3 left-7 rounded-full bg-brand px-3 py-1 text-[11px] font-semibold tracking-wide text-[var(--primary-foreground)] uppercase">
                      Most popular
                    </span>
                  )}
                  <p className="text-sm font-medium text-ink-muted">{p.name}</p>
                  <p className="mt-3 flex items-baseline gap-1">
                    <span data-numeric className="text-4xl font-semibold tracking-tight">{p.price}</span>
                  </p>
                  <p className="mt-1 text-sm text-ink-subtle">{p.note}</p>

                  <ul className="mt-6 space-y-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm">
                        <Check className="size-4 shrink-0 text-brand" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="mt-8 w-full rounded-full"
                    variant={p.featured ? "default" : "outline"}
                    nativeButton={false}
                    render={<a href="#contact" />}
                  >
                    Get started
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
