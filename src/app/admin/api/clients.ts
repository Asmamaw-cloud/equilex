// admin/api/clients.ts
import axios from "axios";

export async function getClients() {
  try {
    const response = await axios.get("/api/clients");
    if (response.status !== 200) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return response.data;
  } catch (error) {
    console.error("Failed to fetch clients:", error);
    throw error;
  }
}

export async function deleteClient(id: string) {
  try {
    const response = await axios.delete("/api/clients", {
      data: { id },
    });
    if (response.status !== 200) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return response.data;
  } catch (error) {
    console.error("Failed to delete client:", error);
    throw error;
  }
}