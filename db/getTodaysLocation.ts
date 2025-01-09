import countryCodeEmoji from "country-code-emoji"
import { countryToAlpha2 } from "country-to-iso"
import postgres from "postgres"

type Location = {
  city: string;
  state: string;
  country: string;
  date: string;
  longitude: string;
  latitude: string;
}

export const getTodaysLocation = async () => {
  const connectionString = process.env.LOCATION_POSTGRES_URL!
  const sql = postgres(connectionString)
  // Query the database to fetch the most recent location data.
  const result: Location[] = await sql`
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
