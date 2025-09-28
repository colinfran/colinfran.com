"use client";

import React, { useState, FC } from "react";
import Image, { ImageProps } from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

interface ImageWithSkeletonProps extends ImageProps {
  skeletonClassName?: string;
  fillFallbackHeight?: string; // Tailwind height for fill layout
}

const ImageWithSkeleton: FC<ImageWithSkeletonProps> = ({
  src,
  alt,
  width,
  height,
  className,
  skeletonClassName,
  fillFallbackHeight = "h-64",
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const useFill = width === undefined || height === undefined;

  return (
    <div className={`relative ${useFill ? fillFallbackHeight : ""}`}>
      {isLoading && (
        <Skeleton className={`absolute inset-0 w-full h-full ${skeletonClassName || ""}`} />
      )}

      {useFill ? (
        <Image
          src={src}
          alt={alt}
          fill
          className={`${className || ""} ${isLoading ? "opacity-0" : "opacity-100"}`}
          style={{ objectFit: "cover" }} // ONLY objectFit, no height/width
          onLoadingComplete={() => setIsLoading(false)}
          {...props}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`${className || ""} ${isLoading ? "opacity-0" : "opacity-100"}`}
          onLoadingComplete={() => setIsLoading(false)}
          {...props}
        />
      )}
    </div>
  );
};

export default ImageWithSkeleton;
