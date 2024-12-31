import { NextRequest, NextResponse } from "next/server"

/**
 * Handles GET requests to the '/api/location' endpoints.
 * Retrieves BetterUptime information based on id.
 * @param {Request} request - The incoming request object.
 * @returns {Promise<Response>} - Returns a response object.
 */

type RequestProps = {
  id?: string
  longitude?: string
  latitude?: string
  city?: string
  state?: string
  country?: string
}

export async function GET(
  request: NextRequest,
  { params }: { params: RequestProps },
): Promise<Response> {
  const token = process.env.LOCATION_TOKEN!
  const id = params?.id || ""

  if (id !== token) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 })
  }

  console.log(params)
  return NextResponse.json({ status: 200, message: "Working" })
}
