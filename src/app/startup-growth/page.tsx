"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import Head from "next/head"
import Header from "../../components/header"
import Footer from "../../components/footer"
import PriceDisplay from "@/components/price-display"

export default function StartupGrowthPage() {
  const router = useRouter()

  // Handle booking a call with one-time payment
  const handleBookOneTime = () => {
    // Save service selection to cookies
    Cookies.set(
      "bookCallFormData",
      JSON.stringify({
        serviceType: "startup-growth",
        paymentOption: "one-time",
      }),
      { expires: 7 },
    )

    // Navigate to book-a-call page
    router.push("/book-a-call?serviceType=startup-growth&paymentOption=one-time")
  }

  // Handle booking a call with installments
  const handleBookInstallments = () => {
    // Save service selection to cookies
    Cookies.set(
      "bookCallFormData",
      JSON.stringify({
        serviceType: "startup-growth",
        paymentOption: "installments",
      }),
      { expires: 7 },
    )

    // Navigate to book-a-call page
    router.push("/book-a-call?serviceType=startup-growth&paymentOption=installments")
  }

  return (
    <>
      <Head>
        <title>Startup Growth Platform | Perception Creative Agency Store</title>
        <meta
          name="description"
          content="Your All-in-One Launchpad for Revenue, Reach & Recognition. Built for Founders Who Want to Win."
        />
        <meta name="keywords" content="startup growth, brand identity, website development, social media, marketing" />
        <meta name="author" content="Perception Creative Agency" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.perceptionuae.store" />
        <meta property="og:title" content="Startup Growth Platform | Perception Creative Agency" />
        <meta
          property="og:description"
          content="Your All-in-One Launchpad for Revenue, Reach & Recognition. Built for Founders Who Want to Win."
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

          <main className="container mx-auto px-4 pt-24 sm:pt-28 md:pt-36 pb-8 md:pb-12">
            {/* Hero Section */}
            <section className="w-full md:w-4/5 mx-auto py-4 sm:py-6 md:py-8 text-center">
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-wide leading-tight text-[#01131F]">
                STARTUP GROWTH PLATFORM
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl mt-3 md:mt-4 text-[#B96944] font-bold">
                Your All-in-One Launchpad for Revenue, Reach & Recognition
              </p>
              <p className="text-base sm:text-lg md:text-xl mt-2 font-bold">Built for Founders Who Want to Win.</p>
              <p className="text-sm sm:text-base md:text-lg mt-4 sm:mt-5 md:mt-6 max-w-4xl mx-auto">
                Designed by a team that thinks like investors and executes like operators, this package gives your
                startup a fast, scalable brand launch system, not just services.
              </p>
            </section>

            {/* What's Included Section */}
            <section className="w-full md:w-4/5 mx-auto py-4 sm:py-6 md:py-8">
              <h2 className="text-xl md:text-2xl font-bold text-[#01131F] mb-4 sm:mb-6 md:mb-8 text-center">
                WHAT YOU GET - POWERFUL ASSETS THAT PRINT PROFITS
              </h2>

              <div className="space-y-6 sm:space-y-8 md:space-y-10">
                {/* Brand Identity Creation */}
                <div className="rounded-xl bg-white/50 p-4 sm:p-5 md:p-6 hover:bg-white/80 transition-colors shadow-sm">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold flex items-center">
                    <span className="flex items-center justify-center bg-[#B96944] text-white number-circle mr-2 sm:mr-3">
                      1
                    </span>
                    HIGH-CONVERTING BRAND IDENTITY:
                  </h3>
                  <p className="ml-8 sm:ml-10 md:ml-11 mt-2 text-base sm:text-lg">
                    Not just a logo. This is your brand DNA, crafted for impact and memorability.
                  </p>
                  <ul className="space-y-2 sm:space-y-3 ml-8 sm:ml-10 md:ml-11 mt-3 sm:mt-4">
                    <li className="flex items-start">
                      <span className="text-[#B96944] mr-2 text-lg sm:text-xl">•</span>
                      <span className="text-sm sm:text-base">3 Premium Logo Concepts + 2 Refinement Rounds</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#B96944] mr-2 text-lg sm:text-xl">•</span>
                      <span className="text-sm sm:text-base">
                        Complete Visual Language: Color, Typography, Apparel, Packaging
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#B96944] mr-2 text-lg sm:text-xl">•</span>
                      <span className="text-sm sm:text-base">
                        Brand Usage Guidelines to ensure consistency as you scale
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Website Development */}
                <div className="rounded-xl bg-white/50 p-4 sm:p-5 md:p-6 hover:bg-white/80 transition-colors shadow-sm">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold flex items-center">
                    <span className="flex items-center justify-center bg-[#B96944] text-white number-circle mr-2 sm:mr-3">
                      2
                    </span>
                    REVENUE-READY WEBSITE EXPERIENCE:
                  </h3>
                  <p className="ml-8 sm:ml-10 md:ml-11 mt-2 text-base sm:text-lg">
                    Designed to convert traffic into transactions, fast.
                  </p>
                  <ul className="space-y-2 sm:space-y-3 ml-8 sm:ml-10 md:ml-11 mt-3 sm:mt-4">
                    <li className="flex items-start">
                      <span className="text-[#B96944] mr-2 text-lg sm:text-xl">•</span>
                      <span className="text-sm sm:text-base">
                        Fully Responsive, Custom-Designed Site (Up to 5 pages)
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#B96944] mr-2 text-lg sm:text-xl">•</span>
                      <span className="text-sm sm:text-base">SEO & Speed Optimized = High Search Rankings</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#B96944] mr-2 text-lg sm:text-xl">•</span>
                      <span className="text-sm sm:text-base">
                        Integrated Contact Forms + Conversion Tracking via Analytics
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Social Media Content */}
                <div className="rounded-xl bg-white/50 p-4 sm:p-5 md:p-6 hover:bg-white/80 transition-colors shadow-sm">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold flex items-center">
                    <span className="flex items-center justify-center bg-[#B96944] text-white number-circle mr-2 sm:mr-3">
                      3
                    </span>
                    SOCIAL MEDIA CONTENT MACHINE:
                  </h3>
                  <p className="ml-8 sm:ml-10 md:ml-11 mt-2 text-base sm:text-lg">Stop guessing. Start growing.</p>
                  <ul className="space-y-2 sm:space-y-3 ml-8 sm:ml-10 md:ml-11 mt-3 sm:mt-4">
                    <li className="flex items-start">
                      <span className="text-[#B96944] mr-2 text-lg sm:text-xl">•</span>
                      <span className="text-sm sm:text-base">
                        Tailored 3-Month Strategy for 2 Platforms (Instagram, TikTok, LinkedIn, or Facebook)
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#B96944] mr-2 text-lg sm:text-xl">•</span>
                      <span className="text-sm sm:text-base">Strategic Content Calendar</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#B96944] mr-2 text-lg sm:text-xl">•</span>
                      <span className="text-sm sm:text-base">15 Branded Posts + 5 Viral-Optimized Videos (15–60s)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#B96944] mr-2 text-lg sm:text-xl">•</span>
                      <span className="text-sm sm:text-base">Editable Templates to keep the momentum going</span>
                    </li>
                  </ul>
                </div>

                {/* Marketing & Monetization */}
                <div className="rounded-xl bg-white/50 p-4 sm:p-5 md:p-6 hover:bg-white/80 transition-colors shadow-sm">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold flex items-center">
                    <span className="flex items-center justify-center bg-[#B96944] text-white number-circle mr-2 sm:mr-3">
                      4
                    </span>
                    MARKETING & MONETIZATION CONSULTING:
                  </h3>
                  <p className="ml-8 sm:ml-10 md:ml-11 mt-2 text-base sm:text-lg">
                    We don&apos;t just give you the tools - we show you how to scale them to revenue.
                  </p>
                  <ul className="space-y-2 sm:space-y-3 ml-8 sm:ml-10 md:ml-11 mt-3 sm:mt-4">
                    <li className="flex items-start">
                      <span className="text-[#B96944] mr-2 text-lg sm:text-xl">•</span>
                      <span className="text-sm sm:text-base">2 High-Level Strategy Sessions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#B96944] mr-2 text-lg sm:text-xl">•</span>
                      <span className="text-sm sm:text-base">Target Market Breakdown</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#B96944] mr-2 text-lg sm:text-xl">•</span>
                      <span className="text-sm sm:text-base">Customer Acquisition Blueprint</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Timeline Section */}
            <section className="w-full md:w-4/5 mx-auto py-4 sm:py-6 md:py-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#01131F] mb-3 sm:mb-4 md:mb-6">
                TIMELINE:
              </h2>
              <div className="flex items-center ml-2">
                <span className="text-[#B96944] mr-2 text-lg sm:text-xl">•</span>
                <span className="text-base sm:text-lg md:text-xl">4–6 Weeks from Zero to Launch-Ready</span>
              </div>
            </section>

            {/* Investment Tiers Section */}
            <section className="w-full md:w-4/5 mx-auto py-4 sm:py-6 md:py-8">
              <h2 className="text-xl md:text-2xl font-bold text-[#01131F] mb-4 sm:mb-6 md:mb-8 text-center">
                ROI-FOCUSED INVESTMENT TIERS:
              </h2>
              <p className="text-center text-base sm:text-lg mb-4 sm:mb-6 md:mb-8">
                You&apos;re not buying services. You&apos;re buying market entry speed and a system for sustainable
                sales.
              </p>

              <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
                {/* One-time Payment */}
                <div className="bg-[#01131F] text-[#fffae5] p-6 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl text-center flex flex-col items-center shadow-lg hover:shadow-xl hover:z-10 transition-shadow transform hover:scale-105 hover:rotate-1">
                  <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2">
                    <PriceDisplay amount={5999} />
                  </h3>
                  <p className="text-lg sm:text-xl uppercase mb-4 sm:mb-5 md:mb-6">One-Time Launch Investment</p>
                  <button
                    onClick={handleBookOneTime}
                    className="bg-[#B96944] text-[#fffae5] px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-full uppercase font-bold hover:bg-opacity-90 transition-all text-sm sm:text-base"
                  >
                    BOOK A STRATEGY CALL
                  </button>
                </div>

                {/* Installments */}
                <div className="bg-[#01131F] text-[#fffae5] p-6 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl text-center flex flex-col items-center shadow-lg hover:shadow-xl hover:z-10 transition-shadow transform hover:scale-105 hover:-rotate-1">
                  <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2">
                    3 x <PriceDisplay amount={2099} />
                  </h3>
                  <p className="text-lg sm:text-xl uppercase mb-4 sm:mb-5 md:mb-6">Flexible Installment Plan</p>
                  <button
                    onClick={handleBookInstallments}
                    className="bg-[#B96944] text-[#fffae5] px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-full uppercase font-bold hover:bg-opacity-90 transition-all text-sm sm:text-base"
                  >
                    BOOK A STRATEGY CALL
                  </button>
                </div>
              </div>
            </section>

            {/* Why It Works Section */}
            <section className="w-full md:w-4/5 mx-auto py-4 sm:py-6 md:py-8">
              <h2 className="text-xl md:text-2xl font-bold text-[#01131F] mb-4 sm:mb-5 md:mb-6 text-center">
                WHY THIS WORKS (AND WHY OTHERS FAIL)
              </h2>
              <ul className="space-y-2 sm:space-y-3 ml-2">
                <li className="flex items-start">
                  <span className="text-[#B96944] mr-2 text-lg sm:text-xl">•</span>
                  <span className="text-sm sm:text-base md:text-lg">
                    Most startups burn time and cash juggling multiple freelancers.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#B96944] mr-2 text-lg sm:text-xl">•</span>
                  <span className="text-sm sm:text-base md:text-lg">
                    We give you a centralized, synchronized system - from brand to site to strategy to content.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#B96944] mr-2 text-lg sm:text-xl">•</span>
                  <span className="text-sm sm:text-base md:text-lg">
                    No fluff. Just fast-track execution that gets attention, drives traffic, and starts generating sales
                    from the ground up.
                  </span>
                </li>
              </ul>
            </section>

            {/* Positioned for Scale */}
            <section className="w-full md:w-4/5 mx-auto py-4 sm:py-6 md:py-8">
              <h2 className="text-xl md:text-2xl font-bold text-[#01131F] mb-4 sm:mb-5 md:mb-6 text-center">
                POSITIONED FOR SCALE
              </h2>
              <p className="text-sm sm:text-base md:text-lg">
                Perception is not a service provider. We are a brand growth engine built by a team that has scaled
                brands across the UAE, EU, and beyond. This platform is your unfair advantage in a competitive world.
              </p>
            </section>

            {/* Divider */}
            <div className="w-full md:w-4/5 mx-auto flex justify-center py-4 sm:py-6 md:py-8">
              <div className="flex items-center justify-center">
                <Image
                  src="/stars/pca-star-dark.png"
                  alt="Divider star"
                  width={20}
                  height={20}
                  className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
                />
              </div>
            </div>
          </main>

          {/* Pass darkMode prop to Footer for light background pages */}
          <Footer darkMode={true} />
        </div>
      </div>
    </>
  )
}

