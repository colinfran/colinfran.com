"use client"
import { redirect } from "next/navigation"
import React, { useEffect, useState } from "react"

type CountdownRedirectProps = {
  link: string
}

const CountdownRedirect: React.FC<CountdownRedirectProps> = ({ link }) => {
  const [seconds, setSeconds] = useState(5)

  useEffect(() => {
    if (seconds === 0) {
      redirect(link)
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

export default CountdownRedirect
