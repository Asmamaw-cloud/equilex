// "use client";

// import {
//   useMutation,
//   UseMutationResult,
//   useQuery,
//   useQueryClient,
// } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { toast } from "sonner";
// import { withdraw } from "../api/withdraw";
// import axios from "axios";

// const banks = [
//   { name: "CBE", bank_code: "CBE001" },
//   { name: "Telebirr", bank_code: "TELEBIRR" },
//   { name: "M-Pesa", bank_code: "MPESA" },
// ];

// const Withdraw = () => {
//   const queryClient = useQueryClient();
//   const router = useRouter();
//   const [message, setMessage] = useState<string>("");
//   const [amount, setAmount] = useState<number>(0);

//   const [fullName, setFullName] = useState("");
//   const [account, setAccount] = useState("");
//   const [bankCode, setBankCode] = useState(banks[0].bank_code);

//   const {data, isLoading, error} = useQuery({
//     queryKey: ["banks"],
//     queryFn: async () => {
//       try {
//         const response = await axios.get("/api/chapa/banks");
//         return response.data;
//       } catch (error) {
//         console.error("Error fetching banks:", error);
//         throw error;
//       }
//     },
//   })


//   const withdrawMutationFn = async (data: object) => {
//     return withdraw(data);
//   };

//   const withdawMutation: UseMutationResult<void, unknown, object> = useMutation(
//     {
//       mutationFn: withdrawMutationFn,
//       onSuccess: () => {
//         queryClient.invalidateQueries({ queryKey: ["cases"] });
//         toast("Withdraw submitted successfully!");
//       },
//       onError: (e: any) => {
//         console.log(e?.response?.data?.error);

//         toast.error(`${e?.response?.data?.error}`);
//       },
//     }
//   );

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setAmount(Number(e.target.value));
//   };
//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     if (isNaN(amount) || amount <= 0) {
//       setMessage("Please enter a valid amount.");
//       return;
//     }

//     try {
//       const userInput = {
//         full_name: fullName,
//         account,
//         bank_code: bankCode,
//         amount,
//       };
//       console.log("userInput: ", userInput);

//       await withdawMutation.mutateAsync(userInput);
//       setMessage("Transfer request submitted.");
//       // setMessage("Transfer successful: " + res.data?.message || "Success");
//     } catch (err: any) {
//       console.error(err);
//       setMessage("Transfer failed: " + err.response?.data?.error || "Error");
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-200 min-h-screen relative overflow-hidden">
//       <div className="bg-white h-[100vh] w-[80%] rounded-xl m-auto p-10 relative flex flex-col gap-8">
//         <div
//           onClick={() => router.back()}
//           className="w-20 text-center bg-[#7B3B99] text-white font-bold py-2 px-4 rounded transition duration-300 hover:bg-purple-700 inline-block mb-2 md:mb-0 cursor-pointer"
//         >
//           Back
//         </div>

//         <div className=" bg-white p-4 rounded w-1/3">
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <input
//                 className="border w-full p-2"
//                 placeholder="Full Name"
//                 value={fullName}
//                 onChange={(e) => setFullName(e.target.value)}
//               />

//               <input
//                 className="border w-full p-2"
//                 placeholder="Phone Number or Bank Account"
//                 value={account}
//                 onChange={(e) => setAccount(e.target.value)}
//               />

//               <select
//                 className="border w-full p-2"
//                 value={bankCode}
//                 onChange={(e) => setBankCode(e.target.value)}
//               >
//                 {banks.map((bank) => (
//                   <option key={bank.bank_code} value={bank.bank_code}>
//                     {bank.name}
//                   </option>
//                 ))}
//               </select>

//               <input
//                 className="border w-full p-2"
//                 placeholder="Amount"
//                 type="number"
//                 value={amount}
//                 onChange={(e) => setAmount(Number(e.target.value))}
//               />

//               {/* <button
//         className="bg-blue-600 text-white px-4 py-2 rounded"
//         onClick={handleWithdraw}
//       >
//         Withdraw
//       </button> */}

//               {message && <p className="text-sm text-gray-700">{message}</p>}
//               {/* <label className="block text-gray-700">Amount</label>
//               <input
//                 type="number"
//                 name="amount"
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//                 required
//               /> */}
//             </div>
//             <div className="flex justify-end">
//               <button
//                 onClick={handleSubmit}
//                 className=" w-22 text-center bg-[#7B3B99] text-white font-bold py-2 px-4 rounded transition duration-300 hover:bg-purple-700 inline-block mb-2 md:mb-0 cursor-pointer"
//               >
//                 Withdraw
//               </button>
//             </div>
//           </form>
//           {message && <p>{message}</p>}
//         </div>

//         <hr />
//       </div>
//       {/* <ToastContainer /> */}
//     </div>
//   );
// };

// export default Withdraw;






// "use client";

// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { toast } from "sonner";
// import { withdraw } from "../api/withdraw";
// import axios from "axios";

// type WithdrawInput = {
//   full_name: string;
//   account: string;
//   bank_code: string;
//   amount: number;
// };

// const fallbackBanks = [
//   { name: "CBE", bank_code: "CBE001" },
//   { name: "Telebirr", bank_code: "TELEBIRR" },
//   { name: "M-Pesa", bank_code: "MPESA" },
// ];

// const Withdraw = () => {
//   const queryClient = useQueryClient();
//   const router = useRouter();

//   const [fullName, setFullName] = useState("");
//   const [account, setAccount] = useState("");
//   const [amount, setAmount] = useState<number>(0);
//   const [bankCode, setBankCode] = useState(fallbackBanks[0].bank_code);

//   const { data: banksData, isLoading } = useQuery({
//     queryKey: ["banks"],
//     queryFn: async () => {
//       const response = await axios.get("/api/chapa/banks");
//       return response.data.data; // assuming structure { data: [banks] }
//     },
//     staleTime: 1000 * 60 * 5, // cache for 5 minutes
//     retry: 1,
//   });

//   const withdrawMutation = useMutation({
//     mutationFn: async (input: WithdrawInput) => {
//       return withdraw(input);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["cases"] });
//       toast.success("Withdraw submitted successfully!");
//     },
//     onError: (error: any) => {
//       const message = error?.response?.data?.error || "Something went wrong";
//       toast.error(`Withdraw failed: ${message}`);
//     },
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (isNaN(amount) || amount <= 0) {
//       toast.error("Please enter a valid amount.");
//       return;
//     }

//     const userInput: WithdrawInput = {
//       full_name: fullName,
//       account,
//       bank_code: bankCode,
//       amount,
//     };

//     await withdrawMutation.mutateAsync(userInput);
//   };

//   const bankList = banksData || fallbackBanks;

//   return (
//     <div className="p-6 bg-gray-200 min-h-screen">
//       <div className="bg-white max-w-3xl mx-auto rounded-xl p-10 flex flex-col gap-8 shadow-lg">
//         <button
//           onClick={() => router.back()}
//           className="w-24 text-center bg-[#7B3B99] text-white font-bold py-2 px-4 rounded hover:bg-purple-700"
//         >
//           Back
//         </button>

//         <form onSubmit={handleSubmit} className="space-y-4 w-full">
//           <input
//             className="border w-full p-2 rounded"
//             placeholder="Full Name"
//             value={fullName}
//             onChange={(e) => setFullName(e.target.value)}
//             required
//           />

//           <input
//             className="border w-full p-2 rounded"
//             placeholder="Phone Number or Bank Account"
//             value={account}
//             onChange={(e) => setAccount(e.target.value)}
//             required
//           />

//           <select
//             className="border w-full p-2 rounded"
//             value={bankCode}
//             onChange={(e) => setBankCode(e.target.value)}
//             disabled={isLoading}
//           >
//             {bankList.map((bank) => (
//               <option key={bank.bank_code} value={bank.bank_code}>
//                 {bank.name}
//               </option>
//             ))}
//           </select>

//           <input
//             className="border w-full p-2 rounded"
//             placeholder="Amount"
//             type="number"
//             value={amount}
//             onChange={(e) => setAmount(Number(e.target.value))}
//             required
//           />

//           <div className="flex justify-end">
//             <button
//               type="submit"
//               disabled={withdrawMutation.isPending}
//               className={`px-6 py-2 rounded font-bold transition ${
//                 withdrawMutation.isPending
//                   ? "bg-gray-400 text-white cursor-not-allowed"
//                   : "bg-[#7B3B99] text-white hover:bg-purple-700"
//               }`}
//             >
//               {withdrawMutation.isPending ? "Processing..." : "Withdraw"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Withdraw;








"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { withdraw } from "../api/withdraw";
import axios from "axios";

type WithdrawInput = {
  full_name: string;
  account: string;
  bank_code: string;
  amount: number;
};

const Withdraw = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [bankCode, setBankCode] = useState("");

  const { data: banksData, isLoading } = useQuery({
    queryKey: ["banks"],
    queryFn: async () => {
      const response = await axios.get("/api/chapa/banks");
      return response.data.data; // assuming structure { data: [banks] }
    },
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
    retry: 1,
  });
  console.log("Banks data:", banksData);

  const withdrawMutation = useMutation({
    mutationFn: async (input: WithdrawInput) => {
      return withdraw(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cases"] });
      toast.success("Withdraw submitted successfully!");
    },
    onError: (error: any) => {
      const message = error?.response?.data?.error || "Something went wrong";
      toast.error(`Withdraw failed: ${message}`);
    },
  });

  console.log("Withdraw mutation state:", withdrawMutation);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }

    const userInput: WithdrawInput = {
      full_name: fullName,
      account,
      bank_code: bankCode,
      amount,
    };
    console.log("Submitting withdraw request:", userInput);

    await withdrawMutation.mutateAsync(userInput);
  };

  const bankList = banksData || [];

  return (
    <div className="p-6 bg-gray-200 min-h-screen">
      <div className="bg-white max-w-3xl mx-auto rounded-xl p-10 flex flex-col gap-8 shadow-lg">
        <button
          onClick={() => router.back()}
          className="w-24 text-center bg-[#7B3B99] text-white font-bold py-2 px-4 rounded hover:bg-purple-700"
        >
          Back
        </button>

        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <input
            className="border w-full p-2 rounded"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <input
            className="border w-full p-2 rounded"
            placeholder="Phone Number or Bank Account"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            required
          />

          <select
            className="border w-full p-2 rounded"
            value={bankCode}
            onChange={(e) => setBankCode(e.target.value)}
            disabled={isLoading || !bankList.length}
          >
            <option value="" disabled>Select a bank</option>
            {bankList.map((bank) => (
              <option key={bank.id} value={bank.id}>
                {bank.name}
              </option>
            ))}
          </select>

          <input
            className="border w-full p-2 rounded"
            placeholder="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
          />

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={withdrawMutation.isPending}
              className={`px-6 py-2 rounded font-bold transition ${
                withdrawMutation.isPending
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-[#7B3B99] text-white hover:bg-purple-700"
              }`}
            >
              {withdrawMutation.isPending ? "Processing..." : "Withdraw"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Withdraw;