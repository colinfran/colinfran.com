"use client"
import React, { useCallback } from "react"

import Image from "next/image"
import { Card } from "../../../components/ui/card"
import Link from "next/link"
import { Button } from "../../../components/ui/button"
import { v4 } from "uuid"
import { useTheme } from "next-themes"
import { siteConfig } from "../../config"
import { redirect, useRouter } from "next/navigation"

const Page: React.FC<{ params: { id: string } }> = ({ params }) => {
  let project
  try {
    project = siteConfig.projects.find((x) => x.id === params.id)
    if (project === undefined) {
      redirect("/404")
    }
  } catch (error) {
    redirect("/404")
  }
  const { title, description, links, imageSrc, imageSrcDark } = project!
  const { resolvedTheme } = useTheme()
  const router = useRouter()

  const onClick = useCallback(
    (e) => {
      e.preventDefault()
      router.back()
    },
    [router],
  )

  return (
    <div className="my-10 flex flex-col items-center space-y-6">
      <Card className="mx-5 flex max-w-[900px] flex-col gap-10 p-8 md:mx-10 md:flex-row">
        <Image
          alt={title}
          className=" md:w-1/2"
          loading="lazy"
          placeholder="blur"
          src={resolvedTheme === "light" ? imageSrc : imageSrcDark || imageSrc}
        />
        <div className="flex flex-col justify-evenly gap-4 md:w-2/5">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            {title}
          </h2>
          <p className="text-muted-foreground">{description}</p>
          <div>
            <div className="flex flex-row gap-10">
              {links.map(({ text, url }: { text: string; url: string }) => (
                <Button className="w-full" key={v4()} asChild>
                  <Link className="w-full" href={url} rel="noopener noreferrer" target="_blank">
                    {text}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Card>
      <Button variant="secondary" asChild>
        <Link href="/" onClick={onClick}>
          Go Back
        </Link>
      </Button>
    </div>
  )
}

export default Page
