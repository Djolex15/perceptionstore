"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 pt-8 pb-8 transition-all duration-300 ${
          scrolled ? "bg-[#01131F]/90 backdrop-blur-sm py-3" : "py-6"
        }`}
      >
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
          {/* Mobile: Logo centered, menu on right */}
          <div className="w-full flex items-center justify-between md:hidden">
            <div className="w-10"></div> {/* Spacer for centering */}
            <div className="flex items-center">
              <Image
                src="/logo/pca-logo-light.png"
                width={100}
                height={100}
                alt="Perception Creative Agency"
                className="h-10 w-auto"
              />
            </div>
            <button
              onClick={() => setIsMenuOpen(true)}
              className="w-10 h-10 flex items-center justify-center text-[#fffae5] hover:text-[#B96944] transition-colors duration-300"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Desktop: Left section with logo */}
          <div className="hidden md:flex mb-4 md:mb-0 text-center md:text-left">
            <h1 className="text-lg font-bold uppercase text-center">
              <span className="text-[#b96944]">"</span>It's all a matter <br /> of Perception
              <span className="text-[#b96944]">"</span>
            </h1>
          </div>

          {/* Desktop: Center logo */}
          <div className="hidden md:flex items-center absolute left-1/2 transform -translate-x-1/2 hover:scale-106 transition-transform duration-200">
            <Image src="/logo/pca-logo-light.png" width={100} height={100} alt="Perception Creative Agency" />
          </div>

          {/* Desktop: Navigation links */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink href="#">Startup Growth</NavLink>
            <NavLink href="#">A La Carte</NavLink>
            <NavLink href="#" highlight>
              Book a Call
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Mobile menu overlay - slides from top */}
      <div
        className={`fixed inset-0 bg-[#01131F] z-50 transform transition-transform duration-300 ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto h-full flex flex-col">
          <div className="flex justify-end p-6">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-[#fffae5] hover:text-[#B96944] transition-colors duration-300"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center space-y-8">

            <MobileNavLink href="#" onClick={() => setIsMenuOpen(false)}>
              Startup Growth
            </MobileNavLink>
            <MobileNavLink href="#" onClick={() => setIsMenuOpen(false)}>
              A La Carte
            </MobileNavLink>
            <MobileNavLink href="#" onClick={() => setIsMenuOpen(false)} highlight>
              Book a Call
            </MobileNavLink>
          </div>

          <div className="p-6 text-center">
            <p className="text-sm text-[#fffae5]/70 animated-text-small">PERCEPTION.UAE@GMAIL.COM</p>
          </div>
        </div>
      </div>
    </>
  )
}

// Desktop navigation link with enhanced hover animation
function NavLink({
  href,
  children,
  highlight = false,
}: { href: string; children: React.ReactNode; highlight?: boolean }) {
  return (
    <Link
      href={href}
      className={`${highlight ? "text-[#B96944] nav-link-highlight" : "text-[#fffae5] nav-link"} text-sm uppercase animated-text`}
    >
      {children}
    </Link>
  )
}

// Mobile navigation link with animation
function MobileNavLink({
  href,
  children,
  onClick,
  highlight = false,
}: {
  href: string
  children: React.ReactNode
  onClick: () => void
  highlight?: boolean
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`mobile-nav-link text-2xl uppercase font-medium tracking-wider transition-all duration-300 ${
        highlight ? "text-[#B96944]" : "text-[#fffae5]"
      }`}
    >
      {children}
    </Link>
  )
}

