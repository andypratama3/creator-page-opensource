"use client"

import { useEffect, useRef, useState } from "react"

export function CountUp({
  to,
  suffix = "",
  prefix = "",
  duration = 1400,
}: {
  to: number
  suffix?: string
  prefix?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return
        started.current = true
        if (prefersReduced) {
          setValue(to)
          io.disconnect()
          return
        }
        const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setValue(to * eased)
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        io.disconnect()
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [to, duration])

  const display = Number.isInteger(to) ? Math.round(value).toLocaleString() : value.toFixed(0)

  return (
    <span ref={ref} data-numeric>
      {prefix}
      {display}
      {suffix}
    </span>
  )
}
