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
// Add this to your existing `admin/api/clients.ts`
export async function deleteClient(id: string) {
  try {
    const response = await axios.delete(`/api/clients?id=${id}`);
    if (response.status !== 200) {
      throw new Error(`Error deleting client: ${response.statusText}`);
    }
    return response.data;
  } catch (error) {
    console.error("Delete failed:", error);
    throw error;
  }
}
