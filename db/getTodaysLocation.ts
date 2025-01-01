import countryCodeEmoji from "country-code-emoji"
import { countryToAlpha2 } from "country-to-iso"
import postgres from "postgres"

export const getTodaysLocation = async () => {
  const connectionString = process.env.LOCATION_POSTGRES_URL!
  const sql = postgres(connectionString)

  // Get today's date in 'YYYY-MM-DD' format to match the stored date format.
  const today = new Date().toISOString().split("T")[0]

  // Query the database to fetch the most recent location data for today.
  const result: any = await sql`
    SELECT * FROM location
    ORDER BY date DESC
    LIMIT 1
  `

  // If there is no result, return null or an appropriate message
  if (result.length === 0) {
    return "Location unavailable"
  }

  const params = result[0]
  if (params.country === "United States") {
    return `${params.city}, ${params.state}, USA`
  }
  return `${params.city}, ${params.country}`
}

export const getCountryIcon = (location: string): string => {
  const locationCountry = location.split(",")[location.split(",").length - 1]
  const countryCode = countryToAlpha2(locationCountry)!
  return countryCodeEmoji(countryCode)
}
