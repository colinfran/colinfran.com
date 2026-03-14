"use client"
import React, { FC } from "react"
import Link from "next/link"
import { Icons } from "./Icons"

type SocialLinkProps = {
  icon: keyof typeof Icons
  href: string
  title: string
}

export const SocialLink: FC<SocialLinkProps> = ({ icon, href, title }) => {
  const Icon = Icons[icon]
  return (
    <Link
      aria-label={`${title} Link`}
      className="group flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <Icon aria-hidden="true" className="h-5 w-5" />
      <span className="text-sm font-medium">{title}</span>
    </Link>
  )
}
