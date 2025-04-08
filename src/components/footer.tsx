"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function Footer({ darkMode }: { darkMode?: boolean }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Function to check if viewport is mobile width using media query
    const mediaQuery = window.matchMedia("(max-width: 48rem)") // 768px in rem

    // Initial check
    setIsMobile(mediaQuery.matches)

    // Add listener for changes
    const handleResize = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches)
    }

    mediaQuery.addEventListener("change", handleResize)

    // Cleanup event listener on component unmount
    return () => mediaQuery.removeEventListener("change", handleResize)
  }, [])

  // Determine text and border colors based on darkMode prop
  const textColor = darkMode ? "text-[#01131F]" : "text-[#fffae5]"
  const hoverColor = "hover:text-[#B96944]"
  const borderColor = darkMode ? "border-[#01131F] border-opacity-20" : "border-[#fffae5] border-opacity-20"
  const socialIconSrc = darkMode ? "-dark.png" : "-light.png"

  return (
    <footer className={`relative container mx-auto px-4 py-4 md:py-6 border-t ${borderColor}`}>
      <div className="flex flex-col md:flex-row justify-between items-start w-full font-medium">
       {/* Contact information */}
        <div className={`w-full md:w-auto mb-4 md:mb-0 order-2 md:order-1 ${
          isMobile ? "text-center" : "text-left"
        }`}>
          <Link
            href="mailto:INFO@PERCEPTIONUAE.COM"
            className={`text-xs sm:text-sm ${textColor} ${hoverColor} transition-colors duration-300 block mb-2`}
          >
            <p>INFO@PERCEPTIONUAE.COM</p>
          </Link>
          <Link
            href="/privacy-policy"
            className={`text-xs sm:text-sm ${textColor} ${hoverColor} transition-colors duration-300 block`}
          >
            PRIVACY POLICY
          </Link>
        </div>

         {/* Social media links */}
         <div
          className={`flex space-x-4 md:space-x-6 mb-6 md:mb-0 order-1 md:order-2 ${
            isMobile ? "w-full justify-center" : "absolute left-1/2 transform -translate-x-1/2"
          }`}
        >
          <Link
            href="https://www.instagram.com/perceptionuae/"
            target="_blank"
            className={`${hoverColor} transition-transform duration-300 hover:scale-110`}
            aria-label="Instagram"
          >
            <Image
              src={`/social-media/instagram${socialIconSrc}`}
              alt="Instagram"
              width={36}
              height={36}
              className="w-7 h-7 sm:w-7 sm:h-7 md:w-8 md:h-8"
            />
          </Link>
          <Link
            href="https://wa.me/+971521455129"
            target="_blank"
            className={`${hoverColor} transition-transform duration-300 hover:scale-110`}
            aria-label="WhatsApp"
          >
            <Image
              src={`/social-media/whatsup${socialIconSrc}`}
              alt="WhatsApp"
              width={36}
              height={36}
              className="w-7 h-7 sm:w-7 sm:h-7 md:w-8 md:h-8"
            />
          </Link>
          <Link
            href="https://www.linkedin.com/in/perception-ca-6000172a4/"
            target="_blank"
            className={`${hoverColor} transition-transform duration-300 hover:scale-110`}
            aria-label="LinkedIn"
          >
            <Image
              src={`/social-media/linkedin${socialIconSrc}`}
              alt="LinkedIn"
              width={36}
              height={36}
              className="w-7 h-7 sm:w-7 sm:h-7 md:w-8 md:h-8"
            />
          </Link>
        </div>

        {/* Copyright information */}
        <div 
          className={`w-full order-3 mt-4 md:mt-0 md:ml-4 ${
            isMobile 
              ? "fixed bottom-0 left-0 right-0 bg-[#B96944] py-1 px-4 flex justify-between items-center text-[#fffae5] space-x-2" 
              : `${textColor} text-right space-y-2`
          }`}
        >
          <p className="text-[10px] sm:text-xs md:text-sm">ALL RIGHTS RESERVED</p>
          <p className="text-[10px] sm:text-xs md:text-sm">
            COPYRIGHT©{new Date().getFullYear()} PERCEPTION CREATIVE AGENCY
          </p>
        </div>
      </div>
    </footer>
)
}

