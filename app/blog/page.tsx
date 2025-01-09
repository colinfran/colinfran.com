import React from "react"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { getAllBlogsSorted, Blog } from "@/lib/blog"
import ImageWithSkeleton from "@/components/ImageWithSkeleton"

const Page: React.FC = async () => {
  const blogs = await getAllBlogsSorted()
  return (
    <div className="flex min-h-screen flex-col">
      <div className="container mx-auto py-12">
        <div className="mx-4 md:mx-6 lg:mx-auto lg:max-w-4xl">
          <h1 className="text-center text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Blogs
          </h1>
          <p className="mt-4 text-center text-muted-foreground md:text-xl">
            Talking about things that are on my mind.
          </p>
        </div>
      </div>
      <div className="mx-auto grid grid-cols-1 gap-8 px-4 py-8 md:grid-cols-[3fr] md:px-6 md:py-12 lg:px-8 lg:py-16">
        <div className="">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map(({ id, title, author, date, imageUrl }: Blog) => (
              <Link href={`/blog/${id}`} key={id} prefetch>
                <Card>
                  <CardHeader>
                    <ImageWithSkeleton
                      alt={title}
                      className="aspect-video w-full rounded-t-lg object-cover"
                      height={225}
                      src={imageUrl}
                      width={400}
                    />
                  </CardHeader>
                  <CardContent className="p-4">
                    <h3 className="mb-2 line-clamp-2 h-[56px] text-xl font-semibold">{title}</h3>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <div>{author}</div>
                      <div>•</div>
                      <div>{new Date(date).toLocaleDateString()}</div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
