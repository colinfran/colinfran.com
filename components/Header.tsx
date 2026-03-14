import React, { FC } from "react"
import Image from "next/image"
import Link from "next/link"
import ThemeToggle from "./ThemeToggle"

const Header: FC = async () => (
  <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
    <div className="container mx-auto flex max-w-2xl items-center justify-between px-6 py-4 md:px-8">
      <Link href="/" className="transition-opacity hover:opacity-70">
        <Image
          alt="Logo"
          className="header-logo"
          height={36}
          src="/icons/favicon-96x96.png"
          width={36}
          priority
        />
      </Link>
      <ThemeToggle />
    </div>
  </header>
)

export default Header
