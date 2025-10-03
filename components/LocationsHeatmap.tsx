"use client"

import React, { useEffect, useRef, useState, useCallback, FC } from "react"
import Map, { Source, Layer } from "react-map-gl/mapbox-legacy"
import "mapbox-gl/dist/mapbox-gl.css"
import { Skeleton } from "./ui/skeleton"
import { useData } from "@/components/providers/data-provider"

const LocationsHeatmap: FC = () => {
  const { analysis, loading: dataLoading } = useData()
  const mapRef = useRef<any>(null)
  const [loading, setLoading] = useState(true)
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024,
  )

  const scale = Math.max(0.5, Math.min(1.5, windowWidth / 1024))
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!

  // track window resize
  useEffect(() => {
    const handleResize = (): void => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // fit map to bounds based on heatmap points
  const fitToBounds = useCallback(() => {
    if (!mapRef.current || !analysis?.heatmap?.length) return

    const map = mapRef.current.getMap?.() ?? mapRef.current
    if (!map?.fitBounds) return

    const lats = analysis.heatmap.map((p) => p.latitude)
    const lngs = analysis.heatmap.map((p) => p.longitude)

    let minLat = Math.min(...lats)
    let maxLat = Math.max(...lats)
    let minLng = Math.min(...lngs)
    let maxLng = Math.max(...lngs)

    const EPS = 0.01
    if (minLat === maxLat) {
      minLat -= EPS
      maxLat += EPS
    }
    if (minLng === maxLng) {
      minLng -= EPS
      maxLng += EPS
    }

    const bounds: [[number, number], [number, number]] = [
      [minLng, minLat],
      [maxLng, maxLat],
    ]

    try {
      map.resize()
      map.fitBounds(bounds, { padding: 50 * scale, maxZoom: 15, animate: false })
    } catch {
      const center = [(minLng + maxLng) / 2, (minLat + maxLat) / 2]
      if (map.setCenter) map.setCenter(center)
      if (map.setZoom) map.setZoom(Math.min(3 * scale, 15))
    } finally {
      setLoading(false)
    }
  }, [analysis, scale])

  useEffect(() => {
    fitToBounds()
  }, [fitToBounds, windowWidth, analysis])

  // create GeoJSON features from server-side heatmap points
  const features =
    analysis?.heatmap?.map((p) => ({
      type: "Feature" as const,
      geometry: { type: "Point" as const, coordinates: [p.longitude, p.latitude] },
      properties: { count: p.count },
    })) || []

  const geojson = { type: "FeatureCollection" as const, features }

  const heatmapLayer: any = {
    id: "heatmap",
    type: "heatmap",
    paint: {
      "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 0, 1 * scale, 15, 3 * scale],
      "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 10 * scale, 15, 50 * scale],
      "heatmap-opacity": ["interpolate", ["linear"], ["zoom"], 0, 0.5, 15, 0.8],
      "heatmap-weight": ["get", "count"],
      "heatmap-color": [
        "interpolate",
        ["linear"],
        ["heatmap-density"],
        0,
        "rgba(0,0,255,0)",
        0.5,
        "rgba(0,255,255,0.5)",
        1,
        "rgba(0,255,0,1)",
      ],
    },
  }

  return (
    <div className="relative w-full h-[600px]">
      <Map
        initialViewState={{ latitude: 0, longitude: 0, zoom: 1 }}
        mapboxAccessToken={token}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        projection="mercator"
        ref={mapRef}
        style={{ width: "100%", height: "100%", zIndex: 11 }}
        onLoad={fitToBounds}
      >
        {features.length > 0 && (
          <Source data={geojson} id="locations" type="geojson">
            <Layer {...heatmapLayer} />
          </Source>
        )}
      </Map>

      {(dataLoading || loading) && (
        <div className="absolute top-0 left-0 w-full h-full z-1">
          <Skeleton className="w-full h-full rounded-none" />
        </div>
      )}
    </div>
  )
}

export default LocationsHeatmap
