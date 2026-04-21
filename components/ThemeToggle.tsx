"use client"
import React, { FC, useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { MoonIcon, SunIcon } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

const ThemeToggle: FC = () => {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Skeleton className="size-[32px] rounded-full" />
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="relative size-8 cursor-pointer overflow-hidden rounded-full border border-current opacity-60 transition-opacity duration-200 ease-in-out hover:opacity-100 active:scale-95 active:opacity-100"
      tabIndex={0}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <span className="absolute inset-0 flex items-center justify-center">
        <SunIcon
          className={`absolute transition-all duration-500 ease-out ${
            isDark ? "translate-x-0 rotate-0 opacity-100" : "-translate-x-8 -rotate-90 opacity-0"
          }`}
          size={16}
        />
        <MoonIcon
          className={`absolute transition-all duration-500 ease-out ${
            isDark ? "translate-x-8 rotate-90 opacity-0" : "translate-x-0 rotate-0 opacity-100"
          }`}
          size={16}
        />
      </span>
    </button>
  )
}

export default ThemeToggle
