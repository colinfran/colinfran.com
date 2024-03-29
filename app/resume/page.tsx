"use client"
import { Icons } from "@/components/Icons"
import React, { useState } from "react"

const Page = (): JSX.Element => {
  const [isLoaded, setIsLoaded] = useState(false)
  const Icon = Icons["Loader"]

  return (
    <div className="relative">
      <iframe
        className={isLoaded ? "fade-in" : "invisible"}
        src="https://drive.google.com/file/d/1FPRUFxKaFPqJmV-BhUZ9e89tPDWL1CbwiR6-Hb4s93E/preview"
        style={{ height: "100vh", width: "100%" }}
        title="resume"
        onLoad={() => setIsLoaded(true)}
      />
      {!isLoaded && (
        <div className="absolute top-20 flex size-full flex-col items-center">
          <Icon aria-labelledby="Loading animation" />
        </div>
      )}
    </div>
  )
}

export default Page
