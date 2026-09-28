import { NextResponse } from "next/server"
import { Resend } from "resend"
import { getSiteContent } from "@/lib/site-content"

// Tiny in-memory throttle (per server instance): max 5 submits / 10 min per IP.
const hits = new Map<string, number[]>()

function throttled(ip: string): boolean {
  const now = Date.now()
  const windowStart = now - 10 * 60 * 1000
  const arr = (hits.get(ip) ?? []).filter((t) => t > windowStart)
  arr.push(now)
  hits.set(ip, arr)
  return arr.length > 5
}

function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = (await req.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 })
  }

  // Honeypot — bots fill it, humans don't. Pretend success to the bot.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email belum dikonfigurasi (RESEND_API_KEY kosong)." },
      { status: 500 },
    )
  }

  const name = String(body.name ?? "").trim()
  const email = String(body.email ?? "").trim()
  const brand = String(body.brand ?? "").trim()
  const projectType = String(body.projectType ?? "").trim()
  const message = String(body.message ?? "").trim()

  if (!name || !isEmail(email) || !message) {
    return NextResponse.json({ error: "Nama, email valid, dan pesan wajib diisi." }, { status: 400 })
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: "Pesan terlalu panjang." }, { status: 400 })
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
  if (throttled(ip)) {
    return NextResponse.json({ error: "Terlalu banyak percobaan. Coba lagi nanti." }, { status: 429 })
  }

  const content = await getSiteContent()
  const to = content.creator.email
  const from = process.env.RESEND_FROM ?? "Portfolio <onboarding@resend.dev>"

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: [`${name} <${email}>`],
      subject: `[Portfolio] ${projectType || "New"} inquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Brand: ${brand || "-"}`,
        `Project type: ${projectType || "-"}`,
        "",
        message,
      ].join("\n"),
    })
    if (error) {
      console.error("resend error", error)
      return NextResponse.json({ error: "Gagal mengirim email." }, { status: 502 })
    }
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error("resend exception", e)
    return NextResponse.json({ error: "Gagal mengirim email." }, { status: 502 })
  }
}
