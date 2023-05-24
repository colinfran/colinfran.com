import React, { useContext } from "react"
import { DarkModeSwitch } from "react-toggle-dark-mode"
import { ThemeContext } from "../../theme"
import About from "../about"
import Portfolio from "../portfolio"

const Home = (): JSX.Element => {
  const { theme, setTheme } = useContext(ThemeContext)
  const adjustDarkMode = (isDarkMode: boolean): void => {
    if (isDarkMode) {
      setTheme("dark")
    } else {
      setTheme("light")
    }
  }

  return (
    <div className="homepage">
      <div className="dark-mode-toggle">
        <DarkModeSwitch
          checked={theme === "dark"}
          role="button"
          size={30}
          sunColor="#121212"
          onChange={(e) => adjustDarkMode(e)}
        />
      </div>
      <div className="page-divider">
        <About />
        <Portfolio />
      </div>
    </div>
  )
}

export default Home
