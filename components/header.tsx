"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X, ImageIcon, FileText, QrCode, Wrench } from "lucide-react"

const toolCategories = {
  "PDF Tools": [
    { name: "PDF Editor", href: "/tools/pdf-editor" },
    { name: "Word to PDF", href: "/tools/word-to-pdf" },
    { name: "Excel to PDF", href: "/tools/excel-to-pdf" },
    { name: "PDF to Word", href: "/tools/pdf-to-word" },
    { name: "PDF to Excel", href: "/tools/pdf-to-excel" },
    { name: "PDF Compressor", href: "/tools/pdf-compressor" },
  ],
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
    { name: "Password Generator", href: "/tools/password-generator" },
    { name: "URL Shortener", href: "/tools/url-shortener" },
    { name: "Color Palette", href: "/tools/color-palette" },
    { name: "Save History", href: "/tools/save-history" },
  ],
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [activeMobileCategory, setActiveMobileCategory] = useState<string | null>(null)
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

  const handleMobileCategoryToggle = (category: string) => {
    setActiveMobileCategory(activeMobileCategory === category ? null : category)
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "PDF Tools":
        return <FileText className="h-4 w-4" />
      case "Image Tools":
        return <ImageIcon className="h-4 w-4" />
      case "Document Tools":
        return <FileText className="h-4 w-4" />
      case "QR & Codes":
        return <QrCode className="h-4 w-4" />
      case "Web Tools":
        return <Wrench className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mobile-sticky-header">
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
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent hidden sm:block">
              LinkToQR.me
            </span>
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent sm:hidden">
              LinkToQR
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
                  {getCategoryIcon(category)}
                  <span>{category}</span>
                </Button>

                {activeDropdown === category && (
                  <div
                    className="absolute top-full left-0 mt-2 w-64 bg-background border rounded-lg shadow-xl py-3 z-50 animate-in fade-in-0 zoom-in-95 duration-200"
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
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden mobile-hamburger"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t bg-background/98 backdrop-blur-md mobile-nav-menu-content">
            <div className="max-h-[70vh] overflow-y-auto py-4">
              <div className="space-y-2">
                {Object.entries(toolCategories).map(([category, tools]) => (
                  <div key={category} className="border-b border-border/50 last:border-b-0">
                    <Button
                      variant="ghost"
                      className="w-full justify-between p-4 h-auto font-semibold text-left hover:bg-muted/50"
                      onClick={() => handleMobileCategoryToggle(category)}
                    >
                      <div className="flex items-center space-x-3">
                        {getCategoryIcon(category)}
                        <span>{category}</span>
                      </div>
                      <div
                        className={`transform transition-transform duration-200 ${
                          activeMobileCategory === category ? "rotate-180" : ""
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </Button>

                    {activeMobileCategory === category && (
                      <div className="pb-2 animate-in slide-in-from-top-2 duration-200">
                        <div className="space-y-1 ml-4 mr-2">
                          {tools.map((tool) => (
                            <Link
                              key={tool.href}
                              href={tool.href}
                              className="block py-3 px-4 text-sm font-medium hover:text-primary hover:bg-muted/50 rounded-md transition-colors"
                              onClick={() => {
                                setIsMenuOpen(false)
                                setActiveMobileCategory(null)
                              }}
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

                <div className="pt-2">
                  <Link
                    href="/how-to-use"
                    className="block py-3 px-4 text-sm font-medium hover:text-primary hover:bg-muted/50 rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center space-x-3">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>How to Use</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
