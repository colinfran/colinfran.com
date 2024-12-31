import { NextResponse, NextRequest } from "next/server"
import postgres from "postgres"

/**
 * Handles GET requests to the '/api/location/today' endpoint.
 * @param {NextRequest} request - The incoming request object.
 * @returns {Promise<Response>} - Returns a response object with today's location data.
 */
export async function GET(request: NextRequest): Promise<Response> {
  const connectionString = process.env.LOCATION_POSTGRES_URL!
  const sql = postgres(connectionString)

  // Get today's date in 'YYYY-MM-DD' format to match the stored date format.
  const today = new Date().toISOString().split('T')[0]

  // Query the database to fetch today's location data.
  const result = await sql`
    SELECT * FROM location
    WHERE DATE(date) = ${today}
  `

  // If no data is found for today, return a 404 with a message.
  if (result.length === 0) {
    return NextResponse.json({ error: "No data found for today" }, { status: 404 })
  }

  // Return the fetched data as a JSON response.
  return NextResponse.json(result)
}
