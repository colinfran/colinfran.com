export type Blog = {
  id: string
  title: string
  image: string
  author: string
  date: string
  post: string[]
}

export const blogs: Blog[] = [
  {
    id: "the-joy-of-building-and-coding",
    title: "The Joy of Building and Coding",
    author: "Colin Franceschini",
    date: "2024-08-30T22:47:11.954Z",
    image: "https://i.ibb.co/WPS6nxN/programming.jpg",
    post: [
      "Welcome to my blog! I'm excited to finally start sharing my thoughts and experiences as a full stack software engineer. Coding has always been more than just a profession for me—it's a passion that fuels my curiosity and creativity every day. There's an unmatched thrill in taking an abstract idea, shaping it with code, and watching it come to life as a fully functioning application.",

      "Whether it's setting up a robust backend, perfecting the user experience on the frontend, or optimizing database queries for speed and efficiency, each part of the process brings its own set of challenges and rewards. One of the most gratifying aspects of coding is that it's a never-ending journey of learning. There's always a new framework to explore, a new problem to solve, or a better way to write code.",

      "In this blog, I plan to share not only the technical details of projects I'm working on but also the lessons I've learned along the way. I'll dive into everything from the intricacies of full stack development, and tips for debugging, to the highs and lows of tackling complex issues. Whether you're a fellow developer, someone aspiring to get into coding, or just curious about what goes on behind the scenes, I hope you find this blog both insightful and enjoyable.",

      "Thanks for joining me on this journey. Let's build something amazing together. Stay tuned for more posts, and as always—happy coding! 🚀",
    ],
  },
]

export const findBlogById = (id: string): Blog | undefined => {
  return blogs.find((item: Blog) => item.id === id)
}

export const getInitials = (name: string): string => {
  const words = name.split(" ")
  const initials = words.map((word) => word[0].toUpperCase()).join("")
  return initials
}

export const getRecentPosts = (): Blog[] => {
  const sortedBlogs = blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  return sortedBlogs.slice(0, 3)
}
