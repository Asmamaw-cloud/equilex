"use server";

import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { getServerAuthSession } from "@/server/auth";
import { revalidatePath } from "next/cache";

export async function postData(formData?: FormData, fileData?: any) {
  try {
    const session = await getServerAuthSession();
    if (!session || !session.user) throw new Error("Unauthorized");

    const userEmail = session.user.email;
    const userId = session.user.image?.id;
    const userType = session.user.image?.type;

    if (!userId || !userType || !userEmail)
      throw new Error("Invalid user session");

    let clientId: number | null = null;
    let lawyerId: number | null = null;
    let recipientEmail = "";

    // Fetch user info based on role
    if (userType === "client") {
      const client = await db.client.findUnique({
        where: { email: userEmail },
      });
      if (!client) throw new Error("Client not found");
      clientId = client.id;

      const recipientId =
        formData?.get("recipient_id") ?? fileData?.recipient_id;
      if (recipientId) {
        const lawyer = await db.lawyer.findUnique({
          where: { id: Number(recipientId) },
          select: { email: true },
        });
        recipientEmail = lawyer?.email || "";
        lawyerId = Number(recipientId);
      }
    } else if (userType === "lawyer") {
      const lawyer = await db.lawyer.findUnique({
        where: { email: userEmail },
      });
      if (!lawyer) throw new Error("Lawyer not found");
      lawyerId = lawyer.id;

      const recipientId =
        formData?.get("recipient_id") ?? fileData?.recipient_id;
      if (recipientId) {
        const client = await db.client.findUnique({
          where: { id: Number(recipientId) },
          select: { email: true },
        });
        recipientEmail = client?.email || "";
        clientId = Number(recipientId);
      }
    }

    // Handle file messages
    if (fileData) {
      console.log("File data received:", fileData);
      const { recipient_id, message, fileType, messageType } = fileData;

      await pusherServer.trigger("private-chat", "chat-message", {
        message,
        recipientId: recipient_id,
        messageType,
        fileType,
        sender_email: userEmail,
      });

      // Store message
      await db.message.create({
        data: {
          message,
          lawyerId,
          clientId,
          reciver_email: recipientEmail,
          sender_email: userEmail,
          messageType,
          fileType,
        },
      });

      return { success: true };
    }

    // Handle text messages
    if (formData) {
      const message = formData.get("message") as string;
      const recipientId = formData.get("recipient_id");
      const messageType = formData.get("messageType") as string;

      if (!message || message.trim() === "")
        return { success: false, error: "Message cannot be empty" };

      await pusherServer.trigger("public-chat", "chat-message", {
        message,
        recipientId: Number(recipientId),
        messageType,
        sender_email: userEmail,
      });

      const data = await db.message.create({
        data: {
          message,
          lawyerId,
          clientId,
          reciver_email: recipientEmail,
          sender_email: userEmail,
          messageType,
        },
        include: {
          client: { select: { full_name: true, photo: true } },
          lawyer: { select: { full_name: true, photo: true } },
        },
      });

      return { success: true };
    }

    return { success: false, error: "No message provided" };
  } catch (error) {
    console.error("Error in postData:", error);
    return { success: false, error: "Failed to send message" };
  } finally {
    revalidatePath("/chat");
  }
}
