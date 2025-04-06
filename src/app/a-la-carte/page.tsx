"use client"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { Plus, Check, Minus } from "lucide-react"
import Header from "../../components/header"
import Head from "next/head"
import Footer from "../../components/footer"
import PriceCalculator from "../../components/price-calculator"
import PriceDisplay from "@/components/price-display"

// Define service types
type ServiceOption = {
  id: string
  name: string
  price: number
  description: string
  selected: boolean
  quantity?: number
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
      name: "VIDEO PRODUCTION (Turns Attention into Revenue)",
      options: [
        {
          id: "short-form",
          name: "Short-Form Viral Content",
          price: 1499,
          description: "5 Social-Optimized Videos (15–60s) for TikTok, Instagram, or LinkedIn",
          selected: false,
          choices: [{ id: "extra-video", name: "Additional Video", price: 299, selected: false, quantity: 0 }],
        },
        {
          id: "promo",
          name: "Brand/Service Promotional Video",
          price: 799,
          description: "2–3 Minute Commercial-Grade Video",
          selected: false,
          choices: [
            { id: "extra-promo", name: "Additional Promotional Video", price: 799, selected: false, quantity: 0 },
          ],
        },
        {
          id: "social-strategy",
          name: "Social Media Strategy",
          price: 599,
          description: "Tailored 3-Month Blueprint for 2 Platforms",
          selected: false,
        },
      ],
    },
    {
      id: "web",
      name: "WEB DESIGN & DEVELOPMENT (Your Digital Headquarters, Built for Sales)",
      options: [
        {
          id: "ecommerce",
          name: "E-Commerce Website",
          price: 3499,
          description: "Fully Integrated Online Store - Product Management, Checkout, and Shipping",
          selected: false,
          choices: [
            { id: "ai-chatbot", name: "AI Chatbot", price: 499, selected: false },
            { id: "payment-gateway", name: "Payment Gateway", price: 399, selected: false },
            { id: "admin-dashboard", name: "Admin Dashboard", price: 599, selected: false },
          ],
        },
        {
          id: "custom",
          name: "Full Custom Website (Up to 8 Pages)",
          price: 2599,
          description: "Strategically Designed for Engagement & Action",
          selected: false,
          choices: [
            { id: "extra-page", name: "Additional Page", price: 179, selected: false, quantity: 0 },
            { id: "ai-chatbot", name: "AI Chatbot", price: 499, selected: false },
            { id: "payment-gateway", name: "Payment Gateway", price: 399, selected: false },
            { id: "admin-dashboard", name: "Admin Dashboard", price: 599, selected: false },
          ],
        },
        {
          id: "service-based",
          name: "Service-Based Website (Up to 8 Pages)",
          price: 2599,
          description: "Built for Consultants, Agencies & Experts to Convert Leads with Ease",
          selected: false,
          choices: [
            { id: "ai-chatbot", name: "AI Chatbot", price: 499, selected: false },
            { id: "payment-gateway", name: "Payment Gateway", price: 399, selected: false },
            { id: "admin-dashboard", name: "Conversion-Focused Admin Dashboard", price: 599, selected: false },
          ],
        },
        {
          id: "business-management",
          name: "Business Management Platform",
          price: 4999,
          description: "CRM, Booking Systems, and Workflow Automation",
          selected: false,
        },
      ],
    },
    {
      id: "app",
      name: "APP DESIGN & DEVELOPMENT (From Idea to Market-Ready Experience)",
      options: [
        {
          id: "app-design",
          name: "App UX/UI Design",
          price: 0,
          description: "Visually Stunning, User-Centric Interfaces",
          selected: false,
          choices: [
            { id: "basic-app-design", name: "Basic App Design (Up to 5 screens)", price: 1499, selected: false },
            { id: "full-app-design", name: "Full App Design (10+ screens)", price: 3499, selected: false },
          ],
        },
        {
          id: "app-dev",
          name: "App Development",
          price: 0,
          description: "Built for Function, Performance, and Growth",
          selected: false,
          choices: [
            { id: "basic-app", name: "Basic App (Booking, Content)", price: 5000, selected: false },
            { id: "advanced-app", name: "Advanced App (E-commerce, Cross-Platform)", price: 10000, selected: false },
          ],
        },
        {
          id: "custom-app",
          name: "Custom Business App",
          price: 4999,
          description: "Internal Systems. CRM. Booking. Ops Management.",
          selected: false,
        },
        {
          id: "app-addons",
          name: "Add-Ons",
          price: 0,
          description: "API Integrations or Ongoing Maintenance",
          selected: false,
          choices: [
            { id: "api-integration", name: "API Integrations", price: 299, selected: false },
            { id: "maintenance", name: "Ongoing Maintenance (Monthly)", price: 299, selected: false },
          ],
        },
      ],
    },
    {
      id: "ads",
      name: "PAID ADS MANAGEMENT (Profit-Driven Campaigns, Not Just Clicks)",
      options: [
        {
          id: "social-ads",
          name: "Social Media Advertising",
          price: 699,
          description: "Strategy, Campaign Management, and Creative",
          selected: false,
        },
        {
          id: "google-ads",
          name: "Google Ads (Search, Display, Shopping)",
          price: 599,
          description: "Keyword Research, Campaign Setup, Monthly Optimization",
          selected: false,
        },
        {
          id: "ad-audit",
          name: "Ad Audit & Optimization",
          price: 349,
          description: "Get Clarity. Fix Leaks. Boost Conversions.",
          selected: false,
        },
      ],
    },
  ])

  const [totalPrice, setTotalPrice] = useState(0)
  const [discounts, setDiscounts] = useState<{ id: string; name: string; amount: number }[]>([])

  // Toggle service selection
  const toggleService = (categoryId: string, optionId: string) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            options: category.options.map((option) => {
              if (option.id === optionId) {
                // If toggling on, set quantity to 1
                if (!option.selected) {
                  return { ...option, selected: true, quantity: 1 }
                }
                // If toggling off, reset quantity to 0
                return { ...option, selected: false, quantity: 0 }
              }
              return option
            }),
          }
        }
        return category
      }),
    )
  }

  // Add a new function to update service quantity
  const updateServiceQuantity = (categoryId: string, optionId: string, change: number) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            options: category.options.map((option) => {
              if (option.id === optionId) {
                const newQuantity = Math.max(1, (option.quantity || 1) + change)
                return { ...option, quantity: newQuantity }
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

  // Calculate total price whenever selections change
  useEffect(() => {
    let total = 0
    const newDiscounts: { id: string; name: string; amount: number }[] = []

    // Group services by their base type for discount calculation
    const serviceQuantities: Record<string, { count: number; totalPrice: number; name: string }> = {}

    // Group choices by their type for discount calculation
    const choiceQuantities: Record<string, { count: number; totalPrice: number; name: string }> = {}

    categories.forEach((category) => {
      category.options.forEach((option) => {
        if (option.selected) {
          // Use quantity for main service price calculation
          const quantity = option.quantity || 1
          const optionTotalPrice = option.price * quantity
          total += optionTotalPrice

          // Track quantities for discount calculation
          const baseServiceId = option.id
          if (!serviceQuantities[baseServiceId]) {
            serviceQuantities[baseServiceId] = { count: 0, totalPrice: 0, name: option.name }
          }
          serviceQuantities[baseServiceId].count += quantity
          serviceQuantities[baseServiceId].totalPrice += optionTotalPrice

          // Add prices from selected choices and track choice quantities
          if (option.choices) {
            option.choices.forEach((choice) => {
              if (choice.selected) {
                // If the choice has a quantity, multiply the price by the quantity
                const choiceQuantity = choice.quantity !== undefined ? choice.quantity : 1
                const choiceTotalPrice = choice.price * choiceQuantity
                total += choiceTotalPrice

                // Track choice quantities for discount calculation
                const choiceId = choice.id
                if (!choiceQuantities[choiceId]) {
                  choiceQuantities[choiceId] = { count: 0, totalPrice: 0, name: choice.name }
                }
                choiceQuantities[choiceId].count += choiceQuantity
                choiceQuantities[choiceId].totalPrice += choiceTotalPrice
              }
            })
          }
        }
      })
    })

    // Calculate tiered discounts for multiple services of the same type
    Object.entries(serviceQuantities).forEach(([id, data]) => {
      // Apply discounts to all services with quantity >= 2
      let discountRate = 0

      // Tiered discount: 10% for 2-3 items, 20% for 4+ items
      if (data.count >= 4) {
        discountRate = 0.2 // 20% discount for 4+ items
      } else if (data.count >= 2) {
        discountRate = 0.1 // 10% discount for 2-3 items
      }

      if (discountRate > 0) {
        const discountAmount = Math.round(data.totalPrice * discountRate)

        if (discountAmount > 0) {
          newDiscounts.push({
            id: `discount-${id}`,
            name: `Quantity Discount (${data.count}x ${data.name})`,
            amount: discountAmount,
          })

          total -= discountAmount
        }
      }
    })

    // Calculate tiered discounts for multiple choices of the same type
    Object.entries(choiceQuantities).forEach(([id, data]) => {
      // Apply discounts to all choices with quantity >= 2
      let discountRate = 0

      // Tiered discount: 10% for 2-3 items, 20% for 4+ items
      if (data.count >= 4) {
        discountRate = 0.2 // 20% discount for 4+ items
      } else if (data.count >= 2) {
        discountRate = 0.1 // 10% discount for 2-3 items
      }

      if (discountRate > 0) {
        const discountAmount = Math.round(data.totalPrice * discountRate)

        if (discountAmount > 0) {
          newDiscounts.push({
            id: `discount-choice-${id}`,
            name: `Quantity Discount (${data.count}x ${data.name})`,
            amount: discountAmount,
          })

          total -= discountAmount
        }
      }
    })

    setDiscounts(newDiscounts)
    setTotalPrice(total)
  }, [categories])

  // Get selected services for display in calculator
  const selectedServices = [
    ...categories.flatMap((category) =>
      category.options
        .filter((option) => option.selected)
        .flatMap((option) => {
          // Include quantity in the name if more than 1
          const quantity = option.quantity || 1
          const mainService = {
            id: option.id,
            name: quantity > 1 ? `${option.name} (${quantity}x)` : option.name,
            price: option.price * quantity,
          }

          const choiceServices = option.choices
            ? option.choices
                .filter((choice) => choice.selected)
                .map((choice) => {
                  // If the choice has a quantity, include it in the name and multiply the price
                  if (choice.quantity !== undefined && choice.quantity > 0) {
                    return {
                      id: `${option.id}-${choice.id}`,
                      name: `- ${choice.name} (${choice.quantity}x)`,
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
    ),
    // Add discounts as negative price items
    ...discounts.map((discount) => ({
      id: discount.id,
      name: discount.name,
      price: -discount.amount,
    })),
  ]

  // Handle booking a call with selected services
  const handleBookCall = () => {
    // Save selected services and total price to cookies
    Cookies.set(
      "selectedServices",
      JSON.stringify({
        services: selectedServices,
        totalPrice: totalPrice,
        discounts: discounts,
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
        discounts: discounts,
      }),
      { expires: 7 },
    )

    // Navigate to book-a-call page with service type parameter
    router.push("/book-a-call?serviceType=a-la-carte")
  }

  return (
    <>
      <Head>
        <title>À La Carte Growth Solutions | Perception Creative Agency Store</title>
        <meta
          name="description"
          content="Custom-Built to Drive Revenue. Scaled to Match Ambition. Choose from our flexible service offerings for video production, web design, app development, and paid ads management."
        />
        <meta
          name="keywords"
          content="video production, web design, app development, paid ads, marketing, creative services"
        />
        <meta name="author" content="Perception Creative Agency" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.perceptionuae.store" />
        <meta property="og:title" content="À La Carte Growth Solutions | Perception Creative Agency" />
        <meta
          property="og:description"
          content="Custom-Built to Drive Revenue. Scaled to Match Ambition. Choose from our flexible service offerings for video production, web design, app development, and paid ads management."
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
          {/* Pass darkMode prop to Header for light background pages */}
          <Header darkMode={true} />

          <main className="container mx-auto px-4 pt-32 md:pt-36 pb-12 md:pb-12">
            {/* Hero Section */}
            <section className="w-full md:w-4/5 mx-auto py-8 md:py-8 text-center">
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-wide leading-tight text-[#01131F]">
                A LA CARTE GROWTH SOLUTIONS
              </h1>
              <p className="text-xl md:text-2xl text-[#B96944] font-bold mt-4">
                Custom-Built to Drive Revenue. Scaled to Match Ambition.
              </p>
              <p className="text-lg md:text-lg mt-6 w-full mx-auto">
                We&apos;ve deconstructed the most powerful growth systems in the world - from viral video campaigns to
                e-commerce empires and business automation. Now, we&apos;ve made them accessible, modular, and instantly
                executable for founders, CMOs, and growth teams who demand speed, ROI, and clarity.
              </p>
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

                          {option.selected ? (
                            <div className="flex items-center space-x-2 mr-3">
                              <button
                                className="w-8 h-8 rounded-full bg-[#01131F]/10 flex items-center justify-center hover:bg-[#01131F]/20"
                                onClick={() => updateServiceQuantity(category.id, option.id, -1)}
                                disabled={(option.quantity || 1) <= 1}
                              >
                                <Minus size={16} />
                              </button>
                              <span className="w-8 text-center font-semibold">{option.quantity || 1}</span>
                              <button
                                className="w-8 h-8 rounded-full bg-[#01131F]/10 flex items-center justify-center hover:bg-[#01131F]/20"
                                onClick={() => updateServiceQuantity(category.id, option.id, 1)}
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                          ) : null}

                          <button
                            className="bg-[#01131F] text-[#fffae5] hover:bg-[#B96944] transition-colors w-8 h-8 rounded-full flex items-center justify-center"
                            onClick={() => toggleService(category.id, option.id)}
                            aria-label={option.selected ? "Remove from calculator" : "Add to calculator"}
                          >
                            {option.selected ? <Check size={16} /> : <Plus size={16} />}
                          </button>
                        </div>

                        <div className="ml-8 text-sm md:text-base">
                          <p>{option.description}</p>
                          {option.price === 0 && (
                            <p className="font-bold mt-1 text-[#B96944]">(Click to select options below)</p>
                          )}
                          {option.price > 0 && (
                            <p className="font-bold mt-1">
                              (STARTING AT <PriceDisplay amount={option.price} />)
                            </p>
                          )}
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
                                          <PriceDisplay amount={choice.price * (choice.quantity || 0)} />
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
                                      <span className="font-semibold">
                                        <PriceDisplay amount={choice.price} />
                                      </span>
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
                <h2 className="text-2xl md:text-3xl font-bold text-[#01131F] mb-6">DELIVERY TIMELINE:</h2>
                <p className="text-xl">• 8-16 Weeks for Full Execution</p>
                <p className="text-lg mt-2">• Modular projects may be delivered in 2–4 weeks.</p>
              </div>

              {/* Why It Works Section */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-[#01131F] mb-6">
                  WHY THIS WORKS FOR HIGH-PERFORMANCE COMPANIES:
                </h2>
                <ul className="space-y-3 ml-2">
                  <li className="flex items-start">
                    <span className="text-[#B96944] mr-2 text-xl">•</span>
                    <span className="text-lg">
                      Modular = Scalable - Only pay for what accelerates your growth right now
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#B96944] mr-2 text-xl">•</span>
                    <span className="text-lg">
                      Speed + Specialization - Our team of experts delivers faster than traditional agencies
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#B96944] mr-2 text-xl">•</span>
                    <span className="text-lg">
                      Results Obsessed - Every deliverable is designed to move your KPI forward: traffic, conversion,
                      retention, revenue.
                    </span>
                  </li>
                </ul>
              </div>

              {/* The Multiplier Model Section */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-[#01131F] mb-6 text-center">
                  THE MULTIPLIER MODEL - STACK FOR GROWTH
                </h2>
                <p className="text-lg mb-4">When combined, services deliver exponential-not additive-results.</p>

                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white/70 rounded-lg overflow-hidden">
                    <thead className="bg-[#B96944] text-white">
                      <tr>
                        <th className="px-4 py-3 text-left">Service Stack</th>
                        <th className="px-4 py-3 text-left">Projected Growth</th>
                        <th className="px-4 py-3 text-left">Timeline</th>
                        <th className="px-4 py-3 text-left">Net ROI Potential</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-white/90">
                        <td className="px-4 py-3">Short-Form Video + Paid Ads</td>
                        <td className="px-4 py-3">3-5x Revenue</td>
                        <td className="px-4 py-3">4-6 Weeks</td>
                        <td className="px-4 py-3">€10k-€50k+ /mo</td>
                      </tr>
                      <tr className="hover:bg-white/90">
                        <td className="px-4 py-3">Website + Promo Video</td>
                        <td className="px-4 py-3">2-4x Conversion</td>
                        <td className="px-4 py-3">6-8 Weeks</td>
                        <td className="px-4 py-3">€20k+ ARR Boost</td>
                      </tr>
                      <tr className="hover:bg-white/90">
                        <td className="px-4 py-3">App + Ads + Strategy</td>
                        <td className="px-4 py-3">5-10x Market Penetration</td>
                        <td className="px-4 py-3">8-12 Weeks</td>
                        <td className="px-4 py-3">€100k-€500k Scaling Ceiling</td>
                      </tr>
                      <tr className="hover:bg-white/90">
                        <td className="px-4 py-3">Business Platform + Custom App</td>
                        <td className="px-4 py-3">3x Margin</td>
                        <td className="px-4 py-3">8-6 Weeks</td>
                        <td className="px-4 py-3">€200k-€1M Saved & Scaled</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* CEO Quote Section */}
              <div className="mb-12 bg-[#01131F] text-white p-8 rounded-xl">
                <div className="relative group">
                  <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">
                    FROM CEO{" "}
                    <span
                      className="relative inline-block cursor-pointer text-[#B96944] font-bold link-underline2"
                      onClick={() => window.open("https://www.linkedin.com/in/uros-vuckovic-a2463a33a/", "_blank")}
                    >
                      UROS VUCKOVIC
                      <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out z-10 transform translate-x-1 translate-y-0 group-hover:translate-y-2 top-full">
                        <div className="relative">
                          <Image
                            src="/uros.jpg"
                            alt="Uros Vuckovic"
                            width={200}
                            height={200}
                            className="rounded-lg shadow-lg cursor-pointer animate-slideIn"
                            onClick={(e) => {
                              e.stopPropagation()
                              window.open("https://www.linkedin.com/in/uros-vuckovic-a2463a33a/", "_blank")
                            }}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = "/placeholder.svg?height=200&width=200"
                            }}
                            style={{
                              animation: "slideIn 0.5s ease-out forwards",
                            }}
                          />
                          <div className="absolute rounded-b-lg bottom-0 left-0 right-0 bg-[#01131F]/90 text-white text-center py-2 text-sm font-bold">
                            CEO OF PERCEPTION
                          </div>
                        </div>
                      </div>
                    </span>
                    :
                  </h2>
                  <blockquote className="text-lg italic text-center">
                    &quot;If you&apos;re serious about growth, stop piecing things together.
                    <br />
                    We took the billion-dollar systems and made them modular, fast, and built to perform.
                    <br />
                    Whether you&apos;re a startup, scale-up, or market leader, this is your next unfair advantage.&quot;
                  </blockquote>
                </div>
              </div>

              {/* Price Calculator Component */}
              <PriceCalculator
                totalPrice={totalPrice}
                selectedServices={selectedServices}
                discounts={discounts.length > 0}
              />

              {discounts.length > 0 && (
                <div className="bg-[#B96944]/10 p-4 rounded-lg mt-4 mb-6">
                  <h3 className="font-bold text-lg mb-2">Quantity Discounts Applied!</h3>
                  <p className="mb-2">You&apos;re saving money by ordering multiple services:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    {discounts.map((discount) => (
                      <li key={discount.id}>
                        {discount.name}: <PriceDisplay amount={discount.amount} />
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-sm font-medium">
                    Our discount tiers for all services and options:
                    <br />• 10% off when you order 2-3 of the same item
                    <br />• 20% off when you order 4+ of the same item
                  </p>
                </div>
              )}

              {/* Book a Call Button */}
              <div ref={bookCallRef} className="flex flex-col items-center mt-6 mb-6 space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-center">READY TO BUILD YOUR NEXT GROWTH ENGINE?</h2>
                <p className="text-center text-lg">Start with what you need. Scale when you&apos;re ready.</p>
                <button
                  onClick={handleBookCall}
                  className="bg-[#B96944] text-[#fffae5] px-8 py-4 rounded-full uppercase font-bold hover:bg-opacity-90 transition-all text-center"
                >
                  BOOK A CALL NOW
                </button>
                <p className="text-center text-[#01131F] italic">Let&apos;s Build What Everyone Else Will Copy Tomorrow.</p>
              </div>
            </section>

            {/* Divider */}
            <div className="w-full md:w-4/5 mx-auto flex justify-center">
              <div className="flex items-center justify-center">
                <Image src="/stars/pca-star-dark.png" alt="Divider star" width={20} height={20} className="w-8 h-8" />
              </div>
            </div>
          </main>

          {/* Footer with ref for measurement */}
          <div ref={footerRef}>
            <Footer darkMode={true} />
          </div>
        </div>
      </div>
    </>
  )
}

