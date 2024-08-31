import React from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import Image from "next/image"
import { findBlogById, getInitials, getRecentPosts } from "../data"
import { redirect } from "next/navigation"

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
      <div className="flex-1">
        <Image
          alt={title}
          className="h-[400px] w-full rounded-lg object-cover md:h-[500px]"
          height={600}
          src={image}
          style={{ aspectRatio: "1200/600", objectFit: "cover" }}
          width={1200}
        />
        <div className="mt-8 space-y-4 md:mt-12">
          <h1 className="text-3xl font-bold md:text-4xl">{title}</h1>
          <div className="!mb-8 flex items-center space-x-4 text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Avatar className="size-12 border">
                <AvatarImage alt="Author" src="/placeholder-user.jpg" />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <span>{author}</span>
            </div>
            <span>•</span>
            <span>{new Date(date).toLocaleDateString()}</span>
          </div>
          <div className="prose prose-lg dark:prose-invert mt-8 max-w-none space-y-6">
            {post.map((paragraph: string) => (
              <p className="indent-8 leading-loose" key={paragraph}>
                {paragraph}
              </p>
            ))}
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
                prefetch={false}
              >
                <div className="h-12 w-16 shrink-0 overflow-hidden rounded-md">
                  <Image
                    alt="Recent Post"
                    className="size-full object-cover"
                    height={48}
                    src={recentPost.image}
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
