"use client"
import React, { FC } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { ProjectProps } from "./Projects"
import { ExternalLink, Github } from "lucide-react"
import { Icons } from "./Icons"

export const ProjectCard: FC<{ project: ProjectProps }> = ({ project }) => {
  const { title, description, links, imageSrc, imageSrcDark, tags } = project
  const { resolvedTheme } = useTheme()

  const websiteLink = links.find(
    (l) =>
      l.text.toLowerCase() === "website" ||
      l.text.toLowerCase() === "demo" ||
      l.text.toLowerCase() === "course",
  )
  const githubLink = links.find((l) => l.text.toLowerCase() === "github")

  const appleStoreLink = links.find((l) => l.text.toLowerCase() === "app store")
  return (
    <div className="group flex sm:flex-row flex-col gap-4 py-4 border-b border-border last:border-b-0">
      {/* Thumbnail */}
      {/* <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
        <Image
          alt={title}
          src={resolvedTheme === "dark" && imageSrcDark ? imageSrcDark : imageSrc}
          fill
          className="object-cover"
          placeholder="blur"
        />
      </div> */}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-medium text-sm truncate">{title}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {tags.map((tag) => (
            <span
              className="text-[10px] px-1.5 py-0.5 bg-muted text-muted-foreground rounded"
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      {/* Action Icons */}
      <div className="flex items-center gap-1 flex-shrink-0 sm:min-w-[60px] sm:justify-end">
        {githubLink && (
          <Link
            aria-label={`View ${title} on GitHub`}
            className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
            href={githubLink.url}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Github className="h-4 w-4" />
          </Link>
        )}
        {appleStoreLink && (
          <Link
            aria-label={`View ${title} on the App Store`}
            className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
            href={appleStoreLink.url}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icons.Apple className="h-4 w-4" />
          </Link>
        )}
        {websiteLink && (
          <Link
            aria-label={`Visit ${title} website`}
            className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
            href={websiteLink.url}
            rel="noopener noreferrer"
            target={websiteLink.target || "_blank"}
          >
            <ExternalLink className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  )
}
