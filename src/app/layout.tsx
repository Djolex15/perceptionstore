import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import AnimatedScrollTracker from "../components/animated-scroll-tracker"

const inter = Inter({ subsets: ["latin"] })

const metadata = {
  title: "Perception Creative Agency Store",
  description:
    "Buy yourself and your business time with expert branding, web development, and marketing strategies. Perception Creative Agency drives online growth for entrepreneurs and startups worldwide.",
  keywords: "branding, web development, marketing, startups, entrepreneurs, online growth",
  author: "Perception Creative Agency",
  openGraph: {
    type: "website",
    url: "https://www.perceptionuae.store",
    title: "Perception Creative Agency Store",
    description:
      "Buy yourself and your business time with expert branding, web development, and marketing strategies. Perception Creative Agency drives online growth for entrepreneurs and startups worldwide.",
    images:[
      {
        url: "https://www.perceptionuae.store/open-graph/pca-open-graph.png",
        width: 1200,
        height: 630,
        alt: "Perception Creative Agency Store",
      },
    ],
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={inter.className}>
        <AnimatedScrollTracker className="bg-[#B96944]" />
        <div>{children}</div>
      </body>
    </html>
  )
}

