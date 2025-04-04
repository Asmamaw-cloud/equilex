import axios from "axios";

export async function getNewLawyers() {
  try {
    const response = await axios.get("/api/lawyers");
    if (response.status !== 200) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = response;
    console.log("Lawyers data: ",data);

    return data.data;
  } catch (err) {
    console.error(err);
    throw err; // Ensure errors are propagated correctly
  }
}



export async function getLawyerById(id: any) {
  
  try {

    const response = await axios.get(`/api/lawyers/${id}`)
    if (response.status < 200 || response.status >= 300) 
      throw new Error(`Error: ${response.statusText}`);

      const data = response;
    console.log(data);

    return data.data.user;
  } catch (err) {
    console.error(err);
    throw err; // Ensure errors are propagated correctly
  }

}