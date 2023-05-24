/* eslint-disable import/no-extraneous-dependencies */
import React from "react"
import "./index.css"
import Arrow from "./arrow"
import Button from "../button"

const email = "hello@colinfran.com"

const About = (): JSX.Element => {
  return (
    <div className="about-section">
      <div>
        <div className="hello-container">
          <h1>Hello, I&apos;m Colin!</h1>
        </div>
        <div>
          <div className="about-me">
            I am a Full Stack Software Engineer and like to focus on building
            dynamic applications using a combination of JavaScript, React.js,
            React Native, Express.js, and TypeScript. Experienced in developing
            Web, iOS, and Android mobile apps with a keen eye for design, user
            experience, and accessibility. Based in San Francisco, I have a
            passion for both coding and technology, as well as for fitness and
            weightlifting. Check out my page and sites!
          </div>
        </div>
        <div className="about-links-wrapper">
          <div className="about-link-item">
            <a
              className="about-link-item-anchor"
              href="https://github.com/colinfran"
            >
              <div className="about-link-item-container">
                <div>Github</div>
                <div className="about-link-item-arrow">
                  <Arrow />
                </div>
              </div>
              <div className="about-link-item-description">
                Projects and Code
              </div>
            </a>
          </div>
          <div className="about-link-item">
            <a
              className="about-link-item-anchor"
              href="https://www.linkedin.com/in/colinfranceschini/"
            >
              <div className="about-link-item-container">
                <div>LinkedIn</div>
                <div className="about-link-item-arrow">
                  <Arrow />
                </div>
              </div>
              <div className="about-link-item-description">
                Professional Experience
              </div>
            </a>
          </div>
        </div>
        <div className="say-hello-wrapper">
          <div className="say-hello-button-wrapper">
            <Button email={email}>Say Hello</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
