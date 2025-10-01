import { cn } from "@/lib/utils"
import React, { ComponentProps, FC } from "react"

const Skeleton: FC<ComponentProps<"div">> = ({ className, ...props }) => {
  return (
    <div
      className={cn("bg-accent animate-pulse rounded-md", className)}
      data-slot="skeleton"
      {...props}
    />
  )
}

export { Skeleton }
