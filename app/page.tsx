import * as React from "react"
import { siteConfig } from "./config"
import { SocialLink } from "@/components/SocialLink"
import Link from "next/link"
import { Projects } from "@/components/Projects"
import { getCountryIcon, getTodaysLocation } from "@/db/getTodaysLocation"
import { headers } from "next/headers"

const Page: React.FC = async () => {
  const location = await getTodaysLocation()
  const headersList = headers()
  const userAgent = headersList.get("user-agent") || ""
  const isWindows = userAgent.includes("Windows")

  return (
    <div className="container mb-10 flex flex-col space-y-6 divide-y">
      <div className="space-y-2 pt-6">
        <h1 className="mb-8 scroll-m-20 text-4xl font-extrabold tracking-tight">
          Hello, I&apos;m Colin!
        </h1>
        <p className="text-muted-foreground">
          {`I am a Full Stack Software Engineer and like to focus on building dynamic applications
          using a combination of React.js, React Native, Express.js, Next.js, and TypeScript.
          Experienced in developing Web, iOS, and Android mobile apps with a keen eye for design,
          user experience, and accessibility. Based in San Francisco, I have a passion for both
          coding and technology, as well as for fitness and weightlifting. Check out the links below
          or take a look at my `}
          <Link className="underline" href="/resume" prefetch>
            resume
          </Link>
          .
        </p>
        <p className="py-2 text-muted-foreground">
          {"Sometimes I like to write down whats on my mind. Check out my blog posts "}
          <Link className="underline" href="/blog" prefetch>
            here
          </Link>
          {"."}
        </p>
        <p className="flex flex-row py-2 text-muted-foreground">
          <span className="flex min-w-[28px] self-center">{"💼"}</span>
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
            <span className="min-w-[28px]">{"📍"}</span>
            <span className="mr-2">{"Current Location: "}</span>
            <span className="group-hover:underline">{`${location}${!isWindows ? ` ${getCountryIcon(location)}` : ""}`}</span>
          </Link>
        </div>
      </div>
      <div className="space-y-2 pt-6">
        <h2 className="font-bold sm:text-lg">Projects</h2>
        <div className="flex flex-col">
          <Projects />
        </div>
      </div>
      <div className="space-y-2 pt-6">
        <h2 className="font-bold sm:text-lg">Links</h2>
        <div className="flex flex-row gap-5">
          <SocialLink href={siteConfig.links.github} icon="Github" title="Github" />
          <SocialLink href={siteConfig.links.linkedin} icon="Linkedin" title="LinkedIn" />
          <SocialLink href={siteConfig.links.instagram} icon="Instagram" title="Instagram" />
          <SocialLink href={siteConfig.links.x} icon="X" title="X (Twitter)" />
          <SocialLink href={siteConfig.links.email} icon="Email" title="Email" />
        </div>
      </div>
    </div>
  )
}

export default Page
