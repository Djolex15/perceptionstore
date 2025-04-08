"use client"

import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import { ReferenceCarousel, type ReferenceItem } from "../components/reference-carousel"
import { AnimatedCard } from "../components/animated-card"
import Header from "../components/header"
import Footer from "../components/footer"
import PriceDisplay from "@/components/price-display"

export default function LandingPage() {
  // Define references data with all client logos
  const references: ReferenceItem[] = [
    {
      src: "/client-logos/king.png",
      alt: "Kings College Hospital London",
      width: 160,
      height: 80,
    },
    {
      src: "/client-logos/aviv.png",
      alt: "Aviv Clinics",
      width: 160,
      height: 80,
    },
    {
      src: "/client-logos/ptd.png",
      alt: "PTD Fitness",
      width: 160,
      height: 80,
    },
    {
      src: "/client-logos/mcd.png",
      alt: "MCD Fitness",
      width: 160,
      height: 80,
    },
    {
      src: "/client-logos/basicball.png",
      alt: "Basic Ball Academy",
      width: 160,
      height: 80,
    },
    {
      src: "/client-logos/elite.png",
      alt: "Elite Athlete",
      width: 160,
      height: 80,
    },
    {
      src: "/client-logos/nexus.png",
      alt: "Nexus",
      width: 160,
      height: 80,
    },
    {
      src: "/client-logos/360kids.png",
      alt: "360 Kids",
      width: 160,
      height: 80,
    },
    {
      src: "/client-logos/aerify.png",
      alt: "Aerify",
      width: 160,
      height: 80,
    },
    {
      src: "/client-logos/exxentric.png",
      alt: "Exxentric",
      width: 160,
      height: 80,
    },
    {
      src: "/client-logos/flydigital.png",
      alt: "Fly Digital",
      width: 160,
      height: 80,
    },
    {
      src: "/client-logos/flywheel.png",
      alt: "Flywheel",
      width: 160,
      height: 80,
    },
    {
      src: "/client-logos/reshape.png",
      alt: "Reshape",
      width: 160,
      height: 80,
    },
    {
      src: "/client-logos/intesa.png",
      alt: "Intesa Sanpaolo",
      width: 160,
      height: 80,
    },
    {
      src: "/client-logos/youskilled.png",
      alt: "YouSkilled",
      width: 160,
      height: 80,
    },
  ]

  return (
    <>
      <Head>
        <title>Home | Perception Creative Agency Store</title>
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
        className="min-h-screen bg-transparent text-[#fffae5] relative"
        style={{
          backgroundImage: "url('/backgrounds/pca-dark-background.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
        }}
      >
        {/* Background texture overlay */}
        <div className="relative z-10">
          <Header darkMode={false} />
          {/* Main Content - Adjusted to account for fixed navbar */}
          <main className="container mx-auto px-4 pt-24 sm:pt-24 md:pt-32">
            {/* Hero Section */}
            <section className="w-full mx-auto py-4 sm:py-6 md:py-8 text-center">
              <h2 className="text-2xl sm:text-2xl md:text-5xl font-bold tracking-wide leading-tight">
                <span className="text-[#B96944]">BUY</span> YOURSELF & YOUR BUSINESS{" "}
                <span className="text-[#B96944]">TIME!</span>
              </h2>
            </section>

            {/* Pricing Cards - Using the new AnimatedCard component */}
            <section className="w-full sm:w-4/5 md:w-4/5 lg:w-3/5 mx-auto py-1">
              <div className="flex flex-col md:flex-row gap-6 md:gap-6 lg:gap-12 justify-center items-stretch">
                {/* Startup Growth Package */}
                <AnimatedCard
                  href="/startup-growth"
                  title="Startup Growth"
                  subtitle="Package"
                  buttonText="START NOW"
                  description="PERFECT FOR STARTUPS AND ENTREPRENEURS LOOKING TO ESTABLISH OR SCALE THEIR BRAND"
                  highlightType="shimmer"
                >
                  <div className="flex flex-col justify-center mx-auto space-y-2 md:space-y-2">
                    <div className="flex items-center group-hover:translate-x-1 transition-transform duration-500 ease-in-out">
                      <span className="text-[#B96944] mr-2 text-base sm:text-lg md:text-sm lg:text-lg">•</span>
                      <span className="text-[#B96944] uppercase font-bold text-base sm:text-lg md:text-sm lg:text-lg leading-tight">
                        FRESH
                      </span>
                      <span className="uppercase font-bold text-[#01131F] text-base sm:text-lg md:text-sm lg:text-lg leading-tight ml-1">
                        LOGO
                      </span>
                    </div>
                    <div className="flex items-center group-hover:translate-x-1 transition-transform duration-500 ease-in-out delay-75">
                      <span className="text-[#B96944] mr-2 text-base sm:text-lg md:text-sm lg:text-lg">•</span>
                      <span className="text-[#B96944] uppercase font-bold text-base sm:text-lg leading-tight md:text-sm lg:text-lg">
                        FRESH
                      </span>
                      <span className="uppercase font-bold text-[#01131F] text-base sm:text-lg md:text-sm lg:text-lg leading-tight ml-1">
                        BRANDING
                      </span>
                    </div>
                    <div className="flex items-center group-hover:translate-x-1 transition-transform duration-500 ease-in-out delay-100">
                      <span className="text-[#B96944] mr-2 text-base sm:text-lg md:text-sm lg:text-lg">•</span>
                      <span className="text-[#B96944] uppercase font-bold text-base sm:text-lg md:text-sm lg:text-lg leading-tight">
                        FRESH
                      </span>
                      <span className="uppercase font-bold text-[#01131F] text-base sm:text-lg md:text-sm lg:text-lg leading-tight ml-1">
                        WEBSITE
                      </span>
                    </div>
                    <div className="flex items-center group-hover:translate-x-1 transition-transform duration-500 ease-in-out delay-150">
                      <span className="text-[#B96944] mr-2 text-base sm:text-lg md:text-sm lg:text-lg">•</span>
                      <span className="text-[#B96944] uppercase font-bold text-base sm:text-lg md:text-sm lg:text-lg leading-tight">
                        FRESH
                      </span>
                      <span className="uppercase font-bold text-[#01131F] text-base sm:text-lg md:text-sm lg:text-lg leading-tight ml-1">
                        SOCIALS
                      </span>
                    </div>
                    <div className="flex items-center group-hover:translate-x-1 transition-transform duration-500 ease-in-out delay-200">
                      <span className="text-[#B96944] mr-2 text-base sm:text-lg md:text-sm lg:text-lg">•</span>
                      <span className="text-[#B96944] uppercase font-bold text-base sm:text-lg md:text-sm lg:text-lg leading-tight">
                        FRESH
                      </span>
                      <span className="uppercase font-bold text-[#01131F] text-base sm:text-lg md:text-sm lg:text-lg leading-tight ml-1">
                        STRATEGY
                      </span>
                    </div>
                  </div>

                  <div className="text-center w-full mt-2 md:mt-2 mb-3 md:mb-3 lg:mb-6">
                    <h4 className="text-3xl sm:text-3xl md:text-3xl lg:text-4xl leading-tight font-bold text-[#01131F]">
                      <PriceDisplay amount={5999} />
                    </h4>
                    <p className="uppercase text-base sm:text-sm md:text-base lg:text-lg mt-1 text-[#01131F] font-bold">
                      ONE TIME PAYMENT
                    </p>
                  </div>
                </AnimatedCard>

                {/* A La Carte Options */}
                <AnimatedCard
                  href="/a-la-carte"
                  title="A La Carte"
                  subtitle="Options"
                  buttonText="START NOW"
                  description="PERFECT FOR ESTABLISHED BUSINESSES LOOKING TO ADDRESS SPECIFIC CREATIVE NEEDS WITHOUT OVERCOMMITTING"
                  highlightType="shimmer"
                >
                  <div className="flex flex-col justify-center flex-1 mb-3 md:mb-6">
                    <div className="flex flex-col space-y-2 sm:space-y-4 md:space-y-4 lg:space-y-5 w-full h-auto">
                      <div className="uppercase font-bold text-center text-base sm:text-sm md:text-sm lg:text-lg leading-tight text-[#01131F] hover:text-[#B96944] transition-colors duration-300 ease-in-out group-hover:scale-103">
                        VIDEO PRODUCTION
                      </div>
                      <div className="uppercase font-bold text-center text-base sm:text-sm md:text-sm lg:text-lg leading-tight text-[#01131F] hover:text-[#B96944] transition-colors duration-300 ease-in-out group-hover:scale-103">
                        WEB DESIGN{" "}
                        <span className="text-[#B96944] hover:text-[#01131F] transition-colors duration-300 ease-in-out">
                          &
                        </span>{" "}
                        DEVELOPMENT
                      </div>
                      <div className="uppercase font-bold text-center text-base sm:text-sm md:text-sm lg:text-lg leading-tight text-[#01131F] hover:text-[#B96944] transition-colors duration-300 ease-in-out group-hover:scale-103">
                        GRAPHIC DESIGN<br/>
                        <span className="text-[#B96944] hover:text-[#01131F] transition-colors duration-300 ease-in-out">
                          &
                        </span>{" "}
                        DEVELOPMENT
                      </div>
                      <div className="uppercase font-bold text-center text-base sm:text-sm md:text-sm lg:text-lg leading-tight text-[#01131F] hover:text-[#B96944] transition-colors duration-300 ease-in-out group-hover:scale-103">
                        APP DESIGN{" "}
                        <span className="text-[#B96944] hover:text-[#01131F] transition-colors duration-300 ease-in-out">
                          &
                        </span>{" "}
                        DEVELOPMENT
                      </div>
                      <div className="uppercase font-bold text-center text-base sm:text-sm md:text-sm lg:text-lg leading-tight text-[#01131F] hover:text-[#B96944] transition-colors duration-300 ease-in-out group-hover:scale-103">
                        MARKETING CONSULTING
                      </div>
                      <div className="uppercase font-bold text-center text-base sm:text-sm md:text-sm lg:text-lg leading-tight text-[#01131F] hover:text-[#B96944] transition-colors duration-300 ease-in-out group-hover:scale-103">
                        PAID ADS MANAGEMENT
                      </div>
                    </div>
                  </div>
                </AnimatedCard>
              </div>
            </section>

            {/* Divider */}
            <div className="w-full md:w-4/5 mx-auto flex justify-center py-5 md:py-8">
              <div className="flex space-x-2 sm:space-x-3 md:space-x-4">
                <Image
                  src="/stars/pca-star-light.png"
                  alt="Divider star"
                  width={20}
                  height={20}
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                />
                <Image
                  src="/stars/pca-star-light.png"
                  alt="Divider star"
                  width={20}
                  height={20}
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                />
                <Image
                  src="/stars/pca-star-light.png"
                  alt="Divider star"
                  width={20}
                  height={20}
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                />
              </div>
            </div>

            {/* Results Section */}
            <section className="w-full md:w-4/5 mx-auto mb-3 md:mb-0 md:py-8 text-center">
              <h2 className="text-2xl sm:text-xl md:text-4xl font-bold uppercase mb-6 sm:mb-4 md:mb-12">
                Results in 2024
              </h2>

              <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-12 mb-4 sm:mb-6 md:mb-12">
                <div>
                  <h3 className="text-3xl sm:text-3xl md:text-6xl font-bold">200K+</h3>
                  <p className="text-[#B96944] uppercase text-base sm:text-sm md:text-base">Followers on Socials</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-12 mb-8 sm:mb-6 md:mb-12">
                <div>
                  <h3 className="text-3xl sm:text-3xl md:text-6xl font-bold">
                    <PriceDisplay amount={52500000} className="font-bold" />
                  </h3>
                  <p className="text-[#B96944] uppercase text-base sm:text-sm md:text-base">Client Growth Revenue</p>
                </div>
                <div>
                  <h3 className="text-3xl sm:text-3xl md:text-6xl font-bold">20+</h3>
                  <p className="text-[#B96944] uppercase text-base sm:text-sm md:text-base">Happy Clients Worldwide</p>
                </div>
              </div>

              <Link
                href={"https://www.perceptionuae.com"}
                target="_blank"
                className="bg-[#fffae5] text-[#01131F] uppercase font-bold py-2 sm:py-1.5 md:py-2 px-10 sm:px-4 md:px-6 rounded-full btn-secondary text-base sm:text-sm md:text-base"
              >
                Check Our Perception
              </Link>
            </section>

            {/* Divider */}
            <div className="w-full md:w-4/5 mx-auto flex justify-center py-5 md:py-8">
              <div className="flex space-x-2 sm:space-x-3 md:space-x-4">
                <Image
                  src="/stars/pca-star-light.png"
                  alt="Divider star"
                  width={20}
                  height={20}
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                />
                <Image
                  src="/stars/pca-star-light.png"
                  alt="Divider star"
                  width={20}
                  height={20}
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                />
                <Image
                  src="/stars/pca-star-light.png"
                  alt="Divider star"
                  width={20}
                  height={20}
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                />
              </div>
            </div>

            {/* References Section */}
            <section className="w-full md:w-4/5 mx-auto py-0 md:py-8 text-center">
              <h2 className="text-2xl sm:text-xl md:text-4xl font-bold uppercase mb-3 sm:mb-4 md:mb-12">
                Our References
              </h2>

              {/* Using the new ReferenceCarousel component with matching background */}
              <div className="bg-transparent rounded-xl overflow-hidden">
                <ReferenceCarousel references={references} className="mb-4 sm:mb-6 md:mb-12" />
              </div>

              <Link
                href={"https://www.perceptionuae.com/our-work"}
                target="_blank"
                className="bg-[#fffae5] text-[#01131F] uppercase font-bold py-2 sm:py-1.5 md:py-2 px-10 sm:px-4 md:px-6 rounded-full btn-secondary text-base sm:text-sm md:text-base"
              >
                Check Our Portfolio
              </Link>
            </section>

            {/* Divider */}
            <div className="w-full md:w-4/5 mx-auto flex justify-center py-8 md:py-8">
              <div className="flex items-center justify-center">
                <Image
                  src="/stars/pca-star-light.png"
                  alt="Divider star"
                  width={20}
                  height={20}
                  className="w-6 h-6 sm:w-5 sm:h-5 md:w-6 md:h-6"
                />
              </div>
            </div>
          </main>

          {/* Footer Section */}
          <Footer />
        </div>
      </div>
    </>
  )
}

