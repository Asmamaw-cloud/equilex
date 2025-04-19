"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import Pusher from "pusher-js"

interface Message {
  id: number
  messageType: string
  fileType?: string
  clientId: number
  message: string
  lawyerId: number
  sender_email: string
  createdAt?: Date
  lawyer?: {
    photo: string
    full_name: string
  }
  client?: {
    full_name: string
    photo?: string
  }
}

interface PaginatedMessages {
  messages: Message[]
  hasMore: boolean
}

export function useChatMessages(initialData: PaginatedMessages) {
  const [messages, setMessages] = useState<Message[]>(initialData.messages)
  const [hasMore, setHasMore] = useState(initialData.hasMore)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const recipientIdRef = useRef<number | null>(null)

  // Update state when initialData changes (e.g., when switching chats)
  useEffect(() => {
    setMessages(initialData.messages)
    setHasMore(initialData.hasMore)
    setError(null)
  }, [initialData])

  // Function to load older messages
  const loadOlderMessages = useCallback(
    async (recipientId: number) => {
      if (!hasMore || isLoadingMore) return

      try {
        setIsLoadingMore(true)
        recipientIdRef.current = recipientId

        // Get the oldest message ID as cursor
        const oldestMessageId = messages.length > 0 ? messages[0].id : undefined

        const response = await fetch(`/api/messages?recipient_id=${recipientId}&cursor=${oldestMessageId}`)

        if (!response.ok) {
          throw new Error("Failed to load older messages")
        }

        const data = (await response.json()) as PaginatedMessages

        // Only update if we're still on the same chat
        if (recipientIdRef.current === recipientId) {
          setMessages((prev) => [...data.messages, ...prev])
          setHasMore(data.hasMore)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setIsLoadingMore(false)
      }
    },
    [hasMore, isLoadingMore, messages],
  )

  // Set up Pusher for real-time updates
  useEffect(() => {
    // Initialize Pusher
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    })

    // Subscribe to the chat channel
    const channel = pusher.subscribe("chat")

    // Listen for new messages
    channel.bind("message", (data: { message: string }) => {
      try {
        const newMessage = JSON.parse(data.message) as Message
        setMessages((prevMessages) => [...prevMessages, newMessage])
      } catch (error) {
        console.error("Error parsing message:", error)
      }
    })

    // Cleanup on unmount
    return () => {
      channel.unbind_all()
      channel.unsubscribe()
      pusher.disconnect()
    }
  }, [])

  return {
    messages,
    hasMore,
    isLoadingMore,
    error,
    loadOlderMessages,
  }
}
