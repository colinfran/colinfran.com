import React from "react"
import Image from "next/image"
import Link from "next/link"
import ThemeToggle from "./ThemeToggle"

const Header: React.FC = () => (
  <header className="container">
    <div className="flex items-center justify-between border-b py-4">
      <Link href="/">
        <Image
          alt="Logo"
          className="header-logo"
          height={48}
          src="/icons/favicon-96x96.png"
          width={48}
          priority
        />
      </Link>
      <div className="space-x-4">
        <ThemeToggle />
      </div>
    </div>
  </header>
)

export default Header
