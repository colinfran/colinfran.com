"use client"

import React, { ComponentProps, FC } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

type ThemeProviderProps = ComponentProps<typeof NextThemesProvider>

export const ThemeProvider: FC<ThemeProviderProps> = ({ children, ...props }) => {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
