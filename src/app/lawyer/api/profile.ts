import axios from "axios";


  interface ClientData {
    [key: string]: any;
  }
  
  export async function updateLawyer(data: ClientData) {
    try {
        console.log("the data to update: ", data)
      const response = await axios.put(`/api/lawyers`, data);
  
      if (response.status !== 200) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      console.log(response.data);
  
      return response.data.client;
    } catch (err) {
      console.error(err);
      throw err; // Ensure errors are propagated correctly
    }
  }
  