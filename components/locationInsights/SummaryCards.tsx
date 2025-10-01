import { FC } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Route, TrendingUp, AlertTriangle } from "lucide-react"
import { useData } from "../providers/data-provider"

export const SummaryCards: FC = () => {
  const { analysis } = useData()
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Distance</CardTitle>
          <Route className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{analysis?.totalDistance.toLocaleString()} km</div>
          <p className="text-xs text-muted-foreground">Across {analysis?.totalDays} days</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex justify-between pb-2">
          <CardTitle className="text-sm font-medium">Avg Daily Distance</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{analysis?.avgDailyDistance} km</div>
          <p className="text-xs text-muted-foreground">Per day average</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex justify-between pb-2">
          <CardTitle className="text-sm font-medium">Unique Locations</CardTitle>
          <MapPin className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{analysis?.uniqueLocations}</div>
          <p className="text-xs text-muted-foreground">Different places visited</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex justify-between pb-2">
          <CardTitle className="text-sm font-medium">Max Daily Distance</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{analysis?.maxDailyDistance} km</div>
          <p className="text-xs text-muted-foreground">Longest travel day</p>
        </CardContent>
      </Card>
    </div>
  )
}
