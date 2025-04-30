import axios from "axios";


export async function rate(data:object) {
    try {
        const response = await axios.post("/api/rating", data);
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Error: ${response.statusText}`);
    }
    console.log(response);
    return response.data; // Return response data if needed
    } catch (error) {
        console.error("Error creating rating:", error);
        throw error;        
    }
}

export async function getRatings(id: number) {
    try {
      const response = await axios.get(
        `/api/rating/lawyer/${id}`
      );
      if (response.status !== 200) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = response;
      console.log('this is from lawyer rating',data);
  
      return data.data.ratings;
    } catch (err) {
      console.error(err);
      throw err; // Ensure errors are propagated correctly
    }
  }

  export async function getAverageRating(id: number) {
    try {
      const response = await axios.get(
        `/api/rating/lawyer/${id}/average`
      );
      if (response.status !== 200) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = response;
      console.log('this is from lawyer average rating',data);
  
      return data.data.rating;
    } catch (err) {
      console.error(err);
      throw err; // Ensure errors are propagated correctly
    }
  }