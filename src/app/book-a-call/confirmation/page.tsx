"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Cookies from "js-cookie"
import { CheckCircle } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"

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
}

export default function ConfirmationPage() {
  const [formData, setFormData] = useState<FormData | null>(null)

  useEffect(() => {
    // Load form data from cookies
    const savedFormData = Cookies.get("bookCallFormData")

    if (savedFormData) {
      try {
        const parsedData = JSON.parse(savedFormData)
        setFormData(parsedData)
      } catch (error) {
        console.error("Error parsing saved form data:", error)
      }
    }
  }, [])

  // Format price based on service type and payment option
  const getPrice = () => {
    if (!formData) return ""

    if (formData.serviceType === "startup-growth") {
      return formData.paymentOption === "one-time" ? "5,999€" : "3 x 2,199€"
    } else {
      return formData.totalPrice ? `${formData.totalPrice}€` : "Custom pricing"
    }
  }

  return (
    <div
      className="min-h-screen bg-[#fffae5] text-[#01131F] relative"
      style={{
        backgroundImage: "url('/backgrounds/pca-light-background.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10">
        <Header darkMode={true} />

        <main className="container mx-auto px-4 pt-32 md:pt-36 pb-12 md:pb-24">
          <section className="w-full max-w-3xl mx-auto py-8 md:py-12 text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg">
              <div className="flex justify-center mb-6">
                <CheckCircle size={80} className="text-[#B96944]" />
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold tracking-wide leading-tight text-[#01131F] mb-4">
                BOOKING CONFIRMED
              </h1>

              <p className="text-xl mb-8">Thank you for booking a call with us!</p>

              {formData && (
                <div className="bg-[#01131F]/5 p-6 rounded-xl mb-8 text-left">
                  <h2 className="text-xl font-bold mb-4 text-center">Booking Details</h2>

                  <div className="space-y-3">
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

                    <div>
                      <p className="font-semibold">Total Price:</p>
                      <p>{getPrice()}</p>
                    </div>
                  </div>
                </div>
              )}

              <p className="mb-6">
                We'll be in touch shortly to schedule your call. In the meantime, check your email for a confirmation
                message.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Return to Home
                  </Button>
                </Link>

                <Link href="/contact">
                  <Button className="w-full sm:w-auto bg-[#B96944] hover:bg-[#B96944]/90 text-[#fffae5]">
                    Contact Support
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer darkMode={true} />
      </div>
    </div>
  )
}

