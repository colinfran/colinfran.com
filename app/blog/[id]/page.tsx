import { redirect } from "next/navigation"
import Link from "next/link"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Markdown from "@/components/Markdown"
import ImageWithSkeleton from "@/components/ImageWithSkeleton"
import { findBlogById, getInitials, getRecentPosts } from "@/lib/blog"

// Server Component — async function is correct for server-side fetching
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Page({ params }: any) {
  // Fetch the blog by ID
  const blog = await findBlogById(params.id)
  if (!blog) redirect("/404")

  const { title, author, date, imageUrl, content } = blog
  const initials = getInitials(author)
  const recentPosts = await getRecentPosts()

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 md:flex-row md:gap-12 md:px-6 md:py-20">
      <div className="w-full flex-1 md:w-3/5">
        <ImageWithSkeleton
          alt={title}
          height={0}
          width={0}
          sizes="100vw"
          src={imageUrl}
          style={{ width: "100%", height: "auto" }}
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
            <Markdown content={content} />
          </div>
        </div>
      </div>

      <div className="w-full space-y-8 md:w-[300px]">
        <div>
          <h2 className="mb-4 text-xl font-bold">Recent Posts</h2>
          <div className="space-y-4">
            {recentPosts.map((recentPost) => (
              <Link
                key={recentPost.id}
                href={`/blog/${recentPost.id}`}
                className="group flex items-center space-x-4"
                prefetch
              >
                <div className="h-12 w-16 shrink-0 overflow-hidden rounded-md">
                  <ImageWithSkeleton
                    alt="Recent Post"
                    className="size-full object-cover"
                    height={48}
                    width={64}
                    style={{ aspectRatio: "64/48", objectFit: "cover" }}
                    src={recentPost.imageUrl}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium group-hover:underline">
                    {recentPost.title}
                  </h3>
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
