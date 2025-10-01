// context/LocationDataContext.tsx
"use client"

import { LocationType } from "@/db/schema"
import { calculateDistance } from "@/lib/utils"
import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from "react"



interface DataContextValue {
  locations: LocationType[]
  loading: boolean
  analysis?: any;
}

type DataProps = {
  data: LocationType[]
  success: boolean
}

const DataContext = createContext<DataContextValue>({
  locations: [],
  loading: true,
  analysis: undefined,
})

export const useData = () => useContext(DataContext)

interface Props {
  children: ReactNode
}

export const DataProvider = ({ children }: Props) => {
  const [locations, setLocations] = useState<LocationType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        document.body.style.overflow = "hidden"
        const res = await fetch("/api/data")
        if (res.ok) {
          const json = await res.json()
          setLocations(json.data)
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

  const analysis = useMemo(() => {
    if (locations.length === 0) return undefined

    // Sort by date
    const sortedData = [...locations].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    )

    // --- Travel calculations ---
    let totalDistance = 0
    const dailyDistances: Record<string, number> = {}
    const countryCount: Record<string, number> = {}

    for (let i = 0; i < sortedData.length; i++) {
      const loc = sortedData[i]
      const day = (
        typeof loc.date === "string" ? loc.date : new Date(loc.date).toISOString()
      ).split("T")[0]

      // Daily distances
      if (i > 0) {
        const prev = sortedData[i - 1]
        const dist = calculateDistance(
          Number(prev.latitude),
          Number(prev.longitude),
          Number(loc.latitude),
          Number(loc.longitude),
        )
        totalDistance += dist
        dailyDistances[day] = (dailyDistances[day] || 0) + dist
      }

      // Country distribution
      if (loc.country) countryCount[loc.country] = (countryCount[loc.country] || 0) + 1
    }

    const avgDailyDistance = totalDistance / Math.max(1, Object.keys(dailyDistances).length)
    const maxDailyDistance = Math.max(...Object.values(dailyDistances), 0)

    const countryData = Object.entries(countryCount).map(([country, count]) => ({
      country,
      count,
      percentage: (count / locations.length) * 100,
    }))

    // --- Routine calculations ---
    const locationCount: Record<
      string,
      { count: number; hourly: number[]; weekly: Record<string, number> }
    > = {}

    sortedData.forEach((loc) => {
      const locKey = `${loc.city || ""}, ${loc.state || ""}`
      if (!locationCount[locKey])
        locationCount[locKey] = {
          count: 0,
          hourly: Array(24).fill(0),
          weekly: { Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0 },
        }

      locationCount[locKey].count += 1

      const date = new Date(loc.date)
      locationCount[locKey].hourly[date.getHours()] += 1
      locationCount[locKey].weekly[date.toLocaleDateString("en-US", { weekday: "short" })] += 1
    })

    const topLocations = Object.entries(locationCount)
      .map(([location, data]) => ({
        location,
        count: data.count,
        percentage: (data.count / locations.length) * 100,
        hourly_pattern: data.hourly.map((count, hour) => ({ hour, count })),
        weekly_pattern: Object.entries(data.weekly).map(([day, count]) => ({ day, count })),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    const hourlyData =
      topLocations[0]?.hourly_pattern.map((h) => ({ hour: `${h.hour}:00`, count: h.count })) ||
      Array.from({ length: 24 }, (_, hour) => ({ hour: `${hour}:00`, count: 0 }))
    const weeklyData = topLocations[0]?.weekly_pattern || []

    // --- Clusters ---
    const clusters = topLocations.slice(0, 5).map((loc, idx) => ({
      name: loc.location,
      visits: loc.count,
      type: "Frequent",
      latitude: sortedData.find((d) => `${d.city}, ${d.state}` === loc.location)?.latitude || 0,
      longitude: sortedData.find((d) => `${d.city}, ${d.state}` === loc.location)?.longitude || 0,
      color: ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#00ff00"][idx % 5],
    }))

    // --- Anomalies ---
    const anomalies = Object.entries(dailyDistances)
      .filter(([_, dist]) => dist > 2 * avgDailyDistance)
      .map(([day, dist]) => ({
        date: day,
        distance: Math.round(dist),
        reason: "High travel distance",
      }))

    const totalDays = Math.max(
      1,
      Math.ceil(
        (new Date(sortedData[sortedData.length - 1].date).getTime() -
          new Date(sortedData[0].date).getTime()) /
          (1000 * 60 * 60 * 24),
      ),
    )

    // --- Monthly Travel Trends ---
    const monthlyMap: Record<string, number> = {}
    for (let i = 1; i < sortedData.length; i++) {
      const month = new Date(sortedData[i].date).toLocaleString("default", {
        month: "short",
        year: "numeric",
      })
      const dist = calculateDistance(
        Number(sortedData[i - 1].latitude),
        Number(sortedData[i - 1].longitude),
        Number(sortedData[i].latitude),
        Number(sortedData[i].longitude),
      )
      monthlyMap[month] = (monthlyMap[month] || 0) + dist
    }
    const monthlyTrends = Object.entries(monthlyMap).map(([month, distance]) => ({
      month,
      distance: Math.round(distance),
    }))

    // --- Travel Efficiency ---
    const avgTripLength = totalDistance / Math.max(1, sortedData.length - 1)
    const avgStopsPerDay = sortedData.length / totalDays

    // --- Location Diversity (Shannon entropy) ---
    const totalVisits = locations.length
    const entropy =
      -Object.values(locationCount).reduce((sum, loc) => {
        const p = loc.count / totalVisits
        return sum + (p > 0 ? p * Math.log2(p) : 0)
      }, 0) || 0
    const diversityIndex = parseFloat(entropy.toFixed(2))

    // --- Day vs Night Activity Buckets ---
    const buckets = { Night: 0, Morning: 0, Afternoon: 0, Evening: 0 }
    sortedData.forEach((loc) => {
      const hour = new Date(loc.date).getHours()
      if (hour < 6) buckets.Night++
      else if (hour < 12) buckets.Morning++
      else if (hour < 18) buckets.Afternoon++
      else buckets.Evening++
    })

    // --- Visit Streaks (consecutive days visiting different locations) ---
    let longestStreak = 0
    let currentStreak = 1
    for (let i = 1; i < sortedData.length; i++) {
      const prevDay = new Date(sortedData[i - 1].date).toDateString()
      const currDay = new Date(sortedData[i].date).toDateString()
      if (prevDay !== currDay) currentStreak++
      else currentStreak = 1
      longestStreak = Math.max(longestStreak, currentStreak)
    }

    // --- Frequent Transitions ---
    const transitionCount: Record<string, number> = {}
    for (let i = 1; i < sortedData.length; i++) {
      const from = `${sortedData[i - 1].city}, ${sortedData[i - 1].state}`
      const to = `${sortedData[i].city}, ${sortedData[i].state}`
      const path = `${from} → ${to}`
      transitionCount[path] = (transitionCount[path] || 0) + 1
    }
    const topTransitions = Object.entries(transitionCount)
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    // --- Hour/Day Heatmap ---
    const heatmap: Record<string, Record<number, number>> = {}
    sortedData.forEach((loc) => {
      const d = new Date(loc.date)
      const day = d.toLocaleDateString("en-US", { weekday: "short" })
      const hour = d.getHours()
      if (!heatmap[day]) heatmap[day] = {}
      heatmap[day][hour] = (heatmap[day][hour] || 0) + 1
    })

    return {
      topLocations,
      hourlyData,
      weeklyData,
      totalDistance: Math.round(totalDistance),
      avgDailyDistance: Math.round(avgDailyDistance),
      maxDailyDistance: Math.round(maxDailyDistance),
      countryData,
      clusters,
      anomalies,
      totalDays,
      uniqueLocations: new Set(locations.map((d) => `${d.city}, ${d.state}`)).size,
      // 🔥 New insights
      monthlyTrends,
      avgTripLength: Math.round(avgTripLength),
      avgStopsPerDay: parseFloat(avgStopsPerDay.toFixed(2)),
      diversityIndex,
      timeBuckets: buckets,
      longestStreak,
      topTransitions,
      heatmap,
    }
  }, [locations])

  return <DataContext.Provider value={{ locations, loading, analysis }}>{children}</DataContext.Provider>
}
