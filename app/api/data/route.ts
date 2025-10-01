import { NextResponse } from "next/server"
import { db } from "@/db"
import { locations } from "@/db/schema"

export const GET = async (): Promise<NextResponse> => {
  try {
    const allLocations = await db.select().from(locations)
    return NextResponse.json({
      success: true,
      data: allLocations,
    })
  } catch (error) {
    console.error("Error fetching locations:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch locations" },
      { status: 500 },
    )
  }
}
