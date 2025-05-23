// // import { useMutation } from "@tanstack/react-query";
// // import { useSession } from "next-auth/react";
// // import React from "react";
// // import { createOffer } from "../api/offer";

// // interface OfferModalProps {
// //   isOpen: boolean;
// //   onClose: () => void;
// //   client_id: number;
// // }

// // const OfferModal: React.FC<OfferModalProps> = ({
// //   isOpen,
// //   onClose,
// //   client_id,
// // }) => {
// //   const [inputData, setInputData] = React.useState({
// //     title: "",
// //     description: "",
// //     price: 0,
// //   });

// //   const { data: session } = useSession();
// //   const lawyer_id = session?.user.image?.id;

// //   const handleChange = (e: any) => {
// //     setInputData({ ...inputData, [e.target.name]: e.target.value });
// //   };

// //   const createCaseMutation = useMutation({
// //     mutationFn: async (data: any) => createOffer(data),
// //     onSuccess: (data) => {
// //       onClose();
// //       setInputData({
// //         title: "",
// //         description: "",
// //         price: 0,
// //       });
// //     },
// //   });

// //   const handleSubmit = async () => {
// //     const data = {
// //       ...inputData,
// //       price: Number(inputData.price),
// //       lawyer_id: lawyer_id,
// //       client_id: client_id,
// //     };
// //     createCaseMutation.mutate(data);
// //   };

// //   return (
// //     <div className=" fixed inset-0 flex items-center justify-center bg-black/50">
// //       <div className=" bg-white p-6 rounded-md shadow-md w-96 ">
// //         <h2 className=" text-xl font-bold mb-4 ">Make an Offer</h2>
// //         <div className="mb-4">
// //           <label className=" block text-sm font-medium text-gray-700 ">
// //             Title
// //           </label>
// //           <input
// //             name="title"
// //             type="text"
// //             value={inputData.title}
// //             onChange={handleChange}
// //             className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
// //           />
// //         </div>
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700">
// //             Description
// //           </label>
// //           <input
// //             name="description"
// //             type="text"
// //             value={inputData.description}
// //             onChange={handleChange}
// //             className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
// //           />
// //         </div>
// //         <div className="mb-4">
// //           <label className="block text-sm font-medium text-gray-700">
// //             Price
// //           </label>
// //           <input
// //             name="price"
// //             type="number"
// //             value={inputData.price}
// //             onChange={handleChange}
// //             className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
// //           />
// //         </div>
// //         <div className=" flex justify-evenly ">
// //           <button
// //             onClick={onClose}
// //             className=" mr-2 px-4 py-2 bg-gray-300 rounded-md "
// //           >
// //             Cancel
// //           </button>
// //           <button
// //             onClick={handleSubmit}
// //             className="px-4 py-2 bg-[#7B3B99] text-white rounded-md"
// //           >
// //             Send
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default OfferModal;



// // import { useMutation } from "@tanstack/react-query";
// // import { useSession } from "next-auth/react";
// // import React from "react";
// // import { createOffer } from "../api/offer";

// // interface OfferModalProps {
// //   isOpen: boolean;
// //   onClose: () => void;
// //   client_id: number;
// // }

// // const OfferModal: React.FC<OfferModalProps> = ({
// //   isOpen,
// //   onClose,
// //   client_id,
// // }) => {
// //   const [inputData, setInputData] = React.useState({
// //     title: "",
// //     description: "",
// //     price: 0,
// //   });
  
// //   const [termsAgreed, setTermsAgreed] = React.useState(false);

// //   const { data: session } = useSession();
// //   const lawyer_id = session?.user.image?.id;

// //   const handleChange = (e: any) => {
// //     setInputData({ ...inputData, [e.target.name]: e.target.value });
// //   };

// //   const createCaseMutation = useMutation({
// //     mutationFn: async (data: any) => createOffer(data),
// //     onSuccess: (data) => {
// //       onClose();
// //       setInputData({
// //         title: "",
// //         description: "",
// //         price: 0,
// //       });
// //       setTermsAgreed(false);
// //     },
// //   });

// //   const handleSubmit = async () => {
// //     const finalPrice = Number(inputData.price) * 0.95; // 5% deduction
// //     const data = {
// //       ...inputData,
// //       price: Number(inputData.price),
// //       finalPrice: finalPrice,
// //       lawyer_id: lawyer_id,
// //       client_id: client_id,
// //       termsAgreed: termsAgreed,
// //     };
// //     createCaseMutation.mutate(data);
// //   };

// //   // Calculate the 5% fee and final amount
// //   const fee = inputData.price * 0.05;
// //   const finalAmount = inputData.price - fee;

// //   return (
// //     <div className="fixed inset-0 flex items-center justify-center bg-black/50">
// //       <div className="bg-white p-6 rounded-md shadow-md w-[450px] max-h-[90vh] overflow-y-auto">
// //         <h2 className="text-xl font-bold mb-4">Make an Offer</h2>
// //         <div className="mb-4">
// //           <label className="block text-sm font-medium text-gray-700">
// //             Title
// //           </label>
// //           <input
// //             name="title"
// //             type="text"
// //             value={inputData.title}
// //             onChange={handleChange}
// //             className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
// //           />
// //         </div>
// //         <div className="mb-4">
// //           <label className="block text-sm font-medium text-gray-700">
// //             Description
// //           </label>
// //           <textarea
// //             name="description"
// //             value={inputData.description}
// //             onChange={handleChange}
// //             className="mt-1 block w-full p-2 border border-gray-300 rounded-md h-24"
// //             placeholder="Describe the legal services to be provided"
// //           />
// //         </div>
// //         <div className="mb-4">
// //           <label className="block text-sm font-medium text-gray-700">
// //             Price
// //           </label>
// //           <input
// //             name="price"
// //             type="number"
// //             value={inputData.price}
// //             onChange={handleChange}
// //             className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
// //           />
// //         </div>

// //         {inputData.price > 0 && (
// //           <div className="mb-4 p-3 bg-gray-50 rounded-md">
// //             <h3 className="font-medium text-gray-700 mb-2">Fee Calculation</h3>
// //             <div className="grid grid-cols-2 gap-1 text-sm">
// //               <div>Original Price:</div>
// //               <div className="text-right">${inputData.price.toFixed(2)}</div>
              
// //               <div>Platform Fee (5%):</div>
// //               <div className="text-right text-red-500">-${fee.toFixed(2)}</div>
              
// //               <div className="font-bold">Final Amount:</div>
// //               <div className="text-right font-bold">${finalAmount.toFixed(2)}</div>
// //             </div>
// //           </div>
// //         )}

// //         <div className="mb-4 p-3 bg-gray-50 rounded-md">
// //           <h3 className="font-medium text-gray-700 mb-2">Contract Terms</h3>
// //           <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
// //             <li>Contract will be formed based on the provided information.</li>
// //             <li>The lawyer will provide legal services as described in the case description.</li>
// //             <li>The lawyer will provide all necessary documents related to the court status.</li>
// //             <li>The system will automatically deduct 5% from the agreed-upon price.</li>
// //             <li>The system will not be responsible for any issues arising from communication outside the system.</li>
// //           </ul>
// //         </div>

// //         <div className="mb-4">
// //           <div className="flex items-start">
// //             <input
// //               id="terms"
// //               type="checkbox"
// //               checked={termsAgreed}
// //               onChange={(e) => setTermsAgreed(e.target.checked)}
// //               className="mt-1 h-4 w-4 text-[#7B3B99] border-gray-300 rounded"
// //             />
// //             <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
// //               I agree to the terms and conditions listed above.
// //             </label>
// //           </div>
// //         </div>

// //         <div className="flex justify-evenly">
// //           <button
// //             onClick={onClose}
// //             className="mr-2 px-4 py-2 bg-gray-300 rounded-md"
// //           >
// //             Cancel
// //           </button>
// //           <button
// //             onClick={handleSubmit}
// //             disabled={!termsAgreed}
// //             className={`px-4 py-2 bg-[#7B3B99] text-white rounded-md ${
// //               !termsAgreed ? "opacity-50 cursor-not-allowed" : ""
// //             }`}
// //           >
// //             Send
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default OfferModal;







// import { useMutation } from "@tanstack/react-query";
// import { useSession } from "next-auth/react";
// import React from "react";
// import { createOffer } from "../api/offer";

// interface OfferModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   client_id: number;
// }

// const OfferModal: React.FC<OfferModalProps> = ({
//   isOpen,
//   onClose,
//   client_id,
// }) => {
//   const [inputData, setInputData] = React.useState({
//     title: "",
//     description: "",
//     price: 0,
//     location: "",
//   });
  
//   const [termsAgreed, setTermsAgreed] = React.useState(false);

//   const { data: session } = useSession();
//   const lawyer_id = session?.user.image?.id;

//   const handleChange = (e: any) => {
//     setInputData({ ...inputData, [e.target.name]: e.target.value });
//   };

//   const createCaseMutation = useMutation({
//     mutationFn: async (data: any) => createOffer(data),
//     onSuccess: (data) => {
//       onClose();
//       setInputData({
//         title: "",
//         description: "",
//         price: 0,
//         location: "",
//       });
//       setTermsAgreed(false);
//     },
//   });

//   const handleSubmit = async () => {
//     // const finalPrice = Number(inputData.price) * 0.95; // 5% deduction
//     const data = {
//       ...inputData,
//       price: Number(inputData.price),
//       lawyer_id: lawyer_id,
//       client_id: client_id,
//       // termsAgreed: termsAgreed,
//     };
//     createCaseMutation.mutate(data);
//   };

//   // Calculate the 5% fee and final amount
//   // const fee = inputData.price * 0.05;
//   // const finalAmount = inputData.price - fee;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black/50">
//       <div className="bg-white p-6 rounded-md shadow-md w-[450px] max-h-[90vh] overflow-y-auto">
//         <h2 className="text-xl font-bold mb-4">Make an Offer</h2>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Title
//           </label>
//           <input
//             name="title"
//             type="text"
//             value={inputData.title}
//             onChange={handleChange}
//             className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Description
//           </label>
//           <textarea
//             name="description"
//             value={inputData.description}
//             onChange={handleChange}
//             className="mt-1 block w-full p-2 border border-gray-300 rounded-md h-24"
//             placeholder="Describe the legal services to be provided"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Price
//           </label>
//           <input
//             name="price"
//             type="number"
//             value={inputData.price}
//             onChange={handleChange}
//             className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Case location
//           </label>
//           <input
//             name="location"
//             type="text"
//             value={inputData.location}
//             onChange={handleChange}
//             className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//           />
//         </div>

//         {/* {inputData.price > 0 && (
//           <div className="mb-4 p-3 bg-gray-50 rounded-md">
//             <h3 className="font-medium text-gray-700 mb-2">Fee Calculation</h3>
//             <div className="grid grid-cols-2 gap-1 text-sm">
//               <div>Original Price:</div>
//               <div className="text-right">${inputData.price.toFixed(2)}</div>
              
//               <div>Platform Fee (5%):</div>
//               <div className="text-right text-red-500">-${fee.toFixed(2)}</div>
              
//               <div className="font-bold">Final Amount:</div>
//               <div className="text-right font-bold">${finalAmount.toFixed(2)}</div>
//             </div>
//           </div>
//         )} */}

//         <div className="mb-4 p-3 bg-gray-50 rounded-md">
//           <h3 className="font-medium text-gray-700 mb-2">Terms and conditions</h3>
//           <div className="h-[140px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
//             <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
//               <li>Contract will be formed based on the provided information.</li>
//               <li>The lawyer will provide legal services as described in the case description.</li>
//               <li>The lawyer will provide all necessary documents related to the court status.</li>
//               <li>The system will automatically deduct 5% from the agreed-upon price.</li>
//               <li>The system will not be responsible for any issues arising from communication outside the system.</li>
//             </ul>
//           </div>
//         </div>

//         <div className="mb-4">
//           <div className="flex items-start">
//             <input
//               id="terms"
//               type="checkbox"
//               checked={termsAgreed}
//               onChange={(e) => setTermsAgreed(e.target.checked)}
//               className="mt-1 h-4 w-4 text-[#7B3B99] border-gray-300 rounded"
//             />
//             <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
//               I agree to the terms and conditions listed above.
//             </label>
//           </div>
//         </div>

//         <div className="flex justify-evenly">
//           <button
//             onClick={onClose}
//             className="mr-2 px-4 py-2 bg-gray-300 rounded-md"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSubmit}
//             disabled={!termsAgreed}
//             className={`px-4 py-2 bg-[#7B3B99] text-white rounded-md ${
//               !termsAgreed ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OfferModal;




"use client"

import type React from "react"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { createOffer } from "../api/offer"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface OfferModalProps {
  isOpen: boolean
  onClose: () => void
  client_id: number
}

const OfferModal: React.FC<OfferModalProps> = ({ isOpen, onClose, client_id }) => {
  const [inputData, setInputData] = useState({
    title: "",
    description: "",
    price: 0,
    location: "",
  })

  const [termsAgreed, setTermsAgreed] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [formSuccess, setFormSuccess] = useState<string | null>(null)

  const { data: session } = useSession()
  const lawyer_id = session?.user?.image?.id

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setInputData({ ...inputData, [name]: value })
    setFormError(null)
  }

  const createCaseMutation = useMutation({
    mutationFn: async (data: any) => createOffer(data),
    onSuccess: () => {
      setFormSuccess("Offer created successfully!")
      setTimeout(() => {
        onClose()
        setInputData({
          title: "",
          description: "",
          price: 0,
          location: "",
        })
        setTermsAgreed(false)
        setFormSuccess(null)
      }, 1500)
    },
    onError: (error: any) => {
      setFormError(error.message || "Failed to create offer. Please try again.")
    },
  })

  const handleSubmit = async () => {
    // Validate form
    if (!inputData.title.trim()) {
      setFormError("Please enter a title for your offer")
      return
    }

    if (!inputData.description.trim()) {
      setFormError("Please provide a description of the legal services")
      return
    }

    if (inputData.price <= 0) {
      setFormError("Please enter a valid price")
      return
    }

    const data = {
      ...inputData,
      price: Number(inputData.price),
      lawyer_id: lawyer_id,
      client_id: client_id,
    }

    createCaseMutation.mutate(data)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">Create Legal Offer</DialogTitle>
        </DialogHeader>

        {formError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{formError}</AlertDescription>
          </Alert>
        )}

        {formSuccess && (
          <Alert variant="default" className="mb-4 bg-green-50 border-green-200 text-green-800">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription>{formSuccess}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="title" className="text-sm font-medium text-gray-700">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              value={inputData.title}
              onChange={handleChange}
              placeholder="e.g., Legal Consultation for Property Dispute"
              className="border-gray-300"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={inputData.description}
              onChange={handleChange}
              placeholder="Describe the legal services to be provided"
              className="border-gray-300 min-h-[120px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="price" className="text-sm font-medium text-gray-700">
                Price
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={inputData.price || ""}
                onChange={handleChange}
                placeholder="0.00"
                className="border-gray-300"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                Case Location
              </Label>
              <Input
                id="location"
                name="location"
                value={inputData.location}
                onChange={handleChange}
                placeholder="e.g., City Court, District 5"
                className="border-gray-300"
              />
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mt-2">
            <h3 className="font-medium text-gray-700 mb-2 text-sm">Terms and Conditions</h3>
            <div className="h-[140px] overflow-y-auto pr-2 text-sm text-gray-600 space-y-2">
              <ul className="list-disc pl-5 space-y-2">
                <li>Contract will be formed based on the provided information.</li>
                <li>The lawyer will provide legal services as described in the case description.</li>
                <li>The lawyer will provide all necessary documents related to the court status.</li>
                <li>The system will automatically deduct 5% from the agreed-upon price.</li>
                <li>
                  The system will not be responsible for any issues arising from communication outside the system.
                </li>
              </ul>
            </div>
          </div>

          <div className="flex items-start space-x-2 mt-2">
            <Checkbox
              id="terms"
              checked={termsAgreed}
              onCheckedChange={(checked) => setTermsAgreed(checked === true)}
              className="data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500"
            />
            <Label htmlFor="terms" className="text-sm text-gray-700 font-normal">
              I agree to the terms and conditions listed above.
            </Label>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose} className="mr-2">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!termsAgreed || createCaseMutation.isPending}
            className={`bg-teal-500 hover:bg-teal-600 text-white ${
              !termsAgreed || createCaseMutation.isPending ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {createCaseMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Offer"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default OfferModal
