/* eslint-disable max-len */
/* eslint-disable react/style-prop-object */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState } from "react"
import Button from "../button"
import { ThemeContext } from "../../theme"

// create mockup images at mockupbro.com
// use hex #E3E4E8

type ItemType = {
  item: {
    title: string
    description: string
    links: [
      {
        url: string
        title: string
      }
    ]
    imageSrc: string
    imageSrcDark?: string
  }
  index: number
}

const Item = ({ item, index }): JSX.Element => {
  const [imagesLoaded, setImageLoaded] = useState(false)
  const { theme } = useContext(ThemeContext)
  const img =
    theme === "dark" && item.imageSrcDark ? item.imageSrcDark : item.imageSrc
  return (
    <div className="portfolio-item">
      <div className="item-style" />
      <div className="">
        <div style={{ position: "relative" }}>
          <img
            alt={item.description}
            className={theme !== "dark" ? "show" : "hide"}
            height="100%"
            src={item.imageSrc}
            style={{
              width: "100%",
              height: "100%",
              // position: "absolute",
              top: 0,
              left: 0,
            }}
            width="100%"
            onLoad={() => setImageLoaded(true)}
          />
          <img
            alt={item.description}
            className={theme === "dark" ? "show" : "hide"}
            height="100%"
            src={item.imageSrcDark || item.imageSrc}
            style={{
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
            }}
            width="100%"
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        <div className={`img-placeholder ${imagesLoaded ? "hide" : "show"}`} />
        <div>
          <div className="portfolio-item-title">{item.title}</div>
          <div className="portfolio-item-description">{item.description}</div>
          <div className="portfolio-item-links-container">
            {item.links.map(({ url, title }) => (
              <Button href={url} key={`${url}-${title}`}>
                {title}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Item
