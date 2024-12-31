import postgres from "postgres"

export const getTodaysLocation = async () => {
  const connectionString = process.env.LOCATION_POSTGRES_URL!
  const sql = postgres(connectionString)

  // Get today's date in 'YYYY-MM-DD' format to match the stored date format.
  const today = new Date().toISOString().split("T")[0]

  // Query the database to fetch the most recent location data for today.
  const result: any = await sql`
    SELECT * FROM location
    WHERE DATE(date) = ${today}
    ORDER BY date DESC
    LIMIT 1
  `

  // If there is no result, return null or an appropriate message
  if (result.length === 0) {
    return "Location unavailable"
  }

  const params = result[0]
  if (params.country === "United States") {
    return `${params.city}, ${params.state}, ${params.country}`
  }
  return `${params.city}, ${params.country}`
}
