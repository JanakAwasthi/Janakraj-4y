"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Code, Copy, ArrowUpDown, FileText, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function Base64EncoderPage() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const [isValid, setIsValid] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    if (!input.trim()) {
      setOutput("")
      setIsValid(true)
      return
    }

    try {
      if (mode === "encode") {
        const encoded = btoa(input)
        setOutput(encoded)
        setIsValid(true)
      } else {
        const decoded = atob(input)
        setOutput(decoded)
        setIsValid(true)
      }
    } catch (error) {
      setIsValid(false)
      if (mode === "decode") {
        setOutput("Invalid Base64 string")
      }
    }
  }, [input, mode])

  const copyOutput = async () => {
    if (!output || !isValid) return

    await navigator.clipboard.writeText(output)
    toast({
      title: "Copied",
      description: "Output copied to clipboard",
    })
  }

  const swap = () => {
    setInput(output)
    setMode(mode === "encode" ? "decode" : "encode")
  }

  const downloadOutput = () => {
    if (!output || !isValid) return

    const blob = new Blob([output], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `base64-${mode}-${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const clearAll = () => {
    setInput("")
    setOutput("")
    setIsValid(true)
  }

  return (
    <div className="min-h-screen py-20 px-4 mobile-section-padding">
      <div className="container mx-auto max-w-6xl mobile-padding">
        <div className="text-center mb-12 mobile-mb-8">
          <h1 className="text-4xl font-bold mb-4 mobile-leading-tight">
            <span className="gradient-text">Base64 Encoder/Decoder</span>
          </h1>
          <p className="text-xl text-muted-foreground mobile-text-sm mobile-text-balance">
            Real-time Base64 encoding and decoding with instant results
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mobile-gap-4">
          <div className="lg:col-span-2">
            <Card className="tool-card">
              <CardHeader>
                <div className="flex items-center justify-between mobile-flex-col mobile-gap-4">
                  <CardTitle className="flex items-center mobile-text-center">
                    <Code className="h-6 w-6 mr-2" />
                    Base64 Converter
                  </CardTitle>

                  <div className="flex gap-2 mobile-w-full">
                    <Button
                      variant={mode === "encode" ? "default" : "outline"}
                      onClick={() => setMode("encode")}
                      className="mobile-flex-1"
                    >
                      Encode
                    </Button>
                    <Button
                      variant={mode === "decode" ? "default" : "outline"}
                      onClick={() => setMode("decode")}
                      className="mobile-flex-1"
                    >
                      Decode
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 mobile-content-spacing mobile-card-padding">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mobile-gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="input" className="mobile-text-sm">
                        {mode === "encode" ? "Text to Encode" : "Base64 to Decode"}
                      </Label>
                      <Badge variant="outline" className="mobile-text-xs">
                        {input.length} chars
                      </Badge>
                    </div>
                    <Textarea
                      id="input"
                      placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 string to decode..."}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="h-40 mobile-input-group"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="output" className="mobile-text-sm">
                        {mode === "encode" ? "Base64 Output" : "Decoded Text"}
                      </Label>
                      <div className="flex items-center gap-2">
                        {!isValid && (
                          <Badge variant="destructive" className="mobile-text-xs">
                            Invalid
                          </Badge>
                        )}
                        <Badge variant="outline" className="mobile-text-xs">
                          {output.length} chars
                        </Badge>
                      </div>
                    </div>
                    <Textarea
                      id="output"
                      placeholder="Result will appear here..."
                      value={output}
                      readOnly
                      className={`h-40 mobile-input-group ${!isValid ? "text-destructive" : ""}`}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 justify-center mobile-button-group">
                  <Button
                    onClick={swap}
                    variant="outline"
                    disabled={!output || !isValid}
                    className="mobile-flex-1 sm:mobile-flex-initial bg-transparent"
                  >
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    Swap
                  </Button>
                  <Button
                    onClick={copyOutput}
                    disabled={!output || !isValid}
                    className="mobile-flex-1 sm:mobile-flex-initial"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button
                    onClick={downloadOutput}
                    variant="outline"
                    disabled={!output || !isValid}
                    className="mobile-flex-1 sm:mobile-flex-initial bg-transparent"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    onClick={clearAll}
                    variant="outline"
                    className="mobile-flex-1 sm:mobile-flex-initial bg-transparent"
                  >
                    Clear
                  </Button>
                </div>

                {input && (
                  <div className="p-3 bg-muted rounded-lg mobile-card-padding">
                    <div className="flex items-center justify-between text-sm mobile-text-xs">
                      <span>Status:</span>
                      <Badge variant={isValid ? "default" : "destructive"}>{isValid ? "✓ Valid" : "✗ Invalid"}</Badge>
                    </div>
                    {isValid && (
                      <div className="mt-2 text-xs text-muted-foreground">
                        {mode === "encode"
                          ? `Encoded ${input.length} characters to ${output.length} Base64 characters`
                          : `Decoded ${input.length} Base64 characters to ${output.length} text characters`}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6 mobile-content-spacing">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg mobile-text-center">About Base64</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm mobile-text-xs mobile-card-padding">
                <p>Base64 is a binary-to-text encoding scheme that represents binary data in ASCII format.</p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                    <span>Used for encoding binary data in emails and web</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                    <span>Safe for transmission over text-based protocols</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5 flex-shrink-0" />
                    <span>Increases data size by approximately 33%</span>
                  </div>
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
                  <span>Real-time conversion</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span>Input validation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  <span>Character counting</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full" />
                  <span>Download results</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg mobile-text-center">Common Uses</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm mobile-text-xs mobile-card-padding">
                <div className="flex items-center gap-2">
                  <FileText className="h-3 w-3 text-muted-foreground" />
                  <span>Email attachments</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-3 w-3 text-muted-foreground" />
                  <span>Data URLs in HTML/CSS</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-3 w-3 text-muted-foreground" />
                  <span>API data transmission</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-3 w-3 text-muted-foreground" />
                  <span>Configuration files</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
