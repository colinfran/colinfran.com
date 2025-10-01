import { FC } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Home, Calendar } from "lucide-react"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts"
import { useData } from "../providers/data-provider"

export const RoutinesTab: FC = () => {
  const { analysis } = useData()
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Visited Places */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5" /> Most Visited Places
            </CardTitle>
            <CardDescription>Your top locations by frequency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analysis.topLocations.map((location: any, index: number) => (
                <div className="flex items-center justify-between" key={location.location}>
                  <div className="flex items-center gap-2">
                    <Badge variant={index === 0 ? "default" : "secondary"}>{index + 1}</Badge>
                    <span className="font-medium">{location.location}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{location.count} visits</div>
                    <div className="text-xs text-muted-foreground">
                      {location.percentage.toFixed(1)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Hourly Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" /> Hourly Activity Pattern
            </CardTitle>
            <CardDescription>When you're most active throughout the day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer height={200} width="100%">
              <AreaChart data={analysis.hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Area
                  dataKey="count"
                  fill="#8884d8"
                  fillOpacity={0.3}
                  stroke="#8884d8"
                  type="monotone"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Pattern */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" /> Weekly Activity Pattern
          </CardTitle>
          <CardDescription>Your activity levels throughout the week</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer height={300} width="100%">
            <BarChart data={analysis.weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
