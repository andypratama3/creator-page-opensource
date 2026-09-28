import { About } from "@/components/site/about"
import { Brands } from "@/components/site/brands"
import { Contact } from "@/components/site/contact"
import { ContentCategories } from "@/components/site/content-categories"
import { FeaturedContent } from "@/components/site/featured-content"
import { Footer } from "@/components/site/footer"
import { Hero } from "@/components/site/hero"
import { Navbar } from "@/components/site/navbar"
import { Performance } from "@/components/site/performance"
import { PlatformStats } from "@/components/site/platform-stats"
import { Services } from "@/components/site/services"
import { Testimonials } from "@/components/site/testimonials"
import { SiteJsonLd } from "@/components/site/json-ld"
import { getSiteContent } from "@/lib/site-content"

export const dynamic = "force-dynamic"

export default async function Page() {
  const content = await getSiteContent()
  return (
    <div className="grain min-h-dvh">
      <SiteJsonLd creator={content.creator} />
      <Navbar creator={content.creator} />
      <main>
        <Hero creator={content.creator} />
        <About creator={content.creator} />
        <PlatformStats items={content.platformStats} />
        <Performance metrics={content.metrics} reachSeries={content.reachSeries} />
        <FeaturedContent items={content.featuredContent} />
        <ContentCategories items={content.categories} />
        <Brands brands={content.brands} caseStudy={content.caseStudy} />
        <Services services={content.services} packages={content.packages} />
        <Testimonials items={content.testimonials} />
        <Contact creator={content.creator} />
      </main>
      <Footer creator={content.creator} />
    </div>
  )
}
