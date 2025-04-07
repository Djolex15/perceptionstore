"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"

export type ReferenceItem = {
  src: string
  alt: string
  width: number
  height: number
  url?: string
}

interface ReferenceCarouselProps {
  references: ReferenceItem[]
  className?: string
}

export function ReferenceCarousel({ references, className = "" }: ReferenceCarouselProps) {
  return (
    <div className={`relative w-full overflow-hidden h-32 sm:h-40 md:h-56 bg-transparent ${className}`}>
      <div className="references-carousel">
        <div className="references-track">
          {references.map((reference, index) => (
            <div key={index} className="reference-item" style={{ "--i": index + 1 } as React.CSSProperties}>
              {reference.url ? (
                <Link href={reference.url}>
                  <Image
                    src={reference.src || "/placeholder.svg"}
                    alt={reference.alt}
                    width={reference.width}
                    height={reference.height}
                    className="object-contain p-1 sm:p-2 md:p-3 rounded-lg bg-transparent"
                  />
                </Link>
              ) : (
                <Image
                  src={reference.src || "/placeholder.svg"}
                  alt={reference.alt}
                  width={reference.width}
                  height={reference.height}
                  className="object-contain p-1 sm:p-2 md:p-3 rounded-lg bg-transparent"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

