import type React from "react"

import { Navigation } from "@/components/navigation"
import { DataProvider } from "@/components/providers/data-provider"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navigation />
      <DataProvider>{children}</DataProvider>
    </>
  )
}
