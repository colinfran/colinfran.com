import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/locations/:path+',
        destination: 'https://colinfran-locations.vercel.app/:path*',
      },
      {
        source: '/locations',
        destination: 'https://colinfran-locations.vercel.app',
      },
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
      {
        source: "/:id",
        destination: "/projects/:id",
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
    ],
  },
};

export default nextConfig;
