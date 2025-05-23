// import Image from "next/image"
// import { format } from "date-fns"
// import DocViewer, { DocViewerRenderers } from "react-doc-viewer"
// import FileDownloader from "./fileDownloader"
// import OfferDisplay from "@/app/lawyer/offer/offerDisplay"

// interface MessageBubbleProps {
//   message: {
//     id?: string | number
//     message: string
//     messageType: string
//     fileType?: string
//     sender_email?: string
//     createdAt?: Date
//     lawyer?: {
//       photo: string
//       full_name?: string
//     }
//     client?: {
//       full_name?: string
//       photo?: string
//     }
//   }
//   isCurrentUser: boolean
//   userType?: string
//   showAvatar?: boolean
// }

// export default function MessageBubble({ message, isCurrentUser, userType, showAvatar = true }: MessageBubbleProps) {
//   console.log("MessageBubble", message)
//   const timestamp = message.createdAt ? format(new Date(message.createdAt), "h:mm a") : format(new Date(), "h:mm a")

//   const renderAvatar = () => {
//     if (!showAvatar) return null

//     if (isCurrentUser) {
//       return userType === "lawyer" ? (
//         <Image
//           src={message.lawyer?.photo || "L" }
//           alt="P"
//           className="w-10 h-10 object-cover rounded-full"
//           width={40}
//           height={40}
//         />
//       ) : (
//         <div className="flex p-1 bg-[#7B3B99] items-center justify-center h-10 w-10 rounded-full">
//           <span className="text-lg text-white font-semibold capitalize">
//             {message.client?.full_name?.slice(0, 1) || "C"}
//           </span>
//         </div>
//       )
//     } else {
//       return userType === "lawyer" ? (
//         <div className="flex p-1 bg-[#7B3B99] items-center justify-center h-10 w-10 rounded-full">
//           <span className="text-lg text-white font-semibold capitalize">
//             {message.client?.full_name?.slice(0, 1) || "C"}
//           </span>
//         </div>
//       ) : (
//         <Image
//           src={message.lawyer?.photo || "/placeholder.svg?height=40&width=40"}
//           alt="C"
//           className="w-10 h-10 object-cover rounded-full"
//           width={40}
//           height={40}
//         />
//       )
//     }
//   }

//   const renderMessageContent = () => {
//     if (message.messageType === "text") {
//       return (
//         <div
//           className={`px-4 py-3 rounded-2xl max-w-xs sm:max-w-md break-words ${
//             isCurrentUser
//               ? "bg-teal-500 text-white rounded-tr-none"
//               : "bg-white text-gray-800 rounded-tl-none shadow-sm"
//           }`}
//         >
//           <p>{message.message}</p>
//           <div className={`text-xs mt-1 ${isCurrentUser ? "text-teal-100" : "text-gray-500"}`}>{timestamp}</div>
//         </div>
//       )
//     } else if (message.messageType === "offer") {
//       return (
//         <div className="max-w-xs sm:max-w-md">
//           <OfferDisplay caseId={Number(message.message)} userType={userType} />
//           <div className={`text-xs mt-1 ${isCurrentUser ? "text-teal-600" : "text-gray-500"} text-right`}>
//             {timestamp}
//           </div>
//         </div>
//       )
//     } else if (message.messageType === "file") {
//       return (
//         <div className="max-w-xs sm:max-w-md">
//           <div
//             className={`p-2 rounded-2xl ${
//               isCurrentUser ? "bg-teal-50 border border-teal-200" : "bg-white border border-gray-200 shadow-sm"
//             }`}
//           >
//             <DocViewer
//               documents={[{ uri: message.message }]}
//               pluginRenderers={DocViewerRenderers}
//               style={{ width: "100%", height: "200px" }}
//               config={{ header: { disableHeader: true } }}
//               className="rounded-lg overflow-hidden"
//             />
//             <div className="flex justify-between items-center mt-2">
//               <span className={`text-xs ${isCurrentUser ? "text-teal-600" : "text-gray-500"}`}>
//                 {message.fileType === "pdf" ? "PDF Document" : message.fileType === "image" ? "Image" : "File"}
//               </span>
//               <FileDownloader fileUrl={message.message} />
//             </div>
//           </div>
//           <div className={`text-xs mt-1 ${isCurrentUser ? "text-teal-600" : "text-gray-500"} text-right`}>
//             {timestamp}
//           </div>
//         </div>
//       )
//     }

//     return null
//   }

//   return (
//     <div className={`flex items-end gap-2 mb-4 ${isCurrentUser ? "flex-row-reverse" : "flex-row"}`}>
//       {renderAvatar()}
//       {renderMessageContent()}
//     </div>
//   )
// }







import Image from "next/image"
import { format } from "date-fns"
import DocViewer, { DocViewerRenderers } from "react-doc-viewer"
import FileDownloader from "./fileDownloader"
import OfferDisplay from "@/app/lawyer/offer/offerDisplay"
import { FileText, ImageIcon, Paperclip } from 'lucide-react'
import { useState } from "react"

interface MessageBubbleProps {
  message: {
    id?: string | number
    message: string
    messageType: string
    fileType?: string
    sender_email?: string
    createdAt?: Date
    lawyer?: {
      photo: string
      full_name?: string
    }
    client?: {
      full_name?: string
      photo?: string
    }
  }
  isCurrentUser: boolean
  userType?: string
  showAvatar?: boolean
  isLastInGroup?: boolean
}

export default function MessageBubble({
  message,
  isCurrentUser,
  userType,
  showAvatar = true,
  isLastInGroup = true,
}: MessageBubbleProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const timestamp = message.createdAt ? format(new Date(message.createdAt), "h:mm a") : format(new Date(), "h:mm a")

  const renderAvatar = () => {
    if (!showAvatar) {
      return <div className="w-10 opacity-0" />
    }

    if (isCurrentUser) {
      return userType === "lawyer" ? (
        <div className="relative">
          <div className="flex p-1 bg-[#7B3B99] items-center justify-center h-10 w-10 rounded-full border-2 border-white shadow-sm">
            <span className="text-lg text-white font-semibold capitalize">
              {message.lawyer?.full_name?.slice(0, 1) || "L"}
            </span>
          </div>
          {/* <Image
            src={message.lawyer?.photo || "/placeholder.svg?height=40&width=40"}
            alt="Your profile"
            className="w-10 h-10 object-cover rounded-full border-2 border-white shadow-sm"
            width={40}
            height={40}
          /> */}
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
        </div>
      ) : (
        <div className="relative">
          <div className="flex p-1 bg-[#7B3B99] items-center justify-center h-10 w-10 rounded-full border-2 border-white shadow-sm">
            <span className="text-lg text-white font-semibold capitalize">
              {message.client?.full_name?.slice(0, 1) || "C"}
            </span>
          </div>
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
        </div>
      )
    } else {
      return userType === "lawyer" ? (
        <div className="relative">
          <div className="flex p-1 bg-[#7B3B99] items-center justify-center h-10 w-10 rounded-full border-2 border-white shadow-sm">
            <span className="text-lg text-white font-semibold capitalize">
              {message.client?.full_name?.slice(0, 1) || "C"}
            </span>
          </div>
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
        </div>
      ) : (
        <div className="relative">
                    <div className="flex p-1 bg-[#7B3B99] items-center justify-center h-10 w-10 rounded-full border-2 border-white shadow-sm">
            <span className="text-lg text-white font-semibold capitalize">
              {message.lawyer?.full_name?.slice(0, 1) || "L"}
            </span>
          </div>
          {/* <Image
            src={message.lawyer?.photo || "/placeholder.svg?height=40&width=40"}
            alt="profile"
            className="w-10 h-10 object-cover rounded-full border-2 border-white shadow-sm"
            width={40}
            height={40}
          /> */}
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
        </div>
      )
    }
  }

  const renderMessageContent = () => {
    if (message.messageType === "text") {
      return (
        <div
          className={`px-4 py-3 rounded-2xl max-w-xs sm:max-w-md break-words ${
            isCurrentUser
              ? "bg-teal-500 text-white rounded-tr-none shadow-md"
              : "bg-white text-gray-800 rounded-tl-none shadow-md border border-gray-100"
          }`}
        >
          <p>{message.message}</p>
          <div className={`text-xs mt-1 ${isCurrentUser ? "text-teal-100" : "text-gray-500"}`}>{timestamp}</div>
        </div>
      )
    } else if (message.messageType === "offer") {
      return (
        <div className={`max-w-xs sm:max-w-md ${isCurrentUser ? "ml-auto" : ""}`}>
          <div className="mb-1 flex items-center">
            <div
              className={`text-xs ${
                isCurrentUser ? "ml-auto mr-2 text-gray-500" : "ml-2 text-gray-500"
              } flex items-center`}
            >
              <FileText className="h-3 w-3 mr-1" />
              Legal Offer
            </div>
          </div>
          <OfferDisplay caseId={Number(message.message)} userType={userType} />
          <div className={`text-xs mt-1 ${isCurrentUser ? "text-right text-gray-500" : "text-gray-500"}`}>
            {timestamp}
          </div>
        </div>
      )
    } else if (message.messageType === "file") {
      if (message.fileType === "image") {
        return (
          <div className="max-w-xs sm:max-w-md">
            <div
              className={`p-1 rounded-2xl overflow-hidden ${
                isCurrentUser
                  ? "bg-teal-500 rounded-tr-none shadow-md"
                  : "bg-white rounded-tl-none shadow-md border border-gray-100"
              }`}
            >
              <div className="relative">
                <div
                  className={`absolute inset-0 flex items-center justify-center ${
                    imageLoaded ? "hidden" : "block"
                  } bg-gray-100`}
                >
                  <ImageIcon className="h-8 w-8 text-gray-400 animate-pulse" />
                </div>
                <Image
                  src={message.message || "/placeholder.svg"}
                  alt="Shared image"
                  width={300}
                  height={200}
                  className={`rounded-xl max-h-[300px] w-auto object-contain ${imageLoaded ? "block" : "opacity-0"}`}
                  onLoad={() => setImageLoaded(true)}
                />
              </div>
              <div
                className={`flex justify-between items-center px-3 py-2 ${
                  isCurrentUser ? "text-white" : "text-gray-700"
                }`}
              >
                <span className="text-xs flex items-center">
                  <ImageIcon className="h-3 w-3 mr-1" />
                  Image
                </span>
                <FileDownloader fileUrl={message.message} light={isCurrentUser} />
              </div>
            </div>
            <div className={`text-xs mt-1 ${isCurrentUser ? "text-right text-gray-500" : "text-gray-500"}`}>
              {timestamp}
            </div>
          </div>
        )
      } else if (message.fileType === "pdf") {
        return (
          <div className="max-w-xs sm:max-w-md">
            <div
              className={`p-2 rounded-2xl ${
                isCurrentUser
                  ? "bg-teal-50 border border-teal-200 rounded-tr-none shadow-md"
                  : "bg-white rounded-tl-none shadow-md border border-gray-100"
              }`}
            >
              <div className="bg-gray-50 rounded-xl overflow-hidden">
                <DocViewer
                  documents={[{ uri: message.message }]}
                  pluginRenderers={DocViewerRenderers}
                  style={{ width: "100%", height: "200px" }}
                  config={{ header: { disableHeader: true } }}
                  className="rounded-lg overflow-hidden"
                />
              </div>
              <div className="flex justify-between items-center mt-2 px-2">
                <span className={`text-xs flex items-center ${isCurrentUser ? "text-teal-600" : "text-gray-600"}`}>
                  <FileText className="h-3 w-3 mr-1" />
                  PDF Document
                </span>
                <FileDownloader fileUrl={message.message} />
              </div>
            </div>
            <div className={`text-xs mt-1 ${isCurrentUser ? "text-right text-gray-500" : "text-gray-500"}`}>
              {timestamp}
            </div>
          </div>
        )
      } else {
        return (
          <div className="max-w-xs sm:max-w-md">
            <div
              className={`p-3 rounded-2xl ${
                isCurrentUser
                  ? "bg-teal-50 border border-teal-200 rounded-tr-none shadow-md"
                  : "bg-white rounded-tl-none shadow-md border border-gray-100"
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isCurrentUser ? "bg-teal-100" : "bg-gray-100"
                  }`}
                >
                  <Paperclip className={`h-5 w-5 ${isCurrentUser ? "text-teal-600" : "text-gray-600"}`} />
                </div>
                <div className="ml-3">
                  <div className={`text-sm font-medium ${isCurrentUser ? "text-teal-700" : "text-gray-700"}`}>
                    Attachment
                  </div>
                  <div className={`text-xs ${isCurrentUser ? "text-teal-600" : "text-gray-600"}`}>
                    {message.message.split("/").pop() || "File"}
                  </div>
                </div>
                <FileDownloader fileUrl={message.message} className="ml-auto" />
              </div>
            </div>
            <div className={`text-xs mt-1 ${isCurrentUser ? "text-right text-gray-500" : "text-gray-500"}`}>
              {timestamp}
            </div>
          </div>
        )
      }
    }

    return null
  }

  return (
    <div
      className={`flex items-end gap-2 ${isLastInGroup ? "mb-4" : "mb-1"} ${
        isCurrentUser ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {renderAvatar()}
      {renderMessageContent()}
    </div>
  )
}
