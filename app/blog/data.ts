export type Blog = {
  id: string
  title: string
  image: string
  author: string
  date: string
  post: string[]
}

export const blogs: Blog[] = [
  // newest to oldest
  {
    id: "building-the-future-of-ai",
    title: "Building the Future of AI with Z by HP AI Studio",
    author: "Colin Franceschini",
    date: "2024-08-30T22:47:11.954Z",
    image: "https://i.ibb.co/jLKmLhW/1696865761040.jpg",
    post: [
      "In January 2024, I joined HP as a full-stack software engineer, and I've been fortunate to work on an exciting new project: Z by HP AI Studio. This platform is designed to make AI and machine learning development more powerful and accessible, bringing together the best of HP's hardware and cutting-edge software.",

      "Z by HP AI Studio leverages a modern tech stack—Rails, Golang, React.js, and TypeScript—to deliver a seamless experience for AI professionals. Whether you're training complex models or deploying AI solutions, this platform is optimized for performance and collaboration.",

      "Working on this project has been an incredible journey, allowing me to deepen my skills and contribute to a product that's set to redefine AI development. If you're in the AI space, I highly recommend exploring what Z by HP AI Studio has to offer.",

      "Stay tuned for more updates on this exciting venture!",
    ],
  },

  {
    id: "the-joy-of-building-and-coding",
    title: "The Joy of Building and Coding",
    author: "Colin Franceschini",
    date: "2024-08-26T16:47:11.954Z",
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
