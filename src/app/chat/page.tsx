import { authOptions } from "@/server/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import ChatUserList from "./components/chatUserList"
import { MessageSquare } from "lucide-react"

const ChatHomepage = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/signin")
  }

  return (
    <div className="h-screen flex flex-row">
      <div className="w-full md:w-[350px] bg-white border-r">
        <div className="p-4 border-b">
          <h1 className="text-xl font-semibold text-gray-800">Messages</h1>
          <p className="text-sm text-gray-500">
            {session.user?.image?.type === "lawyer" ? "Chat with your clients" : "Chat with your legal advisors"}
          </p>
        </div>
        <ChatUserList />
      </div>

      <div className="hidden md:flex flex-col justify-center items-center w-[calc(100%-350px)] bg-gray-50">
        <div className="text-center p-6 max-w-md">
          <div className="mx-auto w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mb-4">
            <MessageSquare className="h-8 w-8 text-teal-500" />
          </div>
          <h1 className="font-bold text-2xl text-gray-800 mb-2">Select a conversation</h1>
          <p className="text-gray-500">
            Choose a contact from the list to start chatting or continue a previous conversation.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ChatHomepage
