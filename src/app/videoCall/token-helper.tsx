"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function TokenHelper() {
  const [token, setToken] = useState("")
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`NEXT_PUBLIC_VIDEO_AUTH_KEY=${token}`).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    })
  }

  return (
    <Card className="w-full max-w-3xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>VideoSDK Token Setup</CardTitle>
        <CardDescription>You need a valid VideoSDK token to use this application</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Authentication Error</AlertTitle>
          <AlertDescription>
            Your VideoSDK token is invalid or missing. Please follow the steps below to get a valid token.
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <h3 className="font-medium">How to get a valid token:</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              Go to{" "}
              <a
                href="https://app.videosdk.live/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                VideoSDK Dashboard
              </a>
            </li>
            <li>Sign up or log in to your account</li>
            <li>Navigate to the API Keys section</li>
            <li>Generate a new API key or use an existing one</li>
            <li>Use the generated token in the field below</li>
          </ol>
        </div>

        <div className="pt-2">
          <label htmlFor="token" className="block text-sm font-medium mb-1">
            Your VideoSDK Token
          </label>
          <Input
            id="token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Paste your VideoSDK token here"
            className="font-mono text-sm"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => window.location.reload()}>
          Refresh Page
        </Button>
        <Button onClick={copyToClipboard} disabled={!token}>
          {copied ? "Copied!" : "Copy Environment Variable"}
        </Button>
      </CardFooter>
    </Card>
  )
}
