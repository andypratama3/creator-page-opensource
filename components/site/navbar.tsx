"use client"

import { Menu, X } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Creator } from "@/lib/content-types"
import { navLinks } from "@/lib/creator-data"
import { ThemeToggle } from "./theme-toggle"

export function Navbar({ creator }: { creator: Creator }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4">
      <nav
        aria-label="Primary"
        className={cn(
          "mt-3 flex w-full max-w-6xl items-center justify-between rounded-full border border-hairline px-3 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled ? "glass py-1.5 shadow-plate" : "bg-transparent py-2.5",
        )}
      >
        <a
          href="#top"
          className="flex items-center gap-2 pl-2 text-sm font-semibold tracking-tight"
        >
          <span className="grid size-7 place-items-center rounded-full bg-brand text-[13px] font-bold text-[var(--primary-foreground)]">
            {creator.first[0]}
          </span>
          <span className="hidden sm:inline">{creator.first}</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3.5 py-2 text-sm text-ink-muted transition-colors hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <Button size="lg" variant="ghost" className="hidden rounded-full px-4 sm:inline-flex" nativeButton={false} render={<a href="/media-kit" />}>
            Media Kit
          </Button>
          <Button size="lg" className="hidden rounded-full px-4 sm:inline-flex" nativeButton={false} render={<a href="#contact" />}>
            Work With Me
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 top-0 z-40 md:hidden" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 glass-deep" />
          <div className="relative mt-20 mx-4 rounded-3xl border border-hairline bg-surface p-4 shadow-lift">
            <ul className="flex flex-col">
              <li>
                <a
                  href="/media-kit"
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-lg font-medium text-brand"
                >
                  Media Kit
                </a>
              </li>
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-lg font-medium text-ink transition-colors hover:bg-surface-2"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <Button
              size="lg"
              className="mt-2 w-full rounded-2xl"
              nativeButton={false}
              render={<a href="#contact" onClick={() => setOpen(false)} />}
            >
              Work With Me
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
