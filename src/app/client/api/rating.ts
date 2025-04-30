import axios from "axios";


export async function rate(data:object) {
    try {
        const response = await axios.post("/api/rating", data);
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Error: ${response.statusText}`);
    }
    console.log(response);
    return response.data; // Return response data if needed
    } catch (error) {
        console.error("Error creating rating:", error);
        throw error;        
    }
}