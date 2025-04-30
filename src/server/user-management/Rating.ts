import { db } from "@/lib/db";
import { isClient } from "../checkRole";


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
}