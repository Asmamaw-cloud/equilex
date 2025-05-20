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
//     <Card className="w-full max-w-3xl mx-auto mt-8">
//       <CardHeader>
//         <CardTitle>VideoSDK Token Setup</CardTitle>
//         <CardDescription>Enter a valid VideoSDK token to use this application</CardDescription>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         {error && (
//           <Alert variant="destructive">
//             <AlertCircle className="h-4 w-4" />
//             <AlertTitle>Authentication Error</AlertTitle>
//             <AlertDescription>{error}</AlertDescription>
//           </Alert>
//         )}

//         <div className="space-y-2">
//           <h3 className="font-medium">How to get a valid token:</h3>
//           <ol className="list-decimal pl-5 space-y-2">
//             <li>
//               Go to{" "}
//               <a
//                 href="https://app.videosdk.live/api-keys"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-600 hover:underline"
//               >
//                 VideoSDK Dashboard → API Keys
//               </a>
//             </li>
//             <li>Sign up or log in to your account</li>
//             <li>Generate a new API key if you don't have one</li>
//             <li>Click on "Generate Token" for your API key</li>
//             <li>Copy the generated token and paste it below</li>
//           </ol>
//         </div>

//         <div className="pt-2">
//           <label htmlFor="token" className="block text-sm font-medium mb-1">
//             Your VideoSDK Token
//           </label>
//           <div className="flex gap-2">
//             <Input
//               id="token"
//               value={token}
//               onChange={handleTokenChange}
//               placeholder="Paste your VideoSDK token here"
//               className="font-mono text-sm flex-1"
//             />
//             {isValidFormat && <CheckCircle2 className="h-5 w-5 text-green-500 mt-2" />}
//           </div>
//           <p className="text-xs text-gray-500 mt-1">Token should look like: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...</p>
//         </div>
//       </CardContent>
//       <CardFooter className="flex flex-col sm:flex-row gap-2">
//         {savedToken && (
//           <Button variant="outline" onClick={useSavedToken} className="w-full sm:w-auto">
//             Use Saved Token
//           </Button>
//         )}
//         <Button onClick={handleSubmit} disabled={!isValidFormat} className="w-full sm:w-auto sm:ml-auto">
//           Continue with This Token
//         </Button>
//       </CardFooter>
//     </Card>
<div>
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci velit rem iusto excepturi aliquam fuga, dolore, in dolor blanditiis, mollitia rerum quo delectus corrupti. Voluptatibus necessitatibus iste ratione dolore illo!
</div>
  )
}
