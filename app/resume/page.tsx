"use client"
import { Icons } from "@/components/Icons"
import React, { FC, useState } from "react"

const Page: FC = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const Icon = Icons["Loader"]

  return (
    <div className="relative">
      <iframe
        className={isLoaded ? "fade-in" : "invisible"}
        src="https://drive.google.com/file/d/1T_Vw7legDgmtCFABY_1GA7UankOD4ErpYa3AVhvEwo4/preview"
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
