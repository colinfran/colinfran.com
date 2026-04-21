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
  const openInNewTab = title.toLowerCase() !== "blog" && title.toLowerCase() !== "email"

  return (
    <Link
      aria-label={`${title} Link`}
      className="flex items-center p-2 text-muted-foreground hover:text-foreground transition-colors"
      href={href}
      rel="noopener noreferrer"
      target={openInNewTab ? "_blank" : "_self"}
    >
      <Icon aria-labelledby={`${title} Link`} className="h-5 w-5" />
    </Link>
  )
}
