/* eslint-disable max-len */
import calculatorMockup from "./assets/calculator-mockup.webp"
import nhdashboardMockup from "./assets/nhdashboard-mockup.webp"
import wallpaperqrMockup from "./assets/wallpaperqr-mockup.webp"
import kwalletMockup from "./assets/kwallet-mockup-light.webp"
import kwalletMockupDark from "./assets/kwallet-mockup-dark.webp"

const data = [
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
