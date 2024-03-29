"use client"
import React, { useEffect, useState } from "react"

type CountdownTimerProps = {
  link: string
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ link }) => {
  const [seconds, setSeconds] = useState(5)

  useEffect(() => {
    if (seconds === 0) {
      window.location.href = link
    }
  }, [link, seconds])

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <p>Redirecting in {seconds} seconds.</p>
    </div>
  )
}

export default CountdownTimer
