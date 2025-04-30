import { db } from "@/lib/db";
import { isAuthenticated, isClient } from "../checkRole";


export class Rating {
    static async rateLawyer(
        lawyer_id: number,
        case_id: number,
        rate: number,
        comment: string
    ) {
        const client = await isClient()

        const newRating = await db.rating.create({
            data: {
                //@ts-ignore
                client_id: client.user.image.id,
                lawyer_id,
                case_id,
                rate,
                comment,
            }
        })
        return newRating;
    }

    static async lawyerList(lawyer_id: number) {
        await isAuthenticated();
        const ratings = await db.rating.findMany({
          where: {
            lawyer_id,
          },
          include: {
            client: {
              select: {
                full_name: true,
              },
            },
          },
        });
        return ratings;
      }


      static async lawyerAverage(lawyer_id: number) {
        await isAuthenticated();
        const ratings = await db.rating.aggregate({
          _avg: {
            rate: true,
          },
          where: {
            lawyer_id,
          },
        });
        return ratings._avg.rate;
      }
}