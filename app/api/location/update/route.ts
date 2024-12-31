import { NextResponse, NextRequest } from "next/server"

/**
 * Handles GET requests to the '/api/location/update' endpoints.
 * @param {Request} request - The incoming request object.
 * @returns {Promise<Response>} - Returns a response object.
 */

export async function GET(request: NextRequest): Promise<Response> {
  const searchParams = request.nextUrl.searchParams
  const token = process.env.LOCATION_TOKEN!  
  const id = searchParams.get('id')
  const params = {
    latitude: searchParams.get('latitude'),
    longitude: searchParams.get('longitude'),
    city: searchParams.get('city'),
    state: searchParams.get('state'),
    country: searchParams.get('country'),
  }
  if (id !== token) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 })
  }

  console.log(params)
  return NextResponse.json({ status: 200, message: "Working" })
}
