"use client"

import { FC } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"
import { useData } from "../providers/data-provider"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA00FF", "#FF0055", "#00FFAA"]

export const PatternsTab: FC = () => {
  const { analysis } = useData()
  if (!analysis) return null

  // Top Locations Pie
  const topLocationData = analysis.topLocations.map((loc: any, idx: number) => ({
    name: loc.location,
    value: loc.count,
    color: COLORS[idx % COLORS.length],
  }))

  // Top Transitions List
  const topTransitions = analysis.topTransitions || []

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Top Locations */}
      <Card>
        <CardHeader>
          <CardTitle>Top Locations</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex justify-center items-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={topLocationData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label={({ name, value }) => `${name} (${value})`}
              >
                {topLocationData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Visit Streaks & Top Transitions */}
      <Card>
        <CardHeader>
          <CardTitle>Visit Streaks & Transitions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <strong>Longest Visit Streak:</strong> {analysis.longestStreak} days
          </div>
          <div>
            <strong>Top Transitions:</strong>
            <ol className="list-decimal list-inside mt-1 space-y-1 max-h-60 overflow-y-auto">
              {topTransitions.map((t: any, idx: number) => (
                <li key={idx}>
                  {t.path} ({t.count} times)
                </li>
              ))}
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
