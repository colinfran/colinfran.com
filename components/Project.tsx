"use client"
// Project.tsx
import React, { useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import { Card } from "./ui/card"
import Link from "next/link"
import { Button } from "./ui/button"
import { v4 } from "uuid"
import { useTheme } from "next-themes"
import { ProjectProps } from "./Projects"
import { Badge } from "@/components/ui/badge"

type ProjectPropType = {
  project: ProjectProps
  index: number
  indexOpen: undefined | number
  handleProjectClick: (index: number) => void
}

export const Project: React.FC<ProjectPropType> = ({
  project,
  index,
  indexOpen,
  handleProjectClick,
}) => {
  const { title, description, links, imageSrc, imageSrcDark, tags } = project
  const element = useRef<HTMLDivElement>(null)

  const { resolvedTheme } = useTheme()

  const open = index === indexOpen

  useEffect(() => {
    if (open && element.current) {
      element.current.scrollIntoView({ behavior: "smooth" })
      // element.current.focus()
    }
  }, [open])

  const onClick = useCallback(() => {
    handleProjectClick(index)
  }, [handleProjectClick, index])

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        onClick()
      }
    },
    [onClick],
  )

  return (
    <Card
      aria-expanded={open}
      className="flex cursor-pointer flex-col gap-2 p-8"
      ref={element}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      <Image
        alt={title}
        className={open ? "block" : "hidden"}
        placeholder="blur"
        src={resolvedTheme === "light" ? imageSrc : imageSrcDark || imageSrc}
      />
      <h3 className="font-semibold underline underline-offset-4">{title}</h3>
      <p className="text-muted-foreground/75">{description}</p>
      <div className={open ? "block" : "hidden"}>
        <div className="mb-5 flex flex-row flex-wrap gap-2">
          {tags.map((item: string) => (
            <Badge key={item} variant="outline">
              {item}
            </Badge>
          ))}
        </div>
        <div className="flex flex-row gap-10">
          {links.map(({ text, url }: { text: string; url: string }) => (
            <Button className="w-full" key={v4()} asChild>
              <Link className="w-full" href={url} rel="noopener noreferrer" target="_blank">
                {text}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </Card>
  )
}
