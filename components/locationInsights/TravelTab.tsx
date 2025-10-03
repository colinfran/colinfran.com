"use client"

import { FC } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts"
import { useData } from "../providers/data-provider"
import { toMiles } from "@/lib/utils"

export const TravelTab: FC = () => {
  const { analysis, unit } = useData()

  if (!analysis) return null

  const lineChartData =
    unit === "mi"
      ? analysis.monthlyTrends.map((item) => ({
          month: item.month,
          distance: toMiles(item.distance),
        }))
      : analysis.monthlyTrends

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {/* Travel Stats */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Travel Summary</CardTitle>
          <CardDescription>Key stats about your travel activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">
                {unit === "mi"
                  ? `${toMiles(analysis!.totalDistance)} mi`
                  : `${analysis?.totalDistance.toLocaleString()} km`}
              </p>
              <p className="text-sm text-muted-foreground">Total Distance</p>
            </div>
            <div>
              <p className="text-2xl font-bold">
                {unit === "mi"
                  ? `${toMiles(analysis!.avgTripLength)} mi`
                  : `${analysis?.avgTripLength.toLocaleString()} km`}
              </p>
              <p className="text-sm text-muted-foreground">Avg Trip Length</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{analysis.avgStopsPerDay}</p>
              <p className="text-sm text-muted-foreground">Avg Stops / Day</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{analysis.uniqueLocations}</p>
              <p className="text-sm text-muted-foreground">Unique Locations</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Travel Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Travel Distance</CardTitle>
          <CardDescription>How far you traveled each month</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer height={300} width="100%">
            <LineChart data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                label={{
                  value: "Month",
                  position: "insideBottom",
                  offset: -5,
                }}
              />
              <YAxis
                label={{
                  value: `Distance Traveled (${unit === "mi" ? "miles" : "km"})`,
                  angle: -90,
                  position: "insideLeft",
                  style: { textAnchor: "middle" },
                }}
              />
              <Tooltip />
              <Line dataKey="distance" stroke="#8884d8" strokeWidth={2} type="monotone" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Transitions */}
      <Card>
        <CardHeader>
          <CardTitle>Frequent Travel Routes</CardTitle>
          <CardDescription>Your most common trips between locations</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer height={300} width="100%">
            <BarChart data={analysis.topTransitions}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="path" hide />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
          <ul className="mt-4 space-y-1 text-sm">
            {analysis.topTransitions.slice(0, 5).map((t, idx) => (
              <li key={idx}>
                <span className="font-medium">{t.path}</span> — {t.count} times
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
