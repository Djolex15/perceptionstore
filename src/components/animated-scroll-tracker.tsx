"use client"

import { useEffect, useRef } from "react"

type AnimatedScrollTrackerProps = {
  onScroll?: (progress: number) => void
  className?: string
}

export default function AnimatedScrollTracker({ onScroll, className = "" }: AnimatedScrollTrackerProps) {
  const trackerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const calculateScrollProgress = () => {
      if (!trackerRef.current) return

      // Calculate how far down the page we've scrolled
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY

      // Calculate scroll progress as a percentage
      const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100

      // Update the width of the progress bar
      trackerRef.current.style.width = `${scrollPercentage}%`

      // Call the onScroll callback if provided
      if (onScroll) {
        onScroll(scrollPercentage / 100)
      }
    }

    // Set up the scroll event listener
    window.addEventListener("scroll", calculateScrollProgress)
    calculateScrollProgress() // Initial calculation

    // Clean up
    return () => window.removeEventListener("scroll", calculateScrollProgress)
  }, [onScroll])

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-1 bg-transparent">
      <div
        ref={trackerRef}
        className={`h-full bg-[#B96944] transition-all duration-100 ${className}`}
        style={{ width: "0%" }}
      />
    </div>
  )
}

