import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ArrowLeft, CheckCircle, Loader2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const OtpSubmitter = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-muted/30">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
            <h1 className="text-3xl font-bold tracking-tight">Enter OTP</h1>
            <p className="text-muted-foreground">
              We've sent a verification code to <strong>{submittedEmail}</strong>
            </p>
          </div>

          <Card className="border-muted/40 shadow-lg">
            <CardContent className="pt-6 space-y-4">
              <Input
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                className="text-center tracking-widest"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />

              <Button
                className="w-full"
                onClick={handleVerifyOtp}
                disabled={otp.length !== 6 || isLoading}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <CheckCircle className="mr-2 h-4 w-4" />
                )}
                Verify OTP
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                Didn't get the code? {" "}
                <Button
                  variant="link"
                  className="p-0 text-sm"
                  onClick={handleResendEmail}
                  disabled={isLoading}
                >
                  Resend
                </Button>
              </p>

              <Button variant="ghost" className="w-full" asChild>
                <Link href="/signin">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to sign in
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
  )
}

export default OtpSubmitter