"use client"

import { LocationInsights } from "@/components/locationInsights"
import { useData } from "@/components/providers/data-provider"
import useLockBodyScroll from "@/hooks/useLockBodyScroll"
import { FC } from "react"

const Page: FC = () => {
  const { loading } = useData()
  useLockBodyScroll(loading)

  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Location Insights</h1>
          <p className="text-muted-foreground">Insights and patterns from your location data</p>
        </div>

        <LocationInsights />
      </div>
    </main>
  )
}

export default Page
