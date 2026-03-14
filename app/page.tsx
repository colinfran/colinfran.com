import * as React from "react"
import { siteConfig } from "./config"
import { SocialLink } from "@/components/SocialLink"
import Link from "next/link"
import { Projects } from "@/components/Projects"
import { getCountryIcon, getTodaysLocation } from "@/db/getTodaysLocation"
import { headers } from "next/headers"
import { FC } from "react"
import { ArrowUpRight, Briefcase, MapPin } from "lucide-react"

const Page: FC = async () => {
  const location = await getTodaysLocation()
  const headersList = await headers()
  const userAgent = headersList.get("user-agent") || ""
  const isWindows = userAgent.includes("Windows")

  return (
    <div className="container mx-auto max-w-2xl px-6 pb-20 pt-12 md:px-8 md:pt-16">
      {/* Hero Section */}
      <section className="mb-16">
        <h1 className="mb-6 text-4xl font-semibold tracking-tight text-foreground md:text-5xl text-balance">
          Colin Franceschini
        </h1>
        <p className="mb-4 text-lg leading-relaxed text-muted-foreground">
          Full Stack Software Engineer building dynamic applications with React, React Native, 
          Next.js, and TypeScript. Focused on design, user experience, and accessibility.
        </p>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Based in San Francisco. Passionate about coding and fitness.
        </p>
      </section>

      {/* Status Section */}
      <section className="mb-16 space-y-4">
        <div className="flex items-start gap-3 text-muted-foreground">
          <Briefcase className="mt-0.5 h-5 w-5 shrink-0" />
          <p className="leading-relaxed">
            Currently at{" "}
            <Link 
              className="font-medium text-foreground underline decoration-muted-foreground/40 underline-offset-4 transition-colors hover:decoration-foreground" 
              href="https://www.hp.com/"
            >
              HP
            </Link>
            , building{" "}
            <Link 
              className="font-medium text-foreground underline decoration-muted-foreground/40 underline-offset-4 transition-colors hover:decoration-foreground" 
              href="https://www.hp.com/us-en/workstations/ai-studio.html"
            >
              Z by HP AI Studio
            </Link>
            {" "}&mdash; a centralized data science platform that brings data, people, and compute together.
          </p>
        </div>

        <Link
          className="group flex items-start gap-3 text-muted-foreground transition-colors hover:text-foreground"
          href="/blog/tracking-location-with-iphone-shortcut"
          prefetch
        >
          <MapPin className="mt-0.5 h-5 w-5 shrink-0" />
          <span className="leading-relaxed">
            <span className="text-muted-foreground">Current Location:</span>{" "}
            <span className="font-medium text-foreground group-hover:underline underline-offset-4">
              {location}{!isWindows ? ` ${getCountryIcon(location)}` : ""}
            </span>
          </span>
        </Link>
      </section>

      {/* Links Section */}
      <section className="mb-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Connect
          </h2>
          <div className="h-px flex-1 bg-border ml-4" />
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <SocialLink href={siteConfig.links.github} icon="Github" title="GitHub" />
          <SocialLink href={siteConfig.links.linkedin} icon="Linkedin" title="LinkedIn" />
          <SocialLink href={siteConfig.links.instagram} icon="Instagram" title="Instagram" />
          <SocialLink href={siteConfig.links.x} icon="X" title="X" />
          <SocialLink href={siteConfig.links.email} icon="Email" title="Email" />
          <Link
            href="/resume"
            prefetch
            className="group flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Resume
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/blog"
            prefetch
            className="group flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Blog
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>

      {/* Projects Section */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Projects
          </h2>
          <div className="h-px flex-1 bg-border ml-4" />
        </div>
        <Projects />
      </section>
    </div>
  )
}

export default Page
