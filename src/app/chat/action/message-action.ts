"use server";

import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { getServerAuthSession } from "@/server/auth";
import { revalidatePath } from "next/cache";

export async function postData(formData?: FormData, fileData?: any) {
  try {
    const session = await getServerAuthSession();
    if (!session || !session.user) {
      throw new Error("Unauthorized");
    }

    //@ts-ignore
    const userId = session.user.image?.id;
    //@ts-ignore
    const userType = session.user.image?.type;
    const userEmail = session.user.email;

    if (!userId) {
      throw new Error("Invalid user session");
    }

    let message = "";
    let recipientId = "";
    let messageType = "";
    let fileType = "";

    // Extract message + recipient info depending on data source
    if (formData) {
      message = formData.get("message") as string;
      recipientId = formData.get("recipient_id") as string;
      messageType = formData.get("messageType") as string;

      if (!message || message.trim() === "") {
        return { success: false, error: "Message cannot be empty" };
      }
    } else if (fileData) {
      message = fileData.message;
      recipientId = fileData.recipient_id;
      messageType = fileData.messageType;
      fileType = fileData.fileType;

      if (!message) {
        return { success: false, error: "File message cannot be empty" };
      }
    } else {
      return { success: false, error: "No message data provided" };
    }

    // Find client and lawyer IDs based on user type
    let clientId: number | null = null;
    let lawyerId: number | null = null;

    if (userType === "client" && userEmail) {
      const client = await db.client.findUnique({
        where: { email: userEmail },
      });
      if (!client) throw new Error("Client not found");
      clientId = client.id;
    } else if (userType === "lawyer" && userEmail) {
      const lawyer = await db.lawyer.findUnique({
        where: { email: userEmail },
      });
      if (!lawyer) throw new Error("Lawyer not found");
      lawyerId = lawyer.id;
    }

    // Store message in database
    const savedMessage = await db.message.create({
      data: {
        message,
        //@ts-ignore
        lawyerId,
        //@ts-ignore
        clientId,
        reciver_email: "lla@gmail.com", // this should probably be dynamic later
        sender_email: userEmail!,
        messageType,
        fileType,
      },
      include: {
        client: { select: { full_name: true, photo: true } },
        lawyer: { select: { full_name: true, photo: true } },
      },
    });

    console.log("Message stored in database:", savedMessage);

    // Send message via Pusher (use different channels if needed)
    const channel = messageType === "text" ? "public-chat" : "private-chat";
    await pusherServer.trigger(channel, "chat-message", {
      message,
      recipientId: Number(recipientId),
      messageType,
      fileType,
      sender_email: userEmail,
    });

    return { success: true, data: savedMessage };
  } catch (error) {
    console.error("Error in postData:", error);
    return { success: false, error: "Failed to send message" };
  } finally {
    revalidatePath("/chat");
  }
}
