import axios from "axios";

export async function getStatistics() {
    try {
      const response = await axios.get("/api/dashboard/lawyer");
      if (response.status !== 200) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      return response.data.analytics;
    } catch (err) {
      console.error(err);
      throw err; // Ensure errors are propagated correctly
    }
  }