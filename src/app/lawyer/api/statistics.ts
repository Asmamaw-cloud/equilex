import axios from "axios";

export async function getStatistics() {
    try {
      const response = await axios.get("/api/dashboard/lawyer");
      console.log("response from statistics: ", response)
      if (response.status !== 200) {
        throw new Error(`Error: ${response.statusText}`);
      }
      console.log('from lawyer stat',response);
  
      return response.data.analytics;
    } catch (err) {
      console.error(err);
      throw err; // Ensure errors are propagated correctly
    }
  }