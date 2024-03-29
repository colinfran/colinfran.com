import calculatorMockup from "../assets/images/calculator-mockup.webp"
import nhdashboardMockup from "../assets/images/nhdashboard-mockup.webp"
import wallpaperqrMockup from "../assets/images/wallpaperqr-mockup.webp"
import kwalletMockup from "../assets/images/kwallet-mockup-light.webp"
import kwalletMockupDark from "../assets/images/kwallet-mockup-dark.webp"
import lrqDark from "../assets/images/lrq-dark.webp"
import lrqLight from "../assets/images/lrq-light.webp"
import linkChompDark from "../assets/images/linkchop-dark.webp"
import linkChompLight from "../assets/images/linkchop-light.webp"

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
      imageSrc: kwalletMockup,
      imageSrcDark: kwalletMockupDark,
    },
    {
      id: "learn-react-quick",
      title: "Learn React Quick - free course",
      description:
        "Master React.js in no time. A free course for anyone interested in learning React.js",
      links: [
        {
          url: "https://colinfran.github.io/learn-react-quick/",
          text: "Course",
        },
      ],
      imageSrc: lrqLight,
      imageSrcDark: lrqDark,
    },
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
      imageSrc: calculatorMockup,
    },
  ],
}

export type SiteConfig = typeof siteConfig
