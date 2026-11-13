"use client"
import { useTheme } from "next-themes"
import React, { FC, useCallback, useEffect, useRef, useState } from "react"

type Props = {
  src: string
  title: string
}

// Sizes the iframe to its content. The embed posts { type: "marketbots:height", height }
// whenever its content resizes, and again whenever this page sends it a message.
const Embed: FC<Props> = ({ src, title }) => {
  const ref = useRef<HTMLIFrameElement>(null)
  const [height, setHeight] = useState<number>()
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const onMessage = (event: MessageEvent): void => {
      if (event.source !== ref.current?.contentWindow) return
      if (event.data?.type === "marketbots:height" && typeof event.data.height === "number") {
        setHeight(event.data.height)
      }
    }
    window.addEventListener("message", onMessage)
    return () => window.removeEventListener("message", onMessage)
  }, [])

  // Matches the embed to the site's light or dark theme. Because the embed replies with its
  // height, this also gets the height it reported before this page was listening.
  const syncTheme = useCallback(() => {
    ref.current?.contentWindow?.postMessage(
      { type: "marketbots:theme", theme: resolvedTheme },
      new URL(src).origin,
    )
  }, [resolvedTheme, src])

  useEffect(syncTheme, [syncTheme])

  return (
    <iframe
      className="my-6 h-[520px] w-full rounded-xl"
      loading="lazy"
      ref={ref}
      src={src}
      style={height ? { height } : undefined}
      title={title}
      onLoad={syncTheme}
    />
  )
}

export default Embed
