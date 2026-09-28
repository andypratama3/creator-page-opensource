import { Quote } from "lucide-react"
import type { Testimonial } from "@/lib/content-types"
import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"

export function Testimonials({ items }: { items: Testimonial[] }) {
  if (items.length === 0) return null
  return (
    <section className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Testimonials"
          title="What partners say."
          align="center"
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {items.map((t, i) => (
            <Reveal key={t.name} delay={i * 80} className="h-full">
              <figure className="plate flex h-full flex-col rounded-3xl p-7">
                <Quote className="size-7 text-brand" />
                <blockquote className="mt-5 flex-1 text-pretty leading-relaxed text-ink">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-hairline pt-5">
                  <p className="font-medium">{t.name}</p>
                  <p className="text-sm text-ink-muted">
                    {t.title}, {t.company}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
