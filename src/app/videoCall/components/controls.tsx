"use client"
import { useState } from "react"
import { useMeeting } from "@videosdk.live/react-sdk"
import { Video, VideoOff, Mic, MicOff, Phone, ScreenShare } from "lucide-react"

interface ControlsProps {
  onLeave?: () => void
}

export default function Controls({ onLeave }: ControlsProps) {
  const { leave, toggleMic, toggleWebcam, toggleScreenShare } = useMeeting()
  const [micOn, setMic] = useState(true)
  const [camOn, setCam] = useState(true)
  const [screenShareOn, setScreenShare] = useState(false)

  const handleMicToggle = () => {
    setMic(!micOn)
    toggleMic()
  }

  const handleCamToggle = () => {
    setCam(!camOn)
    toggleWebcam()
  }

  const handleScreenShareToggle = () => {
    setScreenShare(!screenShareOn)
    toggleScreenShare()
  }

  const handleLeave = () => {
    leave()
    if (onLeave) onLeave()
  }

  return (
    <div className="flex justify-center py-4">
      <div className="flex items-center gap-4 bg-gray-100 rounded-full px-6 py-3 shadow-md">
        <button
          onClick={handleMicToggle}
          className={`rounded-full p-3 ${micOn ? "bg-gray-200 hover:bg-gray-300" : "bg-red-500 text-white hover:bg-red-600"}`}
          title={micOn ? "Mute microphone" : "Unmute microphone"}
        >
          {micOn ? <Mic size={24} /> : <MicOff size={24} />}
        </button>

        <button
          onClick={handleCamToggle}
          className={`rounded-full p-3 ${camOn ? "bg-gray-200 hover:bg-gray-300" : "bg-red-500 text-white hover:bg-red-600"}`}
          title={camOn ? "Turn off camera" : "Turn on camera"}
        >
          {camOn ? <Video size={24} /> : <VideoOff size={24} />}
        </button>

        <button
          onClick={handleScreenShareToggle}
          className={`rounded-full p-3 ${screenShareOn ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-200 hover:bg-gray-300"}`}
          title={screenShareOn ? "Stop sharing screen" : "Share screen"}
        >
          <ScreenShare size={24} />
        </button>

        <button
          onClick={handleLeave}
          className="bg-red-600 text-white rounded-full p-3 hover:bg-red-700"
          title="Leave meeting"
        >
          <Phone size={24} />
        </button>
      </div>
    </div>
  )
}



// "use client"
// import { useState, useEffect } from "react"
// import { useMeeting } from "@videosdk.live/react-sdk"
// import { Video, VideoOff, Mic, MicOff, Phone, ScreenShare } from "lucide-react"
// import DeviceSettings from "./device-settings"

// interface ControlsProps {
//   onLeave?: () => void
// }

// export default function Controls({ onLeave }: ControlsProps) {
//   const { leave, toggleMic, toggleWebcam, toggleScreenShare, changeWebcam, changeMic } = useMeeting()
//   const [micOn, setMic] = useState(true)
//   const [camOn, setCam] = useState(true)
//   const [screenShareOn, setScreenShare] = useState(false)

//   // Check initial state from the meeting
//   const meeting = useMeeting()

//   useEffect(() => {
//     setMic(meeting.mic)
//     setCam(meeting.webcam)
//   }, [meeting.mic, meeting.webcam])

//   const handleMicToggle = () => {
//     toggleMic()
//     setMic(!micOn)
//   }

//   const handleCamToggle = () => {
//     toggleWebcam()
//     setCam(!camOn)
//   }

//   const handleScreenShareToggle = () => {
//     toggleScreenShare()
//     setScreenShare(!screenShareOn)
//   }

//   const handleLeave = () => {
//     leave()
//     if (onLeave) onLeave()
//   }

//   const handleDeviceChange = (deviceType: "videoinput" | "audioinput", deviceId: string) => {
//     if (deviceType === "videoinput") {
//       changeWebcam(deviceId)
//     } else if (deviceType === "audioinput") {
//       changeMic(deviceId)
//     }
//   }

//   return (
//     <div className="flex justify-center py-4">
//       <div className="flex items-center gap-4 bg-gray-100 rounded-full px-6 py-3 shadow-md">
//         <button
//           onClick={handleMicToggle}
//           className={`rounded-full p-3 ${micOn ? "bg-gray-200 hover:bg-gray-300" : "bg-red-500 text-white hover:bg-red-600"}`}
//           title={micOn ? "Mute microphone" : "Unmute microphone"}
//         >
//           {micOn ? <Mic size={24} /> : <MicOff size={24} />}
//         </button>

//         <button
//           onClick={handleCamToggle}
//           className={`rounded-full p-3 ${camOn ? "bg-gray-200 hover:bg-gray-300" : "bg-red-500 text-white hover:bg-red-600"}`}
//           title={camOn ? "Turn off camera" : "Turn on camera"}
//         >
//           {camOn ? <Video size={24} /> : <VideoOff size={24} />}
//         </button>

//         <button
//           onClick={handleScreenShareToggle}
//           className={`rounded-full p-3 ${screenShareOn ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-200 hover:bg-gray-300"}`}
//           title={screenShareOn ? "Stop sharing screen" : "Share screen"}
//         >
//           <ScreenShare size={24} />
//         </button>

//         <DeviceSettings onDeviceChange={handleDeviceChange} />

//         <button
//           onClick={handleLeave}
//           className="bg-red-600 text-white rounded-full p-3 hover:bg-red-700"
//           title="Leave meeting"
//         >
//           <Phone size={24} />
//         </button>
//       </div>
//     </div>
//   )
// }
