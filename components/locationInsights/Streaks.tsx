"use client"

import { FC } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useData } from "../providers/data-provider"

export const StreaksTab: FC = () => {
  const { analysis } = useData()
  if (!analysis?.longestStreak) return null

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Visit Streaks</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg">
          Your longest streak of consecutive days visiting new locations is{" "}
          <span className="font-bold">{analysis.longestStreak}</span> days.
        </p>
      </CardContent>
    </Card>
  )
}
