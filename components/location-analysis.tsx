"use client"

import { useMemo, useState, useEffect, use } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import {
  Clock,
  MapPin,
  TrendingUp,
  AlertTriangle,
  Home,
  Briefcase,
  Calendar,
  Route,
} from "lucide-react"
import { useData } from "@/components/providers/data-provider"
import { Skeleton } from "./ui/skeleton"
import useLockBodyScroll from "@/hooks/useLockBodyScroll"

export const LocationAnalysis = () => {
  const { locations, loading } = useData()
  useLockBodyScroll(loading)
  // Helper: Haversine distance in km
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const analysis = useMemo(() => {
    if (locations.length === 0) return null

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

    // Hourly and weekly patterns (aggregate of top location)
    const hourlyData =
      topLocations[0]?.hourly_pattern.map((h) => ({ hour: `${h.hour}:00`, count: h.count })) ||
      Array.from({ length: 24 }, (_, hour) => ({ hour: `${hour}:00`, count: 0 }))
    const weeklyData = topLocations[0]?.weekly_pattern || []

    // --- Simple cluster detection (top 5 locations by visits) ---
    const clusters = topLocations.slice(0, 5).map((loc, idx) => ({
      name: loc.location,
      visits: loc.count,
      type: "Frequent",
      latitude: sortedData.find((d) => `${d.city}, ${d.state}` === loc.location)?.latitude || 0,
      longitude: sortedData.find((d) => `${d.city}, ${d.state}` === loc.location)?.longitude || 0,
      color: ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#00ff00"][idx % 5],
    }))

    // --- Simple anomaly detection: daily distance > 2x average ---
    const anomalies = Object.entries(dailyDistances)
      .filter(([day, dist]) => dist > 2 * avgDailyDistance)
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
    }
  }, [locations])

  if (!analysis) {
    return (
      <div className="w-full h-[calc(100vh-200px)]">
        <Skeleton className="w-full h-full rounded-none" />
      </div>
    )
  }

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#00ff00", "#ff00ff", "#00ffff"]

  return (
    // ...rest of your component JSX, using `analysis` for all charts/cards
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Distance</CardTitle>
            <Route className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analysis.totalDistance.toLocaleString()} km</div>
            <p className="text-xs text-muted-foreground">Across {analysis.totalDays} days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Daily Distance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analysis.avgDailyDistance} km</div>
            <p className="text-xs text-muted-foreground">Per day average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Locations</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analysis.uniqueLocations}</div>
            <p className="text-xs text-muted-foreground">Different places visited</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Max Daily Distance</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analysis.maxDailyDistance} km</div>
            <p className="text-xs text-muted-foreground">Longest travel day</p>
          </CardContent>
        </Card>
      </div>

    <Tabs className="space-y-4" defaultValue="routines">
      {/* Scrollable Tabs Navigation */}
      <div className="overflow-x-auto">
        <TabsList className="flex w-max gap-2 min-w-full">
          <TabsTrigger value="routines" className="flex-shrink-0">
            Daily Routines
          </TabsTrigger>
          <TabsTrigger value="travel" className="flex-shrink-0">
            Travel Patterns
          </TabsTrigger>
          <TabsTrigger value="clusters" className="flex-shrink-0">
            Important Places
          </TabsTrigger>
          <TabsTrigger value="anomalies" className="flex-shrink-0">
            Anomalies
          </TabsTrigger>
        </TabsList>
      </div>

      {/* Routines Tab */}
      <TabsContent className="space-y-4" value="routines">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Most Visited Places */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" /> Most Visited Places
              </CardTitle>
              <CardDescription>Your top locations by frequency</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analysis.topLocations.map((location, index) => (
                  <div className="flex items-center justify-between" key={location.location}>
                    <div className="flex items-center gap-2">
                      <Badge variant={index === 0 ? "default" : "secondary"}>{index + 1}</Badge>
                      <span className="font-medium">{location.location}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{location.count} visits</div>
                      <div className="text-xs text-muted-foreground">
                        {location.percentage.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Hourly Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" /> Hourly Activity Pattern
              </CardTitle>
              <CardDescription>When you're most active throughout the day</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer height={200} width="100%">
                <AreaChart data={analysis.hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    dataKey="count"
                    fill="#8884d8"
                    fillOpacity={0.3}
                    stroke="#8884d8"
                    type="monotone"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Pattern */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" /> Weekly Activity Pattern
            </CardTitle>
            <CardDescription>Your activity levels throughout the week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer height={300} width="100%">
              <BarChart data={analysis.weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Travel Tab */}
      <TabsContent className="space-y-4" value="travel">
        <Card>
          <CardHeader>
            <CardTitle>Country Distribution</CardTitle>
            <CardDescription>Where you spend your time geographically</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer height={400} width="100%">
              <PieChart>
                <Pie
                  cx="50%"
                  cy="50%"
                  data={analysis.countryData}
                  dataKey="count"
                  fill="#8884d8"
                  label={({ country, percentage }) =>
                    `${country} (${(percentage as number).toFixed(1)}%)`
                  }
                  labelLine={false}
                  outerRadius={120}
                >
                  {analysis.countryData.map((entry, index) => (
                    <Cell fill={COLORS[index % COLORS.length]} key={`cell-${index}`} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Clusters Tab */}
      <TabsContent className="space-y-4" value="clusters">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" /> Important Places Analysis
            </CardTitle>
            <CardDescription>
              Automatically identified significant locations in your routine
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analysis.clusters.map((cluster) => (
                <div
                  className="flex items-center justify-between p-4 border rounded-lg"
                  key={cluster.name}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: cluster.color }} />
                    <div>
                      <div className="font-medium">{cluster.name}</div>
                      <div className="text-sm text-muted-foreground">{cluster.type}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{cluster.visits} visits</div>
                    <Progress
                      className="w-20 mt-1"
                      value={(cluster.visits / (analysis.topLocations[0]?.count || 1)) * 100}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Anomalies Tab */}
      <TabsContent className="space-y-4" value="anomalies">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" /> Anomaly Detection
            </CardTitle>
            <CardDescription>Days with unusual travel patterns or distances</CardDescription>
          </CardHeader>
          <CardContent>
            {analysis.anomalies.length > 0 ? (
              <div className="space-y-3">
                {analysis.anomalies.map((anomaly, index) => (
                  <div
                    className="flex items-center justify-between p-3 bg-destructive/10 border border-destructive/20 rounded-lg"
                    key={index}
                  >
                    <div>
                      <div className="font-medium">
                        {new Date(anomaly.date).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-muted-foreground">Unusual travel day</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-destructive">{anomaly.distance} km</div>
                      <div className="text-xs text-muted-foreground">
                        {Math.round(
                          (anomaly.distance / Math.max(analysis.avgDailyDistance, 1)) * 100,
                        )}
                        % above average
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                No significant anomalies detected in your travel patterns
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>


    </div>
  )
}
