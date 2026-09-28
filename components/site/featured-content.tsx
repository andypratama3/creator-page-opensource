import Image from "next/image"
import { ArrowUpRight, Play } from "lucide-react"
import type { FeaturedItem } from "@/lib/content-types"
import { socialIcon } from "./icons"
import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"

export function FeaturedContent({ items }: { items: FeaturedItem[] }) {
  if (items.length === 0) return null
  return (
    <section id="content" className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Portfolio"
          title="Featured content."
          description="A selection of top-performing pieces across platforms. Every piece is built to hold attention and drive action."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((c, i) => {
            const Icon = socialIcon[c.platform.toLowerCase() as keyof typeof socialIcon]
            return (
              <Reveal key={c.title} delay={i * 80}>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block overflow-hidden rounded-3xl border border-hairline bg-surface shadow-plate transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={c.thumb || "/placeholder.svg"}
                      alt={`${c.title} — ${c.product} content on ${c.platform}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
                      {Icon && <Icon className="size-3.5" />}
                      {c.platform}
                    </div>

                    <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-transform duration-500 group-hover:scale-110">
                      <Play className="size-4" />
                    </span>

                    <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2 text-white">
                      <div>
                        <p data-numeric className="text-lg font-semibold leading-none">{c.views}</p>
                        <p className="mt-1 text-[11px] text-white/70">views</p>
                      </div>
                      <div className="text-right">
                        <p data-numeric className="text-lg font-semibold leading-none">{c.engagement}</p>
                        <p className="mt-1 text-[11px] text-white/70">engagement</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-3 p-4">
                    <div>
                      <p className="text-xs text-ink-subtle">{c.product}</p>
                      <p className="mt-1 text-pretty font-medium leading-snug">{c.title}</p>
                    </div>
                    <ArrowUpRight className="mt-0.5 size-5 shrink-0 text-ink-subtle transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
                  </div>
                </a>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
