"use client"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { Plus, Check, Minus } from "lucide-react"
import Header from "../../components/header"
import Footer from "../../components/footer"
import PriceCalculator from "../../components/price-calculator"

// Define service types
type ServiceOption = {
  id: string
  name: string
  price: number
  description: string
  selected: boolean
  choices?: {
    id: string
    name: string
    price: number
    selected: boolean
    quantity?: number
  }[]
}

type ServiceCategory = {
  id: string
  name: string
  options: ServiceOption[]
}

export default function ALaCartePage() {
  const router = useRouter()
  const bookCallRef = useRef<HTMLDivElement | null>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  // State for selected services and total price
  const [categories, setCategories] = useState<ServiceCategory[]>([
    {
      id: "video",
      name: "VIDEO PRODUCTION:",
      options: [
        {
          id: "short-form",
          name: "SHORT-FORM SOCIAL MEDIA VIDEOS",
          price: 1000,
          description: "5 VIDEOS (15-60 SECONDS EACH) TAILORED FOR TIKTOK, INSTAGRAM, OR LINKEDIN",
          selected: false,
        },
        {
          id: "promo",
          name: "PROMOTIONAL ADVERTISING VIDEO",
          price: 700,
          description: "1 VIDEO (2-3 MINUTES) SHOWCASING YOUR BRAND, PRODUCT, OR SERVICE",
          selected: false,
        },
        {
          id: "social-strategy",
          name: "SOCIAL MEDIA STRATEGY",
          price: 500,
          description:
            "CUSTOMIZED 3-MONTH STRATEGY FOR 2 PLATFORMS OF YOUR CHOICE (INSTAGRAM, TIKTOK, LINKEDIN, OR FACEBOOK)",
          selected: false,
          choices: [
            { id: "instagram", name: "Instagram", price: 0, selected: false },
            { id: "tiktok", name: "TikTok", price: 0, selected: false },
            { id: "linkedin", name: "LinkedIn", price: 0, selected: false },
            { id: "facebook", name: "Facebook", price: 0, selected: false },
          ],
        },
      ],
    },
    {
      id: "web",
      name: "WEB DESIGN & DEVELOPMENT:",
      options: [
        {
          id: "refresh",
          name: "WEBSITE REFRESH",
          price: 900,
          description: "REFRESHING UP TO 3 PAGES - ADDITIONAL PAGES 100€ EACH",
          selected: false,
          choices: [{ id: "additional-pages", name: "Additional Pages", price: 100, selected: false, quantity: 0 }],
        },
        {
          id: "custom",
          name: "FULL CUSTOM WEBSITE DESIGN & DEVELOPMENT",
          price: 2600,
          description: "DESIGNING & DEVELOPING UP TO 8 PAGES - ADDITIONAL PAGES 180€ EACH",
          selected: false,
          choices: [
            { id: "additional-pages-custom", name: "Additional Pages", price: 180, selected: false, quantity: 0 },
          ],
        },
        {
          id: "web-addons",
          name: "ADD-ONS",
          price: 0,
          description: "E-COMMERCE INTEGRATION, APPOINTMENT BOOKING & NEWSLETTER, OR MULTI-LANGUAGE SETUP",
          selected: false,
          choices: [
            { id: "ecommerce", name: "E-Commerce Integration", price: 200, selected: false },
            { id: "booking", name: "Appointment Booking & Newsletter", price: 200, selected: false },
            { id: "multilanguage", name: "Multi-Language Setup", price: 200, selected: false },
          ],
        },
      ],
    },
    {
      id: "graphic",
      name: "GRAPHIC DESIGN & BRAND IDENTITY:",
      options: [
        {
          id: "logo",
          name: "LOGO DESIGN",
          price: 420,
          description: "3 CONCEPTS",
          selected: false,
        },
        {
          id: "rebranding",
          name: "COMPLETE REBRANDING PACKAGE",
          price: 1200,
          description: "COLOR PALETTE, TYPOGRAPHY, FASHION & APPAREL, STATIONERY, PACKAGING, AND USAGE GUIDE",
          selected: false,
        },
      ],
    },
    {
      id: "app",
      name: "APP DESIGN & DEVELOPMENT:",
      options: [
        {
          id: "app-design",
          name: "APP UX/UI DESIGN",
          price: 0,
          description: "UP TO 5 SCREENS OR FULL APP DESIGN WITH 10+ SCREENS",
          selected: false,
          choices: [
            { id: "basic-app-design", name: "Basic App Design (Up to 5 screens)", price: 1500, selected: false },
            { id: "full-app-design", name: "Full App Design (10+ screens)", price: 3500, selected: false },
          ],
        },
        {
          id: "app-dev",
          name: "APP DEVELOPMENT",
          price: 0,
          description: "BASIC APP OR ADVANCED APP",
          selected: false,
          choices: [
            { id: "basic-app", name: "Basic App (Booking Systems, Content Apps)", price: 5000, selected: false },
            { id: "advanced-app", name: "Advanced App (E-commerce, Multi-platform)", price: 10000, selected: false },
          ],
        },
        {
          id: "app-addons",
          name: "ADD-ONS",
          price: 0,
          description: "API INTEGRATIONS OR ONGOING MAINTENANCE",
          selected: false,
          choices: [
            { id: "api-integration", name: "API Integration", price: 500, selected: false },
            { id: "maintenance", name: "Ongoing Maintenance (Monthly)", price: 300, selected: false },
          ],
        },
      ],
    },
    {
      id: "ads",
      name: "PAID ADS MANAGEMENT:",
      options: [
        {
          id: "social-ads",
          name: "SOCIAL MEDIA ADS",
          price: 500,
          description:
            "AD STRATEGY, SETUP, AND MANAGEMENT FOR PLATFORMS (FACEBOOK, INSTAGRAM, AND LINKEDIN) - INCLUDES 3 CAMPAIGNS/MONTH & AD CREATIVE",
          selected: false,
        },
        {
          id: "google-ads",
          name: "GOOGLE ADS",
          price: 600,
          description:
            "SEARCH, DISPLAY, OR SHOPPING AD CAMPAIGNS - INCLUDES KEYWORD RESEARCH, CAMPAIGN CREATION & MONTHLY OPTIMIZATION",
          selected: false,
        },
        {
          id: "ad-audit",
          name: "AD AUDIT & OPTIMIZATION",
          price: 350,
          description: "DEEP DIVE INTO YOUR CURRENT AD PERFORMANCE, WITH ACTIONABLE INSIGHTS FOR IMPROVEMENT",
          selected: false,
        },
      ],
    },
  ])

  const [totalPrice, setTotalPrice] = useState(0)

  // Calculate total price whenever selections change
  useEffect(() => {
    let total = 0
    categories.forEach((category) => {
      category.options.forEach((option) => {
        if (option.selected) {
          total += option.price

          // Add prices from selected choices
          if (option.choices) {
            option.choices.forEach((choice) => {
              if (choice.selected) {
                // If the choice has a quantity, multiply the price by the quantity
                if (choice.quantity !== undefined) {
                  total += choice.price * choice.quantity
                } else {
                  total += choice.price
                }
              }
            })
          }
        }
      })
    })
    setTotalPrice(total)
  }, [categories])

  // Toggle service selection
  const toggleService = (categoryId: string, optionId: string) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            options: category.options.map((option) => {
              if (option.id === optionId) {
                return { ...option, selected: !option.selected }
              }
              return option
            }),
          }
        }
        return category
      }),
    )
  }

  // Toggle choice selection
  const toggleChoice = (categoryId: string, optionId: string, choiceId: string) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            options: category.options.map((option) => {
              if (option.id === optionId) {
                return {
                  ...option,
                  choices: option.choices?.map((choice) => {
                    if (choice.id === choiceId) {
                      // If toggling on and has quantity, set to 1 if it was 0
                      if (!choice.selected && choice.quantity !== undefined && choice.quantity === 0) {
                        return { ...choice, selected: !choice.selected, quantity: 1 }
                      }
                      return { ...choice, selected: !choice.selected }
                    }
                    return choice
                  }),
                }
              }
              return option
            }),
          }
        }
        return category
      }),
    )
  }

  // Update choice quantity
  const updateChoiceQuantity = (categoryId: string, optionId: string, choiceId: string, change: number) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            options: category.options.map((option) => {
              if (option.id === optionId) {
                return {
                  ...option,
                  choices: option.choices?.map((choice) => {
                    if (choice.id === choiceId) {
                      const newQuantity = Math.max(0, (choice.quantity || 0) + change)
                      // If quantity becomes 0, also deselect the choice
                      const newSelected = newQuantity > 0
                      return {
                        ...choice,
                        quantity: newQuantity,
                        selected: newSelected,
                      }
                    }
                    return choice
                  }),
                }
              }
              return option
            }),
          }
        }
        return category
      }),
    )
  }

  // Get selected services for display in calculator
  const selectedServices = categories.flatMap((category) =>
    category.options
      .filter((option) => option.selected)
      .flatMap((option) => {
        const mainService = {
          id: option.id,
          name: option.name,
          price: option.price,
        }

        const choiceServices = option.choices
          ? option.choices
              .filter((choice) => choice.selected)
              .map((choice) => {
                // If the choice has a quantity, include it in the name and multiply the price
                if (choice.quantity !== undefined && choice.quantity > 0) {
                  return {
                    id: `${option.id}-${choice.id}`,
                    name: `- ${choice.name} (${choice.quantity})`,
                    price: choice.price * choice.quantity,
                  }
                }
                return {
                  id: `${option.id}-${choice.id}`,
                  name: `- ${choice.name}`,
                  price: choice.price,
                }
              })
          : []

        return [mainService, ...choiceServices]
      }),
  )

  // Handle booking a call with selected services
  const handleBookCall = () => {
    // Save selected services and total price to cookies
    Cookies.set(
      "selectedServices",
      JSON.stringify({
        services: selectedServices,
        totalPrice: totalPrice,
      }),
      { expires: 7 },
    )

    // Save service type to form data cookie
    Cookies.set(
      "bookCallFormData",
      JSON.stringify({
        serviceType: "a-la-carte",
        totalPrice: totalPrice,
        selectedServices: selectedServices,
      }),
      { expires: 7 },
    )

    // Navigate to book-a-call page with service type parameter
    router.push("/book-a-call?serviceType=a-la-carte")
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
        {/* Pass darkMode prop to Header for light background pages */}
        <Header darkMode={true} />

        <main className="container mx-auto px-4 pt-32 md:pt-36 pb-12 md:pb-12">
          {/* Hero Section */}
          <section className="w-full md:w-4/5 mx-auto py-8 md:py-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-wide leading-tight text-[#01131F]">
              A LA CARTE OPTIONS
            </h1>
            <p className="text-xl md:text-2xl text-[#B96944] mt-4">(FLEXIBLE SERVICE OFFERINGS)</p>
          </section>

          {/* Services Sections */}
          <section className="w-full md:w-4/5 mx-auto py-4">
            {categories.map((category) => (
              <div key={category.id} className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-[#01131F] mb-6">{category.name}</h2>

                <div className="space-y-8">
                  {category.options.map((option, index) => (
                    <div
                      key={option.id}
                      className="rounded-xl bg-white/50 p-4 hover:bg-white/80 transition-colors shadow-sm"
                    >
                      <div className="flex items-center mb-2">
                        <span className="text-[#B96944] font-bold text-xl mr-2">{index + 1}.</span>
                        <h3 className="text-xl font-bold flex-1">{option.name}</h3>
                        <button
                          className="ml-3 bg-[#01131F] text-[#fffae5] hover:bg-[#B96944] transition-colors w-8 h-8 rounded-full flex items-center justify-center"
                          onClick={() => toggleService(category.id, option.id)}
                          aria-label={option.selected ? "Remove from calculator" : "Add to calculator"}
                        >
                          {option.selected ? <Check size={16} /> : <Plus size={16} />}
                        </button>
                      </div>

                      <div className="ml-8 text-sm md:text-base">
                        <p>{option.description}</p>
                        {option.price > 0 && <p className="font-bold mt-1">(STARTING AT {option.price}€)</p>}
                      </div>

                      {/* Choices section */}
                      {option.selected && option.choices && option.choices.length > 0 && (
                        <div className="mt-4 ml-8 pl-4 border-l-2 border-[#01131F]/10">
                          <h4 className="font-semibold mb-2">Options:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {option.choices.map((choice) => (
                              <div
                                key={choice.id}
                                className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors ${
                                  choice.selected ? "bg-[#B96944]/10" : "bg-[#01131F]/5 hover:bg-[#01131F]/10"
                                }`}
                              >
                                {/* For choices with quantity */}
                                {choice.quantity !== undefined ? (
                                  <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center">
                                      <div
                                        className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center ${
                                          choice.selected ? "bg-[#B96944] text-white" : "border border-[#01131F]/30"
                                        }`}
                                        onClick={() => toggleChoice(category.id, option.id, choice.id)}
                                      >
                                        {choice.selected && <Check size={12} />}
                                      </div>
                                      <span>{choice.name}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <button
                                        className="w-6 h-6 rounded-full bg-[#01131F]/10 flex items-center justify-center hover:bg-[#01131F]/20"
                                        onClick={() => updateChoiceQuantity(category.id, option.id, choice.id, -1)}
                                        disabled={!choice.selected || (choice.quantity || 0) <= 1}
                                      >
                                        <Minus size={14} />
                                      </button>
                                      <span className="w-8 text-center">{choice.quantity}</span>
                                      <button
                                        className="w-6 h-6 rounded-full bg-[#01131F]/10 flex items-center justify-center hover:bg-[#01131F]/20"
                                        onClick={() => updateChoiceQuantity(category.id, option.id, choice.id, 1)}
                                      >
                                        <Plus size={14} />
                                      </button>
                                      <span className="font-semibold ml-2 w-16 text-right">
                                        {choice.price * (choice.quantity || 0)}€
                                      </span>
                                    </div>
                                  </div>
                                ) : (
                                  // For regular choices without quantity
                                  <>
                                    <div
                                      className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center ${
                                        choice.selected ? "bg-[#B96944] text-white" : "border border-[#01131F]/30"
                                      }`}
                                      onClick={() => toggleChoice(category.id, option.id, choice.id)}
                                    >
                                      {choice.selected && <Check size={12} />}
                                    </div>
                                    <span
                                      className="flex-1"
                                      onClick={() => toggleChoice(category.id, option.id, choice.id)}
                                    >
                                      {choice.name}
                                    </span>
                                    <span className="font-semibold">{choice.price}€</span>
                                  </>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Timeline Section */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[#01131F] mb-6">TIMELINE:</h2>
              <p className="text-xl">• 8-16 WEEKS FOR FULL DELIVERY</p>
            </div>

            {/* Why It Works Section */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[#01131F] mb-6">WHY IT WORKS:</h2>
              <p className="text-lg md:text-xl">
                IF YOU&apos;RE A BUSINESSES OWNER WITH SPECIFIC NEEDS & BUDGETS, WE MADE IT EASY FOR YOU TO PICK & CHOOSE
                WHAT YOU WANT WITHOUT COMMITTING TO BIG PACKAGE
              </p>
            </div>

            {/* Price Calculator Component - Placed right after Why It Works section */}
            <PriceCalculator
              totalPrice={totalPrice}
              selectedServices={selectedServices}
            />

            {/* Book a Call Button - Add ref here */}
            <div ref={bookCallRef} className="flex flex-col items-center mt-6 mb-6 space-y-6">
              <p className="text-center text-[#01131F]">
                PLEASE CONSIDER THAT THE PRICE SHOWN ABOVE IS AT THE STARTING POINT
              </p>
              <button
                onClick={handleBookCall}
                className="bg-[#B96944] text-[#fffae5] px-8 py-4 rounded-full uppercase font-bold hover:bg-opacity-90 transition-all text-center"
              >
                BOOK A CALL
              </button>
            </div>
          </section>

          {/* Divider */}
          <div className="w-full md:w-4/5 mx-auto flex justify-center">
            <div className="flex items-center justify-center">
              <Image
                src="/stars/pca-star-dark.png?height=24&width=24"
                alt="Divider star"
                width={20}
                height={20}
                className="w-8 h-8"
              />
            </div>
          </div>
        </main>

        {/* Footer with ref for measurement */}
        <div ref={footerRef}>
          <Footer darkMode={true} />
        </div>
      </div>
    </div>
  )
}

