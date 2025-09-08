"use client"

import { useEffect, useRef } from "react"

interface AdBannerProps {
  slot?: string
  format?: "auto" | "rectangle" | "vertical" | "horizontal"
  responsive?: boolean
  className?: string
}

declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

export function AdBanner({ slot = "1234567890", format = "auto", responsive = true, className = "" }: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadAd = () => {
      try {
        if (typeof window !== "undefined" && window.adsbygoogle && adRef.current) {
          const container = adRef.current
          const rect = container.getBoundingClientRect()

          // Only load ad if container has proper dimensions
          if (rect.width > 0 && rect.height > 0) {
            window.adsbygoogle.push({})
          } else {
            // Retry after a short delay if container isn't sized yet
            setTimeout(loadAd, 100)
          }
        }
      } catch (error) {
        console.error("AdSense error:", error)
      }
    }

    const timer = setTimeout(loadAd, 200)
    return () => clearTimeout(timer)
  }, [])

  const getContainerStyles = () => {
    switch (format) {
      case "rectangle":
        return "min-h-[250px] w-full max-w-[300px]"
      case "horizontal":
        return "min-h-[90px] w-full max-w-[728px]"
      case "vertical":
        return "min-h-[600px] w-full max-w-[160px]"
      default:
        return "min-h-[250px] w-full"
    }
  }

  return (
    <div ref={adRef} className={`ad-container ${getContainerStyles()} ${className}`}>
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          width: "100%",
          height: "100%",
        }}
        data-ad-client="ca-pub-6126558809611102"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  )
}

export function SidebarAd() {
  return <AdBanner slot="1234567890" format="rectangle" className="my-4" />
}

export function InlineAd() {
  return <AdBanner slot="2345678901" format="auto" className="my-6" />
}

export function FooterAd() {
  return <AdBanner slot="3456789012" format="horizontal" className="mt-8" />
}
