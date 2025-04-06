"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Info } from "lucide-react"
import Cookies from "js-cookie"
import Header from "@/components/header"
import Footer from "@/components/footer"
import PhoneInput from "@/components/phone-input"
import Head from "next/head"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import PriceDisplay from "@/components/price-display"

// Define types for our form data
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

export default function BookACallPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Initialize form data
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    serviceType: "startup-growth",
    paymentOption: "one-time",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showServiceDetails, setShowServiceDetails] = useState(false)

  // Load data from URL parameters or cookies on component mount
  useEffect(() => {
    // Check URL parameters first
    const serviceType = (searchParams.get("serviceType") as "startup-growth" | "a-la-carte") || "startup-growth"
    const paymentOption = searchParams.get("paymentOption") as "one-time" | "installments"

    console.log("URL params:", { serviceType, paymentOption })

    // Try to load data from cookies
    const savedFormData = Cookies.get("bookCallFormData")

    if (savedFormData) {
      try {
        const parsedData = JSON.parse(savedFormData)
        console.log("Loaded form data from cookies:", parsedData)
        setFormData((prev) => ({
          ...prev,
          ...parsedData,
        }))
      } catch (error) {
        console.error("Error parsing saved form data:", error)
      }
    } else if (serviceType) {
      // If no cookies but URL params exist, use those
      setFormData((prev) => ({
        ...prev,
        serviceType,
        paymentOption: paymentOption || "one-time",
      }))

      // If coming from a-la-carte page, try to load selected services from cookies
      if (serviceType === "a-la-carte") {
        const savedServices = Cookies.get("selectedServices")
        if (savedServices) {
          try {
            const parsedServices = JSON.parse(savedServices)
            console.log("Loaded services from cookies:", parsedServices)
            setFormData((prev) => ({
              ...prev,
              selectedServices: parsedServices.services,
              totalPrice: parsedServices.totalPrice,
            }))
          } catch (error) {
            console.error("Error parsing saved services:", error)
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Remove searchParams from dependencies to prevent re-runs

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle phone input change
  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      phone: value,
    }))
  }

  // Handle service type change
  const handleServiceTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const serviceType = e.target.value as "startup-growth" | "a-la-carte"
    setFormData((prev) => ({
      ...prev,
      serviceType,
      // Reset payment option if switching to a-la-carte
      paymentOption: serviceType === "startup-growth" ? prev.paymentOption : undefined,
    }))
  }

  // Handle payment option change
  const handlePaymentOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      paymentOption: e.target.value as "one-time" | "installments",
    }))
  }

  // Save form data to cookies
  const saveFormData = () => {
    Cookies.set("bookCallFormData", JSON.stringify(formData), { expires: 7 })
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Save form data to cookies before submission
    saveFormData()

    // Simulate form submission - in a real app, you would send this to your backend
    setTimeout(() => {
      setIsSubmitting(false)
      // Redirect to confirmation page
      router.push("/book-a-call/confirmation")
    }, 1500)
  }

  return (
    <>
    <Head>
        <title>Book A Call | Perception Creative Agency Store</title>
        <meta
          name="description"
          content="Buy yourself and your business time with expert branding, web development, and marketing strategies. Perception Creative Agency drives online growth for entrepreneurs and startups worldwide."
          />
        <meta name="keywords" content="branding, web development, marketing, startups, entrepreneurs, online growth" />
        <meta name="author" content="Perception Creative Agency" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.perceptionuae.store" />
        <meta property="og:title" content="Perception Creative Agency Store" />
        <meta
          property="og:description"
          content="Buy yourself and your business time with expert branding, web development, and marketing strategies. Perception Creative Agency drives online growth for entrepreneurs and startups worldwide."
          />
        <meta property="og:image" content="https://www.perceptionuae.store/open-graph/pca-open-graph.png" />
    </Head>
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

        <main className="container mx-auto px-4 pt-32 md:pt-36 pb-12 md:pb-24">
          <section className="w-full max-w-3xl mx-auto py-8 md:py-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide leading-tight text-[#01131F] text-center mb-8">
              BOOK A CALL
            </h1>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-bold">Personal Information</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Enter your first name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <PhoneInput value={formData.phone} onChange={handlePhoneChange} />
                  </div>
                </div>

                {/* Service Selection */}
                <div className="space-y-4 pt-4 border-t border-[#01131F]/10">
                  <h2 className="text-xl md:text-2xl font-bold">Service Selection</h2>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="startup-growth"
                        name="serviceType"
                        value="startup-growth"
                        checked={formData.serviceType === "startup-growth"}
                        onChange={handleServiceTypeChange}
                        className="w-4 h-4 text-[#B96944] focus:ring-[#B96944]"
                      />
                      <Label htmlFor="startup-growth" className="cursor-pointer">
                        Startup Growth Package
                      </Label>
                    </div>

                    {formData.serviceType === "startup-growth" && (
                      <div className="ml-6 space-y-3 pl-4 border-l-2 border-[#01131F]/10">
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="one-time"
                            name="paymentOption"
                            value="one-time"
                            checked={formData.paymentOption === "one-time"}
                            onChange={handlePaymentOptionChange}
                            className="w-4 h-4 text-[#B96944] focus:ring-[#B96944]"
                          />
                          <Label htmlFor="one-time" className="cursor-pointer">
                            One-time Payment (<PriceDisplay amount={5999} />)
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="installments"
                            name="paymentOption"
                            value="installments"
                            checked={formData.paymentOption === "installments"}
                            onChange={handlePaymentOptionChange}
                            className="w-4 h-4 text-[#B96944] focus:ring-[#B96944]"
                          />
                          <Label htmlFor="installments" className="cursor-pointer">
                            Installments (<PriceDisplay amount={5999} isInstallment={true} installmentCount={3} />)
                          </Label>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="a-la-carte"
                        name="serviceType"
                        value="a-la-carte"
                        checked={formData.serviceType === "a-la-carte"}
                        onChange={handleServiceTypeChange}
                        className="w-4 h-4 text-[#B96944] focus:ring-[#B96944]"
                      />
                      <Label htmlFor="a-la-carte" className="cursor-pointer">
                        A La Carte Options
                      </Label>
                    </div>

                    {formData.serviceType === "a-la-carte" && formData.selectedServices && (
                      <div className="ml-6 pl-4 border-l-2 border-[#01131F]/10">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">
                            Total: <PriceDisplay amount={formData.totalPrice || 0} />
                          </p>

                          <Popover open={showServiceDetails} onOpenChange={setShowServiceDetails}>
                            <PopoverTrigger asChild>
                              <Button variant="outline" size="sm" className="h-8 px-2 border-[#01131F]/20">
                                <Info size={16} className="mr-1" />
                                <span>View Details</span>
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 max-h-80 overflow-y-auto">
                              <h3 className="font-bold mb-2">Selected Services:</h3>
                              <div className="space-y-1">
                                {formData.selectedServices.map((service) => (
                                  <div key={service.id} className="flex justify-between">
                                    <span className={service.name.startsWith("-") ? "pl-2 text-[#01131F]/70" : ""}>
                                      {service.name}
                                    </span>
                                    <span>
                                      <PriceDisplay amount={service.price} />
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-[#01131F] text-[#fffae5] p-4 rounded-xl mt-6">
                  <h3 className="font-bold text-lg mb-2">Order Summary</h3>
                  <div className="flex justify-between">
                    <span>Service:</span>
                    <span>
                      {formData.serviceType === "startup-growth" ? "Startup Growth Package" : "A La Carte Options"}
                    </span>
                  </div>
                  {formData.serviceType === "startup-growth" && (
                    <div className="flex justify-between">
                      <span>Payment:</span>
                      <span>{formData.paymentOption === "one-time" ? "One-time Payment" : "Installments"}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold mt-2 pt-2 border-t border-[#fffae5]/20">
                    <span>Total:</span>
                    <span>
                      {formData.serviceType === "startup-growth" ? (
                        formData.paymentOption === "one-time" ? (
                          <PriceDisplay amount={5999} />
                        ) : (
                          <PriceDisplay amount={5999} isInstallment={true} installmentCount={3} />
                        )
                      ) : (
                        <PriceDisplay amount={formData.totalPrice || 0} />
                      )}
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-[#B96944] hover:bg-[#B96944]/90 text-[#fffae5] py-6 rounded-full text-lg font-bold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "BOOK YOUR CALL"}
                </Button>

                <p className="text-center text-sm text-[#01131F]/70">
                  By booking a call, you agree to our <a href="https://www.perceptionuae.com/privacy-policy" className="text-[#01131F]/80 hover:text-[#B96944] transition-colors duration-300 link-underline">Privacy Policy</a>.
                </p>
              </form>
            </div>
          </section>
        </main>

        <Footer darkMode={true} />
      </div>
    </div>
    </>
  )
}

