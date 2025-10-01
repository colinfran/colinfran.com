import type React from "react"

import { Navigation } from "@/components/navigation"
import { DataProvider } from "@/components/providers/data-provider"
import { FC, ReactNode } from "react"

const Layout: FC<Readonly<{ children: ReactNode }>> = ({ children }) => {
  return (
    <>
      <Navigation />
      <DataProvider>{children}</DataProvider>
    </>
  )
}

export default Layout
