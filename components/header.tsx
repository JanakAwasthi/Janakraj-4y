"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X, ImageIcon, FileText, QrCode, Wrench } from "lucide-react"

const toolCategories = {
  "Image Tools": [
    { name: "Image Compressor", href: "/tools/image-compressor" },
    { name: "Image Enhancer", href: "/tools/image-enhancer" },
    { name: "Image Resizer", href: "/tools/image-resizer" },
    { name: "Format Converter", href: "/tools/format-converter" },
    { name: "ID Photo Maker", href: "/tools/id-photo-maker" },
    { name: "Background Merger", href: "/tools/background-merger" },
  ],
  "Document Tools": [
    { name: "Photo to PDF", href: "/tools/photo-to-pdf" },
    { name: "PDF Merger", href: "/tools/pdf-merger" },
    { name: "Document Scanner", href: "/tools/document-scanner" },
    { name: "Text Extractor", href: "/tools/text-extractor" },
    { name: "Digital Signature", href: "/tools/digital-signature" },
    { name: "Watermark Tools", href: "/tools/watermark-tools" },
  ],
  "QR & Codes": [
    { name: "QR Generator", href: "/tools/qr-generator" },
    { name: "QR Scanner", href: "/tools/qr-scanner" },
    { name: "QR Designer", href: "/tools/qr-designer" },
    { name: "QR Decoder", href: "/tools/qr-decoder" },
    { name: "Base64 Encoder", href: "/tools/base64-encoder" },
    { name: "Hash Generator", href: "/tools/hash-generator" },
  ],
  "Web Tools": [
    { name: "Video Downloader", href: "/tools/video-downloader" },
    { name: "Audio Converter", href: "/tools/audio-converter" },
    { name: "Password Generator", href: "/tools/password-generator" },
    { name: "URL Shortener", href: "/tools/url-shortener" },
    { name: "Color Palette", href: "/tools/color-palette" },
    { name: "Screen Recorder", href: "/tools/screen-recorder" },
  ],
  "Text Tools": [
    { name: "Secure Text", href: "/tools/secure-text" },
    { name: "Store Your Note", href: "/tools/store-text" },
    { name: "Find Your Note", href: "/tools/find-text" },
    { name: "Save History", href: "/tools/save-history" },
  ],
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = (category: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setActiveDropdown(category)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  const handleDropdownMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  const handleDropdownMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  const handleCategoryClick = (category: string) => {
    setActiveDropdown(activeDropdown === category ? null : category)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      const isInsideDropdown = Object.values(dropdownRefs.current).some((ref) => ref && ref.contains(target))
      if (!isInsideDropdown) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 p-1">
              <Image
                src="/favicon.png"
                alt="LinkToQR.me Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain rounded-md"
                priority
              />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              LinkToQR.me
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {Object.entries(toolCategories).map(([category, tools]) => (
              <div
                key={category}
                className="relative"
                ref={(el) => (dropdownRefs.current[category] = el)}
                onMouseEnter={() => handleMouseEnter(category)}
                onMouseLeave={handleMouseLeave}
              >
                <Button
                  variant="ghost"
                  className={`flex items-center space-x-1 hover:bg-muted/50 transition-all duration-200 ${
                    activeDropdown === category ? "bg-muted/50 text-primary" : ""
                  }`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category === "Image Tools" && <ImageIcon className="h-4 w-4" />}
                  {category === "Document Tools" && <FileText className="h-4 w-4" />}
                  {category === "QR & Codes" && <QrCode className="h-4 w-4" />}
                  {category === "Web Tools" && <Wrench className="h-4 w-4" />}
                  {category === "Text Tools" && <FileText className="h-4 w-4" />}
                  <span>{category}</span>
                </Button>

                {activeDropdown === category && (
                  <div
                    className="absolute top-full left-0 mt-2 w-64 bg-background/98 backdrop-blur-md border rounded-lg shadow-xl py-3 z-50 animate-in fade-in-0 zoom-in-95 duration-200"
                    onMouseEnter={handleDropdownMouseEnter}
                    onMouseLeave={handleDropdownMouseLeave}
                  >
                    <div className="max-h-80 overflow-y-auto">
                      {tools.map((tool, index) => (
                        <Link
                          key={tool.href}
                          href={tool.href}
                          className="block px-4 py-2.5 text-sm hover:bg-muted/70 transition-all duration-150 rounded-md mx-2 hover:text-primary hover:translate-x-1"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <div className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
                            <span>{tool.name}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <Link href="/how-to-use">
              <Button variant="ghost" className="hover:bg-muted/50">
                How to Use
              </Button>
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />

            {/* Mobile menu button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4 bg-background/95 backdrop-blur-sm">
            <div className="space-y-4">
              {Object.entries(toolCategories).map(([category, tools]) => (
                <div key={category}>
                  <h3 className="font-semibold text-sm text-muted-foreground mb-2 px-2">{category}</h3>
                  <div className="space-y-1 ml-4">
                    {tools.map((tool) => (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        className="block py-2 px-2 text-sm hover:text-primary hover:bg-muted/50 rounded-md transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {tool.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <Link
                href="/how-to-use"
                className="block py-2 px-2 text-sm font-medium hover:text-primary hover:bg-muted/50 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                How to Use
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
