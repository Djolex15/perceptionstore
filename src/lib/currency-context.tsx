"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import Cookies from "js-cookie"

// Define supported currencies and their symbols
export type CurrencyCode = "EUR" | "AED" | "USD"

export interface CurrencyInfo {
  code: CurrencyCode
  symbol: string
  name: string
  exchangeRate: number // Rate relative to EUR (base currency)
}

export const currencies: Record<CurrencyCode, CurrencyInfo> = {
  EUR: {
    code: "EUR",
    symbol: "€",
    name: "Euro",
    exchangeRate: 1, // Base currency
  },
  AED: {
    code: "AED",
    symbol: "AED",
    name: "UAE Dirham",
    exchangeRate: 3.98, // 1 EUR = 3.98 AED (approximate)
  },
  USD: {
    code: "USD",
    symbol: "$",
    name: "US Dollar",
    exchangeRate: 1.08, // 1 EUR = 1.08 USD (approximate)
  },
}

interface CurrencyContextType {
  currency: CurrencyInfo
  setCurrency: (code: CurrencyCode) => void
  formatPrice: (amount: number | string) => string
  convertPrice: (amount: number | string) => number
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyInfo>(currencies.EUR)

  // Initialize currency from cookie or detect from location
  useEffect(() => {
    const savedCurrency = Cookies.get("preferredCurrency") as CurrencyCode

    if (savedCurrency && currencies[savedCurrency]) {
      setCurrencyState(currencies[savedCurrency])
    } else {
      // Try to detect user's location and set appropriate currency
      detectUserCurrency()
    }
  }, [])

  // Detect user's currency based on timezone or navigator.language
  const detectUserCurrency = async () => {
    try {
      // Simple detection based on browser language
      const browserLang = navigator.language

      if (browserLang.includes("ar") || browserLang.includes("ae")) {
        setCurrencyState(currencies.AED)
      } else if (browserLang.includes("en-US") || browserLang.includes("en-CA")) {
        setCurrencyState(currencies.USD)
      } else {
        // Default to EUR for European countries
        setCurrencyState(currencies.EUR)
      }
    } catch (error) {
      console.error("Error detecting currency:", error)
      // Default to EUR if detection fails
      setCurrencyState(currencies.EUR)
    }
  }

  // Set currency and save to cookie
  const setCurrency = (code: CurrencyCode) => {
    setCurrencyState(currencies[code])
    Cookies.set("preferredCurrency", code, { expires: 365 })
  }

  // Format price with currency symbol
  const formatPrice = (amount: number | string): string => {
    const numericAmount = typeof amount === "string" ? Number.parseFloat(amount.replace(/[^\d.-]/g, "")) : amount

    if (isNaN(numericAmount)) return `${currency.symbol}0`

    const convertedAmount = numericAmount * currency.exchangeRate

    // Format with appropriate decimal places and thousands separators
    return currency.code === "AED"
      ? `${Math.round(convertedAmount)} ${currency.symbol}`
      : `${currency.symbol}${convertedAmount.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })}`
  }

  // Convert price from EUR to current currency (returns numeric value)
  const convertPrice = (amount: number | string): number => {
    const numericAmount = typeof amount === "string" ? Number.parseFloat(amount.replace(/[^\d.-]/g, "")) : amount
    if (isNaN(numericAmount)) return 0
    return Math.round(numericAmount * currency.exchangeRate)
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, convertPrice }}>
      {children}
    </CurrencyContext.Provider>
  )
}

// Custom hook to use the currency context
export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider")
  }
  return context
}

