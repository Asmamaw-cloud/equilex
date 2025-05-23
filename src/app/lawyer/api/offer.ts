import { postData } from "@/app/chat/components/action";
import axios from "axios";
import { toast } from "sonner";


export async function createOffer(data:object) {
    try {

      console.log("data from create offer: ", data)

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

export async function deliver(id: number) {
    try {
      const response = await axios.post(`/api/case/${id}/deliver`);
      if (response.status < 200 || response.status >= 300) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return response.data; // Return response data if needed
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  export async function acceptDelivery(id: number) {
    try {
      const response = await axios.post(`/api/case/${id}/accept-delivery`);
      if (response.status < 200 || response.status >= 300) {
        throw new Error(`Error: ${response.statusText}`);
      }
      console.log("Delivery accepted sucessfully")
      return response.data; // Return response data if needed
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

export async function getCasesById(id:number) {
    try {
        const response = await axios.get(`/api/case/${id}`)
        if (response.status !== 200) {
            throw new Error(`Error: ${response.statusText}`);
          }
          return response.data.caseById;
    } catch (error) {
        console.error("Error fetching case by ID:", error)
        throw error
        
    }
}

export async function getLawyerCaeses(id: number) {
    try {
      const response = await axios.get(`/api/case/lawyer/${id}`);
      if (response.status !== 200) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = response;
  
      return data.data.cases;
    } catch (err) {
      console.error(err);
      throw err; // Ensure errors are propagated correctly
    }
  }


export async function acceptOffer(id:number) {
    try {
        const response = await axios.post(`/api/case/${id}/accept`)
        if (response.status < 200 || response.status >= 300) {
            throw new Error(`Error: ${response.statusText}`);
          }
          return response.data; // Return response data if needed
    } catch (error) {
        console.error("Error accepting offer:", error)
        throw error
        
    }
}

export async function rejectOffer(id:number) {
    try {
        const response = await axios.post(`/api/case/${id}/reject`)
        if (response.status < 200 || response.status >= 300) {
            throw new Error(`Error: ${response.statusText}`);
          }
          return response.data; // Return response data if needed
    } catch (error) {
        console.error("Error rejecting offer:", error)
        throw error
        
    }
}