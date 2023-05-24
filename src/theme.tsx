/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState, createContext, useEffect } from "react"

// exposed context for doing awesome things directly in React
export const ThemeContext = createContext({
  theme: "",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setTheme: (theme: string) => {},
})

export const ThemeProvider = ({ children }) => {
  const isBrowserDefaulDark = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches

  const getDefaultTheme = (): string => {
    const localStorageTheme = localStorage.getItem("mode")
    const browserDefault = isBrowserDefaulDark() ? "dark" : "light"
    return localStorageTheme || browserDefault
  }

  const [theme, setTheme] = useState(getDefaultTheme())

  const [isPreload, turnOffPreload] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      turnOffPreload(false)
    }, 500)
  }, [])

  useEffect(() => {
    document.body.className = `${isPreload ? "preload " : ""}${theme}`
    localStorage.setItem("mode", theme)
  }, [theme, isPreload])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
