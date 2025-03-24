"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-8 h-8">
              <Image
                src="https://docs.apimatic.io/images/logo.svg"
                alt="APIMatic Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-bold text-xl text-sky-900">APIMatic</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-sky-600 font-medium">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-sky-600 font-medium">
              About
            </Link>
            <Button className="bg-sky-600 hover:bg-sky-700">Get Started</Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b shadow-md">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link
              href="/"
              className="block text-gray-700 hover:text-sky-600 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block text-gray-700 hover:text-sky-600 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Button className="w-full bg-sky-600 hover:bg-sky-700">Get Started</Button>
          </div>
        </div>
      )}
    </header>
  )
}

