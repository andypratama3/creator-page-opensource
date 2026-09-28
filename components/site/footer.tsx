import { navLinks } from "@/lib/creator-data"
import type { Creator } from "@/lib/content-types"
import { socialIcon } from "./icons"

export function Footer({ creator }: { creator: Creator }) {
  return (
    <footer className="border-t border-hairline px-4 py-14">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-10 lg:flex-row">
          <div className="max-w-sm">
            <a href="#top" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
              <span className="grid size-8 place-items-center rounded-full bg-brand text-sm font-bold text-[var(--primary-foreground)]">
                {creator.first[0]}
              </span>
              {creator.name}
            </a>
            <p className="mt-4 text-pretty text-sm leading-relaxed text-ink-muted">
              {creator.tagline}
            </p>
            <div className="mt-5 flex items-center gap-2">
              {(Object.keys(socialIcon) as (keyof typeof socialIcon)[]).map((k) => {
                const Icon = socialIcon[k]
                return (
                  <a
                    key={k}
                    href={creator.links[k]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${creator.name} on ${k}`}
                    className="grid size-9 place-items-center rounded-full border border-hairline text-ink-muted transition-all hover:-translate-y-0.5 hover:text-brand"
                  >
                    <Icon className="size-4" />
                  </a>
                )
              })}
            </div>
          </div>

          <nav aria-label="Footer" className="flex gap-16">
            <div>
              <p className="text-xs tracking-[0.18em] text-ink-subtle uppercase">Explore</p>
              <ul className="mt-4 space-y-3 text-sm">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-ink-muted transition-colors hover:text-ink">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs tracking-[0.18em] text-ink-subtle uppercase">Connect</p>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <a href={`mailto:${creator.email}`} className="text-ink-muted transition-colors hover:text-ink">
                    Email
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-ink-muted transition-colors hover:text-ink">
                    Work with me
                  </a>
                </li>
                <li>
                  <a href="/media-kit" className="text-ink-muted transition-colors hover:text-ink">
                    Media kit
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-hairline pt-6 text-xs text-ink-subtle sm:flex-row">
          <p>© {new Date().getFullYear()} {creator.name}. All rights reserved.</p>
          <p>Figures shown are placeholder values.</p>
        </div>
      </div>
    </footer>
  )
}
