
"use client"
import { useState } from "react"
import dynamic from "next/dynamic"
import { authToken, createMeeting } from "./api"

// Import the TokenInput component
import TokenInput from "./token-input"

// Dynamically import components that use browser APIs
const DynamicMeetingProviderWrapper = dynamic(() => import("./components/MeetingProviderWrapper"), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-screen">Loading meeting provider...</div>,
})

const DynamicJoinScreen = dynamic(() => import("./components/joinScreen"), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-screen">Loading join screen...</div>,
})

const VideoCall = () => {
  const [meetingId, setMeetingId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [userToken, setUserToken] = useState<string | null>(authToken || null)

  // Getting the meeting id by calling the API
  const getMeetingAndToken = async (id?: string) => {
    try {
      setIsLoading(true)
      setError(null)

      if (!userToken) {
        throw new Error("Authentication token is missing. Please provide a valid token.")
      }

      const meetingId = id || (await createMeeting({ token: userToken }))
      console.log("Meeting ID set to:", meetingId)
      setMeetingId(meetingId)
    } catch (err) {
      console.error("Error in getMeetingAndToken:", err)
      setError(err instanceof Error ? err.message : "Failed to create or join meeting. Please check your API token.")
    } finally {
      setIsLoading(false)
    }
  }

  // Handle token submission from the TokenInput component
  const handleTokenSubmit = (token: string) => {
    setUserToken(token)
    setError(null)
  }

  // This will set Meeting Id to null when meeting is left or ended
  const onMeetingLeave = () => {
    setMeetingId(null)
  }

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7B3B99] mx-auto"></div>
          <p className="mt-4 text-lg">Setting up your meeting...</p>
        </div>
      </div>
    )
  }

  // Show token input if no token is available or if there was an authentication error
  if (!userToken || (error && error.includes("Token is invalid"))) {
    return <TokenInput onTokenSubmit={handleTokenSubmit} error={error || undefined} />
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-red-50 rounded-lg">
          <h2 className="text-xl font-bold text-red-700 mb-2">Error</h2>
          <p className="text-red-600">{error}</p>
          <div className="flex gap-2 mt-4 justify-center">
            <button onClick={() => setError(null)} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
              Try Again
            </button>
            <button
              onClick={() => setUserToken(null)}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Change Token
            </button>
          </div>
        </div>
      </div>
    )
  }

  return userToken && meetingId ? (
    <div className="h-auto flex items-center justify-center px-2">
      <DynamicMeetingProviderWrapper meetingId={meetingId} authToken={userToken} onMeetingLeave={onMeetingLeave} />
    </div>
  ) : (
    <div className="px-2 h-full w-full min-h-screen flex justify-center">
      <DynamicJoinScreen getMeetingAndToken={getMeetingAndToken} />
    </div>
  )
}

export default VideoCall
