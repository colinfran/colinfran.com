import type React from "react"

import { Navigation } from "@/components/navigation"
import { DataProvider } from "@/components/providers/data-provider"
import { FC, ReactNode } from "react"
import LocationsFooter from "@/components/LocationsFooter"
import { TooltipProvider } from "@/components/ui/tooltip"

const Layout: FC<Readonly<{ children: ReactNode }>> = ({ children }) => {
  return (
    <TooltipProvider>
      <DataProvider>
        <Navigation />
        {children}
        <LocationsFooter />
      </DataProvider>
    </TooltipProvider>
  )
}

export default Layout
