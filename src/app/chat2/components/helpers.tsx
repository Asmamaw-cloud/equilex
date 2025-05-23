import { db } from "@/lib/db";
import { getServerAuthSession } from "@/server/auth";

async function getData(recipient_id: number) {
  const session = await getServerAuthSession();

  const userType = session?.user.image?.type;
  const email = session?.user.email;
  const userId = session?.user.image?.id;

  let data;

  if (userType === "client") {
    data = await db.message.findMany({
      where: {
        clientId: userId,
        lawyerId: recipient_id,
      },
      select: {
        message: true,
        messageType: true,
        fileType: true,
        id: true,
        client: {
          select: {
            full_name: true,
            photo: true,
          },
        },
        lawyerId: true,
        clientId: true,
        sender_email: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  } else {
    data = await db.message.findMany({
      where: {
        clientId: recipient_id,
        lawyerId: userId,
      },
      select: {
        message: true,
        messageType: true,
        fileType: true,
        id: true,
        lawyer: {
          select: {
            full_name: true,
            photo: true,
          },
        },
        client: {
          select: {
            full_name: true,
          },
        },
        lawyerId: true,
        clientId: true,
        sender_email: true,
      },
      orderBy: {
        createdAt: "asc",
      },
      // take: 50,
    });
  }
  return data;
}
export default getData