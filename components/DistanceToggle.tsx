"use client"

import { FC } from "react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { MapPinIcon } from "lucide-react" // or any icons you like
import { useData } from "./providers/data-provider"

const DistanceToggle: FC = () => {
  const { unit, setUnit } = useData()
  return (
    <div className="">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="secondary" onClick={() => setUnit(unit === "mi" ? "m" : "mi")}>
            <MapPinIcon className="w-4 h-4 mr-1" />
            {unit === "mi" ? "Miles" : "Meters"}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{`Show distances in ${unit === "mi" ? "miles" : "meters"}`}</TooltipContent>
      </Tooltip>
    </div>
  )
}

export default DistanceToggle
