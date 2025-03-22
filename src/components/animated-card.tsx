"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"

interface AnimatedCardProps {
  href: string
  title: string
  subtitle: string
  children: React.ReactNode
  buttonText: string
  description: string
  highlightType?: "gradient-border" | "spotlight-sweep" | "shimmer" | "pulse-border" | "rainbow"
}

export function AnimatedCard({
  href,
  title,
  subtitle,
  children,
  buttonText,
  description,
  highlightType = "gradient-border",
}: AnimatedCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Check if device is mobile on client side
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // Pre-load the animation to avoid first-hover jank
  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    // Create and append a hidden pseudo-element to preload the gradient
    const preloader = document.createElement("div")
    preloader.style.position = "absolute"
    preloader.style.width = "0"
    preloader.style.height = "0"
    preloader.style.opacity = "0"
    preloader.style.background = "linear-gradient(45deg, #b96944, transparent, #b96944, transparent, #b96944)"
    preloader.style.backgroundSize = "400% 400%"
    preloader.style.zIndex = "-9999"
    preloader.style.visibility = "hidden"

    card.appendChild(preloader)

    return () => {
      if (card.contains(preloader)) {
        card.removeChild(preloader)
      }
    }
  }, [])

  // Get the appropriate CSS class based on the highlight type
  const getHighlightClass = () => {
    switch (highlightType) {
      case "gradient-border":
        return "card-gradient-border"
      case "spotlight-sweep":
        return "card-spotlight-sweep"
      case "shimmer":
        return "card-shimmer"
      case "pulse-border":
        return "card-pulse-border"
      case "rainbow":
        return "card-rainbow"
      default:
        return "card-gradient-border"
    }
  }

  return (
    <div className="flex flex-col items-center w-full md:w-[50%]">
      <Link
        href={href}
        className="block w-full md:w-[26vw] h-auto aspect-[26/36.5] md:h-[36.5vw] ml-auto mr-auto group"
      >
        <div
          ref={cardRef}
          className={`bg-gradient-to-br from-[#fffae5] to-[#f0e8d0] text-[#01131F] rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-6 border-[3px] sm:border-[4px] md:border-[6px] border-[#B96944] flex flex-col w-full h-full cursor-pointer ${getHighlightClass()}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="text-center mb-2 sm:mb-4 md:mb-8">
            <h1 className="text-lg sm:text-xl md:text-[1.773vw] leading-tight md:leading-[1.773vw] font-bold uppercase text-[#01131F]">
              {title}
            </h1>
            <h2 className="uppercase text-lg sm:text-xl md:text-[1.773vw] leading-tight md:leading-[1.773vw] font-medium text-[#01131F]">
              {subtitle}
            </h2>
          </div>

          {/* Content area */}
          <div className="flex flex-col justify-around flex-1 scale-90 sm:scale-100">{children}</div>

          <div className="flex justify-center">
            <button className="bg-[#B96944] text-[#fffae5] uppercase font-bold text-xs sm:text-sm md:text-base w-full md:w-[17.031vw] py-1.5 sm:py-2 md:h-[3vw] flex items-center justify-center rounded-full btn-simple">
              {buttonText}
            </button>
          </div>
        </div>
      </Link>
      <div className="text-[10px] xs:text-xs md:text-[0.8vw] text-center mt-2 md:mt-[1.042vw] w-full md:w-[26vw] text-[#fffae5] uppercase">
        {description}
      </div>
    </div>
  )
}

