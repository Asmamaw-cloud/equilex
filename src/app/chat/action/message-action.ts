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
    const userType = session?.user.image?.type;
    const userEmail = session?.user?.email;

    let message;
    let recipentId;
    let messageType;
    let fileType;

    if (!userId) {
      throw new Error("Invalid user session");
    }

    // Handle file data
    if (fileData) {
      const { recipient_id, message, fileType, messageType } = fileData;

      // Send the file message via Pusher for immediate display
      await pusherServer.trigger(`private-chat`, "chat-message", {
        message,
        recipientId: recipient_id,
        messageType,
        fileType,
        sender_email: userEmail,
      });

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

        

        console.log("File message stored in database");
      } catch (dbError) {
        console.error("Error storing file message in database:", dbError);
      }

      return { success: true };
    }

    // Check if the user exists based on the userType
    let user = null;
    let clientId = "";
    let lawyerId = "";

    // Handle text message
    if (formData) {
      const message = formData.get("message") as string;
      const recipient_id = formData.get("recipient_id") ;
      const messageType = formData.get("messageType") ;

      if (!message || message.trim() === "") {
        return { success: false, error: "Message cannot be empty" };
      }

      // For text messages, just send via Pusher without database storage
      await pusherServer.trigger(`public-chat`, "chat-message", {
        message,
        recipientId: Number(recipient_id),
        messageType,
        sender_email: userEmail,
      });

      const data = await db.message.create({
            data: {
              message,
              //@ts-ignore
              lawyerId,
                //@ts-ignore
              clientId,
              reciver_email: "lla@gmail.com",
              sender_email: userEmail!,
              //@ts-ignore
      
              messageType,
              //@ts-ignore
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
          });

          console.log("Message stored in database:", data);

      return { success: true };
    }

    

    if (userType === "client" && userEmail) {
      user = await db.client.findUnique({
        where: {
          email: userEmail,
        },
      });
      //@ts-ignore
      lawyerId = user?.id;
      //@ts-ignore
      clientId = recipentId;
    } else if (userType === "lawyer" && userEmail) {
      user = await db.lawyer.findUnique({
        where: {
          email: userEmail,
        },
      });
      //@ts-ignore
      lawyerId = user?.id;
      //@ts-ignore
      clientId = recipentId;
    }

    if (!user) {
      throw new Error("User not found");
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

    console.log("Message stored in database:", data);

    return data
    // return { success: false, error: "Invalid request" };
  } catch (error) {
    console.error("Error in postData:", error);
    return { success: false, error: "Failed to send message" };
  } finally {
    revalidatePath("/chat");
  }


}
