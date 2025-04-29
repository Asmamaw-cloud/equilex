import axios from "axios";

export async function getCaseData() {
  try {
    const response = await axios.get("/api/dashboard/admin/cases");
    if (response.status !== 200) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = response;
    console.log('from dashboard ',data);

    return data.data.analytics;
  } catch (err) {
    console.error(err);
    throw err; // Ensure errors are propagated correctly
  }
}

export async function getClientData() {
  try {
    const response = await axios.get("/api/dashboard/admin/clients");
    if (response.status !== 200) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = response;
    console.log("from dashboard client", data);

    return data.data.analytics;
  } catch (error) {
    console.error(error);
    throw error; // Ensure errors are propagated correctly
  }
}

export async function getLawyerData() {
    try {
        const response = await axios.get("api/dashboard/admin/lawyers")
        if (response.status !== 200) {
            throw new Error(`Error: ${response.statusText}`);
          }
          console.log("from dashboard client", response);
      
          return response.data.analytics;
        } catch (error) {
          console.error(error);
          throw error; // Ensure errors are propagated correctly
        }
}
