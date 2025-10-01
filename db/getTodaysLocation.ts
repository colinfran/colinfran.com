import countryCodeEmoji from "country-code-emoji"
import { countryToAlpha2 } from "country-to-iso"
import postgres from "postgres"

type Location = {
  city: string
  state: string
  country: string
  date: string
  longitude: string
  latitude: string
}

export const getTodaysLocation = async (): Promise<string> => {
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
  // Extract last comma-separated segment and trim whitespace
  const parts = location.split(",")
  const locationCountry = parts[parts.length - 1]?.trim() || ""

  // countryToAlpha2 may return a string or an object depending on version.
  // Be defensive: accept either, and fall back to a small map for common cases.
  let countryCode: unknown = countryToAlpha2(locationCountry)

  // Common aliases / normalization
  const aliasMap: Record<string, string> = {
    USA: "US",
    "U.S.": "US",
    "United States": "US",
    "United States of America": "US",
    UK: "GB",
    "U.K.": "GB",
  }

  if (!countryCode) {
    countryCode = aliasMap[locationCountry] ?? undefined
  }

  // If an object was returned, try to extract a sensible alpha-2 code.
  if (typeof countryCode === "object" && countryCode !== null) {
    // try common property names that might contain the code
    const obj: any = countryCode
    countryCode = obj.alpha2 ?? obj.alpha_2 ?? obj["alpha-2"] ?? obj.code ?? obj.iso2 ?? undefined
  }

  if (!countryCode || typeof countryCode !== "string") {
    // Unknown country -> return empty string (no icon) to avoid runtime error
    return ""
  }

  return countryCodeEmoji(countryCode)
}
