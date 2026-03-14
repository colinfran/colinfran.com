"use client"
import React, { FC, useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { MoonIcon, SunIcon } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

const ThemeToggle: FC = () => {
  const { setTheme, resolvedTheme } = useTheme()

  const [trueTheme, setTrueTheme] = useState<undefined | string>(undefined)

  useEffect(() => {
    console.log("[v0] resolvedTheme changed:", resolvedTheme)
    console.log("[v0] current trueTheme:", trueTheme)
    setTrueTheme(resolvedTheme)
  }, [resolvedTheme])

  if (trueTheme === undefined) {
    return <Skeleton className="size-[32px] rounded-full" />
  }
  return (
    <div>
      <button
        aria-label={`Switch to ${trueTheme === "dark" ? "light" : "dark"} mode`}
        className={`${trueTheme === "dark" ? "border-white" : "border-black"} relative size-8 cursor-pointer overflow-hidden rounded-full border opacity-60 transition duration-200 ease-in-out hover:opacity-100 active:scale-95 active:opacity-100`}
        tabIndex={0}
        onClick={() => {
          console.log("[v0] Button clicked, trueTheme:", trueTheme)
          console.log("[v0] Setting theme to:", trueTheme === "dark" ? "light" : "dark")
          setTheme(trueTheme === "dark" ? "light" : "dark")
        }}
      >
        <div className="relative flex items-center justify-center">
          <SunIcon
            className={`absolute ${trueTheme === "dark" ? "left-2/4 top-2/4 -translate-x-[48%] -translate-y-[46%] rotate-0 [transition:all_0.5s]" : "-left-full top-full translate-x-0 translate-y-0 -rotate-[100deg] [transition:all_0.8s]"}`}
            color="#fff"
            size={16}
          />
          <MoonIcon
            className={`absolute ${trueTheme === "light" ? "right-2/4 top-2/4 -translate-y-[48%] translate-x-1/2 rotate-0 [transition:all_0.5s]" : "-right-full top-full translate-x-0 translate-y-0 -rotate-[100deg] [transition:all_0.8s]"}`}
            color="#000"
            size={16}
          />
        </div>
      </button>
    </div>
  )
}

export default ThemeToggle
