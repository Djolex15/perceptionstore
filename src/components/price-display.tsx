"use client"

import { useCurrency } from "@/lib/currency-context"

interface PriceDisplayProps {
  amount: number | string
  className?: string
  showCurrencyCode?: boolean
  isInstallment?: boolean
  installmentCount?: number
}

export default function PriceDisplay({
  amount,
  className = "",
  showCurrencyCode = false,
  isInstallment = false,
  installmentCount = 3,
}: PriceDisplayProps) {
  const { formatPrice, currency, convertPrice } = useCurrency()

  // Format large numbers with M suffix for millions
  const formatLargeNumber = (value: number | string): string => {
    const numericAmount = typeof value === "string" ? Number.parseFloat(value.replace(/[^\d.-]/g, "")) : value

    if (isNaN(numericAmount)) return formatPrice(0)

    // Convert to the user's selected currency
    const convertedAmount = numericAmount * currency.exchangeRate

    // If the amount is 1 million or more, format with M suffix
    if (convertedAmount >= 1000000) {
      const inMillions = convertedAmount / 1000000

      // Format with appropriate decimal places
      const formattedValue =
        currency.code === "AED"
          ? `${Math.round(inMillions * 10) / 10}M ${currency.symbol}`
          : `${currency.symbol}${(inMillions).toLocaleString(undefined, {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            })}M`

      return formattedValue
    }

    // For smaller amounts, use the regular formatPrice function
    return formatPrice(value)
  }

  if (isInstallment) {
    const installmentAmount =
      typeof amount === "string"
        ? Number.parseFloat(amount.replace(/[^\d.-]/g, "")) / installmentCount
        : amount / installmentCount

    return (
      <span className={className}>
        {installmentCount} x {formatPrice(installmentAmount)}
        {showCurrencyCode && ` ${currency.code}`}
      </span>
    )
  }

  return (
    <span className={className}>
      {formatLargeNumber(amount)}
      {showCurrencyCode && ` ${currency.code}`}
    </span>
  )
}

