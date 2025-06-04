"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function DarkModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="w-9 h-9 p-0 rounded-full hover:bg-charcoal-100 dark:hover:bg-charcoal-800 transition-all duration-300"
      >
        <div className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-9 h-9 p-0 rounded-full hover:bg-charcoal-100 dark:hover:bg-charcoal-800 transition-all duration-300 group"
      aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-charcoal-600 dark:text-charcoal-300 group-hover:text-primary transition-colors duration-300" />
      ) : (
        <Moon className="h-5 w-5 text-charcoal-600 dark:text-charcoal-300 group-hover:text-primary transition-colors duration-300" />
      )}
    </Button>
  )
}
