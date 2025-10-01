"use client"
import React, { FC, useState } from "react"
import { v4 } from "uuid"
import { Project } from "./Project"
import { StaticImageData } from "next/image"
import { siteConfig } from "../app/config"

type LinksProps = {
  url: string
  text: string
  target?: string
}

export type ProjectProps = {
  title: string
  description: string
  links: LinksProps[]
  tags: string[]
  imageSrc: StaticImageData
  imageSrcDark?: StaticImageData
}

export const Projects: FC = () => {
  const [indexOpen, setIndexOpen] = useState<undefined | number>(undefined)
  const { projects } = siteConfig
  const handleProjectClick = (index: number): void => {
    if (index === indexOpen) {
      setIndexOpen(undefined) // Collapse the currently open project if clicked again
    } else {
      setIndexOpen(index) // Expand the clicked project
    }
  }

  return (
    <div className="flex flex-col space-y-4">
      {projects.map((project: ProjectProps, index: number) => (
        <Project
          handleProjectClick={handleProjectClick}
          index={index}
          indexOpen={indexOpen}
          key={v4()}
          project={project}
        />
      ))}
    </div>
  )
}
