import axios from "axios";


export async function getClients() {
    try {
        const response = await axios.get("/api/clients")
        if(response.status !== 200) {
            throw new Error(`Error: ${response.statusText}`)
        }

        return response.data;
    }catch(error) {
        console.error(error);
        throw error; // Ensure errors are propagated correctly
      }
    }
export async function deleteClient(id: string) {
  const response = await axios.delete(`/api/clients?id=${id}`);
  if (response.status !== 200) {
    throw new Error("Failed to delete client");
  }
  return response.data;
}