# Creator Page — Open Source

Portfolio landing page + media kit + admin panel untuk content creator & affiliate marketer. Edit seluruh isi tanpa coding via `/admin`. Dibangun dengan Next.js 16, Tailwind CSS 4, dan shadcn/ui.

## Fitur

- **Landing page** — hero, about, platform stats, analytics, featured content, brands + case study, services, rate card, testimoni, form kontak.
- **Media kit (`/media-kit`)** — audience insight, selected work, case study, rate card, alur kerja, testimoni, CTA WhatsApp/email, tombol Print/PDF.
- **Admin panel (`/admin`)** — kelola 100% konten (teks, angka, rate card, foto via upload) tanpa sentuh kode.
- **Form kontak** — terkirim sebagai email via Resend (validasi + anti-spam).
- **Storage adaptif** — file lokal saat dev/VPS, Vercel KV + Blob saat di Vercel.

## Mulai (lokal)

```bash
pnpm install
cp .env.example .env.local   # opsional, untuk coba email
pnpm dev
```

Buka `http://localhost:3000`, admin di `http://localhost:3000/admin` (password default `admin123`).

## Environment variables

| Variable         | Wajib?              | Keterangan                                              |
| ---------------- | ------------------- | ------------------------------------------------------- |
| `ADMIN_PASSWORD` | Ya (production)     | Password `/admin`. Default `admin123` — wajib diganti.  |
| `RESEND_API_KEY` | Untuk form email    | Dari resend.com → API Keys. Tanpa ini form error jelas. |
| `RESEND_FROM`    | Opsional            | Pengirim terverifikasi, cth. `Kontak <halo@domain.com>`. Tanpa ini hanya bisa kirim ke email pemilik akun Resend. |

`KV_REST_API_URL`, `KV_REST_API_TOKEN`, `BLOB_READ_WRITE_TOKEN` terisi otomatis oleh Vercel saat Storage disambungkan.

## Deploy ke Vercel

1. Push ke GitHub → Import di Vercel → Deploy.
2. **Storage → Create → KV** → Connect ke project.
3. **Storage → Create → Blob** → Connect ke project.
4. **Settings → Environment Variables** → tambah `ADMIN_PASSWORD` (dan `RESEND_API_KEY` bila perlu) → Save.
5. **Redeploy**. Cek `/admin` → tab Data harus tertulis KV + Blob aktif.

## Struktur

```
app/
  page.tsx            Landing (membaca konten server-side)
  media-kit/          Media kit + Print/PDF
  admin/              Admin panel (password-gated)
  api/content         GET/PUT/DELETE konten (PUT/DELETE terkunci password)
  api/upload          Upload gambar (terkunci password, maks 4 MB)
  api/contact         Form kontak → email via Resend
  api/storage         Status backend (KV/file, Blob, email)
data/content.json     Konten default + seed (dipakai saat dev/VPS)
lib/
  creator-data.ts     Nilai bawaan template (fallback)
  content-types.ts    Skema konten (aman diimpor client)
  site-content.ts     Load/save konten (server only)
  content-backend.ts  Pilihan backend KV vs file (server only)
public/uploads/       Hasil upload lokal (production memakai Vercel Blob)
```

## Ganti domain & identitas

- `lib/seo.ts` → `siteUrl` (dipakai sitemap, robots, canonical).
- Foto default di `public/` (`creator-portrait.png`, `content-*.png`) bisa ditimpa atau diganti lewat upload admin.

## Catatan

- Semua angka di konten bawaan adalah placeholder — ganti via `/admin`.
- Jangan commit file `.env*` (sudah di-ignore, lihat `.env.example`).
