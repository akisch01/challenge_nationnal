"use client"

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

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <span className="navbar-logo-emoji">🛡️</span>
          <span className="navbar-logo-text">N.I.R.D.</span>
        </div>

        <ul className="navbar-menu">
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
