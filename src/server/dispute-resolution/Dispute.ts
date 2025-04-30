import { db } from "@/lib/db";
import { isLawyer } from "../checkRole";

export class Dispute {

  static async create(
    client_id: number,
    lawyer_id: number,
    creator_email: string,
    content: string
  ) {
    const newDispute = await db.dispute.create({
      data: {
        client_id,
        lawyer_id,
        creator_email,
        content,
      },
    });
    return newDispute;
  }

  static async getForClient(clientId: number) {
    const disputes = await db.dispute.findMany({
      where: {
        client_id: clientId,
      },
      include: {
        lawyer: {
          select: {
            email: true,
            full_name: true,
            phone_number: true,
          },
        },
      },
    });
    return disputes;
  }

  static async getForLawyer(lawyer_id: number) {
    await isLawyer();
    const disputes = await db.dispute.findMany({
      where: {
        lawyer_id,
      },
      include: {
        client: {
          select: {
            full_name: true,
            email: true,
            phone_number: true,
          },
        },
      },
    });
    return disputes;
  }
}
