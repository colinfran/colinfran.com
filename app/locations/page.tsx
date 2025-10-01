"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useData } from "@/components/providers/data-provider"
import LocationHeatmap from "@/components/location-heatmap"
import useLockBodyScroll from "@/hooks/useLockBodyScroll"
import { FC } from "react"

export const Page: FC = () => {
  const { locations, loading } = useData()
  useLockBodyScroll(loading)

  if (loading) {
    return (
      <main className="min-h-screen bg-background py-8 px-4">
        <div className="flex flex-col container mx-auto gap-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map(
              (_, i): FC => (
                <Card key={i}>
                  <CardContent className="p-4 text-center h-[84px]">
                    <Skeleton className="h-8 w-16 mx-auto mb-2" />
                    <Skeleton className="h-4 w-24 mx-auto" />
                  </CardContent>
                </Card>
              ),
            )}
          </div>
          <LocationHeatmap />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="flex flex-col container mx-auto gap-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{locations?.length.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Locations</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">
                {new Set(locations?.map((d) => `${d.city}, ${d.state}`)).size.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Unique Cities</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">
                {new Set(locations?.map((d) => d.country).filter((c) => c !== "")).size}
              </div>
              <div className="text-sm text-muted-foreground">Countries</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{Math.round((locations?.length * 1.5) / 24)}</div>
              <div className="text-sm text-muted-foreground">Days Tracked</div>
            </CardContent>
          </Card>
        </div>
        <LocationHeatmap />
      </div>
    </main>
  )
}
