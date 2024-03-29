import React from "react"
import ReactDOM from "react-dom/client"
import ReactGA from "react-ga4"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import App from "./App"
import { ThemeProvider } from "./theme"
import reportWebVitals from "./reportWebVitals"

ReactGA.initialize("G-FQTDZX59F7")

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
      <Analytics />
      <SpeedInsights />
    </ThemeProvider>
  </React.StrictMode>
)

const SendAnalytics = (): void => {
  ReactGA.send({
    hitType: "pageview",
    page: window.location.pathname,
  })
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(SendAnalytics)
