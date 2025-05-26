

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
//   console.log("Banks data:", banksData);
//     console.log("Banks data:", banksData.);


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
//     console.log("Submitting withdraw request:", userInput);

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

// const Withdraw = () => {
//   const queryClient = useQueryClient();
//   const router = useRouter();

//   const [fullName, setFullName] = useState("");
//   const [account, setAccount] = useState("");
//   const [amount, setAmount] = useState<number>(0);
//   const [bankCode, setBankCode] = useState("");

//   const { data: banksData, isLoading } = useQuery({
//     queryKey: ["banks"],
//     queryFn: async () => {
//       const response = await axios.get("/api/chapa/banks");
//       return response.data.data; // assuming structure { data: [banks] }
//     },
//     staleTime: 1000 * 60 * 5, // cache for 5 minutes
//     retry: 1,
//   });
//   console.log("Banks data:", banksData);

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

//   console.log("Withdraw mutation state:", withdrawMutation);

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
//     console.log("Submitting withdraw request:", userInput);

//     await withdrawMutation.mutateAsync(userInput);
//   };

//   const bankList = banksData || [];

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
//             disabled={isLoading || !bankList.length}
//           >
//             <option value="" disabled>Select a bank</option>
//             {bankList.map((bank) => (
//               <option key={bank.id} value={bank.id}>
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