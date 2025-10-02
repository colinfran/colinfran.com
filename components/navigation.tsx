"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Map, BarChart3, Route } from "lucide-react"
import { FC } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const navigationItems = [
  {
    name: "Home",
    href: "/locations",
    icon: Route,
    description: "Home page for Location Analytics",
  },
  {
    name: "Insights",
    href: "/locations/insights",
    icon: BarChart3,
    description: "Insights and patterns from your data",
  },
]

export const Navigation: FC = () => {
  const pathname = usePathname()

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="m-4 flex flex-col md:flex-row h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Map className="h-6 w-6 text-primary" />
            <h1 className="text font-semibold">MyLocationAnalysis</h1>
          </div>

          <Tabs className="flex items-center space-x-1 pt-4" value={pathname}>
            <TabsList>
              {navigationItems.map((item) => {
                const Icon = item.icon
                return (
                  <TabsTrigger
                    className={cn("flex items-center space-x-2 px-3 py-1")}
                    key={item.href}
                    value={item.href}
                  >
                    <Link href={item.href} prefetch>
                      <div className="flex items-center space-x-2">
                        <Icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </div>
                    </Link>
                  </TabsTrigger>
                )
              })}
            </TabsList>
          </Tabs>
        </div>
      </div>
    </nav>
  )
}
