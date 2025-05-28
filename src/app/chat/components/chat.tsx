

"use client"

import { useSession } from "next-auth/react"
import { useEffect, useRef, useState } from "react"
import { pusherClient } from "@/lib/pusher"
import MessageBubble from "./message-bubble"
import { Loader2 } from 'lucide-react'
import { format } from "date-fns"

interface Message {
  id?: string | number
  messageType: string
  fileType?: string
  clientId?: number
  message: string
  lawyerId?: number
  sender_email?: string
  recipientId?: number
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

interface ChatComponentProps {
  data: Message[]
  recipientId?: number
}

const ChatComponent = ({ data, recipientId }: ChatComponentProps) => {
  const [messages, setMessages] = useState<Message[]>(data || [])
  const [loading, setLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messageEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const { data: session } = useSession()

  const userEmail = session?.user?.email
  const userType = session?.user?.image?.type

  // Group messages by date and sender
  const groupMessages = () => {
    const groups: { date: string; messages: Message[][] }[] = []
    let currentDate = ""
    let currentGroup: Message[] = []
    let currentSender = ""

    // Sort messages by createdAt
    const sortedMessages = [...messages].sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
      return dateA - dateB
    })

    sortedMessages.forEach((message, index) => {
      // Use current date for messages without createdAt
      const date = message.createdAt
        ? new Date(message.createdAt).toLocaleDateString()
        : new Date().toLocaleDateString()

      const sender = message.sender_email || ""

      // If date changes, create a new date group
      if (date !== currentDate) {
        if (currentGroup.length > 0) {
          // Add the current sender group to the date group
          if (groups.length === 0) {
            groups.push({ date: currentDate, messages: [currentGroup] })
          } else {
            groups[groups.length - 1].messages.push([...currentGroup])
          }
          currentGroup = []
        }
        currentDate = date
        currentSender = sender
        currentGroup = [message]

        // If this is a new date, create a new date group
        if (index === sortedMessages.length - 1) {
          groups.push({ date, messages: [[...currentGroup]] })
        }
      }
      // If sender changes, create a new sender group
      else if (sender !== currentSender) {
        if (currentGroup.length > 0) {
          if (groups.length === 0) {
            groups.push({ date: currentDate, messages: [currentGroup] })
          } else {
            groups[groups.length - 1].messages.push([...currentGroup])
          }
        }
        currentSender = sender
        currentGroup = [message]

        // If this is the last message, add the current group
        if (index === sortedMessages.length - 1) {
          groups[groups.length - 1].messages.push([...currentGroup])
        }
      }
      // Same sender, add to current group
      else {
        currentGroup.push(message)

        // If this is the last message, add the current group
        if (index === sortedMessages.length - 1) {
          if (groups.length === 0) {
            groups.push({ date: currentDate, messages: [currentGroup] })
          } else {
            groups[groups.length - 1].messages.push([...currentGroup])
          }
        }
      }
    })

    return groups
  }

  const messageGroups = groupMessages()

  useEffect(() => {
    // Scroll to bottom when messages change
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    setLoading(true)

    // Subscribe to Pusher channel
    pusherClient.subscribe("public-chat")

    // Handle incoming messages
    const handleMessage = (newMessage: Message) => {
      setMessages((prev) => {
        // Simple check to avoid duplicates
        const isDuplicate = prev.some(
          (msg) =>
            msg.message === newMessage.message &&
            msg.messageType === newMessage.messageType &&
            msg.sender_email === newMessage.sender_email,
        )

        if (isDuplicate) return prev
        return [...prev, newMessage]
      })

      // Clear typing indicator when a message is received
      setIsTyping(false)
    }

    // Handle typing indicator
    const handleTyping = (data: { user: string; isTyping: boolean }) => {
      if (data.user !== userEmail) {
        setIsTyping(data.isTyping)
      }
    }

    pusherClient.bind("chat-message", handleMessage)
    pusherClient.bind("typing-indicator", handleTyping)
    setLoading(false)

    // Simulate typing indicator for demo purposes
    if (recipientId) {
      const typingInterval = setInterval(() => {
        const shouldType = Math.random() > 0.7
        if (shouldType) {
          setIsTyping(true)
          setTimeout(() => setIsTyping(false), 3000)
        }
      }, 10000)

      return () => {
        clearInterval(typingInterval)
        pusherClient.unbind("chat-message", handleMessage)
        pusherClient.unbind("typing-indicator", handleTyping)
        pusherClient.unsubscribe("public-chat")
      }
    }

    return () => {
      pusherClient.unbind("chat-message", handleMessage)
      pusherClient.unbind("typing-indicator", handleTyping)
      pusherClient.unsubscribe("public-chat")
    }
  }, [recipientId, userEmail])

  // Load more messages when scrolling to top
  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop } = chatContainerRef.current

      if (scrollTop === 0) {
        // Load more messages logic would go here
        // For now, just show loading indicator
        setLoading(true)
        setTimeout(() => setLoading(false), 1000)
      }
    }
  }

  const formatDateHeader = (dateStr: string) => {
    const messageDate = new Date(dateStr)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (messageDate.toDateString() === today.toDateString()) {
      return "Today"
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return format(messageDate, "MMMM d, yyyy")
    }
  }

  return (
    <div
      ref={chatContainerRef}
      className="flex-grow h-[calc(100vh-180px)] overflow-y-auto py-6 px-4 bg-gray-50"
      onScroll={handleScroll}
    >
      {loading && (
        <div className="flex justify-center my-4">
          <Loader2 className="h-6 w-6 animate-spin text-teal-500" />
        </div>
      )}

      <div className="flex flex-col space-y-6 max-w-3xl mx-auto">
        {messageGroups.map((dateGroup, dateIndex) => (
          <div key={`date-${dateIndex}`} className="space-y-4">
            <div className="flex justify-center">
              <div className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                {formatDateHeader(dateGroup.date)}
              </div>
            </div>

            {dateGroup.messages.map((senderGroup, groupIndex) => (
              <div key={`group-${dateIndex}-${groupIndex}`} className="space-y-1">
                {senderGroup.map((message, messageIndex) => (
                  <MessageBubble
                    key={message.id || `${dateIndex}-${groupIndex}-${messageIndex}`}
                    message={message}
                    isCurrentUser={message.sender_email === userEmail}
                    userType={userType}
                    showAvatar={messageIndex === senderGroup.length - 1}
                    isLastInGroup={messageIndex === senderGroup.length - 1}
                  />
                ))}
              </div>
            ))}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start gap-2 mb-4">
            <div className="relative">
              <div className="flex p-1 bg-[#7B3B99] items-center justify-center h-10 w-10 rounded-full border-2 border-white shadow-sm">
                <span className="text-lg text-white font-semibold capitalize">
                  {userType === "lawyer" ? "C" : "L"}
                </span>
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
            <div className="px-4 py-3 rounded-2xl rounded-tl-none bg-white text-gray-800 shadow-md border border-gray-100 flex items-center">
              <div className="flex space-x-1">
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div ref={messageEndRef} />
    </div>
  )
}

export default ChatComponent
