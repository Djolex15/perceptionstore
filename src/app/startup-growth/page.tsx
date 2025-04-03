"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
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
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-wide leading-tight text-[#01131F]">
              STARTUP GROWTH
              <span className="block text-[#01131F]">PACKAGE</span>
            </h1>
          </section>

          {/* What's Included Section */}
          <section className="w-full md:w-4/5 mx-auto py-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#01131F] mb-8">WHAT&apos;S INCLUDED:</h2>

            <div className="space-y-10">
              {/* Brand Identity Creation */}
              <div className="rounded-xl bg-white/50 p-4 hover:bg-white/80 transition-colors shadow-sm">
                <h3 className="text-xl md:text-2xl font-bold flex items-center">
                  <span className="flex items-center justify-center bg-[#B96944] text-white w-8 h-8 rounded-full mr-3">
                    1
                  </span>
                  BRAND IDENTITY CREATION
                </h3>
                <ul className="space-y-3 ml-11">
                  <li className="flex items-start">
                    <span className="text-[#B96944] mr-2 text-xl">•</span>
                    <span>LOGO DESIGN WITH 3 INITIAL CONCEPTS & 2 ROUNDS OF REVISIONS</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#B96944] mr-2 text-xl">•</span>
                    <span>
                      VISUAL BRANDING GUIDELINES (COLOR PALETTE, TYPOGRAPHY, FASHION & APPAREL, STATIONERY, PACKAGING,
                      AND USAGE GUIDE)
                    </span>
                  </li>
                </ul>
              </div>

              {/* Website Development */}
              <div className="rounded-xl bg-white/50 p-4 hover:bg-white/80 transition-colors shadow-sm">
                <h3 className="text-xl md:text-2xl font-bold flex items-center">
                  <span className="flex items-center justify-center bg-[#B96944] text-white w-8 h-8 rounded-full mr-3">
                    2
                  </span>
                  WEBSITE DEVELOPMENT
                </h3>
                <ul className="space-y-3 ml-11">
                  <li className="flex items-start">
                    <span className="text-[#B96944] mr-2 text-xl">•</span>
                    <span>A FULLY RESPONSIVE, CUSTOM-DESIGNED WEBSITE (UP TO 5 PAGES)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#B96944] mr-2 text-xl">•</span>
                    <span>SEO-READY WITH OPTIMIZED CONTENT & SPEED</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#B96944] mr-2 text-xl">•</span>
                    <span>INTEGRATED CONTACT FORMS & ANALYTICS SETUP</span>
                  </li>
                </ul>
              </div>

              {/* Social Media Strategy */}
              <div className="rounded-xl bg-white/50 p-4 hover:bg-white/80 transition-colors shadow-sm">
                <h3 className="text-xl md:text-2xl font-bold flex items-center">
                  <span className="flex items-center justify-center bg-[#B96944] text-white w-8 h-8 rounded-full mr-3">
                    3
                  </span>
                  SOCIAL MEDIA STRATEGY
                </h3>
                <ul className="space-y-3 ml-11">
                  <li className="flex items-start">
                    <span className="text-[#B96944] mr-2 text-xl">•</span>
                    <span>
                      CUSTOMIZED 3-MONTH STRATEGY FOR 2 PLATFORMS OF YOUR CHOICE (INSTAGRAM, TIKTOK, LINKEDIN, OR
                      FACEBOOK)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#B96944] mr-2 text-xl">•</span>
                    <span>CONTENT CALENDAR WITH 15 POSTS, 5 VIDEOS (15-60 SECONDS EACH) & TEMPLATES</span>
                  </li>
                </ul>
              </div>

              {/* Marketing Consultation */}
              <div className="rounded-xl bg-white/50 p-4 hover:bg-white/80 transition-colors shadow-sm">
                <h3 className="text-xl md:text-2xl font-bold flex items-center">
                  <span className="flex items-center justify-center bg-[#B96944] text-white w-8 h-8 rounded-full mr-3">
                    4
                  </span>
                  MARKETING CONSULTATION
                </h3>
                <ul className="space-y-3 ml-11">
                  <li className="flex items-start">
                    <span className="text-[#B96944] mr-2 text-xl">•</span>
                    <span>2 STRATEGY SESSIONS TO IDENTIFY YOUR MARKET POSITIONING & CUSTOMER ACQUISITION PLAN</span>
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
              <span className="text-xl">4-6 WEEKS FOR FULL DELIVERY</span>
            </div>
          </section>

          {/* Why It Works Section */}
          <section className="w-full md:w-4/5 mx-auto py-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#01131F] mb-6">WHY IT WORKS:</h2>
            <div className="flex items-start ml-2">
              <span className="text-[#B96944] mr-2 text-xl">•</span>
              <span className="text-lg md:text-xl">
                YOU&apos;RE SAVING YOUR STARTUP&apos;S TIME & MONEY BY GETTING A ONE-STOP SOLUTION WITH A CONSISTENT
                BRAND EXPERIENCE ACROSS PLATFORMS
              </span>
            </div>
          </section>

          {/* Investment Tiers Section */}
          <section className="w-full md:w-4/5 mx-auto py-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#01131F] mb-8 text-center">INVESTMENT TIERS:</h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* One-time Payment */}
              <div className="bg-[#01131F] text-[#fffae5] p-8 rounded-3xl text-center flex flex-col items-center shadow-lg hover:shadow-xl hover:z-10 transition-shadow transform hover:scale-105 hover:rotate-1">
                <h3 className="text-4xl md:text-5xl font-bold mb-2">
                  <PriceDisplay amount={5999} />
                </h3>
                <p className="text-xl uppercase mb-6">ONE TIME PAYMENT</p>
                <button
                  onClick={handleBookOneTime}
                  className="bg-[#B96944] text-[#fffae5] px-8 py-4 rounded-full uppercase font-bold hover:bg-opacity-90 transition-all"
                >
                  BOOK A CALL
                </button>
              </div>

              {/* Installments */}
              <div className="bg-[#01131F] text-[#fffae5] p-8 rounded-3xl text-center flex flex-col items-center shadow-lg hover:shadow-xl hover:z-10 transition-shadow transform hover:scale-105 hover:-rotate-1">
                <h3 className="text-4xl md:text-5xl font-bold mb-2">
                  <PriceDisplay amount={5999} isInstallment={true} installmentCount={3} />
                </h3>
                <p className="text-xl uppercase mb-6">PAY ON INSTALLMENTS</p>
                <button
                  onClick={handleBookInstallments}
                  className="bg-[#B96944] text-[#fffae5] px-8 py-4 rounded-full uppercase font-bold hover:bg-opacity-90 transition-all"
                >
                  BOOK A CALL
                </button>
              </div>
            </div>
          </section>

          {/* Divider */}
          <div className="w-full md:w-4/5 mx-auto flex justify-center py-8">
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

        {/* Pass darkMode prop to Footer for light background pages */}
        <Footer darkMode={true} />
      </div>
    </div>
  )
}

