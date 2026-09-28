import { cn } from "@/lib/utils"
import { Reveal } from "./reveal"

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "left",
}: {
  eyebrow?: string
  title: string
  description?: string
  className?: string
  align?: "left" | "center"
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <p className="text-[11px] font-medium tracking-[0.2em] text-brand uppercase">
            {eyebrow}
          </p>
        </Reveal>
      )}
      <Reveal delay={60}>
        <h2 className="mt-3 text-balance text-[clamp(2rem,5vw,3.5rem)] leading-[1.02] font-semibold tracking-tight">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={120}>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-ink-muted">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  )
}
