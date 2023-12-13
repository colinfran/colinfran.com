/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable consistent-return */
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const keys = process.env.REACT_APP_VALID_KEYS!.split(" ")
const links = process.env.REACT_APP_VALID_LINKS!.split(" ")

const Linker = (): JSX.Element => {
  const params = useParams()
  const json = {}
  // const json = JSON.parse(objectVal)
  const [timeLeft, setTimeLeft] = useState(5)
  const [link] = useState(() => {
    const index = keys.indexOf(params.id!)
    if (index !== -1) {
      return links[index]
    }
    return "/"
  })

  useEffect(() => {
    if (timeLeft === 0) {
      setTimeLeft(0)
      window.location.href = link
    }
    if (!timeLeft) return
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)
    return () => clearInterval(intervalId)
  }, [params.id, timeLeft, link])

  if (link === "/") {
    return (
      <div className="redirect">
        <p>Not a valid URL.</p>
        <p>{`Redirecting to home page in ${timeLeft} seconds.`}</p>
      </div>
    )
  }
  return (
    <div className="redirect">
      <p>{`Link: ${link}`}</p>
      <p>{`Redirecting in ${timeLeft} seconds.`}</p>
    </div>
  )
}

export default Linker
