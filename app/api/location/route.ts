import { NextResponse, NextRequest } from "next/server"
import postgres from "postgres"

/**
 * Handles POST requests to the '/api/location' endpoints.
 * Records my current location and stores in a secure database.
 * @param {Request} request - The incoming request object.
 * @returns {Promise<Response>} - Returns a response object.
 */

export const POST = async (request: NextRequest): Promise<Response> => {
  const token = process.env.LOCATION_TOKEN!
  const params = await request.json()
  try {
    if (params.id !== token) {
      throw new Error("Invalid id")
    }
    const connectionString = process.env.LOCATION_POSTGRES_URL!
    const sql = postgres(connectionString)
    const utcNow = new Date().toISOString()
    const resp = await sql`
      INSERT INTO location (
        date,
        state,
        latitude,
        longitude,
        city,
        country
      ) 
      VALUES (
        ${utcNow},
        ${params.state},
        ${params.latitude},
        ${params.longitude},
        ${params.city},
        ${params.country}
      );`
    if (resp.length > 0) {
      return NextResponse.json({ status: 200 }) // Optionally return the inserted data
    } else {
      throw new Error("Error inserting into db.")
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 })
  }
}
