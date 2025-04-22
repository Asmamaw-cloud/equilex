"use server"

import { db } from "@/lib/db"
import { getServerAuthSession } from "@/server/auth"
import PusherServer from "pusher"
import Pusher from "pusher-js"
import { use } from "react"

interface FileData {
  message: string
  recipient_id: number
  messageType: string
  fileType?: string
}

export async function postData(formData?: FormData, fileData?: FileData) {
  const session = await getServerAuthSession()

  if (!session || !session.user) {
    throw new Error("Unauthorized")
  }

  //@ts-ignore
  const userType = session.user.image?.type
  const email = session.user.email
  //@ts-ignore
  const userId = session.user.image?.id

  if (!email || !userType || !userId) {
    throw new Error("Invalid user session")
  }

  let message: string
  let recipientId: number
  let messageType: string
  let fileType: string | undefined

  if (formData) {
    message = formData.get("message") as string
    recipientId = Number(formData.get("recipient_id"))
    messageType = formData.get("messageType") as string
  } else if (fileData) {
    message = fileData.message
    recipientId = fileData.recipient_id
    messageType = fileData.messageType
    fileType = fileData.fileType
  } else {
    throw new Error("No data provided")
  }

  // Check if the user exists based on the userType
  let clientId: number
  let lawyerId: number

  if (userType === "client") {
    clientId = Number(userId)
    lawyerId = recipientId
  } else if (userType === "lawyer") {
    clientId = recipientId
    lawyerId = Number(userId)
  } else {
    throw new Error("Invalid user type")
  }

  // Get recipient email
  let recipientEmail = ""
  if (userType === "client") {
    const lawyer = await db.lawyer.findUnique({
      where: { id: lawyerId },
      select: { email: true },
    })
    recipientEmail = lawyer?.email || ""
  } else {
    const client = await db.client.findUnique({
      where: { id: clientId },
      select: { email: true },
    })
    recipientEmail = client?.email || ""
  }

  const data = await db.message.create({
    data: {
      message,
      lawyerId,
      clientId,
      reciver_email: recipientEmail,
      sender_email: email,
      messageType,
      fileType,
    },
    include: {
      client: {
        select: {
          full_name: true,
          photo: true,
        },
      },
      lawyer: {
        select: {
          full_name: true,
          photo: true,
        },
      },
    },
  })

  // Initialize Pusher with the correct environment variables
  const pusherServer = new PusherServer({
    appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID!,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    useTLS: true,
  })

  // await pusher.trigger("chat", "message", {
  //   message: JSON.stringify(data),
  // })

  const pusherClient = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_ID!, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  },
)


  return data
}
