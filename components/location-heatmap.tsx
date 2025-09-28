"use client";

import React, { useEffect, useRef, useState } from "react";
import Map, { Source, Layer } from "react-map-gl/mapbox-legacy";
import "mapbox-gl/dist/mapbox-gl.css";
import { Skeleton } from "./ui/skeleton";
import { useData } from "@/components/providers/data-provider";

const LocationHeatmap: React.FC = () => {
  const { locations, loading: dataLoading } = useData();
  const mapRef = useRef<any>(null);
  const [loading, setLoading] = useState(true); // internal loading
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!

  // window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fit bounds and mark loading false
  useEffect(() => {
    if (!mapRef.current || !locations || locations.length === 0) return;

    const lats = locations.map((loc) => parseFloat(loc.latitude as unknown as string));
    const lngs = locations.map((loc) => parseFloat(loc.longitude as unknown as string));

    const bounds: [[number, number], [number, number]] = [
      [Math.min(...lngs), Math.min(...lats)],
      [Math.max(...lngs), Math.max(...lats)],
    ];

    mapRef.current.fitBounds(bounds, { padding: 50, maxZoom: 3 * scale, offset: [0, -134/2] });
    setLoading(false); // map + data ready
  }, [locations]);

  const features = locations?.map((loc) => {
    const lat = parseFloat(loc.latitude as unknown as string);
    const lng = parseFloat(loc.longitude as unknown as string);
    return {
      type: "Feature" as const,
      geometry: { type: "Point" as const, coordinates: [lng, lat] },
      properties: { count: 1 },
    };
  }) || [];

  const geojson = { type: "FeatureCollection" as const, features };
  const lats = features.map((f) => f.geometry.coordinates[1]);
  const lngs = features.map((f) => f.geometry.coordinates[0]);
  const centerLat = lats.length ? (Math.min(...lats) + Math.max(...lats)) / 2 : 0;
  const centerLng = lngs.length ? (Math.min(...lngs) + Math.max(...lngs)) / 2 : 0;
  const scale = Math.max(0.5, Math.min(1.5, windowWidth / 1024));

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
  };

  return (
    <div className="relative w-full h-[600px] border rounded-lg">
      {/* Always render the map */}
      <Map
        ref={mapRef}
        initialViewState={{
          latitude: centerLat,
          longitude: centerLng,
          zoom: 3 * scale,
        }}
        projection="mercator"
        mapStyle="mapbox://styles/mapbox/dark-v11"
        mapboxAccessToken={token}
        style={{ width: "100%", height: "100%", zIndex: 11, }}
      >
        {features.length > 0 && (
          <Source id="locations" type="geojson" data={geojson}>
            <Layer {...heatmapLayer} />
          </Source>
        )}
      </Map>

      {/* Skeleton overlay */}
      {(dataLoading || loading) && (
        <div className="absolute top-0 left-0 w-full h-full z-1">
          <Skeleton className="w-full h-full rounded-none" />
        </div>
      )}
    </div>
  );
};

export default LocationHeatmap;
