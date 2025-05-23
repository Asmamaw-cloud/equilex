// "use client"

// import { Download, X, Loader2 } from "lucide-react"
// import { useState } from "react"
// import useDownloader from "react-use-downloader"
// import { Button } from "@/components/ui/button"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// interface FileDownloaderProps {
//   fileUrl: string
//   fileName?: string
// }

// const FileDownloader = ({ fileUrl, fileName }: FileDownloaderProps) => {
//   const [isHovered, setIsHovered] = useState(false)
//   const { download, isInProgress, percentage, cancel, error } = useDownloader()

//   // Extract filename from URL if not provided
//   const extractedFileName = fileName || fileUrl.split("/").pop() || "download"

//   const handleDownload = () => {
//     download(fileUrl, extractedFileName)
//   }

//   return (
//     <div className="flex items-center" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
//       {isInProgress ? (
//         <div className="flex items-center space-x-2">
//           <Loader2 className="h-4 w-4 animate-spin text-teal-500" />
//           <span className="text-xs text-gray-500">{percentage}%</span>
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={() => cancel()}
//             className="h-7 w-7 p-0 rounded-full text-red-500 hover:bg-red-50"
//           >
//             <X className="h-4 w-4" />
//           </Button>
//         </div>
//       ) : (
//         <TooltipProvider>
//           <Tooltip>
//             <TooltipTrigger asChild>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={handleDownload}
//                 className="h-7 w-7 p-0 rounded-full text-teal-500 hover:bg-teal-50"
//               >
//                 <Download className="h-4 w-4" />
//               </Button>
//             </TooltipTrigger>
//             <TooltipContent>Download file</TooltipContent>
//           </Tooltip>
//         </TooltipProvider>
//       )}

//       {error && <p className="text-xs text-red-500 ml-2">Download failed. Try again.</p>}
//     </div>
//   )
// }

// export default FileDownloader






"use client"

import { Download, X, Loader2 } from "lucide-react"
import { useState } from "react"
import useDownloader from "react-use-downloader"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface FileDownloaderProps {
  fileUrl: string
  fileName?: string
  light?: boolean
  className?: string
}

const FileDownloader = ({ fileUrl, fileName, light = false, className = "" }: FileDownloaderProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const { download, isInProgress, percentage, cancel, error } = useDownloader()

  // Extract filename from URL if not provided
  const extractedFileName = fileName || fileUrl.split("/").pop() || "download"

  const handleDownload = () => {
    download(fileUrl, extractedFileName)
  }

  return (
    <div
      className={`flex items-center ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isInProgress ? (
        <div className="flex items-center space-x-2">
          <Loader2 className={`h-4 w-4 animate-spin ${light ? "text-white" : "text-teal-500"}`} />
          <span className={`text-xs ${light ? "text-white" : "text-gray-500"}`}>{percentage}%</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => cancel()}
            className={`h-7 w-7 p-0 rounded-full ${
              light ? "text-white hover:bg-white/20" : "text-red-500 hover:bg-red-50"
            }`}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDownload}
                className={`h-7 w-7 p-0 rounded-full ${
                  light ? "text-white hover:bg-white/20" : "text-teal-500 hover:bg-teal-50 hover:text-teal-600"
                }`}
              >
                <Download className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Download file</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {error && (
        <p className={`text-xs ${light ? "text-red-200" : "text-red-500"} ml-2`}>Download failed. Try again.</p>
      )}
    </div>
  )
}

export default FileDownloader
