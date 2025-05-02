import axios from "axios";

export async function getClientById(id: number) {
  try {
    const response = await axios.get(`/api/clients/${id}`);
    if (response.status !== 200) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = response;

    return data.data.client;
  } catch (err) {
    console.error(err);
    throw err; // Ensure errors are propagated correctly
  }
}

interface ClientData {
  [key: string]: any;
}

export async function updateClient(data: ClientData) {
  try {
    const response = await axios.put(`/api/clients`, data);
    if (response.status !== 200) {
      throw new Error(`Error: ${response.statusText}`);
    }


    return response.data.client;
  } catch (err) {
    console.log("Error while updating the client data")

    console.error(err);
    throw err; // Ensure errors are propagated correctly
  }
}
