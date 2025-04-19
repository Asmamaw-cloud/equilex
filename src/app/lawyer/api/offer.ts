import { postData } from "@/app/chat/components/action";
import axios from "axios";


export async function createOffer(data:object) {
    try {
        const response = await axios.post("/api/case", data)

        if (response.status <200 || response.status >= 300) {
            throw new Error("Failed to create offer")
            
        }
        const newCase = response.data.newCase

        const offerData = {
            recipient_id: newCase.client_id,
            message:newCase.id + "",
            messageType: "offer",
        }
        postData(undefined, offerData)
        return response.data
    } catch (error) {
        console.error("Error creating offer:", error)
        throw error
        
    }
}