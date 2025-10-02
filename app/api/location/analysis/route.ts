import { NextResponse } from "next/server"
import { db } from "@/db"
import { locations } from "@/db/schema"
import { analyzeLocations } from "./analyzeData"
import { generateHeatmapGrid } from "./generateHeatmapGrid"

export const POST = async (): Promise<NextResponse> => {
  try {
    const allLocations = await db.select().from(locations)

    // server-side analysis (your previous analyzeLocations function)
    const analysis = analyzeLocations(allLocations)

    // generate heatmap points
    const heatmap = generateHeatmapGrid(allLocations)

    return NextResponse.json({
      success: true,
      data: { ...analysis, heatmap },
    })
  } catch (error) {
    console.error("Error fetching locations:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch locations" },
      { status: 500 },
    )
  }
}
