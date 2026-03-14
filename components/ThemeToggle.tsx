"use client"
import React, { FC, useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { MoonIcon, SunIcon } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

const ThemeToggle: FC = () => {
  const { setTheme, resolvedTheme } = useTheme()

  const [trueTheme, setTrueTheme] = useState<undefined | string>(undefined)

  useEffect(() => {
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
        onClick={() => setTheme(trueTheme === "dark" ? "light" : "dark")}
      >
        <div className="relative flex size-full items-center justify-center">
          <SunIcon
            size={16}
            className={`absolute ${trueTheme === "dark" ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-0 [transition:all_0.5s]" : "-left-full top-full translate-x-0 translate-y-0 -rotate-[100deg] [transition:all_0.8s]"}`}
            color="#fff"
          />
          <MoonIcon
            size={16}
            className={`absolute ${trueTheme === "light" ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-0 [transition:all_0.5s]" : "-left-full top-full translate-x-0 translate-y-0 -rotate-[100deg] [transition:all_0.8s]"}`}
            color="#000"
          />
        </div>
      </button>
    </div>
  )
}

export default ThemeToggle
