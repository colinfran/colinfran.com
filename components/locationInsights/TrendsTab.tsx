"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { useData } from "../providers/data-provider"
import { FC, useMemo } from "react"
import { toMiles } from "@/lib/utils"

export const TrendsTab: FC = () => {
  const { analysis, unit } = useData()

  const lineChartData = useMemo(() => {
    if (!analysis?.monthlyTrends) return []
    return unit === "mi"
      ? analysis.monthlyTrends.map((item) => ({
          month: item.month,
          distance: toMiles(item.distance),
        }))
      : analysis.monthlyTrends
  }, [analysis, unit])

  if (lineChartData.length === 0) return null

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Travel Trends Over Time</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer height="100%" width="100%">
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
  )
}
