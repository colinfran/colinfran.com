import { NextResponse } from "next/server"
import postgres from "postgres"

export async function GET(): Promise<NextResponse> {
  try {
    const connectionString = process.env.POSTGRES_URL!
    console.log(connectionString)
    const sql = postgres(connectionString)
    await sql`select 1`
    return NextResponse.json({ status: 200, message: "Database is running." })
  } catch (err) {
    console.log(err)
    return NextResponse.json({ status: 503, message: "Database is not running.", error: err })
  }
}
