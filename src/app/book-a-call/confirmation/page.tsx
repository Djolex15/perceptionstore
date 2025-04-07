"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Cookies from "js-cookie"
import { CheckCircle } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import PriceDisplay from "@/components/price-display"
import { sendBookingConfirmationEmail } from "./actions"
import { useCurrency } from "@/lib/currency-context"

type FormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  serviceType: "startup-growth" | "a-la-carte"
  paymentOption?: "one-time" | "installments"
  selectedServices?: Array<{
    id: string
    name: string
    price: number
  }>
  totalPrice?: number
  discounts?: Array<{
    id: string
    name: string
    amount: number
  }>
  currency?: {
    code: string
    symbol: string
    exchangeRate: number
  }
}

export default function ConfirmationPage() {
  const [formData, setFormData] = useState<FormData | null>(null)
  const [emailSent, setEmailSent] = useState(false)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { currency } = useCurrency()

  useEffect(() => {
    // Load form data from cookies
    const savedFormData = Cookies.get("bookCallFormData")

    if (savedFormData) {
      try {
        const parsedData = JSON.parse(savedFormData)
        // Add currency information to the form data
        parsedData.currency = currency
        setFormData(parsedData)

        // Update the cookie with currency information
        Cookies.set("bookCallFormData", JSON.stringify(parsedData), { expires: 7 })
      } catch (error) {
        console.error("Error parsing saved form data:", error)
      }
    }
  }, [currency])

  useEffect(() => {
    // Send confirmation email when form data is loaded
    const sendEmail = async () => {
      if (formData && !emailSent && !isLoading) {
        setIsLoading(true)
        try {
          const result = await sendBookingConfirmationEmail(formData)
          if (result.success) {
            setEmailSent(true)
            console.log("Email sent successfully")
          } else {
            setEmailError(result.error || "Failed to send confirmation email. We'll still contact you shortly.")
            console.error("Email sending failed:", result.error)
          }
        } catch (error) {
          setEmailError("Failed to send confirmation email. We'll still contact you shortly.")
          console.error("Error sending email:", error)
        } finally {
          setIsLoading(false)
        }
      }
    }

    sendEmail()
  }, [formData, emailSent, isLoading])

  return (
    <div
      className="min-h-screen bg-[#fffae5] text-[#01131F] relative"
      style={{
        backgroundImage: "url('/backgrounds/pca-light-background.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10">
        <Header darkMode={true} />

        <main className="container mx-auto px-4 pt-24 sm:pt-28 md:pt-36 pb-8 sm:pb-12 md:pb-24">
          <section className="w-full max-w-2xl sm:max-w-3xl mx-auto py-4 sm:py-8 md:py-12 text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg">
              <div className="flex justify-center mb-4 sm:mb-6">
                <CheckCircle size={60} className="sm:w-20 sm:h-20 md:w-20 md:h-20 text-[#B96944]" />
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide leading-tight text-[#01131F] mb-3 sm:mb-4">
                BOOKING CONFIRMED
              </h1>

              <p className="text-lg sm:text-xl mb-4 sm:mb-6 md:mb-8">Thank you for booking a call with us!</p>

              {formData && (
                <div className="bg-[#01131F]/5 p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl mb-4 sm:mb-6 md:mb-8 text-left">
                  <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-center">Booking Details</h2>

                  <div className="space-y-2 sm:space-y-3">
                    <div>
                      <p className="font-semibold">Name:</p>
                      <p>
                        {formData.firstName} {formData.lastName}
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold">Email:</p>
                      <p>{formData.email}</p>
                    </div>

                    <div>
                      <p className="font-semibold">Phone:</p>
                      <p>{formData.phone}</p>
                    </div>

                    <div>
                      <p className="font-semibold">Service:</p>
                      <p>
                        {formData.serviceType === "startup-growth" ? "Startup Growth Package" : "A La Carte Options"}
                      </p>
                    </div>

                    {formData.serviceType === "startup-growth" && (
                      <div>
                        <p className="font-semibold">Payment Option:</p>
                        <p>{formData.paymentOption === "one-time" ? "One-time Payment" : "Installments"}</p>
                      </div>
                    )}

                    {formData.serviceType === "a-la-carte" && formData.selectedServices && (
                      <div>
                        <p className="font-semibold">Selected Services:</p>
                        <div className="pl-3 sm:pl-4 mt-1 space-y-1">
                          {formData.selectedServices.map((service) => (
                            <div key={service.id} className="flex justify-between text-sm sm:text-base">
                              <span className={service.name.startsWith("-") ? "pl-2 text-[#01131F]/70" : ""}>
                                {service.name}
                              </span>
                              <span>
                                <PriceDisplay amount={service.price} />
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {formData.discounts && formData.discounts.length > 0 && (
                      <div>
                        <p className="font-semibold text-[#B96944]">Discounts Applied:</p>
                        <div className="pl-3 sm:pl-4 mt-1 space-y-1">
                          {formData.discounts.map((discount) => (
                            <div key={discount.id} className="flex justify-between text-sm sm:text-base">
                              <span>{discount.name}</span>
                              <span className="text-[#B96944]">
                                <PriceDisplay amount={discount.amount} />
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <p className="font-semibold">Total Price:</p>
                      <p>
                        {formData.serviceType === "startup-growth" ? (
                          formData.paymentOption === "one-time" ? (
                            <PriceDisplay amount={5999} />
                          ) : (
                            <PriceDisplay amount={5999} isInstallment={true} installmentCount={3} />
                          )
                        ) : (
                          <PriceDisplay amount={formData.totalPrice || 0} />
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <p className="mb-4 sm:mb-6 text-sm sm:text-base">
                We&apos;ll be in touch shortly to schedule your call.
                {emailSent ? (
                  " A confirmation email has been sent to your inbox."
                ) : emailError ? (
                  <span className="text-amber-600"> {emailError}</span>
                ) : isLoading ? (
                  " Sending confirmation email..."
                ) : (
                  " Preparing confirmation email..."
                )}
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <Link href="/">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Return to Home
                  </Button>
                </Link>

                {emailError && (
                  <Button
                    onClick={() => {
                      setEmailError(null)
                      setEmailSent(false)
                    }}
                    className="w-full sm:w-auto bg-[#B96944] hover:bg-[#B96944]/90 text-[#fffae5]"
                  >
                    Retry Sending Email
                  </Button>
                )}
              </div>
            </div>
          </section>
        </main>

        <Footer darkMode={true} />
      </div>
    </div>
  )
}

