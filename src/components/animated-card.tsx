"use client"

import type React from "react"

import { useRef } from "react"
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
  const cardRef = useRef<HTMLDivElement>(null)

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
    <div className="flex flex-col items-center w-full h-full">
      <Link href={href} className="block w-full max-w-xs sm:max-w-sm md:max-w-sm lg:max-w-md group">
        <div
          ref={cardRef}
          style={{
            backgroundImage: "url('/backgrounds/pca-light-background.jpg')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            backgroundPosition: "center",
          }}
          className={`bg-gradient-to-br from-[#fffae5]/30 to-[#f0e8d0]/10 text-[#01131F] rounded-2xl sm:rounded-3xl md:rounded-4xl p-4 sm:p-6 md:p-8 border-2 sm:border-5 md:border-4 lg:border-6 border-[#B96944] flex flex-col w-full h-full min-h-[400px] cursor-pointer ${getHighlightClass()}`}
        >
          {/* Title and Subtitle */}
          <div className="text-center mb-4 sm:mb-6 md:mb-4 lg:mb-8">
            <h1 className="text-base sm:text-2xl md:text-xl lg:text-2xl font-bold uppercase text-[#01131F]">{title}</h1>
            <h2 className="uppercase text-sm sm:text-lg md:text-lg lg:text-xl font-medium text-[#01131F]">{subtitle}</h2>
          </div>

          {/* Content Area */}
          <div className="flex flex-col justify-around flex-1 gap-1">{children}</div>

          {/* Button */}
          <div className="flex justify-center mt-1 sm:mt-1 md:mt-0 lg:mt-1">
            <button className="bg-[#B96944] text-[#fffae5] uppercase font-bold text-xs sm:text-base md:text-base w-[90%] max-w-xs py-2 sm:py-3 md:py-3 flex items-center justify-center rounded-full btn-simple">
              {buttonText}
            </button>
          </div>
        </div>
      </Link>

      {/* Description */}
      <div className="text-xs sm:text-xs md:text-xs text-center mt-4 sm:mt-3 md:mt-4 w-[115%] max-w-xs sm:max-w-sm md:max-w-md text-[#fffae5] uppercase">
        {description}
      </div>
    </div>
  )
}

