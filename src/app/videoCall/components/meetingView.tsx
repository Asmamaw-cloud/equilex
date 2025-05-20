// "use client"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { useMeeting } from "@videosdk.live/react-sdk"
// import { Loader } from "lucide-react"
// import { useState, useEffect } from "react"
// import ParticipantView from "./participantView"
// import Controls from "./controls"

// const MeetingView = ({
//   onMeetingLeave,
//   meetingId,
// }: {
//   onMeetingLeave: () => void
//   meetingId: string
// }) => {
//   const [joinState, setJoinState] = useState<"NOT_JOINED" | "JOINING" | "JOINED">("NOT_JOINED")
//   const [participantIds, setParticipantIds] = useState<string[]>([])

//   // Get the methods from useMeeting hook
//   const { join, participants, leave } = useMeeting({
//     // Callback for when meeting is joined successfully
//     onMeetingJoined: () => {
//       setJoinState("JOINED")
//     },
//     // Callback for when meeting is left
//     onMeetingLeft: () => {
//       onMeetingLeave()
//     },
//     // Track participants
//     onParticipantJoined: (participant) => {
//       console.log("Participant joined:", participant.id)
//       setParticipantIds((prev) => [...prev, participant.id])
//     },
//     onParticipantLeft: (participant) => {
//       console.log("Participant left:", participant.id)
//       setParticipantIds((prev) => prev.filter((id) => id !== participant.id))
//     },
//   })

//   // Update participants when the participants map changes
//   useEffect(() => {
//     setParticipantIds(Array.from(participants.keys()))
//   }, [participants])

//   const joinMeeting = () => {
//     setJoinState("JOINING")
//     join()
//   }

//   const handleLeave = () => {
//     leave()
//   }

//   return (
//     <div className="container w-full h-[calc(100vh-80px)] relative">
//       {joinState === "JOINED" ? (
//         <div className="w-full h-full flex flex-col justify-between pb-10">
//           <div className="flex-1 overflow-auto p-4">
//             {participantIds.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {participantIds.map((participantId) => (
//                   <div key={participantId} className="bg-gray-100 rounded-lg p-2 shadow-md">
//                     <ParticipantView participantId={participantId} />
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="flex items-center justify-center h-full">
//                 <div className="text-center">
//                   <h2 className="text-xl font-semibold text-gray-700">Waiting for participants to join...</h2>
//                   <p className="text-gray-500 mt-2">
//                     Share the meeting ID with others:{" "}
//                     <span className="font-mono bg-gray-100 px-2 py-1 rounded">{meetingId}</span>
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>

//           <Controls onLeave={handleLeave} />
//         </div>
//       ) : (
//         <Card className="flex flex-row my-4 w-full max-w-3xl h-auto min-h-96 mt-24 shadow-xl mx-auto">
//           <div className="w-1/2 hidden lg:flex items-center justify-center bg-gray-100 rounded-l-lg">
//             <div className="p-6">
//               <h2 className="text-2xl font-bold text-[#7B3B99] mb-4">Video Meeting</h2>
//               <p className="text-gray-600">Connect with your team in high-quality video conferences</p>
//             </div>
//           </div>

//           <div className="lg:w-1/2 w-full mx-auto flex flex-col items-center justify-center p-6">
//             {joinState === "JOINING" ? (
//               <div className="flex flex-col w-full items-center">
//                 <Loader className="w-16 h-16 text-[#7B3B99] animate-spin" />
//                 <h3 className="mt-6 text-black font-semibold">Joining the meeting...</h3>
//               </div>
//             ) : (
//               <div className="flex flex-col gap-y-5 w-full">
//                 <h1 className="text-3xl font-bold text-black">Meeting Room</h1>
//                 <h3 className="text-xl font-semibold text-[#7B3B99]">Meeting ID: {meetingId}</h3>
//                 <h5 className="text-sm font-semibold text-black/75">
//                   You have created the meeting room. Click Join to enter.
//                 </h5>
//                 <Button onClick={joinMeeting} className="w-full shadow-xl bg-[#7B3B99] hover:bg-[#6a3285]">
//                   Join Meeting
//                 </Button>
//               </div>
//             )}
//           </div>
//         </Card>
//       )}
//     </div>
//   )
// }

// export default MeetingView



// "use client"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { useMeeting } from "@videosdk.live/react-sdk"
// import { Loader, Users } from "lucide-react"
// import { useState, useEffect } from "react"
// import ParticipantView from "./participantView"
// import Controls from "./controls"

// const MeetingView = ({
//   onMeetingLeave,
//   meetingId,
// }: {
//   onMeetingLeave: () => void
//   meetingId: string
// }) => {
//   const [joinState, setJoinState] = useState<"NOT_JOINED" | "JOINING" | "JOINED">("NOT_JOINED")
//   const [participantIds, setParticipantIds] = useState<string[]>([])

//   // Get the methods from useMeeting hook
//   const { join, participants, leave } = useMeeting({
//     // Callback for when meeting is joined successfully
//     onMeetingJoined: () => {
//       setJoinState("JOINED")
//       console.log("Meeting joined successfully")
//     },
//     // Callback for when meeting is left
//     onMeetingLeft: () => {
//       console.log("Meeting left")
//       onMeetingLeave()
//     },
//     // Track participants
//     onParticipantJoined: (participant) => {
//       console.log("Participant joined:", participant.id)
//       // Update participant IDs when a new participant joins
//       setParticipantIds((prev) => Array.from(new Set([...prev, participant.id])))
//     },
//     onParticipantLeft: (participant) => {
//       console.log("Participant left:", participant.id)
//       // Remove participant when they leave
//       setParticipantIds((prev) => prev.filter((id) => id !== participant.id))
//     },
//   })

//   // Update participants when the participants map changes
//   useEffect(() => {
//     const ids = Array.from(participants.keys())
//     console.log("Participants updated:", ids)
//     setParticipantIds(ids)
//   }, [participants])

//   const joinMeeting = () => {
//     setJoinState("JOINING")
//     join()
//   }

//   const handleLeave = () => {
//     leave()
//   }

//   return (
//     <div className="container w-full h-[calc(100vh-80px)] relative">
//       {joinState === "JOINED" ? (
//         <div className="w-full h-full flex flex-col justify-between pb-10">
//           <div className="flex-1 overflow-auto p-4">
//             {participantIds.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {participantIds.map((participantId) => (
//                   <div key={participantId} className="bg-gray-100 rounded-lg p-2 shadow-md">
//                     <ParticipantView participantId={participantId} key={`participant-${participantId}`} />
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="flex items-center justify-center h-full">
//                 <div className="text-center">
//                   <h2 className="text-xl font-semibold text-gray-700">Waiting for participants to join...</h2>
//                   <p className="text-gray-500 mt-2">
//                     Share the meeting ID with others:{" "}
//                     <span className="font-mono bg-gray-100 px-2 py-1 rounded">{meetingId}</span>
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="bg-white p-2 border-t">
//             <div className="flex items-center justify-between mb-2">
//               <div className="flex items-center">
//                 <Users className="h-5 w-5 mr-2" />
//                 <span className="text-sm font-medium">
//                   {participantIds.length} {participantIds.length === 1 ? "Participant" : "Participants"}
//                 </span>
//               </div>
//               <div className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">Meeting ID: {meetingId}</div>
//             </div>
//             <Controls onLeave={handleLeave} />
//           </div>
//         </div>
//       ) : (
//         <Card className="flex flex-row my-4 w-full max-w-3xl h-auto min-h-96 mt-24 shadow-xl mx-auto">
//           <div className="w-1/2 hidden lg:flex items-center justify-center bg-gray-100 rounded-l-lg">
//             <div className="p-6">
//               <h2 className="text-2xl font-bold text-[#7B3B99] mb-4">Video Meeting</h2>
//               <p className="text-gray-600">Connect with your team in high-quality video conferences</p>
//             </div>
//           </div>

//           <div className="lg:w-1/2 w-full mx-auto flex flex-col items-center justify-center p-6">
//             {joinState === "JOINING" ? (
//               <div className="flex flex-col w-full items-center">
//                 <Loader className="w-16 h-16 text-[#7B3B99] animate-spin" />
//                 <h3 className="mt-6 text-black font-semibold">Joining the meeting...</h3>
//               </div>
//             ) : (
//               <div className="flex flex-col gap-y-5 w-full">
//                 <h1 className="text-3xl font-bold text-black">Meeting Room</h1>
//                 <h3 className="text-xl font-semibold text-[#7B3B99]">Meeting ID: {meetingId}</h3>
//                 <h5 className="text-sm font-semibold text-black/75">
//                   You have created the meeting room. Click Join to enter.
//                 </h5>
//                 <Button onClick={joinMeeting} className="w-full shadow-xl bg-[#7B3B99] hover:bg-[#6a3285]">
//                   Join Meeting
//                 </Button>
//               </div>
//             )}
//           </div>
//         </Card>
//       )}
//     </div>
//   )
// }

// export default MeetingView




"use client"
import { useMeeting } from "@videosdk.live/react-sdk"
import { Loader, Users } from "lucide-react"
import { useState, useEffect } from "react"
import ParticipantView from "./participantView"
import Controls from "./controls"
import UserSetup from "./user-setup"

const MeetingView = ({
  onMeetingLeave,
  meetingId,
}: {
  onMeetingLeave: () => void
  meetingId: string
}) => {
  const [joinState, setJoinState] = useState<"NOT_JOINED" | "JOINING" | "JOINED">("NOT_JOINED")
  const [participantIds, setParticipantIds] = useState<string[]>([])
  const [userConfig, setUserConfig] = useState<{
    displayName: string
    videoDeviceId?: string
    audioDeviceId?: string
  } | null>(null)

  // Get the methods from useMeeting hook
  const { join, participants, leave, changeWebcam, changeMic } = useMeeting({
    // Callback for when meeting is joined successfully
    onMeetingJoined: () => {
      setJoinState("JOINED")
      console.log("Meeting joined successfully")

      // Apply device selections if provided
      if (userConfig?.videoDeviceId) {
        changeWebcam(userConfig.videoDeviceId)
      }

      if (userConfig?.audioDeviceId) {
        changeMic(userConfig.audioDeviceId)
      }
    },
    // Callback for when meeting is left
    onMeetingLeft: () => {
      console.log("Meeting left")
      onMeetingLeave()
    },
    // Track participants
    onParticipantJoined: (participant) => {
      console.log("Participant joined:", participant.id, participant.displayName)
      // Update participant IDs when a new participant joins
      setParticipantIds((prev) => Array.from(new Set([...prev, participant.id])))
    },
    onParticipantLeft: (participant) => {
      console.log("Participant left:", participant.id)
      // Remove participant when they leave
      setParticipantIds((prev) => prev.filter((id) => id !== participant.id))
    },
  })

  // Update participants when the participants map changes
  useEffect(() => {
    const ids = Array.from(participants.keys())
    console.log("Participants updated:", ids)
    setParticipantIds(ids)
  }, [participants])

  const handleUserJoin = (displayName: string, videoDeviceId?: string, audioDeviceId?: string) => {
    setUserConfig({
      displayName,
      videoDeviceId,
      audioDeviceId,
    })

    setJoinState("JOINING")
    join()
  }

  const handleLeave = () => {
    leave()
  }

  // If not joined yet, show the user setup screen
  if (joinState === "NOT_JOINED") {
    return (
      <div className="container w-full h-[calc(100vh-80px)] flex items-center justify-center">
        <UserSetup onJoin={handleUserJoin} meetingId={meetingId} />
      </div>
    )
  }

  // If joining, show loading screen
  if (joinState === "JOINING") {
    return (
      <div className="container w-full h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-16 h-16 text-[#7B3B99] animate-spin mx-auto" />
          <h3 className="mt-6 text-xl font-semibold">Joining the meeting...</h3>
          <p className="text-gray-500 mt-2">Setting up your audio and video...</p>
        </div>
      </div>
    )
  }

  // If joined, show the meeting view
  return (
    <div className="container w-full h-[calc(100vh-80px)] relative">
      <div className="w-full h-full flex flex-col justify-between pb-10">
        <div className="flex-1 overflow-auto p-4">
          {participantIds.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {participantIds.map((participantId) => (
                <div key={participantId} className="bg-gray-100 rounded-lg p-2 shadow-md">
                  <ParticipantView participantId={participantId} key={`participant-${participantId}`} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-700">Waiting for participants to join...</h2>
                <p className="text-gray-500 mt-2">
                  Share the meeting ID with others:{" "}
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded">{meetingId}</span>
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white p-2 border-t">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">
                {participantIds.length} {participantIds.length === 1 ? "Participant" : "Participants"}
              </span>
            </div>
            <div className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">Meeting ID: {meetingId}</div>
          </div>
          <Controls onLeave={handleLeave} />
        </div>
      </div>
    </div>
  )
}

export default MeetingView






// "use client"
// import { useMeeting } from "@videosdk.live/react-sdk"
// import { Loader, Users } from "lucide-react"
// import { useState, useEffect } from "react"
// import ParticipantView from "./participantView"
// import Controls from "./controls"
// import UserSetup from "./user-setup"
// import Subtitles, { SubtitleManager } from "./subtitles"

// const MeetingView = ({
//   onMeetingLeave,
//   meetingId,
// }: {
//   onMeetingLeave: () => void
//   meetingId: string
// }) => {
//   const [joinState, setJoinState] = useState<"NOT_JOINED" | "JOINING" | "JOINED">("NOT_JOINED")
//   const [participantIds, setParticipantIds] = useState<string[]>([])
//   const [userConfig, setUserConfig] = useState<{
//     displayName: string
//     videoDeviceId?: string
//     audioDeviceId?: string
//   } | null>(null)
//   const [subtitlesEnabled, setSubtitlesEnabled] = useState(false)
//   const [subtitlesData, setSubtitlesData] = useState<Record<string, string>>({})

//   // Get the methods from useMeeting hook
//   const { join, participants, leave, changeWebcam, changeMic, enableSpeechTranscription, disableSpeechTranscription } =
//     useMeeting({
//       // Callback for when meeting is joined successfully
//       onMeetingJoined: () => {
//         setJoinState("JOINED")
//         console.log("Meeting joined successfully")

//         // Apply device selections if provided
//         if (userConfig?.videoDeviceId) {
//           changeWebcam(userConfig.videoDeviceId)
//         }

//         if (userConfig?.audioDeviceId) {
//           changeMic(userConfig.audioDeviceId)
//         }
//       },
//       // Callback for when meeting is left
//       onMeetingLeft: () => {
//         console.log("Meeting left")
//         onMeetingLeave()
//       },
//       // Track participants
//       onParticipantJoined: (participant) => {
//         console.log("Participant joined:", participant.id, participant.displayName)
//         // Update participant IDs when a new participant joins
//         setParticipantIds((prev) => Array.from(new Set([...prev, participant.id])))
//       },
//       onParticipantLeft: (participant) => {
//         console.log("Participant left:", participant.id)
//         // Remove participant when they leave
//         setParticipantIds((prev) => prev.filter((id) => id !== participant.id))
//         // Remove any subtitles for this participant
//         setSubtitlesData((prev) => {
//           const newData = { ...prev }
//           delete newData[participant.id]
//           return newData
//         })
//       },
//     })

//   // Update participants when the participants map changes
//   useEffect(() => {
//     const ids = Array.from(participants.keys())
//     console.log("Participants updated:", ids)
//     setParticipantIds(ids)
//   }, [participants])

//   const handleUserJoin = (displayName: string, videoDeviceId?: string, audioDeviceId?: string) => {
//     setUserConfig({
//       displayName,
//       videoDeviceId,
//       audioDeviceId,
//     })

//     setJoinState("JOINING")
//     join()
//   }

//   const handleLeave = () => {
//     // Disable subtitles before leaving
//     if (subtitlesEnabled) {
//       disableSpeechTranscription()
//     }
//     leave()
//   }

//   const handleToggleSubtitles = (enabled: boolean) => {
//     setSubtitlesEnabled(enabled)

//     if (enabled) {
//       // Enable speech transcription with VideoSDK
//       console.log("Enabling speech transcription")
//       enableSpeechTranscription({
//         language: "en-US", // English language
//       })
//         .then(() => {
//           console.log("Speech transcription enabled successfully")
//         })
//         .catch((error) => {
//           console.error("Error enabling speech transcription:", error)
//           setSubtitlesEnabled(false) // Revert state if there's an error
//         })
//     } else {
//       // Disable speech transcription
//       console.log("Disabling speech transcription")
//       disableSpeechTranscription()
//         .then(() => {
//           console.log("Speech transcription disabled successfully")
//           // Clear subtitles when disabled
//           setSubtitlesData({})
//         })
//         .catch((error) => {
//           console.error("Error disabling speech transcription:", error)
//         })
//     }
//   }

//   const handleSubtitleReceived = (participantId: string, text: string) => {
//     setSubtitlesData((prev) => ({
//       ...prev,
//       [participantId]: text,
//     }))

//     // Clear the subtitle after a few seconds
//     setTimeout(() => {
//       setSubtitlesData((prev) => {
//         if (prev[participantId] === text) {
//           const newData = { ...prev }
//           delete newData[participantId]
//           return newData
//         }
//         return prev
//       })
//     }, 5000)
//   }

//   // If not joined yet, show the user setup screen
//   if (joinState === "NOT_JOINED") {
//     return (
//       <div className="container w-full h-[calc(100vh-80px)] flex items-center justify-center">
//         <UserSetup onJoin={handleUserJoin} meetingId={meetingId} />
//       </div>
//     )
//   }

//   // If joining, show loading screen
//   if (joinState === "JOINING") {
//     return (
//       <div className="container w-full h-[calc(100vh-80px)] flex items-center justify-center">
//         <div className="text-center">
//           <Loader className="w-16 h-16 text-[#7B3B99] animate-spin mx-auto" />
//           <h3 className="mt-6 text-xl font-semibold">Joining the meeting...</h3>
//           <p className="text-gray-500 mt-2">Setting up your audio and video...</p>
//         </div>
//       </div>
//     )
//   }

//   // If joined, show the meeting view
//   return (
//     <div className="container w-full h-[calc(100vh-80px)] relative">
//       <div className="w-full h-full flex flex-col justify-between pb-10">
//         <div className="flex-1 overflow-auto p-4 relative">
//           {participantIds.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {participantIds.map((participantId) => (
//                 <div key={participantId} className="bg-gray-100 rounded-lg p-2 shadow-md">
//                   <ParticipantView participantId={participantId} key={`participant-${participantId}`} />
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="flex items-center justify-center h-full">
//               <div className="text-center">
//                 <h2 className="text-xl font-semibold text-gray-700">Waiting for participants to join...</h2>
//                 <p className="text-gray-500 mt-2">
//                   Share the meeting ID with others:{" "}
//                   <span className="font-mono bg-gray-100 px-2 py-1 rounded">{meetingId}</span>
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* Subtitles overlay */}
//           <Subtitles enabled={subtitlesEnabled} subtitles={subtitlesData} />

//           {/* Hidden subtitle manager that listens for speech */}
//           <SubtitleManager enabled={subtitlesEnabled} onSubtitle={handleSubtitleReceived} />
//         </div>

//         <div className="bg-white p-2 border-t">
//           <div className="flex items-center justify-between mb-2">
//             <div className="flex items-center">
//               <Users className="h-5 w-5 mr-2" />
//               <span className="text-sm font-medium">
//                 {participantIds.length} {participantIds.length === 1 ? "Participant" : "Participants"}
//               </span>
//             </div>
//             <div className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">Meeting ID: {meetingId}</div>
//           </div>
//           <Controls onLeave={handleLeave} onToggleSubtitles={handleToggleSubtitles} />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default MeetingView
