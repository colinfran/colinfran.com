import { LocationType } from "@/db/schema"

export interface HeatmapPoint {
  latitude: number
  longitude: number
  count: number
}

export function generateHeatmapGrid(allLocations: LocationType[], cellSize = 0.01): HeatmapPoint[] {
  const grid: Record<string, HeatmapPoint> = {}

  allLocations.forEach((loc: any) => {
    const lat = Number(loc.latitude)
    const lng = Number(loc.longitude)
    const key = `${Math.floor(lat / cellSize)}_${Math.floor(lng / cellSize)}`
    if (!grid[key])
      grid[key] = {
        latitude: Math.floor(lat / cellSize) * cellSize,
        longitude: Math.floor(lng / cellSize) * cellSize,
        count: 0,
      }
    grid[key].count += 1
  })

  return Object.values(grid)
}
