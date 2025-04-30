import axios from "axios";


export async function geClientDisputes(id:any) {
    try {
      const response = await axios.get(`/api/dispute/client/${id}`);
      if (response.status !== 200) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = response;
      console.log(data);
  
      return data.data.disputes;
    } catch (err) {
      console.error(err);
      throw err; // Ensure errors are propagated correctly
    }
  }