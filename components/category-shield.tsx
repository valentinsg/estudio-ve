import React from "react"
import { cn } from "@/lib/utils"

interface CategoryShieldProps {
  label: string
  color?: string
  className?: string
}

export function CategoryShield({ label, color = "fill-primary", className }: CategoryShieldProps) {
  return (
    <div className={cn("relative w-8 h-8", className)}>
      <svg viewBox="0 0 100 120" className={cn("w-full h-full", color)}>
        <path d="M50 0L100 20v40c0 30-20 50-50 60C20 110 0 90 0 60V20L50 0z" />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">
        {label}
      </span>
    </div>
  )
}
