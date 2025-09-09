"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Edit,
  Scissors,
  Compass as Compress,
  Lock,
  Unlock,
  FileSignature,
  ArrowRight,
  Shield,
  Zap,
  FileCheck,
} from "lucide-react"
import Link from "next/link"

export default function PDFToolsPage() {
  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-8">
            <FileText className="h-20 w-20 text-orange-400 mr-6 animate-pulse" />
            <div>
              <h1 className="text-5xl font-bold text-white mb-2">PDF TOOLS</h1>
              <p className="text-orange-300 text-lg">Professional Document Processing Suite</p>
            </div>
          </div>

          <div className="flex justify-center space-x-4 mb-8">
            <Badge variant="outline" className="border-orange-400/50 text-orange-300 px-4 py-2">
              🔧 Professional
            </Badge>
            <Badge variant="outline" className="border-red-400/50 text-red-300 px-4 py-2">
              🔒 Secure
            </Badge>
            <Badge variant="outline" className="border-yellow-400/50 text-yellow-300 px-4 py-2">
              ⚡ Fast Processing
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* PDF Editor */}
          <Card className="bg-white/10 backdrop-blur-md border-orange-400/30 hover:border-orange-400/50 transition-all duration-300 group">
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <Edit className="h-16 w-16 text-orange-400 group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                    <FileText className="h-3 w-3 text-white" />
                  </div>
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-orange-300 mb-2">PDF EDITOR</CardTitle>
              <p className="text-orange-400 text-sm">Edit Text • Add Annotations • Modify Content</p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center text-white">
                  <Edit className="h-5 w-5 text-orange-400 mr-3" />
                  <span>Edit text directly in PDF documents</span>
                </div>
                <div className="flex items-center text-white">
                  <FileSignature className="h-5 w-5 text-orange-400 mr-3" />
                  <span>Add annotations and comments</span>
                </div>
                <div className="flex items-center text-white">
                  <Shield className="h-5 w-5 text-orange-400 mr-3" />
                  <span>Maintain document formatting</span>
                </div>
              </div>

              <Link href="/tools/pdf-editor">
                <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-3">
                  <Edit className="h-5 w-5 mr-2" />
                  EDIT PDF
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* PDF Splitter */}
          <Card className="bg-white/10 backdrop-blur-md border-red-400/30 hover:border-red-400/50 transition-all duration-300 group">
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <Scissors className="h-16 w-16 text-red-400 group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center">
                    <FileText className="h-3 w-3 text-white" />
                  </div>
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-red-300 mb-2">PDF SPLITTER</CardTitle>
              <p className="text-red-400 text-sm">Split Pages • Extract Ranges • Organize</p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center text-white">
                  <Scissors className="h-5 w-5 text-red-400 mr-3" />
                  <span>Split PDF into individual pages</span>
                </div>
                <div className="flex items-center text-white">
                  <FileCheck className="h-5 w-5 text-red-400 mr-3" />
                  <span>Extract specific page ranges</span>
                </div>
                <div className="flex items-center text-white">
                  <Zap className="h-5 w-5 text-red-400 mr-3" />
                  <span>Batch processing support</span>
                </div>
              </div>

              <Link href="/tools/pdf-splitter">
                <Button className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white py-3">
                  <Scissors className="h-5 w-5 mr-2" />
                  SPLIT PDF
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* PDF Compressor */}
          <Card className="bg-white/10 backdrop-blur-md border-yellow-400/30 hover:border-yellow-400/50 transition-all duration-300 group">
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <Compress className="h-16 w-16 text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <FileText className="h-3 w-3 text-white" />
                  </div>
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-yellow-300 mb-2">PDF COMPRESSOR</CardTitle>
              <p className="text-yellow-400 text-sm">Reduce Size • Optimize • Quality Control</p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center text-white">
                  <Compress className="h-5 w-5 text-yellow-400 mr-3" />
                  <span>Reduce PDF file size up to 90%</span>
                </div>
                <div className="flex items-center text-white">
                  <Shield className="h-5 w-5 text-yellow-400 mr-3" />
                  <span>Maintain document quality</span>
                </div>
                <div className="flex items-center text-white">
                  <Zap className="h-5 w-5 text-yellow-400 mr-3" />
                  <span>Multiple compression levels</span>
                </div>
              </div>

              <Link href="/tools/pdf-compressor">
                <Button className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white py-3">
                  <Compress className="h-5 w-5 mr-2" />
                  COMPRESS PDF
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* PDF Password Protector */}
          <Card className="bg-white/10 backdrop-blur-md border-green-400/30 hover:border-green-400/50 transition-all duration-300 group">
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <Lock className="h-16 w-16 text-green-400 group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                    <Shield className="h-3 w-3 text-white" />
                  </div>
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-green-300 mb-2">PDF PROTECTOR</CardTitle>
              <p className="text-green-400 text-sm">Add Password • Remove Protection • Secure</p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center text-white">
                  <Lock className="h-5 w-5 text-green-400 mr-3" />
                  <span>Add password protection</span>
                </div>
                <div className="flex items-center text-white">
                  <Unlock className="h-5 w-5 text-green-400 mr-3" />
                  <span>Remove existing passwords</span>
                </div>
                <div className="flex items-center text-white">
                  <Shield className="h-5 w-5 text-green-400 mr-3" />
                  <span>256-bit encryption security</span>
                </div>
              </div>

              <Link href="/tools/pdf-protector">
                <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3">
                  <Lock className="h-5 w-5 mr-2" />
                  PROTECT PDF
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* PDF to Word */}
          <Card className="bg-white/10 backdrop-blur-md border-blue-400/30 hover:border-blue-400/50 transition-all duration-300 group">
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <FileText className="h-16 w-16 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
                    <ArrowRight className="h-3 w-3 text-white" />
                  </div>
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-blue-300 mb-2">PDF TO WORD</CardTitle>
              <p className="text-blue-400 text-sm">Convert • Edit • Format</p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center text-white">
                  <FileText className="h-5 w-5 text-blue-400 mr-3" />
                  <span>Convert PDF to editable Word</span>
                </div>
                <div className="flex items-center text-white">
                  <Shield className="h-5 w-5 text-blue-400 mr-3" />
                  <span>Preserve formatting and layout</span>
                </div>
                <div className="flex items-center text-white">
                  <Zap className="h-5 w-5 text-blue-400 mr-3" />
                  <span>OCR text recognition</span>
                </div>
              </div>

              <Link href="/tools/pdf-to-word">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-3">
                  <FileText className="h-5 w-5 mr-2" />
                  CONVERT TO WORD
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Word to PDF */}
          <Card className="bg-white/10 backdrop-blur-md border-purple-400/30 hover:border-purple-400/50 transition-all duration-300 group">
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <FileSignature className="h-16 w-16 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                    <FileText className="h-3 w-3 text-white" />
                  </div>
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-purple-300 mb-2">WORD TO PDF</CardTitle>
              <p className="text-purple-400 text-sm">Convert • Preserve • Share</p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center text-white">
                  <FileSignature className="h-5 w-5 text-purple-400 mr-3" />
                  <span>Convert Word documents to PDF</span>
                </div>
                <div className="flex items-center text-white">
                  <Shield className="h-5 w-5 text-purple-400 mr-3" />
                  <span>Maintain document integrity</span>
                </div>
                <div className="flex items-center text-white">
                  <Zap className="h-5 w-5 text-purple-400 mr-3" />
                  <span>Batch conversion support</span>
                </div>
              </div>

              <Link href="/tools/word-to-pdf">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3">
                  <FileSignature className="h-5 w-5 mr-2" />
                  CONVERT TO PDF
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* System Status */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/5 backdrop-blur-md border-green-400/30">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse mr-2"></div>
                <span className="text-green-300 font-semibold">SYSTEM ONLINE</span>
              </div>
              <p className="text-green-200 text-sm">PDF processing ready</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-md border-blue-400/30">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <Shield className="h-5 w-5 text-blue-400 mr-2" />
                <span className="text-blue-300 font-semibold">SECURE</span>
              </div>
              <p className="text-blue-200 text-sm">Local processing only</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-md border-purple-400/30">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <Zap className="h-5 w-5 text-purple-400 mr-2" />
                <span className="text-purple-300 font-semibold">OPTIMIZED</span>
              </div>
              <p className="text-purple-200 text-sm">High-speed processing</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
