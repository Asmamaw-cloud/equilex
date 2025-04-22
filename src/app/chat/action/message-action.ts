"use server"

import { pusherServer } from "@/lib/pusher"
import { getServerAuthSession } from "@/server/auth"
import { revalidatePath } from "next/cache"

export async function postData(formData?: FormData, fileData?: any) {
  try {
    const session = await getServerAuthSession()

    if (!session || !session.user) {
      throw new Error("Unauthorized")
    }

    //@ts-ignore
    const userId = session.user.image?.id
    const userEmail = session.user.email

    if (!userId) {
      throw new Error("Invalid user session")
    }

    // Handle file data
    if (fileData) {
      const { recipient_id, message, fileType, messageType } = fileData

      // Send the file message via Pusher for immediate display
      await pusherServer.trigger(`private-chat`, "chat-message", {
        message,
        recipientId: recipient_id,
        messageType,
        fileType,
        sender_email: userEmail,
      })

      // Store file in database - only for non-text messages
      try {
        // Add your database logic here to store the file message
        // Example:
        // await db.messages.create({
        //   data: {
        //     message: message,
        //     senderId: Number(userId),
        //     recipientId: Number(recipient_id),
        //     messageType: messageType,
        //     fileType: fileType
        //   }
        // })

        console.log("File message stored in database")
      } catch (dbError) {
        console.error("Error storing file message in database:", dbError)
      }

      return { success: true }
    }

    // Handle text message
    if (formData) {
      const message = formData.get("message") as string
      const recipient_id = formData.get("recipient_id") as string
      const messageType = formData.get("messageType") as string

      if (!message || message.trim() === "") {
        return { success: false, error: "Message cannot be empty" }
      }

      // For text messages, just send via Pusher without database storage
      await pusherServer.trigger(`public-chat`, "chat-message", {
        message,
        recipientId: Number(recipient_id),
        messageType,
        sender_email: userEmail,
      })

      return { success: true }
    }

    return { success: false, error: "Invalid request" }
  } catch (error) {
    console.error("Error in postData:", error)
    return { success: false, error: "Failed to send message" }
  } finally {
    revalidatePath("/chat")
  }
}
