import React from "react"
import img from "./404.svg"
import Button from "../button"
import "./index.css"

const Error404 = (): JSX.Element => {
  return (
    <div className="error-container">
      <div className="error-text">
        <p>404 Error</p>
      </div>
      <img alt="404 page" src={img} />
      <div className="error-text">
        <p>Page not found</p>
      </div>
      <div className="error-button">
        <Button href="/">Go to homepage</Button>
      </div>
    </div>
  )
}

export default Error404
