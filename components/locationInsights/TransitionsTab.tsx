"use client"

import { FC } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useData } from "../providers/data-provider"

export const TransitionsTab: FC = () => {
  const { analysis } = useData()
  if (!analysis?.topTransitions) return null

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Frequent Transitions</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer height="100%" width="100%">
          <BarChart
            data={analysis.topTransitions}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="path" type="category" />
            <Tooltip />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
