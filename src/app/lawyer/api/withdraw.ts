// import axios from "axios";
// const CHAPA_SECRET = process.env.CHAPA_SECRET_KEY;
// export async function withdraw(data: {
//   full_name: string;
//   account: string;
//   amount: number;
//   bank_code?: string; // not used yet, can extend later
// }) {

//   const { full_name, account, amount, bank_code } = data;

//     try {
//     const res = await axios.post(
//       'https://api.chapa.co/v1/transfer',
//       {
//         account_name: full_name,
//         account_number: account,
//         amount,
//         currency: 'ETB',
//         bank_code,
//         reference: `withdraw-${Date.now()}`,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${CHAPA_SECRET}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );

// } catch (error) {
//     console.error("Withdraw error:", error);
//     throw new Error("Failed to process withdrawal request");
//   }
// }

// export async function getWithdraw() {
//     try {
//         const response = await axios.get("/api/transaction/withdraw/admin");
//         if (response.status != 200) {
//         throw new Error(` ${response.statusText}`);
//         }
//         return response.data; // Return response data if needed
//     } catch (err) {
//         console.error(err);
//         throw err;
//     }
// }

import axios from "axios";

export async function withdraw(data: {
  full_name: string;
  account: string;
  amount: number;
  bank_code: string;
}) {
  const { full_name, account, amount, bank_code } = data;

  try {
    const response = await axios.post(
      "/api/transaction/withdraw",
      { full_name, account, amount, bank_code }, // Axios will handle JSON encoding
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Request failed: ${response.statusText}`);
    }

    return response.data;
  } catch (err) {
    console.error("Withdraw error:", err);
    throw err;
  }
}


export async function getWithdraw() {
  try {
    const response = await axios.get("/api/transaction/withdraw/admin");
    if (response.status !== 200) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = response;
    console.log(data);

    return data.data.withdrawalRequests;
  } catch (err) {
    console.error(err);
    throw err; // Ensure errors are propagated correctly
  }
}
