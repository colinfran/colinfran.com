"use client"

import React, { useState, useEffect, FC } from "react"
import Image, { ImageProps } from "next/image"
import { Skeleton } from "@/components/ui/skeleton"

interface ImageWithSkeletonProps extends ImageProps {
  skeletonClassName?: string
  projectPage?: boolean
}

const ImageWithSkeleton: FC<ImageWithSkeletonProps> = ({
  src,
  alt,
  width,
  height,
  className,
  projectPage = false,
  ...props
}) => {
  useEffect(() => {
    // setIsLoading(true)
  }, [src])

  const [isLoading, setIsLoading] = useState(true)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    setIsLoading(true)
    if (typeof window !== "undefined") {
      const img = new window.Image()
      img.src = typeof src === "string" ? src : ""
      img.onload = () => {
        setDimensions({ width: img.width, height: img.height })
        setIsLoading(false)
      }
    }
  }, [src])

  const skeletonStyle =
    projectPage && width === 0 && height === 0
      ? { paddingBottom: `${(dimensions.height / dimensions.width) * 100 || 56.25}%` }
      : { width, height }

  return (
    <div className="relative">
      {isLoading && (
        <Skeleton className={`${isLoading ? "opacity-100" : "opacity-0"}`} style={skeletonStyle} />
      )}
      <Image
        alt={alt}
        className={`${className} ${isLoading ? "opacity-0" : "opacity-100"}`}
        height={dimensions.height || height}
        src={src}
        width={dimensions.width || width}
        onLoad={() => setIsLoading(false)}
        {...props}
      />
    </div>
  )
}

export default ImageWithSkeleton
