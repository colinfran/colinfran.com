import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"
import { useData } from "../providers/data-provider"
import { FC } from "react"
import { toMiles } from "@/lib/utils"

export const AnomaliesTab: FC = () => {
  const { analysis, unit } = useData()
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" /> Anomaly Detection
        </CardTitle>
        <CardDescription>Days with unusual travel patterns or distances</CardDescription>
      </CardHeader>
      <CardContent>
        {analysis && analysis?.anomalies?.length > 0 ? (
          <div className="space-y-3">
            {analysis.anomalies.map((anomaly: any, index: number) => (
              <div
                className="flex items-center justify-between p-3 bg-destructive/10 border border-destructive/20 rounded-lg"
                key={index}
              >
                <div>
                  <div className="font-medium">{new Date(anomaly.date).toLocaleDateString()}</div>
                  <div className="text-sm text-muted-foreground">Unusual travel day</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-destructive">
                    {unit === "mi"
                      ? `${toMiles(anomaly.distance)} miles`
                      : `${anomaly.distance} km`}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {Math.round((anomaly.distance / Math.max(analysis.avgDailyDistance, 1)) * 100)}%
                    above average
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-8">
            No significant anomalies detected in my travel patterns
          </div>
        )}
      </CardContent>
    </Card>
  )
}
