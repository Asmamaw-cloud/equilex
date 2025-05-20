"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function JoinScreen({
  getMeetingAndToken,
}: {
  getMeetingAndToken: (meetingId?: string) => void
}) {
  const [meetingId, setMeetingId] = useState<string>("")
  const [isJoining, setIsJoining] = useState(false)

  const handleJoinClick = () => {
    if (!meetingId || meetingId.trim() === "") {
      alert("Please enter a valid meeting ID")
      return
    }

    setIsJoining(true)
    console.log("Joining meeting with ID:", meetingId)
    getMeetingAndToken(meetingId)
  }

  const handleCreateClick = () => {
    setIsJoining(true)
    console.log("Creating new meeting")
    getMeetingAndToken()
  }

  return (
    <Card className="flex md:flex-row flex-col md:items-center p-4 my-4 w-full max-w-3xl h-auto min-h-96 mt-24 shadow-lg">
      <div className="md:w-1/2 w-full px-2 flex flex-col gap-y-5 md:pl-4 mx-auto">
        <h1 className="text-4xl font-bold text-black">Video Meeting</h1>
        <h5 className="text-lg font-semibold text-black/75">Create a new meeting or join an existing one</h5>
        <Input
          type="text"
          placeholder="Enter meeting ID to join"
          value={meetingId}
          onChange={(e) => {
            setMeetingId(e.target.value)
          }}
          className="shadow-md"
          disabled={isJoining}
        />
      </div>
      <div className="md:w-1/2 w-full px-2 flex flex-col md:gap-y-10 gap-y-5 items-center my-auto py-4">
        <Button
          onClick={handleJoinClick}
          className="md:w-3/4 w-full shadow-xl bg-[#7B3B99] hover:bg-[#6a3285]"
          disabled={isJoining || !meetingId}
        >
          {isJoining ? "Joining..." : "Join Meeting"}
        </Button>
        <Button
          onClick={handleCreateClick}
          className="md:w-3/4 w-full shadow-xl bg-[#7B3B99] hover:bg-[#6a3285]"
          disabled={isJoining}
        >
          {isJoining ? "Creating..." : "Create Meeting"}
        </Button>
      </div>
    </Card>
  )
}
