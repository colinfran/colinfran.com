/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/:id",
        destination: "/projects/:id",
      },
    ]
  },
}

export default nextConfig
