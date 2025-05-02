import axios from "axios";


export async function addTrial(data: object) {
    try {
      const response = await axios.post(
        "/api/trial",
        data
      );
      if (response.status < 200 || response.status >= 300) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return response.data; // Return response data if needed
    } catch (err) {
      console.error(err);
      throw err;
    }
  }


export async function getTrials() {
    try {
      const response = await axios.get("/api/trial/lawyer/upcoming");
      if (response.status !== 200) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = response;
  
      return data.data.upcomingTrials;
    } catch (err) {
      console.error(err);
      throw err; // Ensure errors are propagated correctly
    }
  }


  export async function getTrialsForCase(id:number) {
    try {
      const response = await axios.get(`/api/trial/case/${id}`);
      if (response.status !== 200) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = response;
  
      return data.data.trials;
    } catch (err) {
      console.error(err);
      throw err; // Ensure errors are propagated correctly
    }
  }