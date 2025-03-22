import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import Header from "../components/header"

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
        <Header />
        <div className="pt-20">{children}</div>
      </body>
    </html>
  )
}

