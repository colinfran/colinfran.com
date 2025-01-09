import fs from "fs"
import path from "path"
import matter from "gray-matter"

export type Blog = {
  id: string
  title: string
  imageUrl: string
  author: string
  date: string
  content: string
}

const postsDirectory = path.join(process.cwd(), "blog-posts")

export const getAllBlogsSorted = async (): Promise<Blog[]> => {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id: matterResult.data.id,
      date: matterResult.data.date,
      title: matterResult.data.title,
      author: matterResult.data.author,
      imageUrl: matterResult.data.imageUrl,
      content: matterResult.content,
    }
  })
  // Sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1
    } else if (a > b) {
      return -1
    } else {
      return 0
    }
  })
}

export const findBlogById = async (id: string): Promise<Blog | undefined> => {
  const blogs = await getAllBlogsSorted()
  return blogs.find((item) => item.id === id)
}

export const getInitials = (name: string): string => {
  const words = name.split(" ")
  const initials = words.map((word) => word[0].toUpperCase()).join("")
  return initials
}

export const getRecentPosts = async (): Promise<Blog[]> => {
  const blogs = await getAllBlogsSorted()
  return blogs.slice(0, 3)
}
