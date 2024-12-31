import { NextResponse, NextRequest } from "next/server"
import postgres from "postgres"

/**
 * Handles GET requests to the '/api/location' endpoints.
 * @param {Request} request - The incoming request object.
 * @returns {Promise<Response>} - Returns a response object.
 */

export async function POST(request: NextRequest): Promise<Response> {
  const token = process.env.LOCATION_TOKEN!
  const params = await request.json()
  if (params.id !== token) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 })
  }
  const connectionString = process.env.LOCATION_POSTGRES_URL!
  const sql = postgres(connectionString)
  await sql`INSERT INTO location (date, state, latitude, longitude, city, country)
VALUES (${new Date()}, ${params.state}, ${params.latitude}, ${params.longitude}, ${params.city}, ${params.country});`
  return NextResponse.json({ status: 200, message: "Working" })
}
