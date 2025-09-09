"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Palette, Copy, RefreshCw, Download, Shuffle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type PaletteType = "complementary" | "analogous" | "triadic" | "monochromatic" | "split-complementary"

export default function ColorPalettePage() {
  const [baseColor, setBaseColor] = useState("#3B82F6")
  const [palette, setPalette] = useState<string[]>([])
  const [paletteType, setPaletteType] = useState<PaletteType>("complementary")
  const [colorCount, setColorCount] = useState(5)
  const { toast } = useToast()

  useEffect(() => {
    generatePalette()
  }, [baseColor, paletteType, colorCount])

  const generatePalette = () => {
    const colors = []
    const baseHsl = hexToHsl(baseColor)

    switch (paletteType) {
      case "complementary":
        colors.push(baseColor)
        colors.push(hslToHex((baseHsl.h + 180) % 360, baseHsl.s, baseHsl.l))
        // Add variations
        for (let i = 2; i < colorCount; i++) {
          const lightness = Math.max(10, Math.min(90, baseHsl.l + (i - 2) * 20 - 20))
          colors.push(hslToHex(baseHsl.h, baseHsl.s, lightness))
        }
        break

      case "analogous":
        for (let i = 0; i < colorCount; i++) {
          const hue = (baseHsl.h + i * 30) % 360
          colors.push(hslToHex(hue, baseHsl.s, baseHsl.l))
        }
        break

      case "triadic":
        colors.push(baseColor)
        colors.push(hslToHex((baseHsl.h + 120) % 360, baseHsl.s, baseHsl.l))
        colors.push(hslToHex((baseHsl.h + 240) % 360, baseHsl.s, baseHsl.l))
        // Add variations
        for (let i = 3; i < colorCount; i++) {
          const hue = (baseHsl.h + (i - 3) * 60) % 360
          colors.push(hslToHex(hue, baseHsl.s * 0.8, baseHsl.l))
        }
        break

      case "monochromatic":
        for (let i = 0; i < colorCount; i++) {
          const lightness = Math.max(10, Math.min(90, 20 + i * (70 / (colorCount - 1))))
          colors.push(hslToHex(baseHsl.h, baseHsl.s, lightness))
        }
        break

      case "split-complementary":
        colors.push(baseColor)
        colors.push(hslToHex((baseHsl.h + 150) % 360, baseHsl.s, baseHsl.l))
        colors.push(hslToHex((baseHsl.h + 210) % 360, baseHsl.s, baseHsl.l))
        // Add variations
        for (let i = 3; i < colorCount; i++) {
          const saturation = Math.max(20, baseHsl.s - (i - 3) * 15)
          colors.push(hslToHex(baseHsl.h, saturation, baseHsl.l))
        }
        break
    }

    setPalette(colors.slice(0, colorCount))
  }

  const hexToHsl = (hex: string) => {
    const r = Number.parseInt(hex.slice(1, 3), 16) / 255
    const g = Number.parseInt(hex.slice(3, 5), 16) / 255
    const b = Number.parseInt(hex.slice(5, 7), 16) / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0,
      s = 0,
      l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }
      h /= 6
    }

    return { h: h * 360, s: s * 100, l: l * 100 }
  }

  const hslToHex = (h: number, s: number, l: number) => {
    h /= 360
    s /= 100
    l /= 100

    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    const r = hue2rgb(p, q, h + 1 / 3)
    const g = hue2rgb(p, q, h)
    const b = hue2rgb(p, q, h - 1 / 3)

    const toHex = (c: number) => {
      const hex = Math.round(c * 255).toString(16)
      return hex.length === 1 ? "0" + hex : hex
    }

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`
  }

  const copyColor = async (color: string) => {
    await navigator.clipboard.writeText(color)
    toast({
      title: "Color Copied",
      description: `${color} copied to clipboard`,
    })
  }

  const copyAllColors = async () => {
    const colorString = palette.join(", ")
    await navigator.clipboard.writeText(colorString)
    toast({
      title: "Palette Copied",
      description: "All colors copied to clipboard",
    })
  }

  const randomizeBaseColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`
    setBaseColor(randomColor)
  }

  const downloadPalette = () => {
    const css = palette.map((color, index) => `--color-${index + 1}: ${color};`).join("\n")
    const blob = new Blob([css], { type: "text/css" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `color-palette-${Date.now()}.css`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen py-20 px-4 mobile-section-padding">
      <div className="container mx-auto max-w-6xl mobile-padding">
        <div className="text-center mb-12 mobile-mb-8">
          <h1 className="text-4xl font-bold mb-4 mobile-leading-tight">
            <span className="gradient-text">Color Palette Generator</span>
          </h1>
          <p className="text-xl text-muted-foreground mobile-text-sm mobile-text-balance">
            Generate beautiful color palettes with real-time preview and harmony analysis
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mobile-gap-4">
          <div className="lg:col-span-2">
            <Card className="tool-card">
              <CardHeader>
                <CardTitle className="flex items-center mobile-text-center">
                  <Palette className="h-6 w-6 mr-2" />
                  Color Generator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 mobile-content-spacing mobile-card-padding">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mobile-gap-2">
                  <div>
                    <label className="text-sm font-medium mb-2 block mobile-text-xs">Base Color</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={baseColor}
                        onChange={(e) => setBaseColor(e.target.value)}
                        className="w-16 h-12 rounded border mobile-touch-target"
                      />
                      <Input
                        value={baseColor}
                        onChange={(e) => setBaseColor(e.target.value)}
                        className="flex-1 mobile-input-group"
                      />
                      <Button
                        onClick={randomizeBaseColor}
                        size="sm"
                        variant="outline"
                        className="mobile-touch-target bg-transparent"
                      >
                        <Shuffle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block mobile-text-xs">Palette Type</label>
                    <Select value={paletteType} onValueChange={(value: PaletteType) => setPaletteType(value)}>
                      <SelectTrigger className="mobile-touch-target">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="complementary">Complementary</SelectItem>
                        <SelectItem value="analogous">Analogous</SelectItem>
                        <SelectItem value="triadic">Triadic</SelectItem>
                        <SelectItem value="monochromatic">Monochromatic</SelectItem>
                        <SelectItem value="split-complementary">Split Complementary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block mobile-text-xs">
                    Number of Colors: {colorCount}
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="8"
                    value={colorCount}
                    onChange={(e) => setColorCount(Number(e.target.value))}
                    className="w-full mobile-touch-target"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>3</span>
                    <span>8</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mobile-button-group">
                  <Button onClick={generatePalette} className="mobile-flex-1 sm:mobile-flex-initial">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Regenerate
                  </Button>
                  <Button
                    onClick={copyAllColors}
                    variant="outline"
                    className="mobile-flex-1 sm:mobile-flex-initial bg-transparent"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy All
                  </Button>
                  <Button
                    onClick={downloadPalette}
                    variant="outline"
                    className="mobile-flex-1 sm:mobile-flex-initial bg-transparent"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download CSS
                  </Button>
                </div>

                {palette.length > 0 && (
                  <div className="space-y-4 mobile-content-spacing">
                    <h3 className="text-lg font-semibold mobile-text-center">Generated Palette</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mobile-gap-2">
                      {palette.map((color, index) => (
                        <div key={index} className="space-y-2">
                          <div
                            className="w-full h-24 sm:h-32 rounded-lg border cursor-pointer hover:scale-105 transition-transform mobile-touch-target"
                            style={{ backgroundColor: color }}
                            onClick={() => copyColor(color)}
                          />
                          <div className="text-center">
                            <Badge variant="outline" className="text-xs mobile-text-xs mb-1">
                              {color}
                            </Badge>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyColor(color)}
                              className="w-full mobile-touch-target"
                            >
                              <Copy className="h-3 w-3 mr-1" />
                              Copy
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6 mobile-content-spacing">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg mobile-text-center">Palette Types</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm mobile-text-xs mobile-card-padding">
                <div>
                  <strong>Complementary:</strong> Colors opposite on the color wheel
                </div>
                <div>
                  <strong>Analogous:</strong> Colors next to each other on the wheel
                </div>
                <div>
                  <strong>Triadic:</strong> Three colors evenly spaced on the wheel
                </div>
                <div>
                  <strong>Monochromatic:</strong> Different shades of the same color
                </div>
                <div>
                  <strong>Split Complementary:</strong> Base color plus two adjacent to its complement
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg mobile-text-center">Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm mobile-text-xs mobile-card-padding">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>Real-time generation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span>Multiple harmony types</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  <span>Adjustable color count</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full" />
                  <span>CSS export</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg mobile-text-center">Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm mobile-text-xs mobile-card-padding">
                <p>• Click any color to copy its hex code</p>
                <p>• Use complementary colors for high contrast</p>
                <p>• Analogous colors create harmony</p>
                <p>• Monochromatic palettes are safe and elegant</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
