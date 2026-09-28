"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import {
  ArrowLeft,
  Download,
  Eye,
  Loader2,
  Lock,
  Plus,
  RotateCcw,
  Trash2,
  Upload,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import type {
  Audience,
  Brand,
  CaseStudy,
  Category,
  Creator,
  FeaturedItem,
  Metric,
  Package,
  PlatformStat,
  Service,
  SiteContent,
  Testimonial,
} from "@/lib/content-types"

type Tab =
  | "profil"
  | "statistik"
  | "konten"
  | "brands"
  | "layanan"
  | "testimoni"
  | "audience"
  | "data"

const TABS: { id: Tab; label: string }[] = [
  { id: "profil", label: "Profil" },
  { id: "statistik", label: "Statistik" },
  { id: "konten", label: "Konten" },
  { id: "brands", label: "Brands" },
  { id: "layanan", label: "Layanan & Rate" },
  { id: "testimoni", label: "Testimoni" },
  { id: "audience", label: "Audience" },
  { id: "data", label: "Data" },
]

const SOCIAL_KEYS = ["tiktok", "instagram", "youtube", "github", "linkedin", "twitter"] as const
const LINK_KEYS = [...SOCIAL_KEYS, "whatsapp"] as const

/* ---------- small primitives ---------- */

function Card({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <section className="plate rounded-3xl p-6 sm:p-7">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      {desc && <p className="mt-1 text-sm text-ink-muted">{desc}</p>}
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  )
}

function Text({
  label,
  value,
  onChange,
  placeholder,
  hint,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  hint?: string
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="h-10" />
      {hint && <p className="text-xs text-ink-subtle">{hint}</p>}
    </div>
  )
}

function Area({
  label,
  value,
  onChange,
  rows = 3,
  hint,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  rows?: number
  hint?: string
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Textarea value={value} rows={rows} onChange={(e) => onChange(e.target.value)} />
      {hint && <p className="text-xs text-ink-subtle">{hint}</p>}
    </div>
  )
}

function Num({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input
        type="number"
        value={Number.isFinite(value) ? value : 0}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-10"
      />
    </div>
  )
}

function ItemShell({
  index,
  onRemove,
  onUp,
  onDown,
  isFirst,
  isLast,
  children,
}: {
  index: number
  onRemove: () => void
  onUp: () => void
  onDown: () => void
  isFirst: boolean
  isLast: boolean
  children: React.ReactNode
}) {
  return (
    <div className="rounded-2xl border border-hairline bg-surface-2 p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-semibold tracking-wider text-ink-subtle uppercase">#{index + 1}</span>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" disabled={isFirst} onClick={onUp} aria-label="Pindah ke atas">
            ↑
          </Button>
          <Button variant="ghost" size="sm" disabled={isLast} onClick={onDown} aria-label="Pindah ke bawah">
            ↓
          </Button>
          <Button variant="ghost" size="sm" onClick={onRemove} aria-label="Hapus">
            <Trash2 className="size-4 text-danger" />
          </Button>
        </div>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

function move<T>(arr: T[], i: number, dir: -1 | 1): T[] {
  const j = i + dir
  if (j < 0 || j >= arr.length) return arr
  const next = [...arr]
  ;[next[i], next[j]] = [next[j], next[i]]
  return next
}

function UploadButton({ pw, onUploaded }: { pw: string; onUploaded: (url: string) => void }) {
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState("")

  async function pick(file: File | undefined) {
    if (!file) return
    setBusy(true)
    setErr("")
    try {
      const form = new FormData()
      form.append("file", file)
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "x-admin-password": pw },
        body: form,
      })
      const data = (await res.json()) as { url?: string; error?: string }
      if (!res.ok || !data.url) throw new Error(data.error ?? "Upload gagal.")
      onUploaded(data.url)
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Upload gagal.")
    } finally {
      setBusy(false)
    }
  }

  return (
    <span className="inline-flex shrink-0 flex-col gap-1">
      <Button
        variant="outline"
        size="sm"
        className="h-10 rounded-full px-4"
        disabled={busy}
        nativeButton={false}
        render={<label className="cursor-pointer" />}
      >
        {busy ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
        Upload
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) void pick(f)
            e.target.value = ""
          }}
        />
      </Button>
      {err && <span className="max-w-40 text-xs text-danger">{err}</span>}
    </span>
  )
}

/* ---------- page ---------- */

export default function AdminPage() {
  const [pw, setPw] = useState("")
  const [unlocked, setUnlocked] = useState(false)
  const [authError, setAuthError] = useState("")
  const [content, setContent] = useState<SiteContent | null>(null)
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState<Tab>("profil")
  const [dirty, setDirty] = useState(false)
  const [portraitBroken, setPortraitBroken] = useState(false)
  const [backend, setBackend] = useState<{ storage: string; blob: boolean; email?: boolean } | null>(null)
  const [status, setStatus] = useState<{ kind: "idle" | "saving" | "saved" | "error"; msg: string }>({
    kind: "idle",
    msg: "",
  })

  const headers = (password: string) => ({ "Content-Type": "application/json", "x-admin-password": password })

  async function load(password: string): Promise<boolean> {
    setLoading(true)
    setAuthError("")
    try {
      const res = await fetch("/api/content", { headers: { "x-admin-password": password } })
      if (res.status === 401) return false
      const data = (await res.json()) as SiteContent
      if (!data || typeof data.creator !== "object") return false
      setContent(data)
      setDirty(false)
      fetch("/api/storage")
        .then((r) => r.json())
        .then((s) => setBackend(s as { storage: string; blob: boolean; email?: boolean }))
        .catch(() => {})
      return true
    } catch {
      setAuthError("Gagal memuat data. Pastikan server berjalan.")
      return false
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const saved = sessionStorage.getItem("admin-pw")
    if (saved) {
      setPw(saved)
      load(saved).then((ok) => {
        if (ok) setUnlocked(true)
        else sessionStorage.removeItem("admin-pw")
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Warn before leaving with unsaved changes.
  useEffect(() => {
    if (!dirty) return
    const fn = (e: BeforeUnloadEvent) => e.preventDefault()
    window.addEventListener("beforeunload", fn)
    return () => window.removeEventListener("beforeunload", fn)
  }, [dirty])

  async function login(e: React.FormEvent) {
    e.preventDefault()
    const ok = await load(pw)
    if (ok) {
      sessionStorage.setItem("admin-pw", pw)
      setUnlocked(true)
    } else {
      setAuthError("Password salah.")
    }
  }

  function logout() {
    sessionStorage.removeItem("admin-pw")
    setUnlocked(false)
    setPw("")
    setContent(null)
  }

  function patch(p: Partial<SiteContent>) {
    setContent((c) => (c ? { ...c, ...p } : c))
    setDirty(true)
  }

  async function save() {
    if (!content) return
    setStatus({ kind: "saving", msg: "Menyimpan…" })
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: headers(pw),
        body: JSON.stringify(content),
      })
      const data = (await res.json()) as { ok?: boolean; persisted?: boolean; error?: string }
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Gagal menyimpan.")
      setDirty(false)
      if (data.persisted === false) {
        setStatus({
          kind: "error",
          msg: "Tersimpan sementara saja — storage Vercel belum disambungkan. Lihat tab Data.",
        })
      } else {
        setStatus({ kind: "saved", msg: "Tersimpan. Halaman situs langsung terupdate." })
      }
    } catch (e) {
      setStatus({ kind: "error", msg: e instanceof Error ? e.message : "Gagal menyimpan. Cek password / server." })
    }
  }

  function exportJson() {
    if (!content) return
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" })
    const a = document.createElement("a")
    a.href = URL.createObjectURL(blob)
    a.download = "content.json"
    a.click()
    URL.revokeObjectURL(a.href)
  }

  function importJson(file: File) {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as SiteContent
        if (!parsed || typeof parsed.creator !== "object" || !Array.isArray(parsed.packages)) {
          setStatus({ kind: "error", msg: "File tidak valid." })
          return
        }
        setContent(parsed)
        setDirty(true)
        setStatus({ kind: "idle", msg: "" })
      } catch {
        setStatus({ kind: "error", msg: "File bukan JSON valid." })
      }
    }
    reader.readAsText(file)
  }

  async function resetAll() {
    if (!confirm("Kembalikan semua ke bawaan template? Perubahan yang belum disimpan akan hilang.")) return
    setStatus({ kind: "saving", msg: "Mereset…" })
    try {
      const res = await fetch("/api/content", { method: "DELETE", headers: { "x-admin-password": pw } })
      if (!res.ok) throw new Error()
      await load(pw)
      setStatus({ kind: "saved", msg: "Dikembalikan ke bawaan template." })
    } catch {
      setStatus({ kind: "error", msg: "Gagal mereset." })
    }
  }

  if (!unlocked) {
    return (
      <div className="grain grid min-h-dvh place-items-center px-4">
        <form onSubmit={login} className="plate w-full max-w-sm rounded-3xl p-8">
          <span className="grid size-11 place-items-center rounded-2xl bg-brand-soft text-brand">
            <Lock className="size-5" />
          </span>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight">Admin Konten</h1>
          <p className="mt-1 text-sm text-ink-muted">Masuk untuk mengelola seluruh isi situs.</p>
          <div className="mt-6 space-y-1.5">
            <Label htmlFor="pw">Password admin</Label>
            <Input
              id="pw"
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="Default: admin123"
              className="h-11"
            />
          </div>
          {authError && <p className="mt-3 text-sm text-danger">{authError}</p>}
          <Button type="submit" className="mt-5 w-full rounded-full" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : "Masuk"}
          </Button>
          <Link href="/" className="mt-4 flex items-center justify-center gap-2 text-sm text-ink-muted hover:text-ink">
            <ArrowLeft className="size-4" /> Kembali ke situs
          </Link>
        </form>
      </div>
    )
  }

  if (!content) {
    return (
      <div className="grain grid min-h-dvh place-items-center">
        <Loader2 className="size-8 animate-spin text-brand" />
      </div>
    )
  }

  const c = content.creator

  return (
    <div className="grain min-h-dvh pb-32">
      {/* top bar */}
      <header className="sticky top-0 z-40 px-4 pt-3">
        <div className="glass shell flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-hairline px-4 py-2.5 shadow-plate">
          <div className="flex items-center gap-3">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink">
              <ArrowLeft className="size-4" /> Situs
            </Link>
            <span className="h-4 w-px bg-hairline" />
            <p className="text-sm font-semibold">Admin Konten</p>
            {dirty && (
              <span className="rounded-full bg-warn/15 px-2.5 py-0.5 text-xs font-medium text-warn">
                Belum disimpan
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <Button variant="ghost" size="sm" nativeButton={false} render={<a href="/" target="_blank" />}>
              <Eye className="size-4" /> Preview
            </Button>
            <Button variant="ghost" size="sm" nativeButton={false} render={<a href="/media-kit" target="_blank" />}>
              Media Kit
            </Button>
            <Button size="sm" className="rounded-full px-4" onClick={save} disabled={!dirty || status.kind === "saving"}>
              {status.kind === "saving" ? <Loader2 className="size-4 animate-spin" /> : "Simpan"}
            </Button>
            <Button variant="ghost" size="sm" onClick={logout}>
              Keluar
            </Button>
          </div>
        </div>
        {status.msg && (
          <p
            className={cn(
              "shell mt-2 text-sm",
              status.kind === "error" ? "text-danger" : status.kind === "saved" ? "text-ok" : "text-ink-muted",
            )}
          >
            {status.msg}
          </p>
        )}
      </header>

      {/* tabs */}
      <div className="shell no-scrollbar mt-6 flex gap-2 overflow-x-auto px-4">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm transition-colors",
              tab === t.id
                ? "border-brand bg-brand-soft font-medium text-brand"
                : "border-hairline text-ink-muted hover:text-ink",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <main className="shell mt-6 space-y-4 px-4">
        {tab === "profil" && (
          <>
            <Card title="Identitas" desc="Nama, peran, deskripsi, kontak.">
              <div className="grid gap-4 sm:grid-cols-2">
                <Text label="Nama" value={c.name} onChange={(v) => patch({ creator: { ...c, name: v } })} />
                <Text label="Nama pendek" value={c.first} onChange={(v) => patch({ creator: { ...c, first: v } })} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Text label="Peran" value={c.role} onChange={(v) => patch({ creator: { ...c, role: v } })} />
                <Text label="Email" value={c.email} onChange={(v) => patch({ creator: { ...c, email: v } })} />
              </div>
              <Text label="Tagline" value={c.tagline} onChange={(v) => patch({ creator: { ...c, tagline: v } })} />
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <Text
                    label="Foto profil (path public/ atau URL)"
                    value={c.portrait ?? ""}
                    onChange={(v) => {
                      setPortraitBroken(false)
                      patch({ creator: { ...c, portrait: v } })
                    }}
                    placeholder="/creator-portrait.png"
                  />
                </div>
                <UploadButton
                  pw={pw}
                  onUploaded={(url) => {
                    setPortraitBroken(false)
                    patch({ creator: { ...c, portrait: url } })
                  }}
                />
              </div>
              {c.portrait ? (
                portraitBroken ? (
                  <p className="text-xs text-danger">Gambar tidak bisa dimuat — cek path/URL.</p>
                ) : (
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={c.portrait}
                      alt="Preview foto profil"
                      className="size-16 rounded-2xl border border-hairline object-cover object-top"
                      onError={() => setPortraitBroken(true)}
                    />
                    <p className="text-xs text-ink-subtle">Preview foto profil.</p>
                  </div>
                )
              ) : null}
              <Area label="Intro (hero)" value={c.intro} onChange={(v) => patch({ creator: { ...c, intro: v } })} />
              <Area
                label="Positioning (media kit)"
                value={c.positioning}
                onChange={(v) => patch({ creator: { ...c, positioning: v } })}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <Text label="Lokasi" value={c.location} onChange={(v) => patch({ creator: { ...c, location: v } })} />
                <Text label="Timezone" value={c.timezone} onChange={(v) => patch({ creator: { ...c, timezone: v } })} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Text
                  label="Status ketersediaan"
                  value={c.availability}
                  onChange={(v) => patch({ creator: { ...c, availability: v } })}
                />
                <Text
                  label="Waktu respon"
                  value={c.responseTime}
                  onChange={(v) => patch({ creator: { ...c, responseTime: v } })}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Num
                  label="Tahun berkarya"
                  value={c.yearsCreating}
                  onChange={(v) => patch({ creator: { ...c, yearsCreating: v } })}
                />
                <Text
                  label="Niche (pisahkan koma)"
                  value={c.niche.join(", ")}
                  onChange={(v) =>
                    patch({ creator: { ...c, niche: v.split(",").map((s) => s.trim()).filter(Boolean) } })
                  }
                />
              </div>
            </Card>
            <Card title="Sosial media" desc="Username tampil + link tujuan.">
              <div className="grid gap-4 sm:grid-cols-2">
                {SOCIAL_KEYS.map((k) => (
                  <Text
                    key={k}
                    label={`${k} — username`}
                    value={c.socials[k] ?? ""}
                    onChange={(v) => patch({ creator: { ...c, socials: { ...c.socials, [k]: v } } })}
                  />
                ))}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {LINK_KEYS.map((k) => (
                  <Text
                    key={k}
                    label={`${k} — link`}
                    value={c.links[k] ?? ""}
                    onChange={(v) => patch({ creator: { ...c, links: { ...c.links, [k]: v } } })}
                  />
                ))}
              </div>
            </Card>
          </>
        )}

        {tab === "statistik" && (
          <>
            <Card title="Platform stats" desc="Kartu followers di landing + media kit.">
              <div className="space-y-3">
                {content.platformStats.map((s, i) => (
                  <ItemShell
                    key={i}
                    index={i}
                    isFirst={i === 0}
                    isLast={i === content.platformStats.length - 1}
                    onRemove={() => patch({ platformStats: content.platformStats.filter((_, j) => j !== i) })}
                    onUp={() => patch({ platformStats: move(content.platformStats, i, -1) })}
                    onDown={() => patch({ platformStats: move(content.platformStats, i, 1) })}
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Text label="Platform" value={s.platform} onChange={(v) => updStat(i, { platform: v })} />
                      <Text label="Label" value={s.label} onChange={(v) => updStat(i, { label: v })} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Num label="Angka" value={s.value} onChange={(v) => updStat(i, { value: v })} />
                      <Text label="Suffix" value={s.suffix} onChange={(v) => updStat(i, { suffix: v })} />
                    </div>
                    <Text label="Sub" value={s.sub} onChange={(v) => updStat(i, { sub: v })} />
                  </ItemShell>
                ))}
              </div>
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() =>
                  patch({
                    platformStats: [
                      ...content.platformStats,
                      { platform: "Baru", value: 0, suffix: "K+", label: "Followers", sub: "" },
                    ],
                  })
                }
              >
                <Plus className="size-4" /> Tambah platform
              </Button>
            </Card>
            <Card title="Metrik analitik" desc="Kartu di section Analytics.">
              <div className="space-y-3">
                {content.metrics.map((m, i) => (
                  <ItemShell
                    key={i}
                    index={i}
                    isFirst={i === 0}
                    isLast={i === content.metrics.length - 1}
                    onRemove={() => patch({ metrics: content.metrics.filter((_, j) => j !== i) })}
                    onUp={() => patch({ metrics: move(content.metrics, i, -1) })}
                    onDown={() => patch({ metrics: move(content.metrics, i, 1) })}
                  >
                    <Text label="Label" value={m.label} onChange={(v) => updMetric(i, { label: v })} />
                    <div className="grid grid-cols-2 gap-4">
                      <Num label="Angka" value={m.value} onChange={(v) => updMetric(i, { value: v })} />
                      <Text label="Suffix" value={m.suffix} onChange={(v) => updMetric(i, { suffix: v })} />
                    </div>
                    <Text label="Tren" value={m.trend} onChange={(v) => updMetric(i, { trend: v })} />
                  </ItemShell>
                ))}
              </div>
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() =>
                  patch({ metrics: [...content.metrics, { label: "Metrik baru", value: 0, suffix: "%", trend: "" }] })
                }
              >
                <Plus className="size-4" /> Tambah metrik
              </Button>
            </Card>
            <Card title="Grafik reach" desc="12 angka indeks reach (Jan–Des), pisahkan koma.">
              <Text
                label="Reach series"
                value={content.reachSeries.join(", ")}
                hint={`Minimal 2 angka (saat ini: ${content.reachSeries.length}). Dikosongkan = grafik datar.`}
                onChange={(v) =>
                  patch({ reachSeries: v.split(",").map((s) => Number(s.trim())).filter((n) => Number.isFinite(n)) })
                }
              />
            </Card>
          </>
        )}

        {tab === "konten" && (
          <>
            <Card title="Konten unggulan" desc="Kartu portfolio. Thumb = path di public/ atau URL.">
              <div className="space-y-3">
                {content.featuredContent.map((f, i) => (
                  <ItemShell
                    key={i}
                    index={i}
                    isFirst={i === 0}
                    isLast={i === content.featuredContent.length - 1}
                    onRemove={() => patch({ featuredContent: content.featuredContent.filter((_, j) => j !== i) })}
                    onUp={() => patch({ featuredContent: move(content.featuredContent, i, -1) })}
                    onDown={() => patch({ featuredContent: move(content.featuredContent, i, 1) })}
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Text label="Platform" value={f.platform} onChange={(v) => updFeat(i, { platform: v })} />
                      <Text label="Produk" value={f.product} onChange={(v) => updFeat(i, { product: v })} />
                    </div>
                    <Text label="Judul" value={f.title} onChange={(v) => updFeat(i, { title: v })} />
                    <div className="grid grid-cols-2 gap-4">
                      <Text label="Views" value={f.views} onChange={(v) => updFeat(i, { views: v })} />
                      <Text label="Engagement" value={f.engagement} onChange={(v) => updFeat(i, { engagement: v })} />
                    </div>
                    <div className="flex items-end gap-2">
                      <div className="flex-1">
                        <Text label="Thumb" value={f.thumb} onChange={(v) => updFeat(i, { thumb: v })} />
                      </div>
                      <UploadButton pw={pw} onUploaded={(url) => updFeat(i, { thumb: url })} />
                    </div>
                    <Text label="Link" value={f.href} onChange={(v) => updFeat(i, { href: v })} />
                  </ItemShell>
                ))}
              </div>
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() =>
                  patch({
                    featuredContent: [
                      ...content.featuredContent,
                      { platform: "TikTok", title: "Judul baru", thumb: "/content-1.png", views: "0", engagement: "0%", product: "Produk", href: "https://tiktok.com" },
                    ],
                  })
                }
              >
                <Plus className="size-4" /> Tambah konten
              </Button>
            </Card>
            <Card title="Kategori konten" desc="Grid 'What I make'.">
              <div className="space-y-3">
                {content.categories.map((ct, i) => (
                  <ItemShell
                    key={i}
                    index={i}
                    isFirst={i === 0}
                    isLast={i === content.categories.length - 1}
                    onRemove={() => patch({ categories: content.categories.filter((_, j) => j !== i) })}
                    onUp={() => patch({ categories: move(content.categories, i, -1) })}
                    onDown={() => patch({ categories: move(content.categories, i, 1) })}
                  >
                    <div className="grid grid-cols-[64px_1fr] gap-4">
                      <Text label="No" value={ct.n} onChange={(v) => updCat(i, { n: v })} />
                      <Text label="Judul" value={ct.title} onChange={(v) => updCat(i, { title: v })} />
                    </div>
                    <Area label="Deskripsi" value={ct.body} onChange={(v) => updCat(i, { body: v })} rows={2} />
                  </ItemShell>
                ))}
              </div>
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() =>
                  patch({ categories: [...content.categories, { n: "07", title: "Baru", body: "Deskripsi." }] })
                }
              >
                <Plus className="size-4" /> Tambah kategori
              </Button>
            </Card>
          </>
        )}

        {tab === "brands" && (
          <>
            <Card title="Brand yang pernah kerja sama">
              <div className="space-y-3">
                {content.brands.map((b, i) => (
                  <ItemShell
                    key={i}
                    index={i}
                    isFirst={i === 0}
                    isLast={i === content.brands.length - 1}
                    onRemove={() => patch({ brands: content.brands.filter((_, j) => j !== i) })}
                    onUp={() => patch({ brands: move(content.brands, i, -1) })}
                    onDown={() => patch({ brands: move(content.brands, i, 1) })}
                  >
                    <Text label="Nama brand" value={b.name} onChange={(v) => updBrand(i, { name: v })} />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Text label="Campaign" value={b.campaign} onChange={(v) => updBrand(i, { campaign: v })} />
                      <Text label="Hasil" value={b.result} onChange={(v) => updBrand(i, { result: v })} />
                    </div>
                  </ItemShell>
                ))}
              </div>
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => patch({ brands: [...content.brands, { name: "Brand baru", campaign: "", result: "" }] })}
              >
                <Plus className="size-4" /> Tambah brand
              </Button>
            </Card>
            <Card title="Studi kasus" desc="Satu case study unggulan.">
              <Text label="Brand" value={content.caseStudy.brand} onChange={(v) => updCase({ brand: v })} />
              <Text label="Campaign" value={content.caseStudy.campaign} onChange={(v) => updCase({ campaign: v })} />
              <Area label="Objective" value={content.caseStudy.objective} onChange={(v) => updCase({ objective: v })} />
              <Area
                label="Strategi (satu per baris)"
                value={content.caseStudy.strategy.join("\n")}
                onChange={(v) => updCase({ strategy: v.split("\n").map((s) => s.trim()).filter(Boolean) })}
                rows={4}
              />
              <Area
                label="Deliverables (satu per baris)"
                value={content.caseStudy.deliverables.join("\n")}
                onChange={(v) => updCase({ deliverables: v.split("\n").map((s) => s.trim()).filter(Boolean) })}
                rows={3}
              />
              <div className="space-y-3">
                {content.caseStudy.results.map((r, i) => (
                  <div key={i} className="grid grid-cols-[1fr_1fr_auto] items-end gap-3">
                    <Text label="Nilai" value={r.value} onChange={(v) => updCaseResult(i, { value: v })} />
                    <Text label="Label" value={r.label} onChange={(v) => updCaseResult(i, { label: v })} />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        updCase({ results: content.caseStudy.results.filter((_, j) => j !== i) })
                      }
                    >
                      <Trash2 className="size-4 text-danger" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => updCase({ results: [...content.caseStudy.results, { value: "", label: "" }] })}
              >
                <Plus className="size-4" /> Tambah hasil
              </Button>
            </Card>
          </>
        )}

        {tab === "layanan" && (
          <>
            <Card title="Layanan" desc="Grid 'Ways we can work together'.">
              <div className="space-y-3">
                {content.services.map((s, i) => (
                  <ItemShell
                    key={i}
                    index={i}
                    isFirst={i === 0}
                    isLast={i === content.services.length - 1}
                    onRemove={() => patch({ services: content.services.filter((_, j) => j !== i) })}
                    onUp={() => patch({ services: move(content.services, i, -1) })}
                    onDown={() => patch({ services: move(content.services, i, 1) })}
                  >
                    <div className="grid grid-cols-[64px_1fr] gap-4">
                      <Text label="No" value={s.n} onChange={(v) => updSvc(i, { n: v })} />
                      <Text label="Judul" value={s.title} onChange={(v) => updSvc(i, { title: v })} />
                    </div>
                    <Area label="Deskripsi" value={s.body} onChange={(v) => updSvc(i, { body: v })} rows={2} />
                  </ItemShell>
                ))}
              </div>
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => patch({ services: [...content.services, { n: "07", title: "Baru", body: "Deskripsi." }] })}
              >
                <Plus className="size-4" /> Tambah layanan
              </Button>
            </Card>
            <Card title="Rate card / paket" desc="Tampil di landing + media kit. Centang 'Unggulan' untuk highlight.">
              <div className="space-y-3">
                {content.packages.map((p, i) => (
                  <ItemShell
                    key={i}
                    index={i}
                    isFirst={i === 0}
                    isLast={i === content.packages.length - 1}
                    onRemove={() => patch({ packages: content.packages.filter((_, j) => j !== i) })}
                    onUp={() => patch({ packages: move(content.packages, i, -1) })}
                    onDown={() => patch({ packages: move(content.packages, i, 1) })}
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Text label="Nama paket" value={p.name} onChange={(v) => updPkg(i, { name: v })} />
                      <Text label="Harga" value={p.price} onChange={(v) => updPkg(i, { price: v })} />
                    </div>
                    <Text label="Catatan" value={p.note} onChange={(v) => updPkg(i, { note: v })} />
                    <Area
                      label="Fitur (satu per baris)"
                      value={p.features.join("\n")}
                      onChange={(v) => updPkg(i, { features: v.split("\n").map((s) => s.trim()).filter(Boolean) })}
                      rows={4}
                    />
                    <label className="flex items-center gap-2.5 text-sm">
                      <input
                        type="checkbox"
                        checked={p.featured}
                        onChange={(e) => updPkg(i, { featured: e.target.checked })}
                        className="size-4 accent-[var(--brand)]"
                      />
                      Paket unggulan (highlight)
                    </label>
                  </ItemShell>
                ))}
              </div>
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() =>
                  patch({
                    packages: [
                      ...content.packages,
                      { name: "Paket baru", price: "$0", note: "", features: [], featured: false },
                    ],
                  })
                }
              >
                <Plus className="size-4" /> Tambah paket
              </Button>
            </Card>
          </>
        )}

        {tab === "testimoni" && (
          <Card title="Testimoni">
            <div className="space-y-3">
              {content.testimonials.map((t, i) => (
                <ItemShell
                  key={i}
                  index={i}
                  isFirst={i === 0}
                  isLast={i === content.testimonials.length - 1}
                  onRemove={() => patch({ testimonials: content.testimonials.filter((_, j) => j !== i) })}
                  onUp={() => patch({ testimonials: move(content.testimonials, i, -1) })}
                  onDown={() => patch({ testimonials: move(content.testimonials, i, 1) })}
                >
                  <Area label="Kutipan" value={t.quote} onChange={(v) => updTesti(i, { quote: v })} rows={3} />
                  <div className="grid gap-4 sm:grid-cols-3">
                    <Text label="Nama" value={t.name} onChange={(v) => updTesti(i, { name: v })} />
                    <Text label="Jabatan" value={t.title} onChange={(v) => updTesti(i, { title: v })} />
                    <Text label="Perusahaan" value={t.company} onChange={(v) => updTesti(i, { company: v })} />
                  </div>
                </ItemShell>
              ))}
            </div>
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() =>
                patch({ testimonials: [...content.testimonials, { quote: "", name: "", title: "", company: "" }] })
              }
            >
              <Plus className="size-4" /> Tambah testimoni
            </Button>
          </Card>
        )}

        {tab === "audience" && (
          <>
            <Card title="Ringkasan audience" desc="Untuk halaman media kit.">
              <div className="grid gap-4 sm:grid-cols-2">
                <Text
                  label="Terakhir update"
                  value={content.audience.updated}
                  onChange={(v) => updAud({ updated: v })}
                />
                <Num label="Median usia" value={content.audience.medianAge} onChange={(v) => updAud({ medianAge: v })} />
              </div>
              <Text
                label="Minat (pisahkan koma)"
                value={content.audience.interests.join(", ")}
                onChange={(v) => updAud({ interests: v.split(",").map((s) => s.trim()).filter(Boolean) })}
              />
            </Card>
            <Card title="Rata-rata performa">
              <div className="space-y-3">
                {content.audience.averages.map((a, i) => (
                  <div key={i} className="grid grid-cols-[1fr_1fr_auto] items-end gap-3">
                    <Text label="Label" value={a.label} onChange={(v) => updAudList("averages", i, { label: v })} />
                    <Text label="Nilai" value={a.value} onChange={(v) => updAudList("averages", i, { value: v })} />
                    <Button variant="ghost" size="sm" onClick={() => updAud({ averages: content.audience.averages.filter((_, j) => j !== i) })}>
                      <Trash2 className="size-4 text-danger" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => updAud({ averages: [...content.audience.averages, { label: "", value: "" }] })}
              >
                <Plus className="size-4" /> Tambah
              </Button>
            </Card>
            {(["age", "gender", "locations"] as const).map((key) => (
              <Card
                key={key}
                title={key === "age" ? "Kelompok usia (%)" : key === "gender" ? "Gender (%)" : "Lokasi teratas (%)"}
              >
                <div className="space-y-3">
                  {content.audience[key].map((a, i) => (
                    <div key={i} className="grid grid-cols-[1fr_120px_auto] items-end gap-3">
                      <Text label="Label" value={a.label} onChange={(v) => updAudList(key, i, { label: v })} />
                      <Num label="%" value={a.value} onChange={(v) => updAudList(key, i, { value: v })} />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updAud({ [key]: content.audience[key].filter((_, j) => j !== i) } as Partial<Audience>)}
                      >
                        <Trash2 className="size-4 text-danger" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="rounded-full"
                  onClick={() => updAud({ [key]: [...content.audience[key], { label: "", value: 0 }] } as Partial<Audience>)}
                >
                  <Plus className="size-4" /> Tambah
                </Button>
              </Card>
            ))}
          </>
        )}

        {tab === "data" && (
          <>
            <Card title="Status storage" desc="Di mana data & foto tersimpan saat ini.">
              <ul className="space-y-2.5 text-sm">
                <li className="flex items-center justify-between gap-3 rounded-2xl border border-hairline bg-surface-2 px-4 py-3">
                  <span className="text-ink-muted">Data konten</span>
                  <span className="font-semibold">
                    {backend == null
                      ? "…"
                      : backend.storage === "kv"
                        ? "Vercel KV (permanen)"
                        : "File lokal (dev / VPS)"}
                  </span>
                </li>
                <li className="flex items-center justify-between gap-3 rounded-2xl border border-hairline bg-surface-2 px-4 py-3">
                  <span className="text-ink-muted">Upload foto</span>
                  <span className="font-semibold">
                    {backend == null ? "…" : backend.blob ? "Vercel Blob (permanen)" : "Lokal (public/uploads)"}
                  </span>
                </li>
                <li className="flex items-center justify-between gap-3 rounded-2xl border border-hairline bg-surface-2 px-4 py-3">
                  <span className="text-ink-muted">Email form kontak</span>
                  <span className="font-semibold">
                    {backend == null ? "…" : backend.email ? "Resend aktif" : "Belum dikonfigurasi"}
                  </span>
                </li>
              </ul>
            </Card>
            <Card
              title="Backup & reset"
              desc="Download backup sebelum eksperimen."
            >
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" className="rounded-full" onClick={exportJson}>
                  <Download className="size-4" /> Export JSON
                </Button>
                <Button variant="outline" className="rounded-full" nativeButton={false} render={<label className="cursor-pointer" />}>
                  <Upload className="size-4" /> Import JSON
                  <input
                    type="file"
                    accept="application/json"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0]
                      if (f) importJson(f)
                      e.target.value = ""
                    }}
                  />
                </Button>
                <Button variant="outline" className="rounded-full" onClick={resetAll}>
                  <RotateCcw className="size-4" /> Kembalikan bawaan
                </Button>
              </div>
              <div className="rounded-2xl border border-hairline bg-surface-2 p-4 text-sm leading-relaxed text-ink-muted">
                <p className="font-medium text-ink">Setup Vercel (wajib agar permanen)</p>
                <ol className="mt-2 list-decimal space-y-1 pl-5">
                  <li>Push project ke GitHub → Import di Vercel.</li>
                  <li>Dashboard project → <b>Storage → Create → KV</b> → Connect ke project.</li>
                  <li><b>Storage → Create → Blob</b> → Connect ke project.</li>
                  <li><b>Settings → Environment Variables</b> → tambah <code>ADMIN_PASSWORD</code> → Save.</li>
                  <li><b>Redeploy</b> (Deployments → ⋯ → Redeploy). Status di atas harus jadi KV + Blob.</li>
                </ol>
                <p className="mt-3 font-medium text-ink">Email form kontak (Resend)</p>
                <ol className="mt-1 list-decimal space-y-1 pl-5">
                  <li>Daftar di <b>resend.com</b> → API Keys → Create → copy key.</li>
                  <li>Vercel → <b>Settings → Environment Variables</b> → tambah <code>RESEND_API_KEY</code>.</li>
                  <li>Opsional: verifikasi domain di Resend → tambah <code>RESEND_FROM</code> (mis. <code>Kontak &lt;halo@domainkamu.com&gt;</code>).</li>
                  <li><b>Redeploy</b>. Status di atas harus jadi Resend aktif.</li>
                </ol>
                <p className="mt-3 font-medium text-ink">Catatan</p>
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  <li>Lokal / VPS tanpa setting tambahan: data di <code>data/content.json</code>, foto di <code>public/uploads/</code>.</li>
                  <li>Upload maksimal 4 MB, hanya gambar. Foto profil & thumb konten punya tombol Upload masing-masing.</li>
                  <li>Jangan pakai password default <code>admin123</code> di production.</li>
                </ul>
              </div>
            </Card>
          </>
        )}
      </main>

      {/* sticky save bar (mobile) */}
      {dirty && (
        <div className="fixed inset-x-0 bottom-0 z-40 px-4 pb-4">
          <div className="glass shell flex items-center justify-between rounded-full border border-hairline px-4 py-2.5 shadow-lift">
            <p className="text-sm text-ink-muted">Ada perubahan belum disimpan</p>
            <Button size="sm" className="rounded-full px-5" onClick={save} disabled={status.kind === "saving"}>
              {status.kind === "saving" ? <Loader2 className="size-4 animate-spin" /> : "Simpan"}
            </Button>
          </div>
        </div>
      )}
    </div>
  )

  /* ---------- updaters ---------- */
  function updStat(i: number, p: Partial<PlatformStat>) {
    patch({ platformStats: content!.platformStats.map((s, j) => (j === i ? { ...s, ...p } : s)) })
  }
  function updMetric(i: number, p: Partial<Metric>) {
    patch({ metrics: content!.metrics.map((m, j) => (j === i ? { ...m, ...p } : m)) })
  }
  function updFeat(i: number, p: Partial<FeaturedItem>) {
    patch({ featuredContent: content!.featuredContent.map((f, j) => (j === i ? { ...f, ...p } : f)) })
  }
  function updCat(i: number, p: Partial<Category>) {
    patch({ categories: content!.categories.map((x, j) => (j === i ? { ...x, ...p } : x)) })
  }
  function updBrand(i: number, p: Partial<Brand>) {
    patch({ brands: content!.brands.map((x, j) => (j === i ? { ...x, ...p } : x)) })
  }
  function updCase(p: Partial<CaseStudy>) {
    patch({ caseStudy: { ...content!.caseStudy, ...p } })
  }
  function updCaseResult(i: number, p: Partial<{ value: string; label: string }>) {
    patch({ caseStudy: { ...content!.caseStudy, results: content!.caseStudy.results.map((r, j) => (j === i ? { ...r, ...p } : r)) } })
  }
  function updSvc(i: number, p: Partial<Service>) {
    patch({ services: content!.services.map((x, j) => (j === i ? { ...x, ...p } : x)) })
  }
  function updPkg(i: number, p: Partial<Package>) {
    patch({ packages: content!.packages.map((x, j) => (j === i ? { ...x, ...p } : x)) })
  }
  function updTesti(i: number, p: Partial<Testimonial>) {
    patch({ testimonials: content!.testimonials.map((x, j) => (j === i ? { ...x, ...p } : x)) })
  }
  function updAud(p: Partial<Audience>) {
    patch({ audience: { ...content!.audience, ...p } })
  }
  function updAudList<K extends "averages" | "age" | "gender" | "locations">(
    key: K,
    i: number,
    p: Partial<Audience[K][number]>,
  ) {
    patch({ audience: { ...content!.audience, [key]: content!.audience[key].map((x, j) => (j === i ? { ...x, ...p } : x)) } })
  }
}
