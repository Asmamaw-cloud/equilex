import { db } from "@/lib/db";
import { isAdmin } from "../checkRole";


export class Admin {

    static async caseCount() {
        await isAdmin();
        const totalCases = await db.case.count({});
        const completedCases = await db.case.count({
          where: {
            status: "FINISHED",
          },
        });
    
        const inProgressCases = await db.case.count({
          where: {
            status: "ACCEPTED",
          },
        });
        return { totalCases, completedCases, inProgressCases };
      }

    static async lawyerCount() {
        await isAdmin()
        const verifiedLawyerCount = await db.lawyer.count({
            where: {
                isVerified: "VERIFIED",
            }
        })

        const rejectedLawyers = await db.lawyer.count({
            where: {
                isVerified: "REJECTED"
            }
        })

        const pendingLawyers = await db.lawyer.count({
            where: {
                isVerified: "PENDING"
            }
        })
        return  verifiedLawyerCount 
    }

    static async clientCount() {
        await isAdmin()
        const clientCount = await db.client.count();
        return clientCount
    }
}