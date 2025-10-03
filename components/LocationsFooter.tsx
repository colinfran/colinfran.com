import { FC } from "react"
import DistanceToggle from "./DistanceToggle"

const LocationsFooter: FC = () => {
  return (
    <footer>
      <div className="container flex flex-col justify-between sm:flex-row mx-auto px-8 py-4 text-center text-sm text-muted-foreground">
        <div>&copy; 2025 Colin Franceschini. All rights reserved.</div>
        <div>
          <DistanceToggle />
        </div>
      </div>
    </footer>
  )
}

export default LocationsFooter
