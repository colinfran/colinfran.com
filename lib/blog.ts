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

  {
    id: "tracking-location-with-iphone-shortcut",
    title: "Location tracking using iPhone Shortcut",
    author: "Colin Franceschini",
    date: "2024-12-30T16:47:11.954Z",
    image: "https://i.ibb.co/1zcWgCk/locationdb.jpg",
    post: [
      "In today's digital world, location tracking is something we use every day, whether it's for navigation or for tracking our workouts. But I've taken it a step further and built an iPhone shortcut that automatically tracks my location every day. Not only does this help me understand my movements better, but it also allows me to store this data in a database and visualize it in exciting ways.",

      "### How It Works",

      "The process starts with an iPhone Shortcut that sends a POST request to my website's API every day. The request contains information about my current location, including latitude, longitude, city, country, and state.",

      "![iPhone Shortcuts app](https://i.ibb.co/bXj8xQS/iphone-shortcuts-screenshot.jpg)",

      "When the API receives this data, it stores it in a PostgreSQL database, as seen in the below Next.js POST request route: ",

      "```typescript\nimport { NextResponse, NextRequest } from 'next/server'\nimport postgres from 'postgres'\n\n/**\n * Handles POST requests to the '/api/location' endpoints.\n * @param {NextRequest} request - The incoming request object.\n * @returns {Promise<Response>} - Returns a response object.\n */\n\nexport async function POST(request: NextRequest): Promise<Response> {\n  const token = process.env.LOCATION_TOKEN!\n  const params = await request.json()\n  // very simple way to prevent spam is by requiring valid token\n  if (params.id !== token) {\n    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })\n  }\n  const connectionString = process.env.LOCATION_POSTGRES_URL!\n  const sql = postgres(connectionString)\n  await sql`INSERT INTO location (date, state, latitude, longitude, city, country) VALUES (${new Date()}, ${params.state}, ${params.latitude}, ${params.longitude}, ${params.city}, ${params.country});`\n  return NextResponse.json({ status: 200, message: 'Working' })\n}\n```",
      "I then query this database to show my location on my homepage, providing an up-to-date record of where I've been.",

      "```typescript\nimport * as React from 'react'\nimport { getTodaysLocation } from '@/db/getTodaysLocation'\nimport { siteConfig } from './config'\n\nconst Page: React.FC = async () => {\n  const location = await getTodaysLocation()\n  return (\n    <div className='container mb-10 flex flex-col space-y-6 divide-y'>\n      <div className='space-y-2 pt-6'>\n        <p className='py-2 text-muted-foreground'>\n          {`📍 Current Location: ${location}`}\n        </p>\n      </div>\n    </div>\n  )\n}\n\nexport default Page\n```",

      "### The Power of Tracking My Location",

      "With my location history tracked every day, the possibilities are endless. I can analyze my movement patterns, see how often I visit certain places, or even track my productivity by seeing how often I work from different locations. There are many exciting things I can do with this data, like creating visualizations, providing location-based suggestions, or even just reflecting on how my habits change over time.",

      "The data can be used to derive various insights, such as identifying places I visit most frequently, tracking travel patterns, or even correlating my work habits with my physical location. This can be a useful tool for self-improvement or just a fun way to visualize my day-to-day life.",

      "One of the most exciting things I'm planning is creating visualizations of my movement over time. I could plot my daily locations on a map, generate heatmaps of my most visited places, or even analyze my travel times between locations. This is just the beginning of what can be done with this data.",

      "### Final Thoughts",

      "Using an iPhone shortcut to track my location every day has been a fun and informative project. By sending data to my website and storing it in a database, I now have access to a wealth of information that can be used in various ways. Whether for fun, self-improvement, or creating insights, tracking my location has become a valuable part of my daily routine.",
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
