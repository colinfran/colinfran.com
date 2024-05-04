import * as React from "react"
import { siteConfig } from "./config"
import { SocialLink } from "@/components/SocialLink"
import Link from "next/link"
import { Projects } from "@/components/Projects"

const Page: React.FC = async () => {
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
          <Link className="underline" href="/resume">
            resume
          </Link>
          .
        </p>
        <p className="py-2 text-muted-foreground">
          {"Currently @ "}
          <a className="underline" href="https://www.hp.com/">
            HP
          </a>
          {",  building the "}
          <a className="underline" href="https://www.hp.com/us-en/workstations/ai-studio.html">
            Z by HP AI Studio
          </a>
          {
            " product — a centralized data science platform that brings data, people, and compute together."
          }
        </p>
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
