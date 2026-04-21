"use client"
import React, { FC } from "react"
import { ProjectCard } from "./ProjectCard"
import { StaticImageData } from "next/image"
import { siteConfig } from "../app/config"

type LinksProps = {
  url: string
  text: string
  target?: string
}

export type ProjectProps = {
  id?: string
  title: string
  description: string
  links: LinksProps[]
  tags: string[]
  imageSrc: StaticImageData
  imageSrcDark?: StaticImageData
}

export const Projects: FC = () => {
  const { projects } = siteConfig

  return (
    <div className="grid gap-4">
      {projects.map((project: ProjectProps) => (
        <ProjectCard key={project.id || project.title} project={project} />
      ))}
    </div>
  )
}
