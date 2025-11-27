import calculatorMockup from "../assets/images/calculator-mockup.webp"
import nhdashboardMockup from "../assets/images/nhdashboard-mockup.webp"
import wallpaperqrMockup from "../assets/images/wallpaperqr-mockup.webp"
import kwalletMockup from "../assets/images/kwallet-mockup-light.webp"
import kwalletMockupDark from "../assets/images/kwallet-mockup-dark.webp"
import linkChompDark from "../assets/images/linkchop-dark.webp"
import linkChompLight from "../assets/images/linkchop-light.webp"
import franfoodDark from "../assets/images/franfood-dark.webp"
import franfoodLight from "../assets/images/franfood-light.webp"
import gitArtDark from "../assets/images/git-art-dark.webp"
import myLocationDark from "../assets/images/mylocation-dark.webp"
import myLocationLight from "../assets/images/mylocation-light.webp"
import stockmarketbotDark from "../assets/images/stockmarketbot-dark.webp"
import stockmarketbotLight from "../assets/images/stockmarketbot-light.webp"

export const siteConfig = {
  name: "Colin Franceschini",
  url: "https://colinfran.com",
  links: {
    github: "https://github.com/colinfran",
    linkedin: "https://www.linkedin.com/in/colinfranceschini/",
    instagram: "https://www.instagram.com/colinfran/",
    email: "mailto:hello@colinfran.com",
    x: "https://x.com/colinfran",
  },
  projects: [
    {
      id: "stockmarketbot",
      title: "stockmarketbot",
      description:
        "A fully autonomous stock-market bot that turns cutting-edge AI reasoning into real (paper) trades - every single week, without any human intervention.",
      links: [
        {
          url: "https://stockmarketbot.app",
          text: "Website",
          target: "_self",
        },
        {
          url: "https://github.com/colinfran/stockmarketbot",
          text: "GitHub",
          target: "_blank",
        },
      ],
      tags: [
        "Next.js",
        "Tailwind CSS",
        "React.js",
        "TypeScript",
        "shadcn/ui",
        "PostgreSQL",
        "Grok",
        "Alpaca",
      ],
      imageSrc: stockmarketbotLight,
      imageSrcDark: stockmarketbotDark,
    },
    {
      id: "my-location-analysis",
      title: "MyLocationAnalysis",
      description:
        "A personal project to analyze and visualize my location data using iOS Shortcuts, PostgreSQL, and Next.js.",
      links: [
        {
          url: "/locations",
          text: "Website",
          target: "_self",
        },
        {
          url: "https://github.com/colinfran/colinfran.com/?tab=readme-ov-file#mylocationanalysis-app",
          text: "GitHub",
          target: "_blank",
        },
      ],
      tags: [
        "Next.js",
        "Tailwind CSS",
        "React.js",
        "TypeScript",
        "shadcn/ui",
        "PostgreSQL",
        "iOS Shortcuts",
      ],
      imageSrc: myLocationLight,
      imageSrcDark: myLocationDark,
    },
    {
      id: "git-art",
      title: "GitArt",
      description:
        "Discover and visualize your GitHub contributions in an artistic way. GitArt transforms your GitHub activity into a unique visual experience.",
      links: [
        {
          url: "https://gitart.app/?utm_source%3Dhttps%3A%2F%2Fcolinfran.com%26utm_medium%3Dreferral",
          text: "Website",
        },
      ],
      tags: [
        "Next.js",
        "Tailwind CSS",
        "React.js",
        "TypeScript",
        "shadcn/ui",
        "PostgreSQL",
        "UploadThing",
        "OpenAI",
        "Dall-E",
      ],
      imageSrc: gitArtDark,
      imageSrcDark: gitArtDark,
    },
    {
      id: "franceschini-food",
      title: "Franceschini Food",
      description: "A recipe cookbook website created to showcase family recipes",
      links: [
        {
          url: "https://github.com/colinfran/franceschini-food",
          text: "GitHub",
        },
        {
          url: "https://franceschini.food/?utm_source%3Dhttps%3A%2F%2Fcolinfran.com%26utm_medium%3Dreferral",
          text: "Website",
        },
      ],
      tags: ["Next.js", "Tailwind CSS", "React.js", "TypeScript", "shadcn/ui", "MongoDB", "ImgBB"],
      imageSrc: franfoodLight,
      imageSrcDark: franfoodDark,
    },
    {
      id: "linkchop",
      title: "LinkChop",
      description:
        "A simple url shortener with free and premium features. Built with Next.js, NextAuth, Tailwind, shadcn/ui, PostgreSQL, and Stripe.",
      links: [
        {
          url: "https://linkchop.com/",
          text: "Website",
        },
      ],
      tags: [
        "Next.js",
        "NextAuth",
        "Tailwind CSS",
        "React.js",
        "TypeScript",
        "shadcn/ui",
        "PostgreSQL",
        "Stripe",
      ],
      imageSrc: linkChompLight,
      imageSrcDark: linkChompDark,
    },
    {
      id: "kwallet",
      title: "kwallet",
      description: "A Kaspa wallet app for iOS and Android. Built with React Native.",
      links: [
        {
          url: "https://github.com/colinfran/kwallet",
          text: "GitHub",
        },
      ],
      tags: ["React Native", "TypeScript", "Node.js", "Express.js", "Expo"],
      imageSrc: kwalletMockup,
      imageSrcDark: kwalletMockupDark,
    },
    // {
    //   id: "learn-react-quick",
    //   title: "Learn React Quick - free course",
    //   description:
    //     "Master React.js in no time. A free course for anyone interested in learning React.js",
    //   links: [
    //     {
    //       url: "https://colinfran.github.io/learn-react-quick/",
    //       text: "Course",
    //     },
    //   ],
    //   tags: ["Docusaurus", "React.js"],
    //   imageSrc: lrqLight,
    //   imageSrcDark: lrqDark,
    // },
    {
      id: "nhdashboard",
      title: "NHDashboard",
      description:
        "NHDashboard is a web app dashboard that displays information about your cryptocurrency mining rigs using NiceHash. Built with Express.js and React.js",
      links: [
        {
          url: "https://colinfran.github.io/nh-dashboard/",
          text: "Demo",
        },
        {
          url: "https://github.com/colinfran/nh-dashboard",
          text: "GitHub",
        },
      ],
      tags: ["React.js", "Node.js", "Express.js"],
      imageSrc: nhdashboardMockup,
    },
    {
      id: "wallpaperqr",
      title: "WallpaperQR",
      description:
        "WallpaperQR takes the effort out of people having to enter in your information into someone's phone when you are networking. A simplistic wallpaper generator that is easy to use. Built with React Native.",
      links: [
        {
          url: "https://colinfran.github.io/wallpaperqr/",
          text: "Website",
        },
        {
          url: "https://apps.apple.com/us/app/wallpaperqr/id1558057109",
          text: "App Store",
        },
      ],
      tags: ["React Native", "Expo"],
      imageSrc: wallpaperqrMockup,
    },
    {
      id: "calculator-for-minimalists",
      title: "Calculator for Minimalists",
      description:
        "A basic, minimalistic calculator. Nothing special. Just a plain calculator. Sometimes you just need something simple. Built with React Native.",
      links: [
        {
          url: "https://colinfran.github.io/calculator-for-minimalists/",
          text: "Website",
        },
        {
          url: "https://apps.apple.com/us/app/calculator-for-minimalists/id1560501633",
          text: "App Store",
        },
      ],
      tags: ["React Native", "Expo"],
      imageSrc: calculatorMockup,
    },
  ],
}

export type SiteConfig = typeof siteConfig
