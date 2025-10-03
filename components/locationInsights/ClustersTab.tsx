import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Briefcase } from "lucide-react"
import { FC } from "react"
import { useData } from "../providers/data-provider"
import { Progress } from "@/components/ui/progress"

export const ClustersTab: FC = () => {
  const { analysis } = useData()
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="h-5 w-5" /> Important Places Analysis
        </CardTitle>
        <CardDescription>
          Automatically identified significant locations in my routine
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {analysis &&
            analysis?.clusters.map((cluster: any) => (
              <div
                className="flex items-center justify-between p-4 border rounded-lg"
                key={cluster.name}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: cluster.color }}
                  />
                  <div>
                    <div className="font-medium">{cluster.name}</div>
                    <div className="text-sm text-muted-foreground">{cluster.type}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{cluster.visits} visits</div>
                  <Progress
                    className="w-20 mt-1"
                    value={(cluster.visits / (analysis.topLocations[0]?.count || 1)) * 100}
                  />
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  )
}
