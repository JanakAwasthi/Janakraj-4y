"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  ImageIcon,
  FileText,
  QrCode,
  Compass as Compress,
  Sparkles,
  Crop,
  RefreshCw,
  Layers,
  Camera,
  Scan,
  FilePlus,
  PenTool,
  Droplets,
  Search,
  FileImage,
  ScanLine,
  Palette,
  Eye,
  Globe,
  Lock,
  Key,
  Shield,
  History,
  Zap,
  Edit,
  Scissors,
  FileSignature,
} from "lucide-react"
import Link from "next/link"

const toolCategories = [
  {
    title: "PDF Tools",
    icon: FileText,
    color: "from-red-500 to-orange-600",
    tools: [
      { name: "PDF Editor", icon: Edit, href: "/tools/pdf-editor" },
      { name: "PDF Splitter", icon: Scissors, href: "/tools/pdf-splitter" },
      { name: "PDF Compressor", icon: Compress, href: "/tools/pdf-compressor" },
      { name: "PDF Protector", icon: Lock, href: "/tools/pdf-protector" },
      { name: "PDF to Word", icon: FileText, href: "/tools/pdf-to-word" },
      { name: "Word to PDF", icon: FileSignature, href: "/tools/word-to-pdf" },
      { name: "Excel to PDF", icon: FileText, href: "/tools/excel-to-pdf" },
      { name: "PDF to Excel", icon: Scissors, href: "/tools/pdf-to-excel" },
    ],
  },
  {
    title: "Image Tools",
    icon: ImageIcon,
    color: "from-blue-500 to-cyan-600",
    tools: [
      { name: "Image Compressor", icon: Compress, href: "/tools/image-compressor" },
      { name: "Image Enhancer AI", icon: Sparkles, href: "/tools/image-enhancer" },
      { name: "Image Resizer", icon: Crop, href: "/tools/image-resizer" },
      { name: "Format Converter", icon: RefreshCw, href: "/tools/format-converter" },
      { name: "Background Merger", icon: Layers, href: "/tools/background-merger" },
      { name: "ID Photo Maker", icon: Camera, href: "/tools/id-photo-maker" },
    ],
  },
  {
    title: "Document Tools",
    icon: FileText,
    color: "from-purple-500 to-pink-600",
    tools: [
      { name: "Photo to PDF", icon: FileImage, href: "/tools/photo-to-pdf" },
      { name: "Smart Document Scanner", icon: Scan, href: "/tools/document-scanner" },
      { name: "PDF Merger", icon: FilePlus, href: "/tools/pdf-merger" },
      { name: "Digital Signature", icon: PenTool, href: "/tools/digital-signature" },
      { name: "Watermark Tools", icon: Droplets, href: "/tools/watermark-tools" },
      { name: "Text Extractor (OCR)", icon: Search, href: "/tools/text-extractor" },
    ],
  },
  {
    title: "QR Code Tools",
    icon: QrCode,
    color: "from-orange-500 to-red-600",
    tools: [
      { name: "QR Generator", icon: QrCode, href: "/tools/qr-generator" },
      { name: "Real-Time QR Scanner", icon: ScanLine, href: "/tools/qr-scanner" },
      { name: "Custom QR Designer", icon: Palette, href: "/tools/qr-designer" },
      { name: "QR Decoder AI", icon: Eye, href: "/tools/qr-decoder" },
    ],
  },
  {
    title: "Web Tools",
    icon: Globe,
    color: "from-indigo-500 to-purple-600",
    tools: [
      { name: "Password Generator", icon: Key, href: "/tools/password-generator" },
      { name: "URL Shortener", icon: Globe, href: "/tools/url-shortener" },
      { name: "Color Palette", icon: Palette, href: "/tools/color-palette" },
      { name: "Base64 Encoder", icon: Shield, href: "/tools/base64-encoder" },
      { name: "Hash Generator", icon: Zap, href: "/tools/hash-generator" },
      { name: "Save History", icon: History, href: "/tools/save-history" },
    ],
  },
]

export function AllToolsSection() {
  return (
    <section id="tools" className="py-20 px-4 mobile-section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-16 mobile-mb-8">
          <h2 className="text-4xl lg:text-6xl font-bold mb-4 mobile-leading-tight">
            <span className="gradient-text">ALL TOOLS</span>
          </h2>
          <p className="text-xl text-muted-foreground mobile-text-sm mobile-text-balance">
            Choose from our comprehensive collection of web tools
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-8 desktop-grid-5 mobile-gap-4">
          {toolCategories.map((category) => {
            const CategoryIcon = category.icon
            return (
              <Card key={category.title} className="tool-card group">
                <CardContent className="p-6 mobile-card-padding">
                  <div className="text-center mb-6 mobile-mb-4">
                    <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${category.color} mb-4`}>
                      <CategoryIcon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 mobile-leading-tight">{category.title}</h3>
                  </div>

                  <div className="space-y-3 mobile-content-spacing">
                    {category.tools.map((tool) => {
                      const ToolIcon = tool.icon
                      return (
                        <Link
                          key={tool.name}
                          href={tool.href}
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group/tool mobile-rounded-lg"
                        >
                          <ToolIcon className="h-4 w-4 text-muted-foreground group-hover/tool:text-foreground flex-shrink-0" />
                          <span className="text-sm font-medium group-hover/tool:text-foreground mobile-text-xs">
                            {tool.name}
                          </span>
                        </Link>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
