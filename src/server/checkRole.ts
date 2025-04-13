import { getServerSession } from "next-auth";
import { authOptions } from "./auth";




export async function isAdmin() {
    let session = await getServerSession(authOptions)
    if (!session) {
        throw new Error("You're not authenticated!");
    }
    //@ts-ignore
    if (session.user.image.type !== "admin") {
        throw new Error("You're not authorized!");
    }
}

export async function isClient() {
    let session = await getServerSession(authOptions)
    if (!session) {
        throw new Error("You're not authenticated!");
    }
    //@ts-ignore
    if (session.user.image.type !== "client") {
        throw new Error("You're not authorized!");
    }
    return session
}