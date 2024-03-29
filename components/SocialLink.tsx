"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import Link from "next/link"
import { Icons } from "./Icons"
import { Button } from "./ui/button"

type IconName = keyof typeof Icons

export const SocialLink: React.FC<any> = ({ icon, href, title }) => {
  const Icon = Icons[icon as IconName] as React.FC
  return (
    <Button size="icon" variant="outline" asChild>
      <Link
        className="group flex items-center space-x-2"
        href={href}
        rel="noopener noreferrer"
        target="_blank"
      >
        <Icon aria-labelledby={`${title} Link`} />
      </Link>
    </Button>
  )
}
