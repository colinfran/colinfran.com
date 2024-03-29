"use client"
import React from "react"
import { Card } from "./ui/card"
import Link from "next/link"
import { ProjectProps } from "./Projects"

type ProjectPropType = {
  project: ProjectProps
}

export const Project: React.FC<ProjectPropType> = ({ project }) => {
  const { id, title, description } = project
  return (
    <Link href={`/${id}`}>
      <Card className="flex cursor-pointer flex-col gap-2 p-8">
        <h3 className="font-semibold underline underline-offset-4">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </Card>
    </Link>
  )
}
