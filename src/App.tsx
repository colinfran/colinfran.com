/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react"
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Linker from "./components/linker"
import Home from "./components/home"
import Error404 from "./components/404"
import Resume from "./components/resume"

const App = (): JSX.Element => {
  return (
    <Router>
      <Routes>
        {["/", "/index", "/index.html"].map((path) => (
          <Route element={<Home />} key={path} path={path} />
        ))}
        <Route element={<Resume />} path="/resume" />
        <Route element={<Linker />} path="/u/:id" />
        <Route element={<Error404 />} path="*" />
      </Routes>
    </Router>
  )
}

export default App
