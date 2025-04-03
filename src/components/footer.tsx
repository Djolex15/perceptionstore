"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function Footer({ darkMode }: { darkMode?: boolean }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // Determine text and border colors based on darkMode prop
  const textColor = darkMode ? "text-[#01131F]" : "text-[#fffae5]"
  const hoverColor = "hover:text-[#B96944]"
  const borderColor = darkMode ? "border-[#01131F] border-opacity-20" : "border-[#fffae5] border-opacity-20"
  const socialIconSrc = darkMode ? "-dark.png" : "-light.png"

  return (
    <footer className={`relative container mx-auto px-4 py-6 md:py-8 border-t ${borderColor}`}>
      <div className="flex flex-col md:flex-row justify-between items-start w-full font-medium">
        <div className="w-full md:w-auto text-left mb-6 md:mb-0 order-2 md:order-1">
          <Link
            href="mailto:INFO@PERCEPTIONUAE.COM"
            className={`text-xs sm:text-sm ${textColor} ${hoverColor} transition-colors duration-300 block`}
          >
            <p>INFO@PERCEPTIONUAE.COM</p>
          </Link>
          <Link
            href="/privacy-policy"
            className={`text-xs sm:text-sm ${textColor} ${hoverColor} transition-colors duration-300 block mt-2`}
          >
            PRIVACY POLICY
          </Link>
        </div>

        <div
          className={`flex space-x-6 mb-6 md:mb-0 order-1 md:order-2 ${isMobile ? "w-full justify-center" : "absolute left-1/2 transform -translate-x-1/2"}`}
        >
          <Link href="https://www.instagram.com/perceptionuae/" target="_blank" className={`${hoverColor} transition-transform duration-300 hover:scale-110`}>
            <Image
              src={`/social-media/instagram${socialIconSrc}`}
              alt="Instagram"
              width={36}
              height={36}
              className="w-8 h-8"
            />
          </Link>
          <Link href="https://wa.me/+971521455129" target="_blank" className={`${hoverColor} transition-transform duration-300 hover:scale-110`}>
            <Image
              src={`/social-media/whatsup${socialIconSrc}`}
              alt="WhatsApp"
              width={36}
              height={36}
              className="w-8 h-8"
            />
          </Link>
          <Link href="https://www.linkedin.com/in/perception-ca-6000172a4/" target="_blank" className={`${hoverColor} transition-transform duration-300 hover:scale-110`}>
            <Image
              src={`/social-media/linkedin${socialIconSrc}`}
              alt="LinkedIn"
              width={36}
              height={36}
              className="w-8 h-8"
            />
          </Link>
        </div>

        <div className={`w-full md:w-auto ${textColor} text-right order-3 mt-4 md:mt-0`}>
          <p className="text-xs sm:text-sm">ALL RIGHTS RESERVED</p>
          <p className="text-xs sm:text-sm">COPYRIGHT©{new Date().getFullYear()} PERCEPTION CREATIVE AGENCY</p>
        </div>
      </div>
    </footer>
  )
}

