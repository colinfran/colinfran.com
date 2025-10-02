// context/LocationDataContext.tsx
"use client"

import { HeatmapPoint } from "@/app/api/location/analysis/generateHeatmapGrid"

import React, { createContext, useContext, useState, useEffect, ReactNode, FC } from "react"

export interface Analysis {
  topLocations: {
    location: string
    count: number
    percentage: number
    hourly_pattern: { hour: number; count: number }[]
    weekly_pattern: { day: string; count: number }[]
  }[]
  hourlyData: { hour: string; count: number }[]
  weeklyData: { day: string; count: number }[]
  totalDistance: number
  avgDailyDistance: number
  maxDailyDistance: number
  countryData: { country: string; count: number; percentage: number }[]
  clusters: {
    name: string
    visits: number
    type: string
    latitude: number
    longitude: number
    color: string
  }[]
  anomalies: { date: string; distance: number; reason: string }[]
  totalDays: number
  uniqueLocations: number
  monthlyTrends: { month: string; distance: number }[]
  avgTripLength: number
  avgStopsPerDay: number
  diversityIndex: number
  timeBuckets: {
    Night: number
    Morning: number
    Afternoon: number
    Evening: number
  }
  longestStreak: number
  topTransitions: { path: string; count: number }[]
  heatmap: HeatmapPoint[]
}

interface DataContextValue {
  loading: boolean
  analysis?: Analysis
}

const DataContext = createContext<DataContextValue>({
  loading: true,
  analysis: undefined,
})

export const useData = (): DataContextValue => useContext(DataContext)

interface Props {
  children: ReactNode
}

export const DataProvider: FC<Props> = ({ children }) => {
  const [analysis, setAnalysis] = useState(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        document.body.style.overflow = "hidden"
        const res = await fetch("/api/location/analysis", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        })
        if (res.ok) {
          const json = await res.json()
          console.log("hereerrere", json)
          setAnalysis(json.data)
        } else {
          console.error("Failed to fetch locations")
        }
      } catch (error) {
        console.error("Error fetching locations:", error)
      } finally {
        setLoading(false)
        document.body.style.overflow = "scroll"
      }
    }

    fetchData()
  }, [])

  return <DataContext.Provider value={{ loading, analysis }}>{children}</DataContext.Provider>
}
