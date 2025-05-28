
"use client"

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { useState } from "react"
import { Search, MessageSquare, Clock, Filter, User, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

interface ChatUser {
  otherUser: {
    id: number
    full_name: string
    photo: string
    status?: "online" | "offline" | "away"
    lastActive?: string
  }
  message: string
  timestamp: string
  unreadCount?: number
}

const ChatUserList = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { data: session } = useSession()
  const [searchQuery, setSearchQuery] = useState("")

  const { data: chat, isLoading } = useQuery({
    queryKey: ["chat-list"],
    queryFn: async () => {
      const res = await axios.get("/api/chat/get-chat-list")
      return res.data.chatList
    },
  })

  const chatList: ChatUser[] = chat || []
  const currentUserId = pathname.split("/").pop()

  // Filter chat list based on search query
  const filteredChatList = chatList.filter((chat) =>
    chat.otherUser.full_name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const renderUserItem = (chat: ChatUser) => {
    const isActive = currentUserId === chat.otherUser.id.toString()

    return (
      <div
        key={chat.otherUser.id}
        className={`flex p-3 border-b gap-3 cursor-pointer transition-colors ${
          isActive ? "bg-teal-50 border-l-4 border-l-teal-500" : "hover:bg-gray-50"
        }`}
        onClick={() => {
          router.push(`/chat/${chat.otherUser.id}`)
        }}
      >
        <div className="relative">
          {chat.otherUser.photo ? (
            <Image
              src={chat.otherUser.photo || "/placeholder.svg?height=48&width=48"}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full object-cover shadow-sm"
              alt={`${chat.otherUser.full_name}'s profile picture`}
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-[#7B3B99] flex items-center justify-center text-white font-semibold text-lg">
              {chat.otherUser.full_name?.charAt(0) || "?"}
            </div>
          )}

          {chat.otherUser.status === "online" && (
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-gray-900 truncate">{chat.otherUser.full_name || "Unknown User"}</h3>
            <span className="text-xs text-gray-500 whitespace-nowrap">{chat.timestamp || "Recent"}</span>
          </div>

          <p className="text-sm text-gray-500 truncate">{chat.message}</p>

          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-gray-400">
              {chat.otherUser.status === "online"
                ? "Online"
                : chat.otherUser.lastActive
                  ? `Last active ${chat.otherUser.lastActive}`
                  : ""}
            </span>

            {chat.unreadCount && chat.unreadCount > 0 && (
              <Badge variant="default" className="bg-teal-500 hover:bg-teal-600">
                {chat.unreadCount}
              </Badge>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full pl-9 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="px-3 pt-2">
          <TabsList className="w-full bg-gray-100">
            <TabsTrigger value="all" className="flex-1 data-[state=active]:bg-white">
              <Users className="h-4 w-4 mr-1" />
              All
            </TabsTrigger>
            <TabsTrigger value="unread" className="flex-1 data-[state=active]:bg-white">
              <MessageSquare className="h-4 w-4 mr-1" />
              Unread
            </TabsTrigger>
            <TabsTrigger value="recent" className="flex-1 data-[state=active]:bg-white">
              <Clock className="h-4 w-4 mr-1" />
              Recent
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-0">
          <div className="flex justify-between items-center px-3 py-2">
            <h2 className="text-sm font-medium text-gray-700">Conversations</h2>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Filter className="h-4 w-4 text-gray-500" />
            </Button>
          </div>

          <div className="overflow-y-auto" style={{ height: "calc(100vh - 220px)" }}>
            {isLoading ? (
              // Loading skeletons
              Array(5)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex p-3 border-b gap-3">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-3/4 mb-2" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))
            ) : filteredChatList.length > 0 ? (
              filteredChatList.map(renderUserItem)
            ) : (
              <div className="flex flex-col items-center justify-center p-6 text-center h-40">
                <User className="h-10 w-10 text-gray-300 mb-2" />
                <h3 className="text-gray-500 font-medium">No conversations found</h3>
                <p className="text-gray-400 text-sm mt-1">
                  {searchQuery ? "Try a different search term" : "Start a new conversation"}
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="unread" className="mt-0">
          <div className="flex flex-col items-center justify-center p-6 text-center h-40">
            <MessageSquare className="h-10 w-10 text-gray-300 mb-2" />
            <h3 className="text-gray-500 font-medium">No unread messages</h3>
            <p className="text-gray-400 text-sm mt-1">You're all caught up!</p>
          </div>
        </TabsContent>

        <TabsContent value="recent" className="mt-0">
          <div className="overflow-y-auto" style={{ height: "calc(100vh - 220px)" }}>
            {isLoading
              ? // Loading skeletons
                Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="flex p-3 border-b gap-3">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="flex-1">
                        <Skeleton className="h-4 w-3/4 mb-2" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    </div>
                  ))
              : filteredChatList
                  .slice(0, 5) // Show only the 5 most recent conversations
                  .map(renderUserItem)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ChatUserList
