/* eslint-disable max-len */
import calculatorMockup from "./assets/calculator-mockup.webp"
import nhdashboardMockup from "./assets/nhdashboard-mockup.webp"
import wallpaperqrMockup from "./assets/wallpaperqr-mockup.webp"
import kwalletMockup from "./assets/kwallet-mockup-light.webp"
import kwalletMockupDark from "./assets/kwallet-mockup-dark.webp"
import lrqDark from "./assets/lrq-dark.webp"
import lrqLight from "./assets/lrq-light.webp"
import linkChompDark from "./assets/linkchop-dark.webp"
import linkChompLight from "./assets/linkchop-light.webp"

const data = [
  {
    title: "LinkChop",
    description:
      "A simple url shortener with free and premium features. Built with Next.js, NextAuth, Tailwind, shadcn/ui, PostgreSQL, and Stripe.",
    links: [
      {
        url: "https://linkchop.com/",
        title: "Website",
      },
    ],
    imageSrc: linkChompLight,
    imageSrcDark: linkChompDark,
  },
  {
    title: "kwallet",
    description: "A Kaspa wallet app for iOS and Android",
    links: [
      {
        url: "https://kwallet.app/?utm_source=colinfran-website&utm_medium=colinfran-website",
        title: "Website",
      },
      {
        url: "https://github.com/colinfran/kwallet",
        title: "GitHub",
      },
    ],
    imageSrc: kwalletMockup,
    imageSrcDark: kwalletMockupDark,
  },
  {
    title: "Learn React Quick - free course",
    description:
      "Master React.js in no time. A free course for anyone interested in learning React.js",
    links: [
      {
        url: "https://colinfran.github.io/learn-react-quick/",
        title: "Course",
      },
      {
        url: "https://github.com/colinfran/learn-react-quick",
        title: "GitHub",
      },
    ],
    imageSrc: lrqLight,
    imageSrcDark: lrqDark,
  },
  {
    title: "NHDashboard",
    description:
      "NHDashboard is a web app dashboard that displays information about your cryptocurrency mining rigs using NiceHash.",
    links: [
      {
        url: "https://colinfran.github.io/nh-dashboard/",
        title: "Demo",
      },
      {
        url: "https://github.com/colinfran/nh-dashboard",
        title: "GitHub",
      },
    ],
    imageSrc: nhdashboardMockup,
  },
  {
    title: "WallpaperQR",
    description:
      "WallpaperQR takes the effort out of people having to enter in your information into someone's phone when you are networking. A simplistic wallpaper generator that is easy to use.",
    links: [
      {
        url: "https://colinfran.github.io/wallpaperqr/",
        title: "Website",
      },
      {
        url: "https://apps.apple.com/us/app/wallpaperqr/id1558057109",
        title: "App Store",
      },
    ],
    imageSrc: wallpaperqrMockup,
  },
  {
    title: "Calculator for Minimalists",
    description:
      "A basic, minimalistic calculator. Nothing special. Just a plain calculator. Sometimes you just need something simple.",
    links: [
      {
        url: "https://colinfran.github.io/calculator-for-minimalists/",
        title: "Website",
      },
      {
        url: "https://apps.apple.com/us/app/calculator-for-minimalists/id1560501633",
        title: "App Store",
      },
    ],
    imageSrc: calculatorMockup,
  },
]

export default data
