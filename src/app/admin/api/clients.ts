import axios from "axios";


export async function getClients() {
    try {
        const response = await axios.get("/api/clients")
        if(response.status !== 200) {
            throw new Error(`Error: ${response.statusText}`)
        }
        console.log('clinets', response)

        return response.data;
    }catch(error) {
        console.error(error);
        throw error; // Ensure errors are propagated correctly
      }
    }
