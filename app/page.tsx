import * as React from "react"
import { siteConfig } from "./config"
import { SocialLink } from "@/components/SocialLink"
import Link from "next/link"
import { Projects } from "@/components/Projects"
import { getCountryIcon, getTodaysLocation } from "@/db/getTodaysLocation"
import { headers } from "next/headers"
import { FC } from "react"
import { Briefcase, MapPin } from "lucide-react"

const Page: FC = async () => {
  const location = await getTodaysLocation()
  const headersList = await headers()
  const userAgent = headersList.get("user-agent") || ""
  const isWindows = userAgent.includes("Windows")

  return (
    <div className="container mx-auto px-8 py-16 max-w-2xl">
      {/* Hero Section */}
      <section className="space-y-6 mb-4">
        <h1 className="text-3xl font-medium tracking-tight">Hello, I&apos;m Colin Franceschini!</h1>
        <p className="text-muted-foreground">
          Full Stack Software Engineer building dynamic applications with React, React Native,
          Next.js, and TypeScript. Focused on design, user experience, and accessibility.
        </p>
        <p className="py-2 text-muted-foreground">
          {"Sometimes I like to write down whats on my mind. Check out my blog posts "}
          <Link className="underline" href="/blog" prefetch>
            here
          </Link>
          {"."}
        </p>
        <p className="flex flex-row text-muted-foreground">
          <span className="flex min-w-[28px] self-center">
            <Briefcase className="h-4 w-4" />
          </span>
          <span>
            {"Currently @ "}
            <Link className="underline" href="https://www.hp.com/">
              HP
            </Link>
            {",  building the "}
            <Link className="underline" href="https://www.hp.com/us-en/workstations/ai-studio.html">
              Z by HP AI Studio
            </Link>
            {
              " product — a centralized data science platform that brings data, people, and compute together."
            }
          </span>
        </p>
        <div className="py-2">
          <Link
            className="group flex flex-row py-2 text-muted-foreground"
            href="/blog/tracking-location-with-iphone-shortcut"
            prefetch
          >
            <span className="min-w-[28px] self-center">
              <MapPin className="h-4 w-4" />
            </span>
            <span className="mr-2">{"Current Location: "}</span>
            <span className="group-hover:underline">{`${location}${!isWindows ? ` ${getCountryIcon(location)}` : ""}`}</span>
          </Link>
        </div>
      </section>
      <div className="space-y-2 pb-6">
        <div className="flex flex-wrap gap-5 sm:flex-nowrap">
          <SocialLink href={siteConfig.links.github} icon="Github" title="Github" />
          <SocialLink href={siteConfig.links.linkedin} icon="Linkedin" title="LinkedIn" />
          <SocialLink href={siteConfig.links.instagram} icon="Instagram" title="Instagram" />
          <SocialLink href={siteConfig.links.tiktok} icon="TikTok" title="TikTok" />
          <SocialLink href={siteConfig.links.x} icon="X" title="X (Twitter)" />
          <SocialLink href={siteConfig.links.email} icon="Email" title="Email" />
          <SocialLink href={siteConfig.links.blog} icon="Blog" title="Blog" />
        </div>
      </div>
      <div className="space-y-2 pt-6">
        <h2 className="font-bold sm:text-lg">Projects</h2>
        <div className="flex flex-col">
          <Projects />
        </div>
      </div>
    </div>
  )
}

export default Page
