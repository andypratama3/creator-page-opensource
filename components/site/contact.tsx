"use client"

import { Loader2, Mail, MapPin, Send } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Creator } from "@/lib/content-types"
import { cn } from "@/lib/utils"
import { socialIcon } from "./icons"
import { Reveal } from "./reveal"

const projectTypes = ["Sponsored", "UGC", "Affiliate", "Review", "Long-term"] as const

export function Contact({ creator }: { creator: Creator }) {
  const [type, setType] = useState<string>("Sponsored")
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    try {
      const form = new FormData(e.target as HTMLFormElement)
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          brand: form.get("brand"),
          projectType: type,
          message: form.get("message"),
          website: form.get("website"),
        }),
      })
      const data = (await res.json()) as { ok?: boolean; error?: string }
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Gagal mengirim pesan.")
      ;(e.target as HTMLFormElement).reset()
      setType("Sponsored")
      toast.success("Message sent", {
        description: "Thanks — I'll get back to you within 1–2 business days.",
      })
    } catch (err) {
      toast.error("Gagal mengirim", {
        description: err instanceof Error ? err.message : "Coba lagi atau hubungi via email langsung.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="plate overflow-hidden rounded-[2rem]">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            {/* Left: pitch */}
            <div className="relative flex flex-col justify-between gap-10 bg-surface-2 p-8 sm:p-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-16 -top-16 size-56 rounded-full opacity-70 blur-3xl"
                style={{ background: "radial-gradient(closest-side, var(--brand-soft), transparent)" }}
              />
              <div className="relative">
                <p className="text-[11px] font-medium tracking-[0.2em] text-brand uppercase">
                  Let&apos;s collaborate
                </p>
                <h2 className="mt-3 text-balance text-[clamp(1.9rem,4vw,2.75rem)] leading-tight font-semibold tracking-tight">
                  Ready to create something that converts?
                </h2>
                <p className="mt-4 text-pretty leading-relaxed text-ink-muted">
                  Tell me about your product and goals. I&apos;ll reply with ideas and a
                  tailored plan for your campaign.
                </p>
                <p className="mt-3 text-sm text-ink-muted">
                  Prefer a one-pager?{" "}
                  <a href="/media-kit" className="font-medium text-brand underline underline-offset-2">
                    View the media kit
                  </a>
                  .
                </p>
              </div>

              <div className="relative space-y-4">
                <a
                  href={`mailto:${creator.email}`}
                  className="flex items-center gap-3 text-sm text-ink-muted transition-colors hover:text-ink"
                >
                  <span className="grid size-9 place-items-center rounded-full border border-hairline bg-surface">
                    <Mail className="size-4" />
                  </span>
                  {creator.email}
                </a>
                <p className="flex items-center gap-3 text-sm text-ink-muted">
                  <span className="grid size-9 place-items-center rounded-full border border-hairline bg-surface">
                    <MapPin className="size-4" />
                  </span>
                  {creator.location}
                </p>

                <div className="flex items-center gap-2 pt-2">
                  {(Object.keys(socialIcon) as (keyof typeof socialIcon)[]).map((k) => {
                    const Icon = socialIcon[k]
                    return (
                      <a
                        key={k}
                        href={creator.links[k]}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${creator.name} on ${k}`}
                        className="grid size-10 place-items-center rounded-full border border-hairline bg-surface text-ink-muted transition-all hover:-translate-y-0.5 hover:text-brand"
                      >
                        <Icon className="size-4" />
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="p-8 sm:p-10">
              <form onSubmit={onSubmit} className="space-y-5">
                {/* Honeypot anti-spam — humans never see this. */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute h-0 w-0 opacity-0"
                />
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" required placeholder="Jane Doe" className="h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required placeholder="jane@brand.com" className="h-11" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brand">Brand / Company</Label>
                  <Input id="brand" name="brand" placeholder="Your brand" className="h-11" />
                </div>

                <div className="space-y-2.5">
                  <Label>Project type</Label>
                  <input type="hidden" name="projectType" value={type} />
                  <div className="flex flex-wrap gap-2">
                    {projectTypes.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setType(t)}
                        aria-pressed={type === t}
                        className={cn(
                          "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                          type === t
                            ? "border-brand bg-brand-soft font-medium text-brand"
                            : "border-hairline text-ink-muted hover:text-ink",
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell me about your product, goals, and timeline…"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full rounded-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      Send message <Send />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
