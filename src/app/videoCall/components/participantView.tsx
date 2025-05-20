// "use client"
// import { useEffect, useMemo, useRef } from "react"
// import { useParticipant } from "@videosdk.live/react-sdk"
// import ReactPlayer from "react-player"
// import { Mic, MicOff, Video, VideoOff, User } from "lucide-react"

// export default function ParticipantView({ participantId }: { participantId: string }) {
//   // Using HTMLAudioElement for the audio ref
//   const micRef = useRef<HTMLAudioElement>(null)

//   const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } = useParticipant(participantId)

//   // Create a MediaStream for the webcam
//   const videoStream = useMemo(() => {
//     if (webcamOn && webcamStream) {
//       const mediaStream = new MediaStream()
//       mediaStream.addTrack(webcamStream.track)
//       return mediaStream
//     }
//     return null
//   }, [webcamStream, webcamOn])

//   // Handle microphone audio
//   useEffect(() => {
//     if (micRef.current) {
//       if (micOn && micStream) {
//         const mediaStream = new MediaStream()
//         mediaStream.addTrack(micStream.track)

//         micRef.current.srcObject = mediaStream
//         micRef.current.play().catch((error) => {
//           console.error("Error playing audio:", error)
//         })
//       } else {
//         micRef.current.srcObject = null
//       }
//     }
//   }, [micStream, micOn])

//   return (
//     <div className="flex flex-col h-full">
//       <div className="flex items-center justify-between mb-2">
//         <div className="flex items-center">
//           <span className="text-lg font-semibold text-[#7B3B99] mr-2">
//             {displayName || `User ${participantId.substring(0, 5)}`}
//             {isLocal && " (You)"}
//           </span>
//         </div>
//         <div className="flex items-center space-x-2">
//           {micOn ? <Mic className="h-4 w-4 text-green-600" /> : <MicOff className="h-4 w-4 text-red-600" />}
//           {webcamOn ? <Video className="h-4 w-4 text-green-600" /> : <VideoOff className="h-4 w-4 text-red-600" />}
//         </div>
//       </div>

//       {/* Hidden audio element for the microphone */}
//       <audio ref={micRef} autoPlay muted={isLocal} />

//       {/* Video display */}
//       <div className="relative flex-1 bg-gray-200 rounded-lg overflow-hidden">
//         {webcamOn && videoStream ? (
//           <ReactPlayer
//             playsinline
//             pip={false}
//             light={false}
//             controls={false}
//             muted={true}
//             playing={true}
//             url={videoStream}
//             width="100%"
//             height="100%"
//             style={{ borderRadius: "8px" }}
//             onError={(err) => {
//               console.error("Video player error:", err)
//             }}
//           />
//         ) : (
//           <div className="flex items-center justify-center h-full">
//             <div className="bg-[#7B3B99]/20 rounded-full p-6">
//               <User className="h-12 w-12 text-[#7B3B99]" />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }



// "use client"
// import { useEffect, useMemo, useRef, useState } from "react"
// import { useParticipant } from "@videosdk.live/react-sdk"
// import ReactPlayer from "react-player"
// import { Mic, MicOff, Video, VideoOff, User } from "lucide-react"

// export default function ParticipantView({ participantId }: { participantId: string }) {
//   // Using HTMLAudioElement for the audio ref
//   const micRef = useRef<HTMLAudioElement>(null)
//   const [videoError, setVideoError] = useState<string | null>(null)
//   const [audioError, setAudioError] = useState<string | null>(null)

//   const {
//     webcamStream,
//     micStream,
//     webcamOn,
//     micOn,
//     isLocal,
//     displayName,
//     enableMic,
//     enableWebcam,
//     disableMic,
//     disableWebcam,
//   } = useParticipant(participantId)

//   // Create a MediaStream for the webcam
//   const videoStream = useMemo(() => {
//     if (webcamOn && webcamStream) {
//       try {
//         const mediaStream = new MediaStream()
//         mediaStream.addTrack(webcamStream.track)
//         return mediaStream
//       } catch (err) {
//         console.error("Error creating video stream:", err)
//         setVideoError("Failed to create video stream")
//         return null
//       }
//     }
//     return null
//   }, [webcamStream, webcamOn])

//   // Handle microphone audio
//   useEffect(() => {
//     if (micRef.current) {
//       try {
//         if (micOn && micStream) {
//           const mediaStream = new MediaStream()
//           mediaStream.addTrack(micStream.track)

//           micRef.current.srcObject = mediaStream
//           micRef.current.play().catch((error) => {
//             console.error("Error playing audio:", error)
//             setAudioError("Failed to play audio")
//           })
//         } else {
//           micRef.current.srcObject = null
//         }
//       } catch (err) {
//         console.error("Error handling mic stream:", err)
//         setAudioError("Failed to process audio stream")
//       }
//     }
//   }, [micStream, micOn])

//   // Force re-enable webcam and mic for local participant if they're off
//   useEffect(() => {
//     if (isLocal) {
//       // Small delay to ensure the SDK is ready
//       const timer = setTimeout(() => {
//         if (!webcamOn) {
//           console.log("Auto-enabling webcam for local participant")
//           enableWebcam()
//         }
//         if (!micOn) {
//           console.log("Auto-enabling mic for local participant")
//           enableMic()
//         }
//       }, 1000)

//       return () => clearTimeout(timer)
//     }
//   }, [isLocal, webcamOn, micOn, enableWebcam, enableMic])

//   return (
//     <div className="flex flex-col h-full">
//       <div className="flex items-center justify-between mb-2">
//         <div className="flex items-center">
//           <span className="text-lg font-semibold text-[#7B3B99] mr-2">
//             {displayName || `User ${participantId.substring(0, 5)}`}
//             {isLocal && " (You)"}
//           </span>
//         </div>
//         <div className="flex items-center space-x-2">
//           {micOn ? <Mic className="h-4 w-4 text-green-600" /> : <MicOff className="h-4 w-4 text-red-600" />}
//           {webcamOn ? <Video className="h-4 w-4 text-green-600" /> : <VideoOff className="h-4 w-4 text-red-600" />}
//         </div>
//       </div>

//       {/* Hidden audio element for the microphone */}
//       <audio ref={micRef} autoPlay playsInline muted={isLocal} />

//       {/* Video display */}
//       <div className="relative flex-1 bg-gray-200 rounded-lg overflow-hidden min-h-[200px]">
//         {webcamOn && videoStream ? (
//           <ReactPlayer
//             playsinline
//             pip={false}
//             light={false}
//             controls={false}
//             muted={true}
//             playing={true}
//             url={videoStream}
//             width="100%"
//             height="100%"
//             style={{ borderRadius: "8px" }}
//             onError={(err) => {
//               console.error("Video player error:", err)
//               setVideoError("Failed to play video")
//             }}
//           />
//         ) : (
//           <div className="flex items-center justify-center h-full">
//             <div className="bg-[#7B3B99]/20 rounded-full p-6">
//               <User className="h-12 w-12 text-[#7B3B99]" />
//             </div>
//           </div>
//         )}

//         {/* Error messages */}
//         {(videoError || audioError) && (
//           <div className="absolute bottom-2 left-2 right-2 bg-red-500 text-white text-xs p-1 rounded">
//             {videoError || audioError}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }






"use client"
import { useEffect, useMemo, useRef, useState } from "react"
import { useParticipant } from "@videosdk.live/react-sdk"
import ReactPlayer from "react-player"
import { Mic, MicOff, Video, VideoOff, User } from "lucide-react"

export default function ParticipantView({ participantId }: { participantId: string }) {
  // Using HTMLAudioElement for the audio ref
  const micRef = useRef<HTMLAudioElement>(null)
  const [videoError, setVideoError] = useState<string | null>(null)
  const [audioError, setAudioError] = useState<string | null>(null)

  const {
    webcamStream,
    micStream,
    webcamOn,
    micOn,
    isLocal,
    displayName,
    enableMic,
    enableWebcam,
    disableMic,
    disableWebcam,
  } = useParticipant(participantId)

  // Create a MediaStream for the webcam
  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      try {
        const mediaStream = new MediaStream()
        mediaStream.addTrack(webcamStream.track)
        return mediaStream
      } catch (err) {
        console.error("Error creating video stream:", err)
        setVideoError("Failed to create video stream")
        return null
      }
    }
    return null
  }, [webcamStream, webcamOn])

  // Handle microphone audio
  useEffect(() => {
    if (micRef.current) {
      try {
        if (micOn && micStream) {
          const mediaStream = new MediaStream()
          mediaStream.addTrack(micStream.track)

          micRef.current.srcObject = mediaStream
          micRef.current.play().catch((error) => {
            console.error("Error playing audio:", error)
            setAudioError("Failed to play audio")
          })
        } else {
          micRef.current.srcObject = null
        }
      } catch (err) {
        console.error("Error handling mic stream:", err)
        setAudioError("Failed to process audio stream")
      }
    }
  }, [micStream, micOn])

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <span className="text-lg font-semibold text-[#7B3B99] mr-2">
            {displayName || `User ${participantId.substring(0, 5)}`}
            {isLocal && " (You)"}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          {micOn ? <Mic className="h-4 w-4 text-green-600" /> : <MicOff className="h-4 w-4 text-red-600" />}
          {webcamOn ? <Video className="h-4 w-4 text-green-600" /> : <VideoOff className="h-4 w-4 text-red-600" />}
        </div>
      </div>

      {/* Hidden audio element for the microphone */}
      <audio ref={micRef} autoPlay playsInline muted={isLocal} />

      {/* Video display */}
      <div className="relative flex-1 bg-gray-200 rounded-lg overflow-hidden min-h-[200px]">
        {webcamOn && videoStream ? (
          <ReactPlayer
            playsinline
            pip={false}
            light={false}
            controls={false}
            muted={true}
            playing={true}
            url={videoStream}
            width="100%"
            height="100%"
            style={{ borderRadius: "8px" }}
            onError={(err) => {
              console.error("Video player error:", err)
              setVideoError("Failed to play video")
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="bg-[#7B3B99]/20 rounded-full p-6">
              <User className="h-12 w-12 text-[#7B3B99]" />
            </div>
          </div>
        )}

        {/* Error messages */}
        {(videoError || audioError) && (
          <div className="absolute bottom-2 left-2 right-2 bg-red-500 text-white text-xs p-1 rounded">
            {videoError || audioError}
          </div>
        )}
      </div>
    </div>
  )
}
