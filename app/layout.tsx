import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import { getSiteContent } from "@/lib/site-content"
import { siteUrl } from "@/lib/seo"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" })

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent()
  const c = content.creator
  const desc = `${c.name} — ${c.role}. ${c.intro}`
  const siteTitle = `${c.name} — Creator & Affiliate Marketer`
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: siteTitle,
      template: `%s — ${c.name}`,
    },
    description: desc,
    keywords: [
      "content creator",
      "affiliate marketing",
      "UGC creator",
      "brand collaborations",
      "TikTok creator",
      "Instagram creator",
      ...c.niche,
      c.name,
      c.role,
    ],
    openGraph: {
      title: siteTitle,
      description: desc,
      type: "website",
      url: "/",
      siteName: c.name,
      locale: "en_US",
      images: [{ url: "/opengraph-image" }],
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: desc,
      images: ["/opengraph-image"],
    },
    alternates: { canonical: "/" },
    icons: {
      icon: [
        { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
        { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
        { url: "/icon.svg", type: "image/svg+xml" },
      ],
      apple: "/apple-icon.png",
    },
  }
}

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "oklch(0.985 0.003 265)" },
    { media: "(prefers-color-scheme: dark)", color: "oklch(0.16 0.012 275)" },
  ],
}

// Prevent theme flash before hydration.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d)}catch(e){}})()`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased">
        {children}
        <Toaster />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
