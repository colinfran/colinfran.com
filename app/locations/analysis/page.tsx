import { LocationAnalysis } from "@/components/location-analysis"

export default async function AnalysisPage() {

  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Location Analysis</h1>
          <p className="text-muted-foreground">Insights and patterns from your location data</p>
        </div>

        <LocationAnalysis />
      </div>
    </main>
  )
}
