"use client"
import React, { useRef, useEffect, useCallback, FC, KeyboardEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"
import { ProjectProps } from "./Projects"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

type ProjectPropType = {
  project: ProjectProps
  index: number
  indexOpen: undefined | number
  handleProjectClick: (index: number) => void
}

export const Project: FC<ProjectPropType> = ({ project, index, indexOpen, handleProjectClick }) => {
  const { title, description, links, imageSrc, imageSrcDark, tags } = project
  const element = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()
  const open = index === indexOpen

  useEffect(() => {
    if (open && element.current) {
      element.current.scrollIntoView({ behavior: "smooth", block: "nearest" })
    }
  }, [open])

  const onClick = useCallback(() => {
    handleProjectClick(index)
  }, [handleProjectClick, index])

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        onClick()
      }
    },
    [onClick],
  )

  return (
    <div
      aria-expanded={open}
      className={cn(
        "group cursor-pointer rounded-lg border bg-card p-5 transition-all duration-200",
        "hover:border-foreground/20 hover:bg-accent/50",
        open && "border-foreground/20 bg-accent/50",
      )}
      ref={element}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {/* Header Row */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="mb-1.5 font-semibold text-foreground">{title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </div>

      {/* Expanded Content */}
      <div
        className={cn(
          "grid transition-all duration-200 ease-in-out",
          open ? "mt-5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          {/* Project Image */}
          <div className="mb-5 overflow-hidden rounded-md border bg-muted/50">
            <Image
              alt={title}
              className="w-full"
              placeholder="blur"
              src={resolvedTheme === "light" ? imageSrc : imageSrcDark || imageSrc}
            />
          </div>

          {/* Tags */}
          <div className="mb-5 flex flex-wrap gap-1.5">
            {tags.map((item: string) => (
              <Badge
                className="bg-secondary/80 text-xs font-normal text-muted-foreground"
                key={item}
                variant="secondary"
              >
                {item}
              </Badge>
            ))}
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-3">
            {links.map(({ text, url, target }) => (
              <Link
                className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-80"
                href={url}
                key={url}
                prefetch={target === "self"}
                rel="noopener noreferrer"
                target={target || "_blank"}
                onClick={(e) => e.stopPropagation()}
              >
                {text}
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
