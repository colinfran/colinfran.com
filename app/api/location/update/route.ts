import { NextResponse, NextRequest } from "next/server"

/**
 * Handles GET requests to the '/api/location/update' endpoints.
 * @param {Request} request - The incoming request object.
 * @returns {Promise<Response>} - Returns a response object.
 */

export async function POST(request: NextRequest): Promise<Response>  {
  const token = process.env.LOCATION_TOKEN!
  const params = await request.json();
  if (params.id !== token) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 })
  }

  console.log(params)
  return NextResponse.json({ status: 200, message: "Working" })
}
