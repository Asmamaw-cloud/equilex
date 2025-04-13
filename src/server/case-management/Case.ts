import { db } from "@/lib/db";
import { isClient } from "../checkRole";




export class Case {

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