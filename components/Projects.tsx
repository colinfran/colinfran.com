"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react"
import { v4 } from "uuid"
import { Project } from "./Project"
import { StaticImageData } from "next/image"

type LinksProps = {
  url: string
  text: string
}

export type ProjectProps = {
  title: string
  description: string
  links: LinksProps[]
  imageSrc: StaticImageData
  imageSrcDark?: StaticImageData
}

export type ProjectsProps = {
  projects: ProjectProps[]
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [indexOpen, setIndexOpen] = useState<undefined | number>(undefined)

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