"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Map, BarChart3, Route } from "lucide-react"

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

export const Navigation = () => {
  const pathname = usePathname()

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Map className="h-6 w-6 text-primary" />
            <h1 className="text font-semibold">MyLocationAnalysis</h1>
          </div>

          <div className="flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Button
                  className={cn(
                    "flex items-center space-x-2",
                    isActive && "bg-primary text-primary-foreground",
                  )}
                  key={item.href}
                  size="sm"
                  variant={isActive ? "default" : "ghost"}
                  asChild
                >
                  <Link href={item.href} prefetch>
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                </Button>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
