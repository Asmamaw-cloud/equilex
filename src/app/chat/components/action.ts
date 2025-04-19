"use server";
import { db } from "@/lib/db";
import { getServerAuthSession } from "@/server/auth";
import Pusher from "pusher";

export async function postData(formData?: FormData, fileData?: any) {
  "use server";

  const session = await getServerAuthSession();
  //@ts-ignore
  const userType = session?.user.image.type;

  let message, recipientId, messageType, fileType;

  console.log("Pusher Key (server):", process.env.PUSHER_SECRET_KEY);
  console.log("Pusher Secret (server):", process.env.PUSHER_SECRET);
  console.log("Form data: ", formData);
  console.log("File data: ", fileData);


  if (formData) {
    message = formData.get("message");
    recipientId = Number(formData.get("recipient_id"));
    messageType = formData.get("messageType");
  } else {
    message = fileData.message;
    recipientId = Number(fileData.recipient_id);
    messageType = fileData.messageType;
    fileType = fileData.fileType;
  }

  const email = session?.user?.email;

  // Check if the user exists based on the userType
  let user = null;
  let clientId = "";
  let lawyerId = "";

  if (userType === "client" && email) {
    user = await db.client.findUnique({
      where: { email },
    });
    //@ts-ignore
    clientId = user?.id;
    //@ts-ignore
    lawyerId = recipientId;
  } else if (userType === "lawyer" && email) {
    user = await db.lawyer.findUnique({
      where: { email },
    });
    //@ts-ignore
    clientId = recipientId;
    //@ts-ignore
    lawyerId = user?.id;
  }

  if (!user) {
    throw new Error("User not found");
  }

  const data = await db.message.create({
    data: {
      message,
      //@ts-ignore
      lawyerId,
      //@ts-ignore
      clientId,
      //@ts-ignore
      reciver_email: "lla@gmail.com",
      //@ts-ignore
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
  });

  const pusher = new Pusher({
    appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID!,
    key: process.env.PUSHER_KEY!,
    secret: process.env.NEXT_PUBLIC_PUSHER_SECRET!,
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    useTLS: true,
  });

  await pusher.trigger("chat", "message", {
    message: `${JSON.stringify(data)}\n\n`,
  });
}
