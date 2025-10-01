"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useData } from "@/components/providers/data-provider"
import { Skeleton } from "../ui/skeleton"
import useLockBodyScroll from "@/hooks/useLockBodyScroll"
import { SummaryCards } from "@/components/locationInsights/SummaryCards"
import { RoutinesTab } from "@/components/locationInsights/RoutineTabs"
import { TravelTab } from "@/components/locationInsights/TravelTab"
import { ClustersTab } from "@/components/locationInsights/ClustersTab"
import { AnomaliesTab } from "@/components/locationInsights/AnomaliesTab"
import { TrendsTab } from "./TrendsTab"
import { PatternsTab } from "./PatternsTab"
import { StreaksTab } from "./Streaks"
import { TransitionsTab } from "./TransitionsTab"

export const LocationInsights = () => {
  const { analysis, loading } = useData()
  useLockBodyScroll(loading)

  if (!analysis) {
    return <Skeleton className="w-full h-[calc(100vh-200px)] rounded-none" />
  }

  return (
    <div className="space-y-6 flex flex-col items-center">
      {/* Centered SummaryCards with a max-width */}
      <div className="w-full max-w-5xl">
        <SummaryCards />
      </div>
      <div className="w-full flex justify-center">
        <div className="relative w-full max-w-5xl">
          <Tabs defaultValue="routines" className="w-full">
            {/* Scrollable TabsList */}
            <div className="overflow-x-auto no-scrollbar">
              <TabsList className="flex gap-2 px-2 min-w-max">
                <TabsTrigger className="flex-shrink-0" value="routines">
                  Daily Routines
                </TabsTrigger>
                <TabsTrigger className="flex-shrink-0" value="travel">
                  Travel Patterns
                </TabsTrigger>
                <TabsTrigger className="flex-shrink-0" value="clusters">
                  Important Places
                </TabsTrigger>
                <TabsTrigger className="flex-shrink-0" value="anomalies">
                  Anomalies
                </TabsTrigger>
                <TabsTrigger className="flex-shrink-0" value="trends">
                  Trends
                </TabsTrigger>
                <TabsTrigger className="flex-shrink-0" value="patterns">
                  Patterns
                </TabsTrigger>
                <TabsTrigger className="flex-shrink-0" value="streaks">
                  Streaks
                </TabsTrigger>
                <TabsTrigger className="flex-shrink-0" value="transitions">
                  Transitions
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="routines">
              <RoutinesTab />
            </TabsContent>
            <TabsContent value="travel">
              <TravelTab />
            </TabsContent>
            <TabsContent value="clusters">
              <ClustersTab />
            </TabsContent>
            <TabsContent value="anomalies">
              <AnomaliesTab />
            </TabsContent>
            <TabsContent value="trends">
              <TrendsTab />
            </TabsContent>
            <TabsContent value="patterns">
              <PatternsTab />
            </TabsContent>
            <TabsContent value="streaks">
              <StreaksTab />
            </TabsContent>
            <TabsContent value="transitions">
              <TransitionsTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
