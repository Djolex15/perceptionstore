"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import CurrencySelector from "./currency-selector"

export default function Header({ darkMode }: { darkMode?: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Mobile detection using media query
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 64rem)") // 1024px in rem

    // Initial check
    setIsMobile(mediaQuery.matches)

    // Add listener for changes
    const handleResize = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches)
    }

    mediaQuery.addEventListener("change", handleResize)

    // Cleanup
    return () => mediaQuery.removeEventListener("change", handleResize)
  }, [])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20 / 16) // 20px in rem
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Determine text and background colors based on darkMode prop
  const textColor = darkMode ? "text-[#01131F]" : "text-[#fffae5]"
  const accentTextColor = "text-[#B96944]"
  const hoverColor = "hover:text-[#B96944]"

  const bgColor = darkMode
    ? scrolled
      ? "bg-[#fffae5]/70 backdrop-blur-sm shadow-md"
      : "transparent"
    : scrolled
      ? "bg-[#01131F]/70 backdrop-blur-sm"
      : "transparent"

  const logoSrc = darkMode ? "/logo/pca-logo-dark.png" : "/logo/pca-logo-light.png"
  const mobileMenuBg = darkMode ? "bg-[#fffae5]" : "bg-[#01131F]"

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 py-6 md:py-4 transition-all duration-300 ${bgColor} px-4 md:px-6`}
      >
        <div className="container mx-auto flex items-center justify-between py-2 md:py-5">
          {/* Mobile view */}
          {isMobile && (
            <div className="w-full flex items-center justify-between">
              <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
                <Image
                  src={logoSrc || "/placeholder.svg"}
                  width={100}
                  height={100}
                  alt="Perception Creative Agency"
                  className="w-20 h-20 md:w-24 md:h-24 transition-transform duration-300 hover:scale-110"
                />
              </Link>
              <button
                onClick={() => setIsMenuOpen(true)}
                className={`w-10 h-10 flex items-center justify-center ${textColor} ${hoverColor} transition-colors duration-300`}
                aria-label="Open menu"
              >
                <Menu className="w-8 h-8" />
              </button>
            </div>
          )}

          {/* Desktop view */}
          {!isMobile && (
            <>
              {/* Left section with text */}
              <div className="flex text-center md:text-left">
                <h1 className={`text-base md:text-lg font-bold uppercase text-center ${textColor}`}>
                  <span className={accentTextColor}>&quot;</span>IT&apos;S ALL A MATTER <br /> OF PERCEPTION
                  <span className={accentTextColor}>&quot;</span>
                </h1>
              </div>

              {/* Center logo */}
              <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
                <Image
                  src={logoSrc || "/placeholder.svg"}
                  width={100}
                  height={100}
                  alt="Perception Creative Agency"
                  className="w-20 h-20 md:w-24 md:h-24 transition-transform duration-300 hover:scale-110"
                />
              </Link>

              {/* Navigation links */}
              <nav className="flex items-center font-bold space-x-3 md:space-x-6">
                <Link
                  href="/startup-growth"
                  className={`${textColor} text-xs md:text-sm uppercase ${hoverColor} transition-colors duration-300 link-underline`}
                >
                  STARTUP GROWTH
                </Link>
                <Link
                  href="/a-la-carte"
                  className={`${textColor} text-xs md:text-sm uppercase ${hoverColor} transition-colors duration-300 link-underline`}
                >
                  A LA CARTE
                </Link>
                <Link
                  href="/book-a-call"
                  className={`${accentTextColor} text-xs md:text-sm uppercase hover:opacity-80 transition-opacity duration-300 link-underline-accent`}
                >
                  BOOK A CALL
                </Link>
                <CurrencySelector darkMode={darkMode} />
              </nav>
            </>
          )}
        </div>
      </header>

      {/* Mobile menu overlay */}
      {isMobile && (
        <div
          className={`fixed inset-0 ${mobileMenuBg} z-50 transform transition-transform duration-300 ${
            isMenuOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="container mx-auto h-full flex flex-col">
            <div className="flex justify-end p-4 md:p-6">
              <button
                onClick={() => setIsMenuOpen(false)}
                className={`${textColor} ${hoverColor} transition-colors duration-300`}
                aria-label="Close menu"
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center space-y-6 md:space-y-8">
              <Link
                href="/startup-growth"
                onClick={() => setIsMenuOpen(false)}
                className={`${textColor} text-2xl md:text-3xl uppercase font-bold tracking-wider ${hoverColor} transition-colors duration-300 link-underline`}
              >
                STARTUP GROWTH
              </Link>
              <Link
                href="/a-la-carte"
                onClick={() => setIsMenuOpen(false)}
                className={`${textColor} text-2xl md:text-3xl uppercase font-bold tracking-wider ${hoverColor} transition-colors duration-300 link-underline`}
              >
                A LA CARTE
              </Link>
              <Link
                href="/book-a-call"
                onClick={() => setIsMenuOpen(false)}
                className={`${accentTextColor} text-2xl md:text-3xl uppercase font-bold tracking-wider hover:opacity-80 transition-opacity duration-300 link-underline-accent`}
              >
                BOOK A CALL
              </Link>
              <div className="mt-4">
                <CurrencySelector darkMode={darkMode} />
              </div>
            </div>

            <div className="p-4 md:p-6 text-center">
              <a href="mailto:INFO@PERCEPTIONUAE.COM" className={`text-base md:text-lg ${textColor} opacity-70`}>
                INFO@PERCEPTIONUAE.COM
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

