import { Analysis } from "@/components/providers/data-provider"
import { LocationType } from "@/db/schema"
import { HeatmapPoint } from "./generateHeatmapGrid"
import { calculateDistance } from "./calculateDistance"

// 🔥 Main function to compute insights
export const analyzeLocations = (locations: LocationType[]): Analysis | undefined => {
  if (!locations || locations.length === 0) return undefined

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
    const day = new Date(loc.date).toISOString().split("T")[0]

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
  const clusters = topLocations.slice(0, 5).map((loc, idx) => {
    const found = sortedData.find((d) => `${d.city}, ${d.state}` === loc.location)
    return {
      name: loc.location,
      visits: loc.count,
      type: "Frequent",
      latitude: found ? Number(found.latitude) : 0,
      longitude: found ? Number(found.longitude) : 0,
      color: ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#00ff00"][idx % 5],
    }
  })

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

  // --- Visit Streaks ---
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
  const heatmap: HeatmapPoint[] = []
  const heatmapMap: Record<string, HeatmapPoint> = {}

  sortedData.forEach((loc) => {
    const key = `${loc.latitude},${loc.longitude}`
    if (heatmapMap[key]) {
      heatmapMap[key].count += 1
    } else {
      heatmapMap[key] = {
        latitude: Number(loc.latitude),
        longitude: Number(loc.longitude),
        count: 1,
      }
    }
  })

  heatmap.push(...Object.values(heatmapMap))

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
    monthlyTrends,
    avgTripLength: Math.round(avgTripLength),
    avgStopsPerDay: parseFloat(avgStopsPerDay.toFixed(2)),
    diversityIndex,
    timeBuckets: buckets,
    longestStreak,
    topTransitions,
    heatmap,
  }
}
