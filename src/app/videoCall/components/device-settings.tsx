"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Camera, Mic } from "lucide-react"
import { Label } from "@/components/ui/label"

interface DeviceInfo {
  deviceId: string
  label: string
}

interface DeviceSettingsProps {
  onDeviceChange?: (deviceType: "videoinput" | "audioinput", deviceId: string) => void
}

export default function DeviceSettings({ onDeviceChange }: DeviceSettingsProps) {
  const [videoDevices, setVideoDevices] = useState<DeviceInfo[]>([])
  const [audioDevices, setAudioDevices] = useState<DeviceInfo[]>([])
  const [selectedVideoDevice, setSelectedVideoDevice] = useState<string>("")
  const [selectedAudioDevice, setSelectedAudioDevice] = useState<string>("")
  const [permissionError, setPermissionError] = useState<string | null>(null)

  // Get available media devices
  const getDevices = async () => {
    try {
      // First request permission to access media devices
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      setPermissionError(null)

      const devices = await navigator.mediaDevices.enumerateDevices()

      const videoInputs = devices
        .filter((device) => device.kind === "videoinput")
        .map((device) => ({
          deviceId: device.deviceId,
          label: device.label || `Camera ${device.deviceId.slice(0, 5)}`,
        }))

      const audioInputs = devices
        .filter((device) => device.kind === "audioinput")
        .map((device) => ({
          deviceId: device.deviceId,
          label: device.label || `Microphone ${device.deviceId.slice(0, 5)}`,
        }))

      setVideoDevices(videoInputs)
      setAudioDevices(audioInputs)

      // Set default selections if available
      if (videoInputs.length > 0 && !selectedVideoDevice) {
        setSelectedVideoDevice(videoInputs[0].deviceId)
      }

      if (audioInputs.length > 0 && !selectedAudioDevice) {
        setSelectedAudioDevice(audioInputs[0].deviceId)
      }
    } catch (error) {
      console.error("Error accessing media devices:", error)
      setPermissionError("Permission to access camera/microphone was denied")
    }
  }

  useEffect(() => {
    // Only run on client side
    if (typeof window !== "undefined") {
      getDevices()
    }
  }, [])

  const handleVideoDeviceChange = (value: string) => {
    setSelectedVideoDevice(value)
    if (onDeviceChange) {
      onDeviceChange("videoinput", value)
    }
    // Store the selection in localStorage
    localStorage.setItem("preferredVideoDevice", value)
  }

  const handleAudioDeviceChange = (value: string) => {
    setSelectedAudioDevice(value)
    if (onDeviceChange) {
      onDeviceChange("audioinput", value)
    }
    // Store the selection in localStorage
    localStorage.setItem("preferredAudioDevice", value)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Settings className="h-5 w-5" />
          <span className="sr-only">Device Settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Device Settings</DialogTitle>
        </DialogHeader>

        {permissionError ? (
          <div className="bg-red-50 p-4 rounded-md text-red-700">
            <p className="font-medium">{permissionError}</p>
            <p className="mt-2 text-sm">Please allow access to your camera and microphone to use this application.</p>
            <Button onClick={getDevices} className="mt-2 bg-red-600 hover:bg-red-700 text-white">
              Try Again
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center">
                <Camera className="mr-2 h-4 w-4" />
                <Label htmlFor="video-device">Camera</Label>
              </div>
              <Select value={selectedVideoDevice} onValueChange={handleVideoDeviceChange}>
                <SelectTrigger id="video-device">
                  <SelectValue placeholder="Select camera" />
                </SelectTrigger>
                <SelectContent>
                  {videoDevices.map((device) => (
                    <SelectItem key={device.deviceId} value={device.deviceId}>
                      {device.label}
                    </SelectItem>
                  ))}
                  {videoDevices.length === 0 && (
                    <SelectItem value="none" disabled>
                      No cameras found
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <Mic className="mr-2 h-4 w-4" />
                <Label htmlFor="audio-device">Microphone</Label>
              </div>
              <Select value={selectedAudioDevice} onValueChange={handleAudioDeviceChange}>
                <SelectTrigger id="audio-device">
                  <SelectValue placeholder="Select microphone" />
                </SelectTrigger>
                <SelectContent>
                  {audioDevices.map((device) => (
                    <SelectItem key={device.deviceId} value={device.deviceId}>
                      {device.label}
                    </SelectItem>
                  ))}
                  {audioDevices.length === 0 && (
                    <SelectItem value="none" disabled>
                      No microphones found
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="text-sm text-gray-500">
              <p>
                Tip: If you're using multiple browser windows, each window should use a different camera if available.
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
