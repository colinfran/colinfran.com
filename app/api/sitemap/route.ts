import { getAllBlogsSorted } from "@/lib/blog"
import { getServerSideSitemap } from "next-sitemap"

export async function GET(): Promise<Response> {
  const arr = [
    {
      loc: "https://colinfran.com",
      lastmod: new Date().toISOString(),
    },
    {
      loc: "https://colinfran.com/resume",
      lastmod: new Date().toISOString(),
    },
    {
      loc: "https://colinfran.com/blog",
      lastmod: new Date().toISOString(),
    },
  ]
  const blogs = await getAllBlogsSorted()
  blogs.forEach((blog) => {
    arr.push({
      loc: `https://colinfran.com/blog/${blog.id}`,
      lastmod: new Date().toISOString(),
    })
  })
  arr.push({
    loc: "https://colinfran.com/404",
    lastmod: new Date().toISOString(),
  })

  return getServerSideSitemap(arr)
}
