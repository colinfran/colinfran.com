module.exports = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/:url_id",
        destination: "/api/:url_id",
      },
    ]
  },
}
