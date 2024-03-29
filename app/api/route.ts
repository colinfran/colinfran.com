import { NextResponse } from "next/server"

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ status: 200, message: "Welcome to the https://colinfran.com API" })
}
