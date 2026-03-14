"use client"
import React, { FC, useEffect, useState, useRef } from "react"
import { useTheme } from "next-themes"
import { MoonIcon, SunIcon } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

const ThemeToggle: FC = () => {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [animatingTheme, setAnimatingTheme] = useState<string | undefined>(undefined)
  const isFirstRender = useRef(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (resolvedTheme) {
      if (isFirstRender.current) {
        // On first render, set immediately without animation
        setAnimatingTheme(resolvedTheme)
        isFirstRender.current = false
      } else {
        // On subsequent changes, the theme has already changed so we update
        setAnimatingTheme(resolvedTheme)
      }
    }
  }, [resolvedTheme])

  if (!mounted || animatingTheme === undefined) {
    return <Skeleton className="size-[32px] rounded-full" />
  }

  const isDark = animatingTheme === "dark"

  return (
    <div>
      <button
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        className={`${isDark ? "border-white" : "border-black"} relative size-8 cursor-pointer overflow-hidden rounded-full border opacity-60 transition duration-200 ease-in-out hover:opacity-100 active:scale-95 active:opacity-100`}
        tabIndex={0}
        onClick={() => setTheme(isDark ? "light" : "dark")}
      >
        <div className="relative flex size-full items-center justify-center">
          <SunIcon
            className={`absolute transition-all duration-500 ${isDark ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-0" : "-left-full top-full -rotate-[100deg]"}`}
            color="#fff"
            size={16}
          />
          <MoonIcon
            className={`absolute transition-all duration-500 ${!isDark ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-0" : "left-full top-full rotate-[100deg]"}`}
            color="#000"
            size={16}
          />
        </div>
      </button>
    </div>
  )
}

export default ThemeToggle
