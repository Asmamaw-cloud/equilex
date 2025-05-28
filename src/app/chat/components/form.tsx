
"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Paperclip, Send, Smile, Mic, X, Loader2, ImageIcon, FileText, Video, MoreHorizontal } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { FileUploader } from "@/components/file-uploader"
import OfferModal from "@/app/lawyer/offer/offer"
import { postData } from "@/app/chat/action/message-action"
import { pusherClient } from "@/lib/pusher"
import ChatComponent from "./chat"
import ChatHeader from "./chat-header"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Props {
  recipient_id: number
  initialMessages: Message[]
  recipientName?: string
  recipientPhoto?: string
}

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

const ChatForm: React.FC<Props> = ({ recipient_id, initialMessages, recipientName, recipientPhoto }) => {
  const formRef = useRef<HTMLFormElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { data: session } = useSession()
  const [inputMessage, setInputMessage] = useState<string>("")
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [isUploaderOpen, setIsUploaderOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [uploadType, setUploadType] = useState<"image" | "document" | "all">("all")

  const userType = session?.user?.image?.type
  const userEmail = session?.user?.email

  useEffect(() => {
    pusherClient.subscribe("public-chat")

    const handleMessage = (newMessage: Message) => {
      setMessages((prev) => {
        const isDuplicate = prev.some(
          (msg) =>
            msg.message === newMessage.message &&
            msg.messageType === newMessage.messageType &&
            msg.sender_email === newMessage.sender_email,
        )
        return isDuplicate ? prev : [...prev, { ...newMessage, createdAt: new Date() }]
      })
    }

    pusherClient.bind("chat-message", handleMessage)

    return () => {
      pusherClient.unbind("chat-message", handleMessage)
      pusherClient.unsubscribe("public-chat")
    }
  }, [])

  // Focus input when component mounts
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Send typing indicator
  useEffect(() => {
    const sendTypingIndicator = () => {
      if (inputMessage.trim().length > 0) {
        pusherClient.trigger("public-chat", "typing-indicator", {
          user: userEmail,
          isTyping: true,
        })

        // Clear typing indicator after 3 seconds of inactivity
        setTimeout(() => {
          pusherClient.trigger("public-chat", "typing-indicator", {
            user: userEmail,
            isTyping: false,
          })
        }, 3000)
      }
    }

    const debounceTyping = setTimeout(sendTypingIndicator, 500)
    return () => clearTimeout(debounceTyping)
  }, [inputMessage, userEmail])

  const handleFileSend = async (file: any) => {
    try {
      setIsSending(true)
      const mimeType = await detectMimeType(file)
      let fileType = "unknown"

      if (mimeType?.includes("pdf")) fileType = "pdf"
      else if (mimeType?.includes("image")) fileType = "image"

      const url = typeof file === "string" ? file : file?.url

      if (!url) return

      const newMessage: Message = {
        message: url,
        messageType: "file",
        fileType: fileType,
        sender_email: userEmail!,
        createdAt: new Date(),
      }

      // 💬 Instantly add to chat
      setMessages((prev) => [...prev, newMessage])

      // 🔄 Then send to server
      const fileData = {
        recipient_id,
        message: url,
        fileType: fileType,
        messageType: "file",
      }

      await postData(undefined, fileData)
    } catch (error) {
      console.error("Error sending file:", error)
    } finally {
      setIsUploaderOpen(false)
      setIsSending(false)
    }
  }

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!inputMessage.trim() || isSending) return

    try {
      setIsSending(true)
      const newMessage: Message = {
        message: inputMessage,
        messageType: "text",
        sender_email: userEmail!,
        createdAt: new Date(),
      }

      setMessages((prev) => [...prev, newMessage])

      const formData = new FormData()
      formData.append("message", inputMessage)
      formData.append("recipient_id", recipient_id.toString())
      formData.append("messageType", "text")

      setInputMessage("")
      await postData(formData)

      // Focus back on input after sending
      inputRef.current?.focus()
    } catch (error) {
      console.error("Error sending message:", error)
    } finally {
      setIsSending(false)
    }
  }

  const detectMimeType = async (url: string): Promise<string | null> => {
    try {
      const response = await fetch(url, { method: "HEAD" })
      return response.headers.get("Content-Type")
    } catch (error) {
      console.error("Failed to fetch file type:", error)
      return null
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // Voice recording logic would go here
  }

  const handleFileSelect = (type: "image" | "document" | "all") => {
    setUploadType(type)
    setIsUploaderOpen(true)
  }

  // Common emoji sets for legal chat
  const emojis = [
    "👍",
    "👋",
    "👏",
    "🙏",
    "🤝",
    "✅",
    "⏰",
    "📄",
    "📑",
    "⚖️",
    "🗓️",
    "📞",
    "✉️",
    "🔍",
    "💼",
    "🤔",
    "👨‍⚖️",
    "👩‍⚖️",
    "📝",
    "🔒",
  ]

  return (
    <div className="flex flex-col h-screen">
      <ChatHeader recipientId={recipient_id} recipientName={recipientName} recipientPhoto={recipientPhoto} />

      <ChatComponent data={messages} recipientId={recipient_id} />

      {isRecording && (
        <div className="bg-red-50 p-3 border-t border-red-200 flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse mr-2"></div>
            <span className="text-red-600 font-medium">Recording audio...</span>
          </div>
          <Button variant="ghost" size="sm" onClick={toggleRecording} className="text-red-600 hover:bg-red-100">
            <X className="h-4 w-4 mr-1" />
            Cancel
          </Button>
        </div>
      )}

      <form ref={formRef} onSubmit={handleSubmit} className="p-3 border-t bg-white shadow-sm">
        {isUploaderOpen && (
          <div className="mb-3 p-3 bg-gray-50 rounded-lg border">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium">
                {uploadType === "image"
                  ? "Upload Images"
                  : uploadType === "document"
                    ? "Upload Documents"
                    : "Upload Files"}
              </h3>
              <Button variant="ghost" size="sm" onClick={() => setIsUploaderOpen(false)} className="h-6 w-6 p-0">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <FileUploader
              onUploadComplete={(res) => {
                handleFileSend(res[0])
              }}
              maxFiles={5}
              maxSize={4}
              fileTypes={
                uploadType === "image" ? ["image"] : uploadType === "document" ? ["pdf", "doc"] : ["image", "pdf", "doc"]
              }
            />
          </div>
        )}

        <div className="flex items-center gap-2 bg-gray-50 rounded-full px-3 py-1 border">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full text-gray-500 hover:text-teal-600 hover:bg-teal-50"
                disabled={isSending}
              >
                <Paperclip className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem onClick={() => handleFileSelect("image")} className="cursor-pointer">
                <ImageIcon className="mr-2 h-4 w-4" />
                <span>Image</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFileSelect("document")} className="cursor-pointer">
                <FileText className="mr-2 h-4 w-4" />
                <span>Document</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleFileSelect("all")} className="cursor-pointer">
                <Paperclip className="mr-2 h-4 w-4" />
                <span>All File Types</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <input
            ref={inputRef}
            type="text"
            name="message"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow bg-transparent py-2 px-2 outline-none text-gray-800"
            disabled={isSending}
          />

          <div className="flex items-center gap-1">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full text-gray-500 hover:text-teal-600 hover:bg-teal-50"
                  disabled={isSending}
                >
                  <Smile className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-2" align="end">
                <div className="grid grid-cols-5 gap-2">
                  {emojis.map((emoji, index) => (
                    <button
                      key={index}
                      type="button"
                      className="text-xl p-2 hover:bg-gray-100 rounded"
                      onClick={() => setInputMessage((prev) => prev + emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full text-gray-500 hover:text-teal-600 hover:bg-teal-50"
                    onClick={toggleRecording}
                    disabled={isSending}
                  >
                    <Mic className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Voice message</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Button
              type="submit"
              size="icon"
              className={`h-9 w-9 rounded-full ${
                inputMessage.trim()
                  ? "bg-teal-500 hover:bg-teal-600 text-white"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              disabled={!inputMessage.trim() || isSending}
            >
              {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {userType === "lawyer" && (
          <div className="mt-3 flex justify-end">
            <Button
              type="button"
              onClick={handleOpenModal}
              className="bg-teal-500 hover:bg-teal-600 text-white rounded-full text-sm"
              disabled={isSending}
            >
              Create Legal Offer
            </Button>
          </div>
        )}

        {isModalOpen && <OfferModal isOpen={isModalOpen} onClose={handleCloseModal} client_id={recipient_id} />}
      </form>
    </div>
  )
}

export default ChatForm
