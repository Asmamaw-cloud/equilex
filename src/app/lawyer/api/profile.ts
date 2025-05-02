import axios from "axios";


  interface ClientData {
    [key: string]: any;
  }
  
  export async function updateLawyer(data: ClientData) {
    try {
      const response = await axios.put(`/api/lawyers`, data);
  
      if (response.status !== 200) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
  
      return response.data.client;
    } catch (err) {
      console.error(err);
      throw err; // Ensure errors are propagated correctly
    }
  }
  