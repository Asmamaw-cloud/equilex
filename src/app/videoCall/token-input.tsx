"use client"
import { useState, useEffect } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { isValidToken } from "./api"

interface TokenInputProps {
  onTokenSubmit: (token: string) => void
  error?: string
}

export default function TokenInput({ onTokenSubmit, error }: TokenInputProps) {
  const [token, setToken] = useState("")
  const [isValidFormat, setIsValidFormat] = useState(false)
  const [savedToken, setSavedToken] = useState<string | null>(null)

  // Check for token in localStorage on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("videosdk_token")
    if (storedToken) {
      setSavedToken(storedToken)
      setToken(storedToken)
      setIsValidFormat(isValidToken(storedToken))
    }
  }, [])

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newToken = e.target.value
    setToken(newToken)
    setIsValidFormat(isValidToken(newToken))
  }

  const handleSubmit = () => {
    if (isValidFormat) {
      // Save token to localStorage for convenience
      localStorage.setItem("videosdk_token", token)
      onTokenSubmit(token)
    }
  }

  const useSavedToken = () => {
    if (savedToken) {
      onTokenSubmit(savedToken)
    }
  }

  return (
<div>
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci velit rem iusto excepturi aliquam fuga, dolore, in dolor blanditiis, mollitia rerum quo delectus corrupti. Voluptatibus necessitatibus iste ratione dolore illo!
</div>
  )
}
