import { db } from "@/lib/db";
import { isClient } from "../checkRole";




export class Case {

    static async create(
        client_id: number,
        lawyer_id: number,
        title: string,
        description: string,
        price: number
    ) {
        const newCase = await db.case.create({
            data: {
                client_id,
                lawyer_id,
                title,
                description,
                price
            }
        })
        return newCase
    }
    

    static async getClientCases(client_id: number) {
        await isClient()
        const cases = await db.case.findMany({
            where: {
                client_id
            }
        })
        return cases
    }
}