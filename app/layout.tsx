import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LinkToQR.me - All-in-One Toolkit for Image Processing, QR Codes & More",
  description:
    "Free online tools for image compression, QR code generation, PDF conversion, document scanning, and more. Professional-grade tools for all your digital needs.",
  keywords:
    "QR code generator, image compressor, PDF converter, document scanner, online tools, free tools, image processing, digital toolkit, web tools, privacy-first tools",
  authors: [{ name: "LinkToQR.me" }],
  creator: "LinkToQR.me",
  publisher: "LinkToQR.me",
  robots: "index, follow",
  icons: {
    icon: [
      { url: "/favicon.jpg", sizes: "32x32", type: "image/png" },
      { url: "/favicon.jpg", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/favicon.jpg", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.jpg",
  },
  openGraph: {
    title: "LinkToQR.me - All-in-One Digital Toolkit",
    description:
      "Free online tools for image processing, QR codes, PDF conversion, and more. Privacy-first, browser-based processing.",
    url: "https://linktoqr.me",
    siteName: "LinkToQR.me",
    type: "website",
    images: [
      {
        url: "/favicon.jpg",
        width: 1200,
        height: 630,
        alt: "LinkToQR.me - Professional Online Toolkit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkToQR.me - All-in-One Digital Toolkit",
    description:
      "Free online tools for image processing, QR codes, PDF conversion, and more. Privacy-first, browser-based processing.",
    images: ["/favicon.jpg"],
  },
  generator: "Next.js",
  alternates: {
    canonical: "https://linktoqr.me",
  },
  verification: {
    google: "your-google-verification-code",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.jpg" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.jpg" />
        <link rel="shortcut icon" href="/favicon.jpg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="google-adsense-account" content="ca-pub-6126558809611102" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "LinkToQR.me",
              description: "Free online tools for image processing, QR codes, PDF conversion, and more",
              url: "https://linktoqr.me",
              applicationCategory: "UtilitiesApplication",
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>

        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6126558809611102"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
