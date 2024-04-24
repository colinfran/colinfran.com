"use client"
import React from "react"
import Link from "next/link"
import { Icons } from "./Icons"
import { Button } from "./ui/button"

type SocialLinkProps = {
  icon: keyof typeof Icons
  href: string
  title: string
}

export const SocialLink: React.FC<SocialLinkProps> = ({ icon, href, title }) => {
  const Icon = Icons[icon]
  return (
    <Button size="icon" variant="outline" asChild>
      <Link
        aria-label={`${title} Link`}
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
