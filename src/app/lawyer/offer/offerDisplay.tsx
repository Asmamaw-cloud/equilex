// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { acceptOffer, getCasesById, rejectOffer } from "../api/offer";
// import {
//   ErrorComponent,
//   LoadingComponent,
// } from "@/components/LoadingErrorComponents";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Loader2 } from "lucide-react";

// interface message {
//   messageType: string;
//   fileType: string;
//   clientId: number;
//   message: string;
//   lawyerId: number;
//   lawyer: {
//     photo: string;
//   };
//   client: {
//     full_name: string;
//   };
// }

// const OfferDisplay = ({
//   caseId,
//   userType,
// }: {
//   caseId: number;
//   userType: string;
// }) => {
//   const [isAccepting, setIsAcceptiong] = useState(false);
//   const [isRejecting, setIsRejecting] = useState(false);
//   const queryClient = useQueryClient();
//   const router = useRouter();

//   const { data, isLoading, error } = useQuery({
//     queryKey: ["offer-chat" + caseId],
//     queryFn: () => getCasesById(caseId),
//   });

//   const acceptMutation = useMutation({
//     mutationFn: (id: number) => acceptOffer(id),
//     onSuccess: (data: any) => {
//       console.log( "this is onsuccess data", data);

//       setIsAcceptiong(false);
//       router.replace(data.acceptedCase);
//     },
//   });

//   const rejectMutation = useMutation({
//     mutationFn: (id: number) => rejectOffer(id),
//     onSuccess: (data: any) => {
//       setIsRejecting(false);
//       queryClient.invalidateQueries({ queryKey: ["offer-chat"] });
//     },
//   });
  
//   if (isLoading) {
//     return <LoadingComponent />;
//   }
//   if (error) {
//     return <ErrorComponent errorMessage="Error Occured" />;
//   }

//   const handleAccept = (id: number) => {
//     setIsAcceptiong(true);
//     acceptMutation.mutate(id);
//   };

//   const handleReject = (id: number) => {
//     setIsRejecting(true);
//     rejectMutation.mutate(id);
//   };


//     return (
//       <Card className=" w-[50%] ">
//         <CardHeader className=" border-b ">
//           <CardTitle> {data?.title} </CardTitle>
//         </CardHeader>
//         <CardContent className=" p-6 ">
//           <p className="text-lg text-gray-400 font-bold">{data.price}ETB</p>
//           <p>{data.description}</p>
//           <div className=" mt-4 ">
//             {userType == "client" ? (
//               <div className=" flex gap-2 ">
//                 <Button
//                   onClick={() => handleAccept(caseId)}
//                   className="bg-[#7B3B99]"
//                 >
//                   {isAccepting && <Loader2 className=" animate-spin " />}Accept
//                 </Button>
//                 <Button
//                   variant="destructive"
//                   onClick={() => handleReject(caseId)}
//                   disabled={data.status !== "PENDING" || isRejecting}
//                 >
//                   {isRejecting && <Loader2 className="animate-spin" />}
//                   Reject
//                 </Button>
//               </div>
//             ) : (
//               ""
//             )}
//           </div>
//         </CardContent>
//       </Card>
//     );
// };
// export default OfferDisplay;





// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Loader2 } from "lucide-react";
// import { acceptOffer, getCasesById, rejectOffer } from "../api/offer";
// import {
//   ErrorComponent,
//   LoadingComponent,
// } from "@/components/LoadingErrorComponents";

// interface Message {
//   messageType: string;
//   fileType: string;
//   clientId: number;
//   message: string;
//   lawyerId: number;
//   lawyer: {
//     photo: string;
//   };
//   client: {
//     full_name: string;
//   };
// }

// interface OfferDisplayProps {
//   caseId: number;
//   userType: string;
// }

// const OfferDisplay = ({ caseId, userType }: OfferDisplayProps) => {
//   const [isAccepting, setIsAccepting] = useState(false);
//   const [isRejecting, setIsRejecting] = useState(false);

//   const queryClient = useQueryClient();
//   const router = useRouter();

//   const {
//     data: caseData,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["offer-chat", caseId],
//     queryFn: () => getCasesById(caseId),
//   });

//   const acceptMutation = useMutation({
//     mutationFn: acceptOffer,
//     onSuccess: (data: any) => {
//       setIsAccepting(false);
//       if (data?.acceptedCase) {
//         router.replace(data.acceptedCase);
//       }
//     },
//     onError: () => setIsAccepting(false),
//   });

//   const rejectMutation = useMutation({
//     mutationFn: rejectOffer,
//     onSuccess: () => {
//       setIsRejecting(false);
//       queryClient.invalidateQueries({ queryKey: ["offer-chat", caseId] });
//     },
//     onError: () => setIsRejecting(false),
//   });

//   const handleAccept = () => {
//     setIsAccepting(true);
//     acceptMutation.mutate(caseId);
//   };

//   const handleReject = () => {
//     setIsRejecting(true);
//     rejectMutation.mutate(caseId);
//   };

//   if (isLoading) return <LoadingComponent />;
//   if (error) return <ErrorComponent errorMessage="Failed to load offer details." />;

//   const isAccepted = caseData?.status === "ACCEPTED";

//   return (
//     <Card className="w-full max-w-2xl mx-auto shadow-md border border-gray-200">
//       <CardHeader className="border-b px-6 py-4 bg-gray-50">
//         <CardTitle className="text-xl font-semibold text-gray-800">
//           {caseData?.title}
//         </CardTitle>
//       </CardHeader>

//       <CardContent className="p-6 space-y-4">
//         <div className="text-gray-700 text-lg font-medium">
//           <span className="block text-sm text-gray-400">Proposed Price</span>
//           {caseData.price} ETB
//         </div>

//         <p className="text-gray-600">{caseData.description}</p>

//         {userType === "client" && (
//           <div className="flex gap-3 pt-4 border-t border-gray-100">
//             <Button
//               onClick={handleAccept}
//               disabled={isAccepted || isAccepting || isRejecting}
//               className={`flex items-center gap-2 ${
//                 isAccepted
//                   ? "bg-green-600 hover:bg-green-700 cursor-default"
//                   : "bg-purple-700 hover:bg-purple-800 text-white"
//               }`}
//             >
//               {isAccepting && !isAccepted && <Loader2 className="animate-spin h-4 w-4" />}
//               {isAccepted ? "Accepted" : "Accept"}
//             </Button>

//             <Button
//               variant="destructive"
//               onClick={handleReject}
//               disabled={caseData.status !== "PENDING" || isRejecting || isAccepting}
//               className="flex items-center gap-2"
//             >
//               {isRejecting && <Loader2 className="animate-spin h-4 w-4" />}
//               Reject
//             </Button>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default OfferDisplay;







// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useSession } from "next-auth/react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Loader2 } from 'lucide-react';
// import { acceptOffer, createOffer, getCasesById, rejectOffer } from "../api/offer";
// import {
//   ErrorComponent,
//   LoadingComponent,
// } from "@/components/LoadingErrorComponents";

// interface Message {
//   messageType: string;
//   fileType: string;
//   clientId: number;
//   message: string;
//   lawyerId: number;
//   lawyer: {
//     photo: string;
//   };
//   client: {
//     full_name: string;
//   };
// }

// interface OfferDisplayProps {
//   caseId: number;
//   userType: string;
//   client_id?: number;
// }

// const OfferDisplay = ({ caseId, userType, client_id }: OfferDisplayProps) => {
//   // States for offer display
//   const [isAccepting, setIsAccepting] = useState(false);
//   const [isRejecting, setIsRejecting] = useState(false);
  
//   // States for contract modal
//   const [isContractModalOpen, setIsContractModalOpen] = useState(true);
//   const [contractData, setContractData] = useState({
//     title: "",
//     description: "",
//     price: 0,
//   });
//   const [termsAgreed, setTermsAgreed] = useState(false);

//   const queryClient = useQueryClient();
//   const router = useRouter();
//   const { data: session } = useSession();
//   const lawyer_id = session?.user?.image?.id;

//   const {
//     data: caseData,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["offer-chat", caseId],
//     queryFn: () => getCasesById(caseId),
//   });

//   // Mutations for offer actions
//   const acceptMutation = useMutation({
//     mutationFn: acceptOffer,
//     onSuccess: (data: any) => {
//       setIsAccepting(false);
//       if (data?.acceptedCase) {
//         router.replace(data.acceptedCase);
//       }
//     },
//     onError: () => setIsAccepting(false),
//   });

//   const rejectMutation = useMutation({
//     mutationFn: rejectOffer,
//     onSuccess: () => {
//       setIsRejecting(false);
//       queryClient.invalidateQueries({ queryKey: ["offer-chat", caseId] });
//     },
//     onError: () => setIsRejecting(false),
//   });

//   // Mutation for contract creation
//   const createContractMutation = useMutation({
//     mutationFn: async (data: any) => createOffer(data),
//     onSuccess: (data) => {
//       setIsContractModalOpen(false);
//       setContractData({
//         title: "",
//         description: "",
//         price: 0,
//       });
//       setTermsAgreed(false);
//       queryClient.invalidateQueries({ queryKey: ["offer-chat", caseId] });
//     },
//   });

//   // Handlers for offer actions
//   const handleAccept = () => {
//     setIsAccepting(true);
//     acceptMutation.mutate(caseId);
//   };

//   const handleReject = () => {
//     setIsRejecting(true);
//     rejectMutation.mutate(caseId);
//   };

//   // Handlers for contract modal
//   const openContractModal = () => {
//     if (caseData) {
//       setContractData({
//         title: caseData.title || "",
//         description: caseData.description || "",
//         price: caseData.price || 0,
//       });
//     }
//     setIsContractModalOpen(true);
//   };

//   const closeContractModal = () => {
//     setIsContractModalOpen(false);
//     setTermsAgreed(false);
//   };

//   const handleContractChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setContractData({
//       ...contractData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleContractSubmit = async () => {
//     const finalPrice = Number(contractData.price) * 0.95; // 5% deduction
//     const data = {
//       ...contractData,
//       price: Number(contractData.price),
//       finalPrice: finalPrice,
//       lawyer_id: lawyer_id,
//       client_id: client_id || caseData?.clientId,
//       termsAgreed: termsAgreed,
//     };
//     createContractMutation.mutate(data);
//   };

//   // Calculate the 5% fee and final amount for contract
//   const fee = contractData.price * 0.05;
//   const finalAmount = contractData.price - fee;

//   if (isLoading) return <LoadingComponent />;
//   if (error) return <ErrorComponent errorMessage="Failed to load offer details." />;

//   const isAccepted = caseData?.status === "ACCEPTED";

//   return (
//     <>
//       {/* Offer Display Card */}
//       <Card className="w-full max-w-2xl mx-auto shadow-md border border-gray-200">
//         <CardHeader className="border-b px-6 py-4 bg-gray-50">
//           <CardTitle className="text-xl font-semibold text-gray-800">
//             {caseData?.title}
//           </CardTitle>
//         </CardHeader>

//         <CardContent className="p-6 space-y-4">
//           <div className="text-gray-700 text-lg font-medium">
//             <span className="block text-sm text-gray-400">Proposed Price</span>
//             {caseData.price} ETB
//           </div>

//           <p className="text-gray-600">{caseData.description}</p>

//           <div className="flex gap-3 pt-4 border-t border-gray-100">
//             {userType === "client" ? (
//               <>
//                 <Button
//                   onClick={handleAccept}
//                   disabled={isAccepted || isAccepting || isRejecting}
//                   className={`flex items-center gap-2 ${
//                     isAccepted
//                       ? "bg-green-600 hover:bg-green-700 cursor-default"
//                       : "bg-[#7B3B99] hover:bg-[#6a3384] text-white"
//                   }`}
//                 >
//                   {isAccepting && !isAccepted && <Loader2 className="animate-spin h-4 w-4" />}
//                   {isAccepted ? "Accepted" : "Accept"}
//                 </Button>

//                 <Button
//                   variant="destructive"
//                   onClick={handleReject}
//                   disabled={caseData.status !== "PENDING" || isRejecting || isAccepting}
//                   className="flex items-center gap-2"
//                 >
//                   {isRejecting && <Loader2 className="animate-spin h-4 w-4" />}
//                   Reject
//                 </Button>
//               </>
//             ) : (
//               <Button
//                 onClick={openContractModal}
//                 className="bg-[#7B3B99] hover:bg-[#6a3384] text-white"
//               >
//                 Create Contract
//               </Button>
//             )}
//           </div>
//         </CardContent>
//       </Card>

//       {/* Contract Creation Modal */}
//       {isContractModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
//           <div className="bg-white p-6 rounded-md shadow-md w-[450px] max-h-[90vh] overflow-y-auto">
//             <h2 className="text-xl font-bold mb-4">Create Contract</h2>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">
//                 Title
//               </label>
//               <input
//                 name="title"
//                 type="text"
//                 value={contractData.title}
//                 onChange={handleContractChange}
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">
//                 Description
//               </label>
//               <textarea
//                 name="description"
//                 value={contractData.description}
//                 onChange={handleContractChange}
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md h-24"
//                 placeholder="Describe the legal services to be provided"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">
//                 Price
//               </label>
//               <input
//                 name="price"
//                 type="number"
//                 value={contractData.price}
//                 onChange={handleContractChange}
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//               />
//             </div>

//             {contractData.price > 0 && (
//               <div className="mb-4 p-3 bg-gray-50 rounded-md">
//                 <h3 className="font-medium text-gray-700 mb-2">Fee Calculation</h3>
//                 <div className="grid grid-cols-2 gap-1 text-sm">
//                   <div>Original Price:</div>
//                   <div className="text-right">${contractData.price.toFixed(2)}</div>
                  
//                   <div>Platform Fee (5%):</div>
//                   <div className="text-right text-red-500">-${fee.toFixed(2)}</div>
                  
//                   <div className="font-bold">Final Amount:</div>
//                   <div className="text-right font-bold">${finalAmount.toFixed(2)}</div>
//                 </div>
//               </div>
//             )}

//             <div className="mb-4 p-3 bg-gray-50 rounded-md">
//               <h3 className="font-medium text-gray-700 mb-2">Contract Terms</h3>
//               <div className="h-[90px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
//                 <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
//                   <li>The lawyer will provide legal services as described in the case description.</li>
//                   <li>The lawyer will provide all necessary documents related to the court status.</li>
//                   <li>The system will automatically deduct 5% from the agreed-upon price.</li>
//                   <li>The system will not be responsible for any issues arising from communication outside the system.</li>
//                 </ul>
//               </div>
//             </div>

//             <div className="mb-4">
//               <div className="flex items-start">
//                 <input
//                   id="terms"
//                   type="checkbox"
//                   checked={termsAgreed}
//                   onChange={(e) => setTermsAgreed(e.target.checked)}
//                   className="mt-1 h-4 w-4 text-[#7B3B99] border-gray-300 rounded"
//                 />
//                 <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
//                   I agree to the terms and conditions listed above.
//                 </label>
//               </div>
//             </div>

//             <div className="flex justify-evenly">
//               <button
//                 onClick={closeContractModal}
//                 className="mr-2 px-4 py-2 bg-gray-300 rounded-md"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleContractSubmit}
//                 disabled={!termsAgreed || createContractMutation.isPending}
//                 className={`px-4 py-2 bg-[#7B3B99] text-white rounded-md ${
//                   !termsAgreed || createContractMutation.isPending ? "opacity-50 cursor-not-allowed" : ""
//                 }`}
//               >
//                 {createContractMutation.isPending ? (
//                   <span className="flex items-center gap-2">
//                     <Loader2 className="animate-spin h-4 w-4" />
//                     Creating...
//                   </span>
//                 ) : (
//                   "Create Contract"
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default OfferDisplay;



// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Loader2 } from 'lucide-react';
// import { acceptOffer, getCasesById, rejectOffer } from "../api/offer";
// import {
//   ErrorComponent,
//   LoadingComponent,
// } from "@/components/LoadingErrorComponents";

// interface Message {
//   messageType: string;
//   fileType: string;
//   clientId: number;
//   message: string;
//   lawyerId: number;
//   lawyer: {
//     photo: string;
//   };
//   client: {
//     full_name: string;
//   };
// }

// interface OfferDisplayProps {
//   caseId: number;
//   userType: string;
// }

// const OfferDisplay = ({ caseId, userType }: OfferDisplayProps) => {
//   const [isAccepting, setIsAccepting] = useState(false);
//   const [isRejecting, setIsRejecting] = useState(false);
//   const [termsAgreed, setTermsAgreed] = useState(false);

//   const queryClient = useQueryClient();
//   const router = useRouter();

//   const {
//     data: caseData,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["offer-chat", caseId],
//     queryFn: () => getCasesById(caseId),
//   });

//   const acceptMutation = useMutation({
//     mutationFn: acceptOffer,
//     onSuccess: (data: any) => {
//       setIsAccepting(false);
//       if (data?.acceptedCase) {
//         router.replace(data.acceptedCase);
//       }
//     },
//     onError: () => setIsAccepting(false),
//   });

//   const rejectMutation = useMutation({
//     mutationFn: rejectOffer,
//     onSuccess: () => {
//       setIsRejecting(false);
//       queryClient.invalidateQueries({ queryKey: ["offer-chat", caseId] });
//     },
//     onError: () => setIsRejecting(false),
//   });

//   const handleAccept = () => {
//     setIsAccepting(true);
//     acceptMutation.mutate(caseId);
//   };

//   const handleReject = () => {
//     setIsRejecting(true);
//     rejectMutation.mutate(caseId);
//   };

//   if (isLoading) return <LoadingComponent />;
//   if (error) return <ErrorComponent errorMessage="Failed to load offer details." />;

//   const isAccepted = caseData?.status === "ACCEPTED";

//   return (
//     <Card className="w-full max-w-2xl mx-auto shadow-md border border-gray-200">
//       <CardHeader className="border-b px-6 py-4 bg-gray-50">
//         <CardTitle className="text-xl font-semibold text-gray-800">
//           {caseData?.title}
//         </CardTitle>
//       </CardHeader>

//       <CardContent className="p-6 space-y-4">
//         <div className="text-gray-700 text-lg font-medium">
//           <span className="block text-sm text-gray-400">Proposed Price</span>
//           {caseData.price} ETB
//         </div>

//         <p className="text-gray-600">{caseData.description}</p>

//         {userType === "client" && (
//           <>
//             <div className="p-3 bg-gray-50 rounded-md mt-4">
//               <h3 className="font-medium text-gray-700 mb-2">Contract Terms</h3>
//               <div className="h-[90px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
//                 <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
//                   <li>The lawyer will provide legal services as described in the case description.</li>
//                   <li>The lawyer will provide all necessary documents related to the court status.</li>
//                   <li>The system will automatically deduct 5% from the agreed-upon price.</li>
//                   <li>The system will not be responsible for any issues arising from communication outside the system.</li>
//                 </ul>
//               </div>
//             </div>

//             <div className="flex items-start mt-3">
//               <input
//                 id="terms"
//                 type="checkbox"
//                 checked={termsAgreed}
//                 onChange={(e) => setTermsAgreed(e.target.checked)}
//                 className="mt-1 h-4 w-4 text-purple-700 border-gray-300 rounded"
//               />
//               <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
//                 I agree to the terms and conditions listed above.
//               </label>
//             </div>

//             <div className="flex gap-3 pt-4 border-t border-gray-100 mt-3">
//               <Button
//                 onClick={handleAccept}
//                 disabled={isAccepted || isAccepting || isRejecting || !termsAgreed}
//                 className={`flex items-center gap-2 ${
//                   isAccepted
//                     ? "bg-green-600 hover:bg-green-700 cursor-default"
//                     : "bg-purple-700 hover:bg-purple-800 text-white"
//                 } ${!termsAgreed ? "opacity-50 cursor-not-allowed" : ""}`}
//               >
//                 {isAccepting && !isAccepted && <Loader2 className="animate-spin h-4 w-4" />}
//                 {isAccepted ? "Accepted" : "Accept"}
//               </Button>

//               <Button
//                 variant="destructive"
//                 onClick={handleReject}
//                 disabled={caseData.status !== "PENDING" || isRejecting || isAccepting}
//                 className="flex items-center gap-2"
//               >
//                 {isRejecting && <Loader2 className="animate-spin h-4 w-4" />}
//                 Reject
//               </Button>
//             </div>
//           </>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default OfferDisplay;



// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
// import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Loader2, CheckCircle, XCircle, AlertCircle, Clock } from "lucide-react"
// import { acceptOffer, getCasesById, rejectOffer } from "../api/offer"
// import { ErrorComponent, LoadingComponent } from "@/components/LoadingErrorComponents"
// import { Badge } from "@/components/ui/badge"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Label } from "@/components/ui/label"
// import { Alert, AlertDescription } from "@/components/ui/alert"

// interface OfferDisplayProps {
//   caseId: number
//   userType?: string
// }

// const OfferDisplay = ({ caseId, userType }: OfferDisplayProps) => {
//   const [isAccepting, setIsAccepting] = useState(false)
//   const [isRejecting, setIsRejecting] = useState(false)
//   const [termsAgreed, setTermsAgreed] = useState(false)
//   const [actionError, setActionError] = useState<string | null>(null)

//   const queryClient = useQueryClient()
//   const router = useRouter()

//   const {
//     data: caseData,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["offer-chat", caseId],
//     queryFn: () => getCasesById(caseId),
//   })

//   const acceptMutation = useMutation({
//     mutationFn: acceptOffer,
//     onSuccess: (data: any) => {
//       if (data?.acceptedCase) {
//         setTimeout(() => {
//           router.replace(data.acceptedCase)
//         }, 1000)
//       }
//     },
//     onError: (error: any) => {
//       setActionError(error.message || "Failed to accept offer")
//       setIsAccepting(false)
//     },
//     onSettled: () => {
//       setIsAccepting(false)
//     },
//   })

//   const rejectMutation = useMutation({
//     mutationFn: rejectOffer,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["offer-chat", caseId] })
//     },
//     onError: (error: any) => {
//       setActionError(error.message || "Failed to reject offer")
//     },
//     onSettled: () => {
//       setIsRejecting(false)
//     },
//   })

//   const handleAccept = () => {
//     if (!termsAgreed && userType === "client") {
//       setActionError("You must agree to the terms before accepting")
//       return
//     }

//     setActionError(null)
//     setIsAccepting(true)
//     acceptMutation.mutate(caseId)
//   }

//   const handleReject = () => {
//     setActionError(null)
//     setIsRejecting(true)
//     rejectMutation.mutate(caseId)
//   }

//   if (isLoading) return <LoadingComponent />
//   if (error) return <ErrorComponent errorMessage="Failed to load offer details" />

//   const isAccepted = caseData?.status === "ACCEPTED"
//   const isRejected = caseData?.status === "REJECTED"
//   const isPending = caseData?.status === "PENDING"

//   const getStatusBadge = () => {
//     if (isAccepted) {
//       return <Badge className="bg-green-500 hover:bg-green-600">Accepted</Badge>
//     } else if (isRejected) {
//       return <Badge variant="destructive">Rejected</Badge>
//     } else {
//       return (
//         <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-300">
//           Pending
//         </Badge>
//       )
//     }
//   }

//   return (
//     <Card className="w-full max-w-md shadow-md border border-gray-200">
//       <CardHeader className="pb-3">
//         <div className="flex justify-between items-start">
//           <div>
//             <CardTitle className="text-lg font-semibold text-gray-800">{caseData?.title}</CardTitle>
//             <CardDescription className="text-gray-500 mt-1">
//               {caseData?.location && `Location: ${caseData.location}`}
//             </CardDescription>
//           </div>
//           {getStatusBadge()}
//         </div>
//       </CardHeader>

//       <CardContent className="space-y-4 pt-0">
//         <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-md">
//           <span className="text-sm font-medium text-gray-500">Proposed Fee</span>
//           <span className="text-lg font-semibold text-teal-600">{caseData.price} ETB</span>
//         </div>

//         <div>
//           <h3 className="text-sm font-medium text-gray-700 mb-1">Description</h3>
//           <p className="text-gray-600 text-sm">{caseData.description}</p>
//         </div>

//         {actionError && (
//           <Alert variant="destructive" className="py-2">
//             <AlertCircle className="h-4 w-4" />
//             <AlertDescription>{actionError}</AlertDescription>
//           </Alert>
//         )}

//         {userType === "client" && isPending && (
//           <>
//             <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
//               <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
//                 <AlertCircle className="h-4 w-4 mr-1 text-amber-500" />
//                 Terms and Conditions
//               </h3>
//               <div className="h-[90px] overflow-y-auto pr-2 text-xs text-gray-600 space-y-1">
//                 <ul className="list-disc pl-4 space-y-1">
//                   <li>The lawyer will provide legal services as described above.</li>
//                   <li>All necessary documents related to the court status will be provided.</li>
//                   <li>A 5% platform fee will be applied to the transaction.</li>
//                   <li>Communication should remain within the platform for your protection.</li>
//                 </ul>
//               </div>
//             </div>

//             <div className="flex items-start space-x-2">
//               <Checkbox
//                 id="terms"
//                 checked={termsAgreed}
//                 onCheckedChange={(checked) => setTermsAgreed(checked === true)}
//                 className="data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500 mt-1"
//               />
//               <Label htmlFor="terms" className="text-sm text-gray-700 font-normal">
//                 I agree to the terms and conditions listed above.
//               </Label>
//             </div>
//           </>
//         )}

//         {isAccepted && (
//           <div className="bg-green-50 border border-green-200 rounded-md p-3 flex items-center">
//             <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
//             <p className="text-green-700 text-sm">Offer accepted. Your case has been created.</p>
//           </div>
//         )}

//         {isRejected && (
//           <div className="bg-red-50 border border-red-200 rounded-md p-3 flex items-center">
//             <XCircle className="h-5 w-5 text-red-500 mr-2" />
//             <p className="text-red-700 text-sm">This offer has been rejected.</p>
//           </div>
//         )}
//       </CardContent>

//       {userType === "client" && isPending && (
//         <CardFooter className="pt-0">
//           <div className="flex gap-3 w-full">
//             <Button
//               onClick={handleAccept}
//               disabled={isAccepting || !termsAgreed}
//               className={`flex-1 bg-teal-500 hover:bg-teal-600 text-white ${
//                 !termsAgreed ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//             >
//               {isAccepting ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Processing...
//                 </>
//               ) : (
//                 <>
//                   <CheckCircle className="mr-2 h-4 w-4" />
//                   Accept
//                 </>
//               )}
//             </Button>

//             <Button
//               variant="outline"
//               onClick={handleReject}
//               disabled={isRejecting}
//               className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
//             >
//               {isRejecting ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Rejecting...
//                 </>
//               ) : (
//                 <>
//                   <XCircle className="mr-2 h-4 w-4" />
//                   Reject
//                 </>
//               )}
//             </Button>
//           </div>
//         </CardFooter>
//       )}

//       {userType !== "client" && isPending && (
//         <CardFooter className="pt-0">
//           <div className="flex items-center justify-center w-full text-sm text-gray-500">
//             <Clock className="h-4 w-4 mr-1" />
//             Waiting for client response
//           </div>
//         </CardFooter>
//       )}
//     </Card>
//   )
// }

// export default OfferDisplay







"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle, XCircle, AlertCircle, Clock, MapPin, DollarSign } from 'lucide-react'
import { acceptOffer, getCasesById, rejectOffer } from "../api/offer"
import { ErrorComponent, LoadingComponent } from "@/components/LoadingErrorComponents"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface OfferDisplayProps {
  caseId: number
  userType?: string
}

const OfferDisplay = ({ caseId, userType }: OfferDisplayProps) => {
  const [isAccepting, setIsAccepting] = useState(false)
  const [isRejecting, setIsRejecting] = useState(false)
  const [termsAgreed, setTermsAgreed] = useState(false)
  const [actionError, setActionError] = useState<string | null>(null)

  const queryClient = useQueryClient()
  const router = useRouter()

  const {
    data: caseData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["offer-chat", caseId],
    queryFn: () => getCasesById(caseId),
  })

  const acceptMutation = useMutation({
    mutationFn:(id: number)=> acceptOffer(id),
    onSuccess: (data: any) => {
      if (data?.acceptedCase) {
        setTimeout(() => {
          router.replace(data.acceptedCase)
        }, 1000)
      }
    },
    onError: (error: any) => {
      setActionError(error.message || "Failed to accept offer")
      setIsAccepting(false)
    },
    onSettled: () => {
      setIsAccepting(false)
    },
  })

  const rejectMutation = useMutation({
    mutationFn: rejectOffer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["offer-chat", caseId] })
    },
    onError: (error: any) => {
      setActionError(error.message || "Failed to reject offer")
    },
    onSettled: () => {
      setIsRejecting(false)
    },
  })

  const handleAccept = () => {
    if (!termsAgreed && userType === "client") {
      setActionError("You must agree to the terms before accepting")
      return
    }

    setActionError(null)
    setIsAccepting(true)
    acceptMutation.mutate(caseId)
  }

  const handleReject = () => {
    setActionError(null)
    setIsRejecting(true)
    rejectMutation.mutate(caseId)
  }

  if (isLoading) return <LoadingComponent />
  if (error) return <ErrorComponent errorMessage="Failed to load offer details" />

  const isAccepted = caseData?.status === "ACCEPTED"
  const isRejected = caseData?.status === "REJECTED"
  const isPending = caseData?.status === "PENDING"

  const getStatusBadge = () => {
    if (isAccepted) {
      return <Badge className="bg-green-500 hover:bg-green-600">Accepted</Badge>
    } else if (isRejected) {
      return <Badge variant="destructive">Rejected</Badge>
    } else {
      return (
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-300">
          Pending
        </Badge>
      )
    }
  }

  return (
    <Card className="w-full shadow-md border border-gray-200 overflow-hidden">
      <CardHeader className="pb-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold">{caseData?.title}</CardTitle>
            {caseData?.location && (
              <CardDescription className="text-teal-100 mt-1 flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                {caseData.location}
              </CardDescription>
            )}
          </div>
          <div className="bg-white rounded-full px-2 py-1 text-xs font-medium text-teal-700 flex items-center">
            {isAccepted ? (
              <>
                <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                Accepted
              </>
            ) : isRejected ? (
              <>
                <XCircle className="h-3 w-3 mr-1 text-red-500" />
                Rejected
              </>
            ) : (
              <>
                <Clock className="h-3 w-3 mr-1 text-yellow-500" />
                Pending
              </>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-4">
        <div className="flex justify-between items-center py-2 px-3 bg-teal-50 rounded-md border border-teal-100">
          <span className="text-sm font-medium text-teal-700 flex items-center">
            <DollarSign className="h-4 w-4 mr-1" />
            Legal Fee
          </span>
          <span className="text-lg font-semibold text-teal-700">{caseData.price} ETB</span>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-1">Description</h3>
          <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-md border border-gray-100">{caseData.description}</p>
        </div>

        {actionError && (
          <Alert variant="destructive" className="py-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{actionError}</AlertDescription>
          </Alert>
        )}

        {userType === "client" && isPending && (
          <>
            <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1 text-amber-500" />
                Terms and Conditions
              </h3>
              <div className="h-[90px] overflow-y-auto pr-2 text-xs text-gray-600 space-y-1">
                <ul className="list-disc pl-4 space-y-1">
                  <li>The lawyer will provide legal services as described above.</li>
                  <li>All necessary documents related to the court status will be provided.</li>
                  <li>A 5% platform fee will be applied to the transaction.</li>
                  <li>Communication should remain within the platform for your protection.</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={termsAgreed}
                onCheckedChange={(checked) => setTermsAgreed(checked === true)}
                className="data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500 mt-1"
              />
              <Label htmlFor="terms" className="text-sm text-gray-700 font-normal">
                I agree to the terms and conditions listed above.
              </Label>
            </div>
          </>
        )}

        {isAccepted && (
          <div className="bg-green-50 border border-green-200 rounded-md p-3 flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            <p className="text-green-700 text-sm">Offer accepted. Your case has been created.</p>
          </div>
        )}

        {isRejected && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3 flex items-center">
            <XCircle className="h-5 w-5 text-red-500 mr-2" />
            <p className="text-red-700 text-sm">This offer has been rejected.</p>
          </div>
        )}
      </CardContent>

      {userType === "client" && isPending && (
        <CardFooter className="pt-0 bg-gray-50 border-t">
          <div className="flex gap-3 w-full">
            <Button
              onClick={handleAccept}
              disabled={isAccepting || !termsAgreed}
              className={`flex-1 bg-teal-500 hover:bg-teal-600 text-white ${
                !termsAgreed ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isAccepting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Accept
                </>
              )}
            </Button>

            <Button
              variant="outline"
              onClick={handleReject}
              disabled={isRejecting}
              className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              {isRejecting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Rejecting...
                </>
              ) : (
                <>
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject
                </>
              )}
            </Button>
          </div>
        </CardFooter>
      )}

      {userType !== "client" && isPending && (
        <CardFooter className="pt-0 bg-gray-50 border-t">
          <div className="flex items-center justify-center w-full text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            Waiting for client response
          </div>
        </CardFooter>
      )}
    </Card>
  )
}

export default OfferDisplay
