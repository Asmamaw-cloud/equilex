"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  useMutation,
  useQuery,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { acceptDelivery, getCasesById } from "@/app/lawyer/api/offer";
import RatingPopup from "@/components/ratingPopup";
import {
  LoadingComponent,
  ErrorComponent,
} from "@/components/LoadingErrorComponents";
import { toast } from "sonner";

const CaseDetail: React.FC = () => {
  const queryClient = useQueryClient();

  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const caseId = Number(id);
  const { data, isLoading, error } = useQuery({
    queryKey: ["case"],
    queryFn: () => getCasesById(caseId),
  });

  const acceptMutation: UseMutationResult<void, unknown, number> = useMutation({
    mutationFn: (id: number) => acceptDelivery(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["case"] });
      toast.success("Delivey Accepted successfully!");
    },
    onError: () => {
      toast.error("Failed to Acccept Delivery!.");
    },
  });

  const handleAccept = async (id: number) => {
    await acceptMutation.mutateAsync(id);
  };

  const [showPopup, setShowPopup] = useState(false);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  if (isLoading) return <LoadingComponent />;
  if (error)
    return (
      <ErrorComponent errorMessage="Failed to load data. Please try again." />
    );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-[#7B3B99]">
          Current case
        </h1>

        <div className="block p-6 bg-white hover:bg-blue-50 relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className=" ml-4 px-4 py-2 bg-[#7B3B99] hover:bg-purple-700 text-white rounded "
              >
                Back
              </button>
              <button
                onClick={handleOpenPopup}
                className="bg-[#7B3B99] text-white font-bold py-2 px-4 rounded hover:bg-purple-700 inline-block"
              >
                Rate_Lawyer
              </button>
            </div>

            <div className="flex items-center gap-4">
              {data?.status !== "FINISHED" && (
                <div>
                  <button
                    onClick={() => handleAccept(Number(id))}
                    className="mt-4 ml-4 px-4 py-2 bg-[#7B3B99] hover:bg-purple-700 text-white rounded "
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => router.push(`/client/case/${id}/dispute`)}
                    className="mt-4 ml-4 px-4 py-2 bg-[#7B3B99] hover:bg-purple-700 text-white rounded "
                  >
                    Dispute
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center  gap-4 w-1/3 self-end absolute top-17 right-4">
            <p className="text-xl text-[#7B3B99] font-semibold">Date</p>
            <p className="text-gray-800">
              {new Date(data?.created_at).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-4 w-1/3">
            <p className="text-xl text-[#7B3B99] font-semibold">Case</p>
            <p className="text-gray-800">{data?.title}</p>
          </div>
          <div className="flex items-center gap-4 w-1/3">
            <p className="text-xl text-[#7B3B99] font-semibold">Lawyer</p>
            <p className="text-gray-800">{data?.lawyer_id}</p>
          </div>

          <div className="mt-6 flex gap-4 items-center">
            <p className="text-xl text-[#7B3B99] font-semibold">Status</p>
            <p className="text-gray-800">{data?.status}</p>
          </div>
          <div className="mt-6">
            <p className="text-xl text-[#7B3B99] font-semibold">Summary</p>
            <p className="text-gray-800">{data?.description}</p>
          </div>
        </div>
      </div>
      <RatingPopup
        show={showPopup}
        onClose={handleClosePopup}
        case_id={data?.id}
        lawyer_id={data?.lawyer_id}
      />
    </div>
  );
};

export default CaseDetail;








// "use client";

// import { useParams, useRouter } from "next/navigation";
// import React, { useState } from "react";
// import {
//   useMutation,
//   useQuery,
//   useQueryClient,
//   UseMutationResult,
// } from "@tanstack/react-query";
// import { acceptDelivery, getCasesById } from "@/app/lawyer/api/offer";
// import RatingPopup from "@/components/ratingPopup";
// import {
//   LoadingComponent,
//   ErrorComponent,
// } from "@/components/LoadingErrorComponents";
// import { toast } from "sonner";

// const CaseDetail: React.FC = () => {
//   const queryClient = useQueryClient();
//   const router = useRouter();
//   const { id } = useParams();
//   const caseId = Number(id);

//   const [showPopup, setShowPopup] = useState(false);

//   const { data, isLoading, error } = useQuery({
//     queryKey: ["case", caseId],
//     queryFn: () => getCasesById(caseId),
//   });

//   const acceptMutation: UseMutationResult<void, unknown, number> = useMutation({
//     mutationFn: (id: number) => acceptDelivery(id),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["case"] });
//       toast.success("Delivery accepted successfully!");
//     },
//     onError: () => {
//       toast.error("Failed to accept delivery.");
//     },
//   });

//   const handleAccept = async () => {
//     await acceptMutation.mutateAsync(caseId);
//   };

//   if (isLoading) return <LoadingComponent />;
//   if (error)
//     return <ErrorComponent errorMessage="Failed to load data. Please try again." />;

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-4xl mx-auto space-y-6">
//         <div className="flex justify-between items-center">
//           <h1 className="text-3xl font-bold text-[#7B3B99]">Case Details</h1>
//           <div className="flex gap-2">
//             <button
//               onClick={() => router.back()}
//               className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
//             >
//               Back
//             </button>
//             <button
//               onClick={() => setShowPopup(true)}
//               className="px-4 py-2 bg-[#7B3B99] hover:bg-purple-700 text-white rounded"
//             >
//               Rate Lawyer
//             </button>
//           </div>
//         </div>

//         <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             <DetailRow label="Case Title" value={data?.title} />
//             <DetailRow label="Date" value={new Date(data?.created_at).toLocaleDateString()} />
//             <DetailRow label="Lawyer ID" value={data?.lawyer_id} />
//             <DetailRow label="Status" value={data?.status} />
//           </div>

//           <div>
//             <p className="text-lg font-semibold text-[#7B3B99]">Summary</p>
//             <p className="text-gray-700 mt-1">{data?.description}</p>
//           </div>

//           {data?.status !== "FINISHED" && (
//             <div className="flex gap-4 mt-6">
//               <button
//                 onClick={handleAccept}
//                 className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
//               >
//                 Accept Delivery
//               </button>
//               <button
//                 onClick={() => router.push(`/client/case/${caseId}/dispute`)}
//                 className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
//               >
//                 Raise Dispute
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       <RatingPopup
//         show={showPopup}
//         onClose={() => setShowPopup(false)}
//         case_id={data?.id}
//         lawyer_id={data?.lawyer_id}
//       />
//     </div>
//   );
// };

// const DetailRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
//   <div>
//     <p className="text-sm text-gray-500">{label}</p>
//     <p className="text-lg font-medium text-gray-800">{value}</p>
//   </div>
// );

// export default CaseDetail;
