import React from "react"
import { StaticImageData } from "next/image"
import { Card } from "./ui/card"
import Link from "next/link"

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

export const Projects: React.FC<ProjectsProps> = async ({ projects }) => (
  <div className="flex flex-col space-y-4">
    {projects.map(({ id, title, description }: ProjectProps) => (
      <Link href={`/${id}`} key={id}>
        <Card className="flex cursor-pointer flex-col gap-2 p-8">
          <h3 className="font-semibold underline underline-offset-4">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </Card>
      </Link>
    ))}
  </div>
)
