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

          <main className="container mx-auto px-4 pt-32 md:pt-36 pb-12 md:pb-12">
            {/* Hero Section */}
            <section className="w-full md:w-4/5 mx-auto py-8 md:py-8 text-center">
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-wide leading-tight text-[#01131F]">
                STARTUP GROWTH PLATFORM
              </h1>
              <p className="text-xl md:text-2xl mt-4 text-[#B96944] font-bold">
                Your All-in-One Launchpad for Revenue, Reach & Recognition
              </p>
              <p className="text-lg md:text-xl mt-2 font-bold">Built for Founders Who Want to Win.</p>
              <p className="text-base md:text-lg mt-6 max-w-4xl mx-auto">
                Designed by a team that thinks like investors and executes like operators, this package gives your
                startup a fast, scalable brand launch system, not just services.
              </p>
            </section>

            {/* What's Included Section */}
            <section className="w-full md:w-4/5 mx-auto py-8">
              <h2 className="text-xl md:text-2xl font-bold text-[#01131F] mb-8 text-center">
                WHAT YOU GET - POWERFUL ASSETS THAT PRINT PROFITS
              </h2>

              <div className="space-y-10">
                {/* Brand Identity Creation */}
                <div className="rounded-xl bg-white/50 p-6 hover:bg-white/80 transition-colors shadow-sm">
                  <h3 className="text-xl md:text-2xl font-bold flex items-center">
                    <span className="flex items-center justify-center bg-[#B96944] text-white w-8 h-8 rounded-full mr-3">
                      1
                    </span>
                    HIGH-CONVERTING BRAND IDENTITY:
                  </h3>
                  <p className="ml-11 mt-2 text-lg">
                    Not just a logo. This is your brand DNA, crafted for impact and memorability.
                  </p>
                  <ul className="space-y-3 ml-11 mt-4">
                    <li className="flex items-start">
                      <span className="text-[#B96944] mr-2 text-xl">•</span>
                      <span>3 Premium Logo Concepts + 2 Refinement Rounds</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#B96944] mr-2 text-xl">•</span>
                      <span>Complete Visual Language: Color, Typography, Apparel, Packaging</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#B96944] mr-2 text-xl">•</span>
                      <span>Brand Usage Guidelines to ensure consistency as you scale</span>
                    </li>
                  </ul>
                </div>

                {/* Website Development */}
                <div className="rounded-xl bg-white/50 p-6 hover:bg-white/80 transition-colors shadow-sm">
                  <h3 className="text-xl md:text-2xl font-bold flex items-center">
                    <span className="flex items-center justify-center bg-[#B96944] text-white w-8 h-8 rounded-full mr-3">
                      2
                    </span>
                    REVENUE-READY WEBSITE EXPERIENCE:
                  </h3>
                  <p className="ml-11 mt-2 text-lg">Designed to convert traffic into transactions, fast.</p>
                  <ul className="space-y-3 ml-11 mt-4">
                    <li className="flex items-start">
                      <span className="text-[#B96944] mr-2 text-xl">•</span>
                      <span>Fully Responsive, Custom-Designed Site (Up to 5 pages)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#B96944] mr-2 text-xl">•</span>
                      <span>SEO & Speed Optimized = High Search Rankings</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#B96944] mr-2 text-xl">•</span>
                      <span>Integrated Contact Forms + Conversion Tracking via Analytics</span>
                    </li>
                  </ul>
                </div>

                {/* Social Media Content */}
                <div className="rounded-xl bg-white/50 p-6 hover:bg-white/80 transition-colors shadow-sm">
                  <h3 className="text-xl md:text-2xl font-bold flex items-center">
                    <span className="flex items-center justify-center bg-[#B96944] text-white w-8 h-8 rounded-full mr-3">
                      3
                    </span>
                    SOCIAL MEDIA CONTENT MACHINE:
                  </h3>
                  <p className="ml-11 mt-2 text-lg">Stop guessing. Start growing.</p>
                  <ul className="space-y-3 ml-11 mt-4">
                    <li className="flex items-start">
                      <span className="text-[#B96944] mr-2 text-xl">•</span>
                      <span>Tailored 3-Month Strategy for 2 Platforms (Instagram, TikTok, LinkedIn, or Facebook)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#B96944] mr-2 text-xl">•</span>
                      <span>Strategic Content Calendar</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#B96944] mr-2 text-xl">•</span>
                      <span>15 Branded Posts + 5 Viral-Optimized Videos (15–60s)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#B96944] mr-2 text-xl">•</span>
                      <span>Editable Templates to keep the momentum going</span>
                    </li>
                  </ul>
                </div>

                {/* Marketing & Monetization */}
                <div className="rounded-xl bg-white/50 p-6 hover:bg-white/80 transition-colors shadow-sm">
                  <h3 className="text-xl md:text-2xl font-bold flex items-center">
                    <span className="flex items-center justify-center bg-[#B96944] text-white w-8 h-8 rounded-full mr-3">
                      4
                    </span>
                    MARKETING & MONETIZATION CONSULTING:
                  </h3>
                  <p className="ml-11 mt-2 text-lg">
                    We don't just give you the tools - we show you how to scale them to revenue.
                  </p>
                  <ul className="space-y-3 ml-11 mt-4">
                    <li className="flex items-start">
                      <span className="text-[#B96944] mr-2 text-xl">•</span>
                      <span>2 High-Level Strategy Sessions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#B96944] mr-2 text-xl">•</span>
                      <span>Target Market Breakdown</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#B96944] mr-2 text-xl">•</span>
                      <span>Customer Acquisition Blueprint</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Timeline Section */}
            <section className="w-full md:w-4/5 mx-auto py-8">
              <h2 className="text-2xl md:text-3xl font-bold text-[#01131F] mb-6">TIMELINE:</h2>
              <div className="flex items-center ml-2">
                <span className="text-[#B96944] mr-2 text-xl">•</span>
                <span className="text-xl">4–6 Weeks from Zero to Launch-Ready</span>
              </div>
            </section>

            {/* Investment Tiers Section */}
            <section className="w-full md:w-4/5 mx-auto py-8">
              <h2 className="text-xl md:text-2xl font-bold text-[#01131F] mb-8 text-center">
                ROI-FOCUSED INVESTMENT TIERS:
              </h2>
              <p className="text-center text-lg mb-8">
                You're not buying services. You're buying market entry speed and a system for sustainable sales.
              </p>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* One-time Payment */}
                <div className="bg-[#01131F] text-[#fffae5] p-8 rounded-3xl text-center flex flex-col items-center shadow-lg hover:shadow-xl hover:z-10 transition-shadow transform hover:scale-105 hover:rotate-1">
                  <h3 className="text-4xl md:text-5xl font-bold mb-2">
                    <PriceDisplay amount={5999} />
                  </h3>
                  <p className="text-xl uppercase mb-6">One-Time Launch Investment</p>
                  <button
                    onClick={handleBookOneTime}
                    className="bg-[#B96944] text-[#fffae5] px-8 py-4 rounded-full uppercase font-bold hover:bg-opacity-90 transition-all"
                  >
                    BOOK A STRATEGY CALL
                  </button>
                </div>

                {/* Installments */}
                <div className="bg-[#01131F] text-[#fffae5] p-8 rounded-3xl text-center flex flex-col items-center shadow-lg hover:shadow-xl hover:z-10 transition-shadow transform hover:scale-105 hover:-rotate-1">
                  <h3 className="text-4xl md:text-5xl font-bold mb-2">
                    3 x <PriceDisplay amount={2099} />
                  </h3>
                  <p className="text-xl uppercase mb-6">Flexible Installment Plan</p>
                  <button
                    onClick={handleBookInstallments}
                    className="bg-[#B96944] text-[#fffae5] px-8 py-4 rounded-full uppercase font-bold hover:bg-opacity-90 transition-all"
                  >
                    BOOK A STRATEGY CALL
                  </button>
                </div>
              </div>
            </section>

            {/* Why It Works Section */}
            <section className="w-full md:w-4/5 mx-auto py-8">
              <h2 className="text-xl md:text-2xl font-bold text-[#01131F] mb-6 text-center">
                WHY THIS WORKS (AND WHY OTHERS FAIL)
              </h2>
              <ul className="space-y-3 ml-2">
                <li className="flex items-start">
                  <span className="text-[#B96944] mr-2 text-xl">•</span>
                  <span className="text-lg">Most startups burn time and cash juggling multiple freelancers.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#B96944] mr-2 text-xl">•</span>
                  <span className="text-lg">
                    We give you a centralized, synchronized system - from brand to site to strategy to content.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#B96944] mr-2 text-xl">•</span>
                  <span className="text-lg">
                    No fluff. Just fast-track execution that gets attention, drives traffic, and starts generating sales
                    from the ground up.
                  </span>
                </li>
              </ul>
            </section>

            {/* Positioned for Scale */}
            <section className="w-full md:w-4/5 mx-auto py-8">
              <h2 className="text-xl md:text-2xl font-bold text-[#01131F] mb-6 text-center">POSITIONED FOR SCALE</h2>
              <p className="text-lg">
                Perception is not a service provider. We are a brand growth engine built by a team that has scaled
                brands across the UAE, EU, and beyond. This platform is your unfair advantage in a competitive world.
              </p>
            </section>

            {/* Divider */}
            <div className="w-full md:w-4/5 mx-auto flex justify-center py-8">
              <div className="flex items-center justify-center">
                <Image src="/stars/pca-star-dark.png" alt="Divider star" width={20} height={20} className="w-8 h-8" />
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

