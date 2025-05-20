// "use client"
// import type React from "react"
// import { MeetingProvider } from "@videosdk.live/react-sdk"
// import MeetingView from "./meetingView"

// interface Props {
//   meetingId: string
//   authToken: string
//   onMeetingLeave: () => void
// }

// const MeetingProviderWrapper: React.FC<Props> = ({ meetingId, authToken, onMeetingLeave }) => {
//   if (!meetingId || !authToken) {
//     console.error("Missing required props:", { meetingId, authToken })
//     return (
//       <div className="p-4 bg-red-50 rounded-lg">
//         <h2 className="text-red-700 font-bold">Configuration Error</h2>
//         <p>Missing required meeting configuration. Please try again.</p>
//         <button onClick={onMeetingLeave} className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
//           Go Back
//         </button>
//       </div>
//     )
//   }

//   return (
//     <MeetingProvider
//       config={{
//         meetingId,
//         micEnabled: true,
//         webcamEnabled: true,
//         name: "EQUILEX User", // You could make this dynamic
//         debugMode: true, // Enable debug mode to help troubleshoot
//       }}
//       token={authToken}
//     >
//       <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
//     </MeetingProvider>
//   )
// }

// export default MeetingProviderWrapper





"use client"
import type React from "react"
import { MeetingProvider } from "@videosdk.live/react-sdk"
import MeetingView from "./meetingView"

interface Props {
  meetingId: string
  authToken: string
  onMeetingLeave: () => void
}

const MeetingProviderWrapper: React.FC<Props> = ({ meetingId, authToken, onMeetingLeave }) => {
  if (!meetingId || !authToken) {
    console.error("Missing required props:", { meetingId, authToken })
    return (
      <div className="p-4 bg-red-50 rounded-lg">
        <h2 className="text-red-700 font-bold">Configuration Error</h2>
        <p>Missing required meeting configuration. Please try again.</p>
        <button onClick={onMeetingLeave} className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
          Go Back
        </button>
      </div>
    )
  }

  // Generate a unique participant ID for this session
  const participantId = `participant-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`

  return (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: "User", // This will be overridden by the user setup
        participantId: participantId, // Use unique participant ID
        debug: true, // Enable debug mode
      }}
      token={authToken}
      joinWithoutUserInteraction={false} // Don't auto-join, let the user set up first
    >
      <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
    </MeetingProvider>
  )
}

export default MeetingProviderWrapper





// "use client"
// import type React from "react"
// import { MeetingProvider } from "@videosdk.live/react-sdk"
// import MeetingView from "./meetingView"

// interface Props {
//   meetingId: string
//   authToken: string
//   onMeetingLeave: () => void
// }

// const MeetingProviderWrapper: React.FC<Props> = ({ meetingId, authToken, onMeetingLeave }) => {
//   if (!meetingId || !authToken) {
//     console.error("Missing required props:", { meetingId, authToken })
//     return (
//       <div className="p-4 bg-red-50 rounded-lg">
//         <h2 className="text-red-700 font-bold">Configuration Error</h2>
//         <p>Missing required meeting configuration. Please try again.</p>
//         <button onClick={onMeetingLeave} className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
//           Go Back
//         </button>
//       </div>
//     )
//   }

//   // Generate a unique participant ID for this session
//   const participantId = `participant-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`

//   return (
//     <MeetingProvider
//       config={{
//         meetingId,
//         micEnabled: true,
//         webcamEnabled: true,
//         name: "User", // This will be overridden by the user setup
//         participantId: participantId, // Use unique participant ID
//         debug: true, // Enable debug mode
//         speechTranscription: {
//           enabled: false, // Initially disabled, will be enabled when user clicks the subtitle button
//           language: "en-US", // Default language
//         },
//       }}
//       token={authToken}
//       joinWithoutUserInteraction={false} // Don't auto-join, let the user set up first
//     >
//       <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
//     </MeetingProvider>
//   )
// }

// export default MeetingProviderWrapper
