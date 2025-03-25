import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import AnimatedScrollTracker from "../components/animated-scroll-tracker"

const inter = Inter({ subsets: ["latin"] })

const metadata = {
  title: "Perception Creative Agency Store",
  description: "Store",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AnimatedScrollTracker className="bg-[#B96944]" />
        <div>{children}</div>
      </body>
    </html>
  )
}

