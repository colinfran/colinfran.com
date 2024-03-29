import { NextResponse } from "next/server"

/**
 * Handles GET requests to the '/api' endpoints.
 * Root route for the https://colinfran.com API.
 * @returns {Promise<NextResponse>} - Returns a response object.
 */

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ status: 200, message: "Welcome to the https://colinfran.com API" })
}
