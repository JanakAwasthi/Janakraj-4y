"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Key, Copy, RefreshCw, Shield, Eye, EyeOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function PasswordGeneratorPage() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState([12])
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(false)
  const [showPassword, setShowPassword] = useState(true)
  const [strengthScore, setStrengthScore] = useState(0)
  const { toast } = useToast()

  useEffect(() => {
    generatePassword()
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols])

  const calculateStrength = (pwd: string) => {
    let score = 0
    if (pwd.length >= 8) score += 20
    if (pwd.length >= 12) score += 20
    if (/[a-z]/.test(pwd)) score += 15
    if (/[A-Z]/.test(pwd)) score += 15
    if (/[0-9]/.test(pwd)) score += 15
    if (/[^A-Za-z0-9]/.test(pwd)) score += 15
    return Math.min(score, 100)
  }

  const generatePassword = () => {
    let charset = ""
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz"
    if (includeNumbers) charset += "0123456789"
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?"

    if (!charset) {
      setPassword("")
      setStrengthScore(0)
      return
    }

    let result = ""
    for (let i = 0; i < length[0]; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    setPassword(result)
    setStrengthScore(calculateStrength(result))
  }

  const copyPassword = async () => {
    if (!password) return

    await navigator.clipboard.writeText(password)
    toast({
      title: "Password Copied",
      description: "Password has been copied to clipboard",
    })
  }

  const getStrengthLevel = () => {
    if (strengthScore < 30) return { level: "Very Weak", color: "destructive", bgColor: "bg-red-500" }
    if (strengthScore < 50) return { level: "Weak", color: "destructive", bgColor: "bg-orange-500" }
    if (strengthScore < 70) return { level: "Medium", color: "secondary", bgColor: "bg-yellow-500" }
    if (strengthScore < 90) return { level: "Strong", color: "default", bgColor: "bg-green-500" }
    return { level: "Very Strong", color: "default", bgColor: "bg-emerald-500" }
  }

  return (
    <div className="min-h-screen py-20 px-4 mobile-section-padding">
      <div className="container mx-auto max-w-4xl mobile-padding">
        <div className="text-center mb-12 mobile-mb-8">
          <h1 className="text-4xl font-bold mb-4 mobile-leading-tight">
            <span className="gradient-text">Password Generator</span>
          </h1>
          <p className="text-xl text-muted-foreground mobile-text-sm mobile-text-balance">
            Generate secure passwords with real-time strength analysis
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mobile-gap-4">
          <div className="lg:col-span-2">
            <Card className="tool-card">
              <CardHeader>
                <CardTitle className="flex items-center mobile-text-center">
                  <Key className="h-6 w-6 mr-2" />
                  Password Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 mobile-content-spacing mobile-card-padding">
                <div>
                  <Label className="mobile-text-sm">Password Length: {length[0]}</Label>
                  <Slider
                    value={length}
                    onValueChange={setLength}
                    max={50}
                    min={4}
                    step={1}
                    className="mt-2 mobile-touch-target"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>4</span>
                    <span>50</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mobile-gap-2">
                  <div className="flex items-center space-x-2 mobile-touch-target">
                    <Checkbox id="uppercase" checked={includeUppercase} onCheckedChange={setIncludeUppercase} />
                    <Label htmlFor="uppercase" className="mobile-text-sm">
                      Uppercase (A-Z)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 mobile-touch-target">
                    <Checkbox id="lowercase" checked={includeLowercase} onCheckedChange={setIncludeLowercase} />
                    <Label htmlFor="lowercase" className="mobile-text-sm">
                      Lowercase (a-z)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 mobile-touch-target">
                    <Checkbox id="numbers" checked={includeNumbers} onCheckedChange={setIncludeNumbers} />
                    <Label htmlFor="numbers" className="mobile-text-sm">
                      Numbers (0-9)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 mobile-touch-target">
                    <Checkbox id="symbols" checked={includeSymbols} onCheckedChange={setIncludeSymbols} />
                    <Label htmlFor="symbols" className="mobile-text-sm">
                      Symbols (!@#$)
                    </Label>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <Button onClick={generatePassword} className="flex-1 mobile-button-group">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Generate New
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowPassword(!showPassword)}
                    className="sm:w-auto mobile-button-group"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>

                {password && (
                  <div className="space-y-4 mobile-content-spacing">
                    <div className="p-4 bg-muted rounded-lg mobile-card-padding">
                      <div className="flex items-center justify-between mb-3">
                        <Label className="mobile-text-sm">Generated Password</Label>
                        <Badge variant={getStrengthLevel().color as any} className="mobile-text-xs">
                          <Shield className="h-3 w-3 mr-1" />
                          {getStrengthLevel().level}
                        </Badge>
                      </div>

                      {/* Real-time strength indicator */}
                      <div className="mb-3">
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>Strength</span>
                          <span>{strengthScore}%</span>
                        </div>
                        <Progress value={strengthScore} className="h-2" />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Input
                          value={showPassword ? password : "•".repeat(password.length)}
                          readOnly
                          className="font-mono mobile-text-sm"
                        />
                        <Button onClick={copyPassword} size="sm" className="mobile-touch-target">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6 mobile-content-spacing">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg mobile-text-center">Security Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm mobile-text-xs mobile-card-padding">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                  <span>Use at least 12 characters for better security</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                  <span>Include uppercase, lowercase, numbers, and symbols</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5 flex-shrink-0" />
                  <span>Never reuse passwords across different accounts</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-1.5 flex-shrink-0" />
                  <span>Use a password manager to store securely</span>
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
                  <span>Strength analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  <span>Customizable length</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full" />
                  <span>One-click copy</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
