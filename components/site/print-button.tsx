"use client"

import { Printer } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PrintButton() {
  return (
    <Button
      size="sm"
      variant="outline"
      className="no-print h-9 rounded-full bg-surface/70 px-4 backdrop-blur"
      onClick={() => window.print()}
    >
      <Printer className="size-4" />
      Print / PDF
    </Button>
  )
}
