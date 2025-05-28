



"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Phone, Video, MoreHorizontal, ArrowLeft, Clock, Shield } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface ChatHeaderProps {
  recipientId: number
  recipientName?: string
  recipientPhoto?: string
  onlineStatus?: "online" | "offline" | "away"
  lastSeen?: string
}

export default function ChatHeader({
  recipientId,
  recipientName = "Contact",
recipientPhoto = "https://placehold.co/50x50?text=User&font=roboto",
  onlineStatus = "online",
  lastSeen = "Last seen recently",
}: ChatHeaderProps) {
  const router = useRouter()
  const { data: session } = useSession()
  const [name, setName] = useState(recipientName)
  const [photo, setPhoto] = useState(recipientPhoto)
  const userType = session?.user?.image?.type

  console.log("photo", photo)

  // Fetch recipient details if not provided
  useEffect(() => {
    const fetchRecipientDetails = async () => {
      try {
        const response = await fetch(`/api/users/${recipientId}`)
        if (response.ok) {
          const data = await response.json()
          if (data.user) {
            setName(data.user.full_name || recipientName)
            setPhoto(data.user.photo || recipientPhoto)
          }
        }
      } catch (error) {
        console.error("Failed to fetch recipient details:", error)
      }
    }

    if (recipientId && (!recipientName || recipientName === "Contact")) {
      fetchRecipientDetails()
    }
  }, [recipientId, recipientName, recipientPhoto])

  return (
    <div className="flex items-center justify-between p-3 border-b bg-white shadow-sm">
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => router.push("/chat")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>

        {userType === "lawyer" ? (
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="flex p-1 bg-[#7B3B99] items-center justify-center h-12 w-12 rounded-full border-2 border-white shadow-sm">
                <span className="text-xl text-white font-semibold capitalize">{name?.slice(0, 1) || "C"}</span>
              </div>
              <span
                className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white ${
                  onlineStatus === "online" ? "bg-green-500" : onlineStatus === "away" ? "bg-yellow-500" : "bg-gray-400"
                }`}
              ></span>
            </div>
            <div>
              <div className="flex items-center">
                <h2 className="font-semibold text-lg">{name}</h2>
                <Badge variant="outline" className="ml-2 bg-teal-50 text-teal-700 border-teal-200">
                  Client
                </Badge>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                {onlineStatus === "online" ? (
                  <span className="flex items-center">
                    <span className="h-2 w-2 rounded-full mr-2 bg-green-500"></span>
                    Online
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {lastSeen}
                  </span>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Image
                src={photo || "/placeholder.svg?height=48&width=48"}
                alt={""}
                width={48}
                height={48}
                className="rounded-full object-cover h-12 w-12 border-2 border-white shadow-sm"
              />
              <span
                className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white ${
                  onlineStatus === "online" ? "bg-green-500" : onlineStatus === "away" ? "bg-yellow-500" : "bg-gray-400"
                }`}
              ></span>
            </div>
            <div>
              <div className="flex items-center">
                <h2 className="font-semibold text-lg">{name}</h2>
                <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 border-blue-200">
                  Lawyer
                </Badge>
                <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200 flex items-center">
                  <Shield className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                {onlineStatus === "online" ? (
                  <span className="flex items-center">
                    <span className="h-2 w-2 rounded-full mr-2 bg-green-500"></span>
                    Online
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {lastSeen}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-1">
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-full h-9 w-9"
        >
          <Phone className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-full h-9 w-9"
        >
          <Video className="h-5 w-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-full h-9 w-9"
            >
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="cursor-pointer">View profile</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Search in conversation</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Mute notifications</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 cursor-pointer">Block contact</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
