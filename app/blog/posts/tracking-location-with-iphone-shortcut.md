---
id: "tracking-location-with-iphone-shortcut"
title: "Location Tracking Using iPhone Shortcuts and Automation"
author: "Colin Franceschini"
date: "2024-12-30T16:47:11.954Z"
imageUrl: "https://i.ibb.co/tQWF0wJ/locationdb.jpg"
---

In today's digital world, location tracking is something we use every day, whether it's for navigation or for tracking our workouts. But I've taken it a step further and built an iPhone shortcut and automation that automatically tracks my location every day. Not only does this help me understand my movements better, but it also allows me to store this data in a database and visualize it in exciting ways.

### How It Works

The process starts with an iPhone Shortcut that sends a POST request to my website's API every day. The request contains information about my current location, including latitude, longitude, city, country, and state.

![iPhone Shortcuts app](https://i.ibb.co/rwTYz8t/shortcuts-automation-screenshot.jpg)

Using Automations, I trigger this shortcut to run every 1.5 hours.

When the API receives this data, it stores it in a PostgreSQL database, as seen in the below Next.js POST request route:

```typescript
import { NextResponse, NextRequest } from 'next/server'
import postgres from 'postgres'

/**
 * Handles POST requests to the '/api/location' endpoints.
 * @param {NextRequest} request - The incoming request object.
 * @returns {Promise<Response>} - Returns a response object.
 */

export async function POST(request: NextRequest): Promise<Response> {
  const token = process.env.LOCATION_TOKEN!
  const params = await request.json()
  // very simple way to prevent spam is by requiring valid token
  if (params.id !== token) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  }
  const connectionString = process.env.LOCATION_POSTGRES_URL!
  const sql = postgres(connectionString)
  await sql`INSERT INTO location (date, state, latitude, longitude, city, country) VALUES (${new Date()}, ${params.state}, ${params.latitude}, ${params.longitude}, ${params.city}, ${params.country});`
  return NextResponse.json({ message: 'Working' }, { status: 200 })
}
```

I then query this database to show my location on my homepage, providing an up-to-date record of where I've been.

```typescript
import React, { FC } as React from "react"
import { getTodaysLocation } from "@/db/getTodaysLocation"
import { siteConfig } from "./config"

const Page: FC = async () => {
  const getTodaysLocation = async () => {
    const connectionString = process.env.POSTGRES_URL!
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
  const location = await getTodaysLocation()
  return (
    <div className="container mb-10 flex flex-col space-y-6 divide-y">
      <div className="space-y-2 pt-6">
        <p className="py-2 text-muted-foreground">
          {`📍 Current Location: ${location}`}
        </p>
      </div>
    </div>
  )
}

export default Page
```

### The Power of Tracking My Location
With my location history tracked every day, the possibilities are endless. I can analyze my movement patterns, see how often I visit certain places, or even track my productivity by seeing how often I work from different locations. There are many exciting things I can do with this data, like creating visualizations, providing location-based suggestions, or even just reflecting on how my habits change over time.

The data can be used to derive various insights, such as identifying places I visit most frequently, tracking travel patterns, or even correlating my work habits with my physical location. This can be a useful tool for self-improvement or just a fun way to visualize my day-to-day life.

One of the most exciting things I'm planning is creating visualizations of my movement over time. I could plot my daily locations on a map, generate heatmaps of my most visited places, or even analyze my travel times between locations. This is just the beginning of what can be done with this data.

### Final Thoughts
Using an iPhone shortcut to track my location every day has been a fun and informative project. By sending data to my website and storing it in a database, I now have access to a wealth of information that can be used in various ways. Whether for fun, self-improvement, or creating insights, tracking my location has become a valuable part of my daily routine.

