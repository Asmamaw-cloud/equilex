
import { authOptions } from "@/server/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import ChatUserList from "../components/chatUserList"
import ChatForm from "../components/form"
import getData from "../components/helpers"

interface ChatPageProps {
  params: {
    id: string
  }
}

const ChatPage = async ({ params }: ChatPageProps) => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/signin")
  }

  const recipientId = Number.parseInt(params.id)
  const messages = await getData(recipientId)

  // Get recipient details
  let recipientName, recipientPhoto
  try {
    const userType = session?.user?.image?.type

    // This is a simplified approach - you would need to adapt this to your actual data structure
    if (messages.length > 0) {
      if (userType === "lawyer" && messages[0].client) {
        recipientName = messages[0].client.full_name
        recipientPhoto = messages[0].client.photo
      } else if (userType === "client" && messages[0].lawyer) {
        recipientName = messages[0].lawyer.full_name
        recipientPhoto = messages[0].lawyer.photo
      }
    }
  } catch (error) {
    console.error("Error getting recipient details:", error)
  }

  return (
    <div className="h-screen flex flex-row">
      <div className="w-1/4 md:w-[300px] bg-white border-r hidden md:block">
        <ChatUserList />
      </div>
      <div className="flex-1 flex flex-col">
        <ChatForm
          recipient_id={recipientId}
          initialMessages={messages}
          recipientName={recipientName}
          recipientPhoto={recipientPhoto}
        />
      </div>
    </div>
  )
}

export default ChatPage
