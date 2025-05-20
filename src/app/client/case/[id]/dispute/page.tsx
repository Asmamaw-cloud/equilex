// "use client";

// import { useEffect, useState } from "react";
// import {
//   getDisputes,
//   geClientDisputes,
//   submitDispute,
// } from "@/app/lawyer/api/dispute";
// import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
// import {
//   useMutation,
//   useQuery,
//   UseMutationResult,
//   useQueryClient,
// } from "@tanstack/react-query";
// import {
//   LoadingComponent,
//   ErrorComponent,
// } from "@/components/LoadingErrorComponents";
// import { toast } from "sonner";

// type DisputeData = {
//   creator_email: string | null | undefined;
//   client_id: number;
//   content: string;
//   lawyer_id: number;
// };

// const Disputes = () => {
//   const queryClient = useQueryClient();

//   const { data: session } = useSession();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newDispute, setNewDispute] = useState({
//     content: "",
//   });
//   // @ts-ignore
//   const clientId = session?.user?.image?.id;
//   const { data, isLoading, error } = useQuery({
//     queryKey: ["disputes"],
//     queryFn: () => geClientDisputes(clientId),
//   });

//   // Ensure data is defined before accessing id
//   const lawyerId = data?.[0]?.client_id;

//   const handleOpenModal = () => setIsModalOpen(true);
//   const handleCloseModal = () => setIsModalOpen(false);
//   const handleChange = (e: any) => {
//     setNewDispute({ ...newDispute, [e.target.name]: e.target.value });
//   };

//   const router = useRouter();

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
//         toast.error("Failed to submite dispute.");
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
//       lawyer_id: lawyerId,
//       client_id: clientId,
//     };

//     try {
//       await mutateAsync(data);
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   useEffect(() => {
//     console.log("from cleint dispute", session);
//   }, [session]);

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
//                 Lawyer_Name:
//               </span>
//               {data?.[0]?.lawyer?.full_name}
//             </p>
//             {/* <p className="flex gap-4 items-center">
//               <span className="text-xl font-bold text-[#60287a]">
//                 Lawyer_ID:
//               </span>
//               {data?.[0]?.lawyer?.lawyer_id}
//             </p> */}
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
//             {session?.user?.email}
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

// export default Disputes;






"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useMutation, useQuery, type UseMutationResult, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { ChevronLeft, Plus, Clock, CheckCircle, AlertTriangle, Send, User, Mail } from "lucide-react"
import { LoadingComponent, ErrorComponent } from "@/components/LoadingErrorComponents"
import { geClientDisputes, submitDispute } from "@/app/lawyer/api/dispute"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { formatDistanceToNow } from "date-fns"

interface DisputeData {
  creator_email: string | null | undefined
  client_id: number
  content: string
  lawyer_id: number
}

interface Dispute {
  id: number
  content: string
  status: string
  created_at: string
  creator_email: string
  solved: boolean
  resolution?: string
  lawyer?: {
    full_name: string
    id: number
  }
  client_id: number
}

const ClientDisputesPage: React.FC = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { data: session } = useSession()
  const [newDispute, setNewDispute] = useState({ content: "" })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Get client ID from session
  const clientId = session?.user?.image?.id as number

  console.log("clientId: ", clientId)
  // Fetch client disputes
  const {
    data: disputes = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["clientDisputes", clientId],
    queryFn: () => geClientDisputes(clientId),
    enabled: !!clientId,
  })

  console.log("client disputes: ", disputes)

  // Get lawyer ID from first dispute (if available)
  const lawyerId = disputes?.[0]?.lawyer?.id || disputes?.[0]?.lawyer_id

  // Submit dispute mutation
  const submitDisputeMutation: UseMutationResult<void, unknown, DisputeData> = useMutation({
    mutationFn: submitDispute,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientDisputes", clientId] })
      toast.success("Dispute submitted successfully!")
      setNewDispute({ content: "" })
      setIsDialogOpen(false)
    },
    onError: () => {
      toast.error("Failed to submit dispute.")
    },
  })

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!session?.user?.email || !clientId) {
      toast.error("Session data is missing. Please log in again.")
      return
    }

    if (!lawyerId) {
      toast.error("Lawyer information is missing.")
      return
    }

    const data: DisputeData = {
      content: newDispute.content,
      creator_email: session.user.email,
      lawyer_id: lawyerId,
      client_id: clientId,
    }

    await submitDisputeMutation.mutateAsync(data)
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return formatDistanceToNow(date, { addSuffix: true })
    } catch (e) {
      return new Date(dateString).toLocaleDateString()
    }
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            Pending
          </Badge>
        )
      case "accepted":
      case "under_review":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
            Under Review
          </Badge>
        )
      case "resolved":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            Resolved
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (isLoading) return <LoadingComponent />
  if (error) return <ErrorComponent errorMessage="Failed to load disputes. Please try again." />

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" onClick={() => router.back()} className="gap-2">
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4" />
                Submit New Dispute
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Submit New Dispute</DialogTitle>
                <DialogDescription>
                  Describe your issue in detail. Our team will review your dispute as soon as possible.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4 py-4">
                  <Textarea
                    name="content"
                    value={newDispute.content}
                    onChange={(e) => setNewDispute({ content: e.target.value })}
                    placeholder="Describe your issue in detail..."
                    className="min-h-[150px]"
                    required
                  />
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    disabled={submitDisputeMutation.isPending || !newDispute.content.trim()}
                    className="gap-2 bg-purple-600 hover:bg-purple-700"
                  >
                    <Send className="h-4 w-4" />
                    {submitDisputeMutation.isPending ? "Submitting..." : "Submit Dispute"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="mb-6 border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">Dispute Details</CardTitle>
            <CardDescription>View and manage your disputes with lawyers</CardDescription>
          </CardHeader>
          <CardContent>
            {disputes.length > 0 && disputes[0].lawyer && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 bg-gray-50 p-4 rounded-lg">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="h-4 w-4 mr-2 text-purple-600" />
                    <span>Lawyer</span>
                  </div>
                  <p className="font-medium">{disputes[3].lawyer.full_name}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Mail className="h-4 w-4 mr-2 text-purple-600" />
                    <span>Contact Email</span>
                  </div>
                  <p className="font-medium">{disputes[0].creator_email}</p>
                </div>
              </div>
            )}

            {disputes.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <AlertTriangle className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                <h3 className="text-lg font-medium text-gray-700">No disputes found</h3>
                <p className="text-gray-500 mt-1">You haven't submitted any disputes yet.</p>
                <Button onClick={() => setIsDialogOpen(true)} className="mt-4 gap-2 bg-purple-600 hover:bg-purple-700">
                  <Plus className="h-4 w-4" />
                  Submit Your First Dispute
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {disputes.map((dispute: Dispute) => (
                  <div key={dispute.id} className="bg-white border border-gray-100 rounded-lg overflow-hidden">
                    <div className="p-4 flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        {getStatusBadge(dispute.status)}
                        <span className="text-sm text-gray-500">ID: #{dispute.id}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {formatDate(dispute.created_at)}
                      </div>
                    </div>
                    <Separator />
                    <div className="p-4">
                      <h3 className="font-medium text-gray-700 mb-2">Description</h3>
                      <p className="text-gray-600 whitespace-pre-wrap">{dispute.content}</p>
                    </div>
                    {dispute.solved && dispute.resolution && (
                      <>
                        <Separator />
                        <div className="p-4 bg-green-50">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <h3 className="font-medium text-green-700">Resolution</h3>
                          </div>
                          <p className="text-gray-600 whitespace-pre-wrap">{dispute.resolution}</p>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ClientDisputesPage
