import React from "react"
import "../assets/css/globals.css"
import { ThemeProvider } from "@/components/providers/theme-provider"
import Header from "@/components/Header"
import { Analytics } from "@vercel/analytics/react"
import { Metadata } from "next"
import { GoogleAnalytics } from "@next/third-parties/google"
import NextTopLoader from "nextjs-toploader"

const gaId = process.env.NEXT_PUBLIC_MEASUREMENT_ID!

export const metadata: Metadata = {
  title: {
    template: "%s | ColinFran.com",
    default: "ColinFran.com | Portfolio",
  },
  keywords: [
    "colinfran",
    "colinfran.com",
    "colin",
    "fran",
    "frances",
    "franceschi",
    "colin franceschini",
    "colinfranceschini",
    "franceschini",
    "cfranceschini",
    "software engineer",
    "web developer",
    "react",
    "react.js",
    "react native",
    "express.js",
    "javascript",
    "Next.js",
    "TypeScript",
    "React",
    "Tailwind CSS",
    "shadcn/ui",
    "mongodb",
    "mysql",
    "postgresql",
    "san francisco",
  ],
  description: "Colin Franceschini | Software Engineer",
  openGraph: {
    title: "ColinFran.com | Portfolio",
    description: "Colin Franceschini | Software Engineer",
    url: "https://colinfran.com",
    locale: "en-US",
    type: "website",
    siteName: "ColinFran.com",
    images: [
      {
        url: "https://colinfran.com/icons/og.png",
        width: 1200,
        height: 630,
        alt: "ColinFran.com website",
      },
    ],
  },
  twitter: {
    title: "ColinFran.com | Portfolio",
    description: "Colin Franceschini | Software Engineer",
    card: "summary_large_image",
    images: ["https://colinfran.com/icons/og.png"],
    creator: "@colinfran",
  },
  alternates: {
    canonical: "https://colinfran.com",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/icons/favicon-16x16.png",
    apple: "/icons/apple-icon-precomposed.png",
  },
}

type RootLayoutProps = {
  children?: React.ReactNode
}

const RootLayout: React.FC<RootLayoutProps> = async ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="relative flex min-h-screen flex-col gap-4">
        <NextTopLoader color="#36568a" showSpinner={false} zIndex={100} />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <main>
            <Header />
            <div className="flex-1">{children}</div>
          </main>
        </ThemeProvider>
        <Analytics />
      </body>
      <GoogleAnalytics gaId={gaId} />
    </html>
  )
}

export default RootLayout
