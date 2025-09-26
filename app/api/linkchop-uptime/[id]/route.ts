import { NextRequest, NextResponse } from "next/server"

interface RouteContext {
  params: {
    id: string
  }
}

/**
 * Handles GET requests to the '/linkchop-uptime/[id]' endpoints.
 * Retrieves BetterUptime information based on id.
 * @param {NextRequest} request - The incoming request object.
 * @param {RouteContext} context - The route parameters.
 * @returns {Promise<NextResponse>} - Returns a response object.
 */
export async function GET(
  request: NextRequest,
  context: RouteContext,
): Promise<NextResponse> {
  const searchParams = request.nextUrl.searchParams
  const id = context.params.id

  try {
    const response = await fetch(`https://betteruptime.com/api/v2/monitors/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.BETTERUPTIME_TOKEN}`,
      },
    })

    if (!response.ok) {
      throw new Error("Bad response")
    }

    const data = await response.json()
    const isUp = data?.data?.attributes?.status === "up"

    const message = isUp
      ? searchParams.get("up_message") || "up"
      : searchParams.get("down_message") || "down"

    const color = isUp
      ? searchParams.get("up_color") || "#4c1"
      : searchParams.get("down_color") || "#e05d44"

    const res = {
      schemaVersion: 1,
      label: searchParams.get("label") || "website",
      labelColor: searchParams.get("label_color") || "#555",
      style: searchParams.get("style") || "flat",
      message,
      color,
      isError: false,
      namedLogo: searchParams.get("logo") || undefined,
      logoColor: searchParams.get("logo_color") || undefined,
      cacheSeconds: 300,
    }

    return NextResponse.json(res)
  } catch (err) {
    console.error(err)
    return NextResponse.redirect(new URL("/404", request.url))
  }
}
