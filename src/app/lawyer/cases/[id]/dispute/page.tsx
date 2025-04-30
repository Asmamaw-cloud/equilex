// "use client";

// import { getLawyerDisputes, submitDispute } from "@/app/lawyer/api/dispute";
// import {
//   ErrorComponent,
//   LoadingComponent,
// } from "@/components/LoadingErrorComponents";
// import { useMutation, UseMutationResult, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useSession } from "next-auth/react";
// import { useRouter, useSearchParams } from "next/navigation";
// import React, { useState } from "react";
// import { toast } from "sonner";

// type DisputeData = {
//   creator_email: string | null | undefined;
//   client_id: number;
//   content: string;
//   lawyer_id: number;
// };

// const Dispute = () => {
//   const queryClient = useQueryClient();

//   const { data: session } = useSession();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newDispute, setNewDispute] = useState({
//     content: "",
//   });

//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const client_id = Number(searchParams.get("client_id"));

//   const handleOpenModal = () => setIsModalOpen(true);
//   const handleCloseModal = () => setIsModalOpen(false);
//   const handleChange = (e: any) => {
//     setNewDispute({ ...newDispute, [e.target.name]: e.target.value });
//   };

//   // @ts-ignore
//   const lawyerid = session?.user?.image?.id;
//   const { data, isLoading, error } = useQuery({
//     queryKey: ["disputes"],
//     queryFn: () => getLawyerDisputes(lawyerid),
//   });

//   console.log("dispute data: ", data);

//   const mutationFn = async (data: DisputeData) => {
//     return submitDispute(data);
//   };


//   const { mutateAsync }: UseMutationResult<void, unknown, DisputeData> =
//     useMutation({
//       mutationFn,
//       onSuccess: () => {
//         queryClient.invalidateQueries({ queryKey: ["disputes"] });
//         toast.success("Dispute submited successfully!");

//         handleCloseModal();
//       },
//       onError: () => {
//         toast.error("Failed to Submite the dispute.");
//         handleCloseModal();
//       },
//     });

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     // @ts-ignore
//     if (!session?.user?.email || !session?.user?.image?.id) {
//       console.error("Session data is missing");
//       return;
//     }

//     const data: DisputeData = {
//       ...newDispute,
//       creator_email: session.user.email,
//       lawyer_id: lawyerid,
//       client_id: client_id,
//     };

//     try {
//       await mutateAsync(data);
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   if (isLoading) return <LoadingComponent />;
//   if (error)
//     return (
//       <ErrorComponent errorMessage="Failed to load data. Please try again." />
//     );

//   return (
//     <div className="p-6 bg-gray-200 min-h-screen relative">
//       <div className="bg-white h-[80%] w-[80%] rounded-xl m-auto p-10 relative">
//         <div
//           onClick={() => router.back()}
//           className="bg-[#7B3B99] text-white font-bold py-2 px-4 rounded transition duration-300 hover:bg-purple-700 inline-block mb-2 md:mb-0 cursor-pointer"
//         >
//           Back
//         </div>
        
//         <div className="flex justify-between items-center p-8">
//           <h1 className="text-2xl font-bold">Dispute Details</h1>
//           <button
//             onClick={handleOpenModal}
//             className="bg-[#692a85] text-white py-2 px-4 rounded shadow hover:bg-[#5d2b75] transition duration-200 "
//           >
//             Submit New Dispute
//           </button>
//         </div>

//         <div className=" p-8  mb-4 flex flex-col  gap-8">
//           <div className="flex  gap-8">
//             <p className="flex gap-4 items-center">
//               <span className="text-xl font-bold text-[#60287a]">
//                 Client Name:
//               </span>
//               {data[0]?.client?.full_name}
//             </p>
//             <p className="flex gap-4 items-center">
//               <span className="text-xl font-bold text-[#60287a]">
//                 Client ID:
//               </span>
//               {data?.[0]?.client_id}
//             </p>
//           </div>
//           <p className="flex gap-4 items-center">
//             <span className="text-xl font-bold text-[#60287a]">
//               Lawyer_Email:
//             </span>
//             {data?.[0]?.creator_email}
//           </p>

//           <p className="flex gap-4 items-center">
//             <span className="text-xl font-bold text-[#60287a]">
//               Client_Email:
//             </span>
//             {data?.[0]?.client?.email}
//           </p>
//         </div>

//         {data?.map((dispute: any) => (
//           <>
//             <div
//               key={dispute.id}
//               className=" p-10  mb-4  flex flex-col gap-4 relative"
//             >
//               {/* <div className="flex  gap-4">
//                 <p className="text-2xl font-bold text-[#60287a]">Email:</p>
//                 {dispute.creator_email}
//               </div> */}
//               <div className="flex flex-col gap-4">
//                 <p className="text-2xl font-bold text-[#602979]">
//                   Description:
//                 </p>
//                 <div className="px-4 text-justify ">{dispute.content}</div>
//               </div>
//               <div className="flex gap-2 items-center absolute right-12 top-12 text-sm">
//                 <p className=" font-bold text-[#60277b]">Submission Date:</p>
//                 {new Date(dispute.created_at).toLocaleDateString()}
//               </div>
//               <div className="flex gap-2 items-center">
//                 <p className="text-2xl font-bold text-[#60287a]">Status:</p>
//                 {dispute.status}
//               </div>
//               {dispute.solved && (
//                 <div>
//                   <p className="text-2xl font-bold text-[#60297a]">
//                     Resolution:
//                   </p>
//                   {dispute.resolution}
//                 </div>
//               )}
//             </div>
//             <hr className="border w-[90%] m-auto" />
//           </>
//         ))}

//         {isModalOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//             <div className="bg-white p-4 rounded shadow-lg w-1/3">
//               <h2 className="text-xl mb-4 font-semibold">Submit New Dispute</h2>
//               <form onSubmit={handleSubmit}>
//                 {/* <div className="mb-4">
//                   <label className="block text-gray-700">Client ID</label>
//                   <input
//                     type="number"
//                     name="clientId"
//                     value={id}
//                     onChange={handleChange}
//                     className="w-full p-2 border rounded"
//                     required
//                   />
//                 </div> */}
//                 <div className="mb-4">
//                   <label className="block text-gray-700">Description</label>
//                   <textarea
//                     name="content"
//                     value={newDispute.content}
//                     onChange={handleChange}
//                     className="w-full p-2 border rounded"
//                     required
//                   ></textarea>
//                 </div>
//                 <div className="flex justify-end">
//                   <button
//                     type="button"
//                     onClick={handleCloseModal}
//                     className="bg-[#7b7b7b] text-white py-2 px-4 rounded mr-2  hover:bg-[#414141]"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="bg-[#8b47aa] text-white py-2 px-4 rounded  hover:bg-[#6b3286]"
//                   >
//                     Submit
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dispute;






"use client";

import { getLawyerDisputes, submitDispute } from "@/app/lawyer/api/dispute";
import {
  ErrorComponent,
  LoadingComponent,
} from "@/components/LoadingErrorComponents";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

type DisputeData = {
  creator_email: string | null | undefined;
  client_id: number;
  content: string;
  lawyer_id: number;
};

const Dispute = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDispute, setNewDispute] = useState({
    content: "",
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const client_id = Number(searchParams.get("client_id"));

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleChange = (e: any) => {
    setNewDispute({ ...newDispute, [e.target.name]: e.target.value });
  };

  // @ts-ignore
  const lawyerid = session?.user?.image?.id;
  const { data, isLoading, error } = useQuery({
    queryKey: ["disputes"],
    queryFn: () => getLawyerDisputes(lawyerid),
  });

  const mutationFn = async (data: DisputeData) => {
    return submitDispute(data);
  };

  const { mutateAsync }: UseMutationResult<void, unknown, DisputeData> =
    useMutation({
      mutationFn,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["disputes"] });
        toast.success("Dispute submitted successfully!");
        handleCloseModal();
      },
      onError: () => {
        toast.error("Failed to submit the dispute.");
        handleCloseModal();
      },
    });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // @ts-ignore
    if (!session?.user?.email || !session?.user?.image?.id) {
      console.error("Session data is missing");
      return;
    }

    const data: DisputeData = {
      ...newDispute,
      creator_email: session.user.email,
      lawyer_id: lawyerid,
      client_id: client_id,
    };

    try {
      await mutateAsync(data);
    } catch (e) {
      console.error(e);
    }
  };

  if (isLoading) return <LoadingComponent />;
  if (error)
    return (
      <ErrorComponent errorMessage="Failed to load data. Please try again." />
    );

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 to-purple-100 min-h-screen">
      <div className="bg-white shadow-xl rounded-2xl max-w-6xl mx-auto p-10">
        <div className="flex justify-between items-center mb-8">
          <div
            onClick={() => router.back()}
            className="bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-800 cursor-pointer transition"
          >
            Back
          </div>
          <button
            onClick={handleOpenModal}
            className="bg-purple-600 text-white py-2 px-6 rounded-lg shadow hover:bg-purple-700 transition"
          >
            Submit New Dispute
          </button>
        </div>

        <div className="mb-6 space-y-4 text-gray-800">
          <div className="flex gap-8">
            <p className="text-lg font-medium">
              <span className="text-purple-800">Client Name:</span> {data[0]?.client?.full_name}
            </p>
            <p className="text-lg font-medium">
              <span className="text-purple-800">Client ID:</span> {data?.[0]?.client_id}
            </p>
          </div>
          <p className="text-lg font-medium">
            <span className="text-purple-800">Lawyer Email:</span> {data?.[0]?.creator_email}
          </p>
          <p className="text-lg font-medium">
            <span className="text-purple-800">Client Email:</span> {data?.[0]?.client?.email}
          </p>
        </div>

        {data?.map((dispute: any) => (
          <div
            key={dispute.id}
            className="bg-gray-50 p-6 mb-6 rounded-xl shadow-md space-y-4 relative"
          >
            <div>
              <p className="text-xl font-semibold text-purple-800">Description:</p>
              <p className="text-gray-700 text-justify px-2">{dispute.content}</p>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>
                <strong>Status:</strong> {dispute.status}
              </span>
              <span>
                <strong>Submission Date:</strong> {new Date(dispute.created_at).toLocaleDateString()}
              </span>
            </div>
            {dispute.solved && (
              <div>
                <p className="text-lg font-semibold text-purple-800">Resolution:</p>
                <p className="text-gray-700 px-2">{dispute.resolution}</p>
              </div>
            )}
          </div>
        ))}

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Submit New Dispute</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="content"
                    value={newDispute.content}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                    rows={4}
                    required
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dispute;