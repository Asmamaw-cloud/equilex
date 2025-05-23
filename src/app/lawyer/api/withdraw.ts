import axios from "axios";

export async function withdraw(amount: number) {
  try {
    const response = await axios.post(
      "/api/transaction/withdraw",
      JSON.stringify({ amount: amount })
    );
    if (response.status < 200 || response.status >= 300) {
      throw new Error(` ${response.statusText}`);
    }
    console.log(response);
    return response.data; // Return response data if needed
  } catch (err) {
    console.error(err);
    throw err;
  }
}
