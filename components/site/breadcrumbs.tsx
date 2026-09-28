import Link from "next/link"
import { ChevronRight } from "lucide-react"

export function Breadcrumbs({ trail }: { trail: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink-subtle">
        {trail.map((t, i) => (
          <li key={t.path} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="size-3" aria-hidden="true" />}
            {i === trail.length - 1 ? (
              <span aria-current="page" className="font-medium text-ink">
                {t.name}
              </span>
            ) : (
              <Link href={t.path} className="transition-colors hover:text-ink">
                {t.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
