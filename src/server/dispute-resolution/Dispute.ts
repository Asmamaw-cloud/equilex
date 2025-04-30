import { db } from "@/lib/db";

export class Dispute {
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
}
