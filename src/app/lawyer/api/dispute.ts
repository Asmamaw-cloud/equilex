import axios from "axios";

export async function submitDispute(data: object) {
  try {
    const response = await axios.post(
      "/api/dispute",
      data
    );
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Error: ${response.statusText}`);
    }
    console.log(response);
    return response.data; // Return response data if needed
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getDisputes() {
  try {
    const response = await axios.get("/api/dispute");
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

  export async function getLawyerDisputes(id:any) {
    try {
      const response = await axios.get(`/api/dispute/lawyer/${id}`);
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

  export async function acceptDispute(id: number) {
    try {
      const response = await axios.put(
        `/api/dispute/${id}/accept`
      );
      if (response.status < 200 || response.status >= 300) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      console.log(response);
    } catch (err) {
      console.error(err);
      throw err; // Ensure errors are propagated correctly
    }
  }

  export async function resolveDispute(id: number) {
    try {
      const response = await axios.put(
        `/api/dispute/${id}/resolve`
      );
      if (response.status < 200 || response.status >= 300){
        throw new Error(`Error: ${response.statusText}`);
      }
      console.log(response);
    } catch (err) {
      console.error(err);
      throw err; // Ensure errors are propagated correctly
    }
  }