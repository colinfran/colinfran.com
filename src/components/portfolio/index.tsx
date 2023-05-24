/* eslint-disable max-len */
/* eslint-disable react/style-prop-object */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react"
import "./index.css"
import data from "./data"
import Item from "./item"

// create mockup images at mockupbro.com
// use hex #E3E4E8

const Portfolio = (): JSX.Element => {
  return (
    <div className="portfolio-section">
      <div>
        <div className="portfolio-container">
          {data.map((item, index) => (
            <Item
              index={index}
              item={item}
              key={`${item.description}-${item.title}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Portfolio
