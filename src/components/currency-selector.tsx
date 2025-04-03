"use client"

import { useState } from "react"
import { Globe } from "lucide-react"
import { useCurrency, currencies, type CurrencyCode } from "@/lib/currency-context"

export default function CurrencySelector({ darkMode = false }: { darkMode?: boolean }) {
  const { currency, setCurrency } = useCurrency()
  const [isOpen, setIsOpen] = useState(false)

  const textColor = darkMode ? "text-[#01131F]" : "text-[#fffae5]"
  const hoverColor = "hover:text-[#B96944]"
  const dropdownBg = darkMode ? "bg-[#fffae5]" : "bg-[#01131F]"
  const dropdownBorder = darkMode ? "border-[#01131F]/10" : "border-[#fffae5]/10"
  const activeItemBg = darkMode ? "bg-[#01131F]/5" : "bg-[#fffae5]/10"

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleCurrencyChange = (code: CurrencyCode) => {
    setCurrency(code)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className={`flex items-center ${textColor} ${hoverColor} transition-colors duration-300 link-underline`}
        aria-label="Select currency"
      >
        <span className="flex items-center">
          <Globe className="w-4 h-4 mr-2" />
          <span className="text-sm font-bold">{currency.code}</span>
        </span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop for closing dropdown when clicking outside */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          <div
            className={`absolute left-1/2 transform -translate-x-1/2 mt-2 w-24 ${dropdownBg} border ${dropdownBorder} rounded-md shadow-lg z-50`}
          >
            <div className="py-1">
              {Object.values(currencies).map((curr) => (
                <button
                  key={curr.code}
                  onClick={() => handleCurrencyChange(curr.code)}
                  className={`w-full text-center px-4 py-2 text-sm ${textColor} ${hoverColor} transition-colors duration-300 
                    ${curr.code === currency.code ? activeItemBg : ""}`}
                >
                  {curr.symbol}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

