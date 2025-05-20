"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import DeviceSettings from "./device-settings"

interface UserSetupProps {
  onJoin: (displayName: string, videoDeviceId?: string, audioDeviceId?: string) => void
  meetingId: string
}

export default function UserSetup({ onJoin, meetingId }: UserSetupProps) {
  const [displayName, setDisplayName] = useState("")
  const [videoDeviceId, setVideoDeviceId] = useState<string | undefined>()
  const [audioDeviceId, setAudioDeviceId] = useState<string | undefined>()
  const [isJoining, setIsJoining] = useState(false)

  // Load saved display name from localStorage
  useEffect(() => {
    const savedName = localStorage.getItem("displayName")
    if (savedName) {
      setDisplayName(savedName)
    } else {
      // Generate a random name if none exists
      setDisplayName(`User ${Math.floor(Math.random() * 1000)}`)
    }

    // Load saved device preferences
    const savedVideoDevice = localStorage.getItem("preferredVideoDevice")
    if (savedVideoDevice) {
      setVideoDeviceId(savedVideoDevice)
    }

    const savedAudioDevice = localStorage.getItem("preferredAudioDevice")
    if (savedAudioDevice) {
      setAudioDeviceId(savedAudioDevice)
    }
  }, [])

  const handleDeviceChange = (deviceType: "videoinput" | "audioinput", deviceId: string) => {
    if (deviceType === "videoinput") {
      setVideoDeviceId(deviceId)
    } else {
      setAudioDeviceId(deviceId)
    }
  }

  const handleJoin = () => {
    if (!displayName.trim()) {
      alert("Please enter a display name")
      return
    }

    setIsJoining(true)
    // Save display name for future use
    localStorage.setItem("displayName", displayName)

    // Join the meeting with selected devices
    onJoin(displayName, videoDeviceId, audioDeviceId)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Join Meeting</span>
          <DeviceSettings onDeviceChange={handleDeviceChange} />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="meeting-id">Meeting ID</Label>
          <Input id="meeting-id" value={meetingId} readOnly className="font-mono bg-gray-50" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="display-name">Your Name</Label>
          <Input
            id="display-name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleJoin} className="w-full bg-[#7B3B99] hover:bg-[#6a3285]" disabled={isJoining}>
          {isJoining ? "Joining..." : "Join Meeting"}
        </Button>
      </CardFooter>
    </Card>
  )
}
