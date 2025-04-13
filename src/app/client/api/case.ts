import axios from "axios";



export async function getClientCases(id:number) {
    try {
        const response = await axios.get(`/api/case/client/${id}`)

        if(response.status !== 200) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return response.data.cases
    } catch (err) {
        console.error(err);
        throw err; // Ensure errors are propagated correctly
      }
}