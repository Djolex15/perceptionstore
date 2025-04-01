"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Info } from "lucide-react"

type SelectedService = {
  id: string
  name: string
  price: number
}

type PriceCalculatorProps = {
  totalPrice: number
  selectedServices: SelectedService[]
}

export default function PriceCalculator({
  totalPrice,
  selectedServices,
}: PriceCalculatorProps) {
  const calculatorRef = useRef<HTMLDivElement>(null)
  const calculatorContainerRef = useRef<HTMLDivElement>(null)
  const [calculatorHeight, setCalculatorHeight] = useState(0)
  const [isStatic, setIsStatic] = useState(false)
  const [bottomOffset] = useState("2rem")
  const [widthScale, setWidthScale] = useState(1)
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)

  // The exact position where the calculator should become static (91.8552036% from the top)
  const STATIC_POSITION_FROM_TOP = 90.8552036
  
  // Measure the calculator height for positioning
  useEffect(() => {
    if (calculatorRef.current) {
      setCalculatorHeight(calculatorRef.current.offsetHeight)
    }
  }, [totalPrice, selectedServices])

  // Track scroll position and document dimensions
  useEffect(() => {
    const updatePosition = () => {
      if (!calculatorRef.current || !calculatorContainerRef.current) return

      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      // Calculate the scroll position where the calculator should become static
      const staticScrollThreshold = (STATIC_POSITION_FROM_TOP / 100) * documentHeight - windowHeight

      // Calculate how close we are to the threshold (0 = far away, 1 = at threshold)
      const proximityToThreshold = Math.min(1, Math.max(0, scrollY / staticScrollThreshold))

      // Gradually reduce width as we approach the threshold (from 100% to 95%)
      const newWidthScale = 1 - proximityToThreshold * 0.05
      setWidthScale(newWidthScale)

      if (scrollY >= staticScrollThreshold) {
        // We've reached the threshold - switch to static positioning
        if (!isStatic) {
          setIsStatic(true)
        }
      } else {
        // Before the threshold, use fixed positioning
        if (isStatic) {
          setIsStatic(false)
        }
      }
    }

    window.addEventListener("scroll", updatePosition)
    window.addEventListener("resize", updatePosition)
    updatePosition() // Initial calculation

    return () => {
      window.removeEventListener("scroll", updatePosition)
      window.removeEventListener("resize", updatePosition)
    }
  }, [isStatic])

  // The calculator content is the same for both static and fixed positions
  const calculatorContent = (
    <div
      className="mx-auto w-full md:w-4/5 max-w-4xl transition-all duration-200"
      style={{ width: `${widthScale * 100}%` }}
    >
      <div className="bg-[#01131F] text-[#fffae5] py-3 px-4 md:px-6 rounded-full shadow-lg flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center">
          <div>
            <h3 className="text-base md:text-lg font-bold">
              TOTAL: <span className="text-xl md:text-2xl">{totalPrice}€</span>
            </h3>
          </div>

          {selectedServices.length > 0 && (
            <div className="relative group ml-3">
              <button
                className="bg-[#fffae5]/10 hover:bg-[#fffae5]/20 rounded-full p-1.5 transition-colors"
                onClick={() => setIsTooltipVisible(!isTooltipVisible)}
              >
                <Info size={18} className="text-[#fffae5]" />
              </button>
              <div
                className={`absolute bottom-full mb-2 right-0 w-64 bg-[#01131F] border border-[#fffae5]/20 rounded-xl p-3 shadow-xl ${
                  isTooltipVisible ? "block" : "hidden"
                } group-hover:block`}
              >
                <h4 className="font-bold mb-2 text-sm">Selected Services:</h4>
                <div className="max-h-48 overflow-y-auto text-sm">
                  {selectedServices.map((service) => (
                    <div key={service.id} className="flex justify-between mb-1">
                      <span className={service.name.startsWith("-") ? "pl-2 text-[#fffae5]/70" : ""}>
                        {service.name}
                      </span>
                      <span>{service.price}€</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div
      ref={calculatorContainerRef}
      className="relative"
      style={{
        minHeight: calculatorHeight,
      }}
    >
      {/* Static version (rendered when isStatic is true) */}
      {isStatic && (
        <div ref={calculatorRef} className="z-50 px-4 pb-4">
          {calculatorContent}
        </div>
      )}

      {/* Fixed version (rendered when isStatic is false) */}
      {!isStatic && (
        <div
          ref={!isStatic ? calculatorRef : null}
          className="z-50 px-4 pb-4 fixed left-0 right-0"
          style={{
            bottom: bottomOffset,
          }}
        >
          {calculatorContent}
        </div>
      )}
    </div>
  )
}