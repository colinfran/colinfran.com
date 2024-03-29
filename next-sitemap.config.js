/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://colinfran.com/",
  exclude: ["/icon.svg", "/apple-icon.png", "/manifest.webmanifest", "/api" ,"/api/*"],
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
}
