// context/LocationDataContext.tsx
"use client"

import { LocationType } from "@/db/schema"
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"


interface DataContextValue {
  locations: LocationType[]
  loading: boolean
}

type DataProps = {
  data: LocationType[],
  success: boolean
}

const DataContext = createContext<DataContextValue>({
  locations: [],
  loading: true,
})

export const useData = () => useContext(DataContext)

interface Props {
  children: ReactNode
}

export const DataProvider = ({ children }: Props) => {
  const [locations, setLocations] = useState<LocationType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        document.body.style.overflow = 'hidden';
        const res = await fetch("/api/data")
        if (res.ok) {
          const json = await res.json()
          setLocations(json.data)
        } else {
          console.error("Failed to fetch locations")
        }
      } catch (error) {
        console.error("Error fetching locations:", error)
      } finally {
        setLoading(false)
        document.body.style.overflow = 'scroll';
      }
    }

    fetchData()
  }, [])

  return (
    <DataContext.Provider value={{ locations, loading }}>
      {children}
    </DataContext.Provider>
  )
}
