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
import { FC } from "react"

export const TrendsTab: FC = () => {
  const { analysis } = useData()
  if (!analysis?.monthlyTrends) return null

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Travel Trends Over Time</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer height="100%" width="100%">
          <LineChart data={analysis.monthlyTrends}>
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
                value: "Distance Traveled",
                angle: -90,
                position: "insideLeft",
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
