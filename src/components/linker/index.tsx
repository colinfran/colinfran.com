/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable consistent-return */
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { encode } from "hex-encode-decode"

const links = {
  "6d6f6d7370696373":
    "https://www.dropbox.com/sh/ov4r0ot5c1crw38/AABUE13Z23Ak7BYqjNRVcIERa?dl=0",
  "6d656d617061706170696373":
    "https://www.dropbox.com/sh/f4ovebwnlyqgp0u/AABkFYoVed8RdUKahd1oSHgqa?dl=0",
}

const Linker = (): JSX.Element => {
  const params = useParams()

  const [timeLeft, setTimeLeft] = useState(5)
  const [isValidId] = useState(
    Object.prototype.hasOwnProperty.call(links, encode(params.id!))
  )

  useEffect(() => {
    if (timeLeft === 0) {
      setTimeLeft(0)
      if (isValidId) {
        window.location.href = links[encode(params.id!)]
      } else {
        window.location.href = "/"
      }
    }
    if (!timeLeft) return
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)
    return () => clearInterval(intervalId)
  }, [isValidId, params.id, timeLeft])

  if (!isValidId) {
    return (
      <div className="redirect">
        <p>Not a valid URL.</p>
        <p>{`Redirecting to home page in ${timeLeft} seconds.`}</p>
      </div>
    )
  }
  return (
    <div className="redirect">
      <p>{`Link: ${links[encode(params.id!)]}`}</p>
      <p>{`Redirecting in ${timeLeft} seconds.`}</p>
    </div>
  )
}

export default Linker
