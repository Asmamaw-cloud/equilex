import axios from "axios";






export async function pay(withdrawRequestId: number) {
  if (!withdrawRequestId) {
    throw new Error("Invalid withdraw request ID");
  }

  const payload = { withdrawRequestId }; 

  try {
    const response = await axios.post(
      "/api/transaction/withdraw/admin/pay",
      JSON.stringify(payload),
      {
        headers: {
          "Content-Type": "application/json", 
        },
      }
    );

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Error: ${response.statusText}`);
    }

    console.log(response);
    return response.data; // Return response data if needed
  } catch (err) {
    console.error(err);
    throw err; // Ensure errors are propagated correctly
  }
}
