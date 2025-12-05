"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const NAV_ITEMS = [
  { href: "/", label: "Accueil" },
  { href: "/pitch", label: "Pitch" },
  { href: "/femmes-numerique", label: "Les Femmes dans le Numérique" },
  { href: "/carte-talents", label: "La carte des Talents" },
  { href: "/mini-mind", label: "Mini Mind" },
]

export function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Image src="/logo.png" alt="WEIMAK Logo" width={50} height={20} />
        </div>

        <button
          className="navbar-burger"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="menu"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>

        <ul className={`navbar-menu ${isMenuOpen ? "navbar-menu-mobile-open" : ""}`}>
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`navbar-link ${pathname === item.href ? "navbar-link-active" : ""}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
