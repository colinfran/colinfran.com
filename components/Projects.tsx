/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import { Project } from "./Project"
import { StaticImageData } from "next/image"

type LinksProps = {
  url: string
  text: string
}

export type ProjectProps = {
  id: string
  title: string
  description: string
  links: LinksProps[]
  imageSrc: StaticImageData
  imageSrcDark?: StaticImageData
}

export type ProjectsProps = {
  projects: ProjectProps[]
}

export const Projects: React.FC<ProjectsProps> = async ({ projects }) => {
  return (
    <div className="flex flex-col space-y-4">
      {projects.map((project: ProjectProps) => (
        <Project key={project.id} project={project} />
      ))}
    </div>
  )
}
