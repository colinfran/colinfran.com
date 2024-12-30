import { NextRequest, NextResponse } from "next/server"

const token = process.env.LOCATION_TOKEN
/**
 * Handles GET requests to the '/api/location' endpoints.
 * Retrieves BetterUptime information based on id.
 * @param {Request} request - The incoming request object.
 * @returns {Promise<Response>} - Returns a response object.
 */

type RequestProps = {
  id: string
  longitude: string
  latitude: string
  city: string
  state: string
  country: string
}

export async function GET(
  request: NextRequest,
  { params }: { params: RequestProps },
): Promise<Response> {
  const id = params.id
  if (id !== token) {
    return new Response("Invalid id", {
      status: 400,
    })
  }
  console.log(params)
  return NextResponse.json({ status: 200, message: "Working" })
  // try {
  //   const connectionString = process.env.LOCATION_POSTGRES_URL!
  //   const sql = postgres(connectionString)
  //   await sql`select 1`
  //   return NextResponse.json({ status: 200, message: "Database is running." })
  // } catch (err) {
  //   console.log(err)
  //   return NextResponse.json({ status: 503, message: "Database is not running.", error: err })
  // }
}
