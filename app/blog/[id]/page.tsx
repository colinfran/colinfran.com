/* eslint-disable @next/next/no-img-element */
import React from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import Image from "next/image"
import { findBlogById, getInitials, getRecentPosts } from "@/lib/blog"
import { redirect } from "next/navigation"
import Markdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism"

type Props = { params: { id: string } }

const Page: React.FC<Props> = async ({ params }) => {
  const blog = findBlogById(params.id as string)
  if (blog === undefined) {
    redirect("/404")
  }
  const { title, author, date, image, post } = blog
  const initials = getInitials(author)
  const recentPosts = getRecentPosts()
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 md:flex-row md:gap-12 md:px-6 md:py-20">
      <div className="w-full flex-1 md:w-3/5">
        <Image
          alt={title}
          blurDataURL={image.base64}
          height={0}
          placeholder="blur"
          sizes="100vw"
          src={image.url}
          style={{ width: "100%", height: "auto" }} // optional
          width={0}
        />
        <div className="mt-8 space-y-4 md:mt-12">
          <h1 className="text-3xl font-bold md:text-4xl">{title}</h1>
          <div className="!mb-8 flex items-center space-x-4 text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Avatar className="size-12 border">
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <span>{author}</span>
            </div>
            <span>•</span>
            <span>{new Date(date).toLocaleDateString()}</span>
          </div>
          <div className="prose prose-lg dark:prose-invert mt-8 max-w-none space-y-6">
            {post.map((paragraph: string) => {
              if (paragraph.includes("ibb.co")) {
                return (
                  <Markdown className="m-auto my-4 max-w-[500px]" key={paragraph}>
                    {paragraph}
                  </Markdown>
                )
              } else if (paragraph.includes("###")) {
                return (
                  <Markdown className="my-4 text-3xl font-semibold" key={paragraph}>
                    {paragraph}
                  </Markdown>
                )
              } else if (paragraph.includes("```")) {
                return (
                  <Markdown
                    children={paragraph} // eslint-disable-line react/no-children-prop
                    components={{
                      code(props) {
                        const { children, className, node, ...rest } = props // eslint-disable-line unused-imports/no-unused-vars
                        const match = /language-(\w+)/.exec(className || "")
                        return match ? (
                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore
                          <SyntaxHighlighter
                            {...rest}
                            children={String(children).replace(/\n$/, "")} // eslint-disable-line react/no-children-prop
                            language={match[1]}
                            PreTag="div"
                            style={darcula}
                          />
                        ) : (
                          <code {...rest} className={className}>
                            {children}
                          </code>
                        )
                      },
                    }}
                    key={paragraph}
                  />
                )
              } else {
                return <Markdown key={paragraph}>{paragraph}</Markdown>
              }
            })}
          </div>
        </div>
      </div>
      <div className="w-full space-y-8 md:w-[300px]">
        <div>
          <h2 className="mb-4 text-xl font-bold">Recent Posts</h2>
          <div className="space-y-4">
            {recentPosts.map((recentPost) => (
              <Link
                className="group flex items-center space-x-4"
                href={`/blog/${recentPost.id}`}
                key={`${recentPost.id} - recent post`}
                prefetch
              >
                <div className="h-12 w-16 shrink-0 overflow-hidden rounded-md">
                  <Image
                    alt="Recent Post"
                    blurDataURL={recentPost.image.base64}
                    className="size-full object-cover"
                    height={48}
                    placeholder="blur"
                    src={recentPost.image.url}
                    style={{ aspectRatio: "64/48", objectFit: "cover" }}
                    width={64}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium group-hover:underline">{recentPost.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(recentPost.date).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
