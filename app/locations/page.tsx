"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useData } from "@/components/providers/data-provider"
import LocationHeatmap from "@/components/location-heatmap"
import useLockBodyScroll from "@/hooks/useLockBodyScroll"
import { FC, ReactNode } from "react"

const Page: FC = () => {
  const { analysis, loading } = useData()
  useLockBodyScroll(loading)

  if (loading || !analysis) {
    return (
      <main className="min-h-screen bg-background py-8 px-4">
        <div className="flex flex-col container mx-auto gap-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map(
              (_, i): ReactNode => (
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

  const { topLocations, uniqueLocations, totalDistance, totalDays, countryData } = analysis

  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="flex flex-col container mx-auto gap-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">
                {topLocations?.reduce((sum, loc) => sum + loc.count, 0).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Locations</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{uniqueLocations?.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Unique Cities</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{countryData?.length.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Countries</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{totalDays}</div>
              <div className="text-sm text-muted-foreground">Days Tracked</div>
            </CardContent>
          </Card>
        </div>

        <LocationHeatmap />
      </div>
    </main>
  )
}

export default Page
