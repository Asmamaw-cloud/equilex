// 'use client'

// import { acceptDispute, getDisputes, resolveDispute } from "@/app/lawyer/api/dispute";
// import { ErrorComponent, LoadingComponent } from "@/components/LoadingErrorComponents";
// import { Icon } from "@iconify/react";
// import { useMutation, UseMutationResult, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useMemo, useState } from "react";
// import { toast } from "sonner";

// const Dispute = () => {
//     const queryClient = useQueryClient();
//     const pageSize = 5;
//     const visiblePages = 3;
//     const [currentPage, setCurrentPage] = useState(1);

//     const { data, isLoading, error } = useQuery({
//         queryKey: ["disputes"],
//         queryFn: () => getDisputes(),
//         refetchInterval: 3000,
//       });

//       const acceptMutation: UseMutationResult<void, unknown, number> = useMutation({
//         mutationFn: (id: number) => acceptDispute(id),
//         onSuccess: () => {
//           queryClient.invalidateQueries({ queryKey: ["disputes"] });
//           toast.success("Dispute Accepted successfully!");
//         },
//         onError:()=>{
//           toast.error("Failed to Accept the dispute.");
//         }
    
//       });

//       const handleAccept = async (id: number) => {
//         await acceptMutation.mutateAsync(id);
//       };

//       const resolveMutation: UseMutationResult<void, unknown, number> = useMutation({
//         mutationFn: (id: number) => resolveDispute(id),
//         onSuccess: () => {
//           queryClient.invalidateQueries({ queryKey: ["disputes"] });
//           toast.success("Dispute Resolved successfully!");
//         },
//         onError:()=>{
//           toast.error("Failed to Resolve the dispute.");
//         }
//       });

//       const handleResolve = async (id: number) => {
//         await resolveMutation.mutateAsync(id);
//       };

//       const totalPages = useMemo(() => {
//         return Math.ceil(data?.length / pageSize);
//       }, [data]);

//       const startPage = useMemo(() => {
//         let start = 1;
//         if (totalPages > visiblePages) {
//           const halfVisiblePages = Math.floor(visiblePages / 2);
//           start = currentPage - halfVisiblePages;
//           start = Math.max(start, 1);
//           start = Math.min(start, totalPages - visiblePages + 1);
//         }
//         return start;
//       }, [currentPage, totalPages, visiblePages]);
    
//       const endPage = useMemo(() => {
//         return Math.min(startPage + visiblePages - 1, totalPages);
//       }, [startPage, totalPages, visiblePages]);

//       const pages = useMemo(() => {
//         const array = [];
//         if (startPage > 1) {
//           array.push(1);
//           if (startPage > 2) {
//             array.push("...");
//           }
//         }
    
//         for (let i = startPage; i <= endPage; i++) {
//           array.push(i);
//         }
    
//         if (endPage < totalPages) {
//           if (endPage < totalPages - 1) {
//             array.push("...");
//           }
//           array.push(totalPages);
//         }
//         return array;
//       }, [startPage, endPage, totalPages]);

//     const paginatedDisputes = useMemo(() => {
//         const startIndex = (currentPage - 1) * pageSize;
//         const endIndex = startIndex + pageSize;
//         return data?.slice(startIndex, endIndex);
//       }, [currentPage, data, pageSize]);

//       const nextPage = () => {
//         if (currentPage < totalPages) {
//           setCurrentPage((prevPage) => prevPage + 1);
//         }
//       };
    
//       const prevPage = () => {
//         if (currentPage > 1) {
//           setCurrentPage((prevPage) => prevPage - 1);
//         }
//       };

//       if (isLoading) return <LoadingComponent />;
//   if (error)
//     return (
//       <ErrorComponent errorMessage="Failed to load data. Please try again." />
//     );
    
//   return (
//     <div className="w-full font-sans min-h-screen pt-28 pl-10 lg:pl-72 bg-[#f2f6fa] text-black overflow-auto">
//         <div className="rounded-2xl overflow-auto py-10 pr-10">
//         <table className="w-3/4 lg:w-full text-left rounded-xl">
//           <thead>
//             <tr className="bg-white text-gray-600 rounded-xl">
//               <th className="py-3 px-6 text-center">Lawyer ID</th>
//               <th className="py-3 px-6 text-center">Client ID</th>
//               <th className="py-3 px-6 text-center">Description</th>
//               <th className="py-3 px-6 text-center">Status</th>
//               <th className="py-3 px-6 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedDisputes?.map((dispute: any, index: any) => (
//               <tr
//                 className={
//                   index % 2 === 0
//                     ? "relative bg-[#F4F4F4]"
//                     : "relative bg-white"
//                 }
//                 key={index}
//               >
//                 <td className="py-3 px-6 text-black text-center">
//                   {dispute.lawyer_id}
//                 </td>
//                 <td className="py-3 px-6 text-black text-center">
//                   {dispute.client_id}
//                 </td>
//                 <td className="py-3 px-6 text-black max-w-[200px] text-center truncate hover:text-clip">
//                   <span title={dispute.content}>{dispute.content}</span>
//                 </td>
//                 <td className="py-3 px-6 text-black text-center">
//                   {dispute.status}
//                 </td>
//                 <td className="py-3 px-6 text-black text-center">
//                   <div className="flex gap-4 items-center justify-center">
//                     <button
//                       className="rounded py-2 px-6 text-lg font-semibold outline-double outline-[#7B3B99] hover:bg-gray-200 transition"
//                       onClick={() => handleAccept(dispute.id)}
//                     >
//                       Accept
//                     </button>
//                     <button
//                       className="rounded py-2 px-6 text-lg font-semibold bg-[#7B3B99] text-white hover:bg-[#5a2e7a] transition"
//                       onClick={() => handleResolve(dispute.id)}
//                     >
//                       Resolve
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div className="flex justify-between w-full text-black bg-white p-3 mt-4 rounded-lg">
//           <div className="flex items-center gap-4">
//             <p>Showing Page</p>
//             <div className="px-2 h-fit text-[#7B3B99] border-2">
//               {currentPage}
//             </div>
//             <p>Out of {totalPages}</p>
//           </div>
//           <div className="flex items-center gap-2 text-black">
//             <div onClick={prevPage} className="cursor-pointer text-black">
//               <Icon icon="ep:arrow-left-bold" />
//             </div>
//             {pages.map((page, index) => (
//               <div
//                 key={index}
//                 onClick={() => setCurrentPage(Number(page))}
//                 className={`px-1 cursor-pointer ${currentPage === page ? "bg-[#7B3B99] border-2 rounded-lg text-white" : "text-black"}`}
//               >
//                 {page}
//               </div>
//             ))}
//             <div onClick={nextPage} className="cursor-pointer">
//               <Icon icon="ep:arrow-right-bold" />
//             </div>
//           </div>
//         </div>
//         </div>
//     </div>
//   )
// }

// export default Dispute



// 'use client'

// import { acceptDispute, getDisputes, resolveDispute } from "@/app/lawyer/api/dispute";
// import { ErrorComponent, LoadingComponent } from "@/components/LoadingErrorComponents";
// import { Icon } from "@iconify/react";
// import { useMutation, UseMutationResult, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useMemo, useState } from "react";
// import { toast } from "sonner";

// const Dispute = () => {
//     const queryClient = useQueryClient();
//     const pageSize = 5;
//     const visiblePages = 3;
//     const [currentPage, setCurrentPage] = useState(1);

//     // Fetch the disputes
//     const { data, isLoading, error } = useQuery({
//         queryKey: ["disputes"],
//         queryFn: () => getDisputes(),
//         refetchInterval: 3000,
//     });

//     // Mutation for accepting (acknowledging) a dispute
//     const acceptMutation: UseMutationResult<void, unknown, number> = useMutation({
//         mutationFn: (id: number) => acceptDispute(id),
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ["disputes"] });
//             toast.success("Dispute Acknowledged successfully!");
//         },
//         onError: () => {
//             toast.error("Failed to Acknowledge the dispute.");
//         },
//     });

//     // Handle accepting the dispute
//     const handleAccept = async (id: number) => {
//         await acceptMutation.mutateAsync(id);
//     };

//     // Mutation for resolving a dispute
//     const resolveMutation: UseMutationResult<void, unknown, number> = useMutation({
//         mutationFn: (id: number) => resolveDispute(id),
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ["disputes"] });
//             toast.success("Dispute Resolved successfully!");
//         },
//         onError: () => {
//             toast.error("Failed to Resolve the dispute.");
//         },
//     });

//     // Handle resolving the dispute
//     const handleResolve = async (id: number) => {
//         await resolveMutation.mutateAsync(id);
//     };

//     // Calculate total pages for pagination
//     const totalPages = useMemo(() => {
//         return Math.ceil(data?.length / pageSize);
//     }, [data]);

//     // Calculate the start page for pagination
//     const startPage = useMemo(() => {
//         let start = 1;
//         if (totalPages > visiblePages) {
//             const halfVisiblePages = Math.floor(visiblePages / 2);
//             start = currentPage - halfVisiblePages;
//             start = Math.max(start, 1);
//             start = Math.min(start, totalPages - visiblePages + 1);
//         }
//         return start;
//     }, [currentPage, totalPages, visiblePages]);

//     // Calculate the end page for pagination
//     const endPage = useMemo(() => {
//         return Math.min(startPage + visiblePages - 1, totalPages);
//     }, [startPage, totalPages, visiblePages]);

//     // Generate page numbers for pagination
//     const pages = useMemo(() => {
//         const array = [];
//         if (startPage > 1) {
//             array.push(1);
//             if (startPage > 2) {
//                 array.push("...");
//             }
//         }

//         for (let i = startPage; i <= endPage; i++) {
//             array.push(i);
//         }

//         if (endPage < totalPages) {
//             if (endPage < totalPages - 1) {
//                 array.push("...");
//             }
//             array.push(totalPages);
//         }
//         return array;
//     }, [startPage, endPage, totalPages]);

//     // Paginate the disputes
//     const paginatedDisputes = useMemo(() => {
//         const startIndex = (currentPage - 1) * pageSize;
//         const endIndex = startIndex + pageSize;
//         return data?.slice(startIndex, endIndex);
//     }, [currentPage, data, pageSize]);

//     // Move to the next page
//     const nextPage = () => {
//         if (currentPage < totalPages) {
//             setCurrentPage((prevPage) => prevPage + 1);
//         }
//     };

//     // Move to the previous page
//     const prevPage = () => {
//         if (currentPage > 1) {
//             setCurrentPage((prevPage) => prevPage - 1);
//         }
//     };

//     // Loading and error handling
//     if (isLoading) return <LoadingComponent />;
//     if (error) return <ErrorComponent errorMessage="Failed to load data. Please try again." />;

//     return (
//         <div className="w-full font-sans min-h-screen pt-28 pl-10 lg:pl-72 bg-[#f2f6fa] text-black overflow-auto">
//             <div className="rounded-2xl overflow-auto py-10 pr-10">
//                 <table className="w-3/4 lg:w-full text-left rounded-xl">
//                     <thead>
//                         <tr className="bg-white text-gray-600 rounded-xl">
//                             <th className="py-3 px-6 text-center">Lawyer ID</th>
//                             <th className="py-3 px-6 text-center">Client ID</th>
//                             <th className="py-3 px-6 text-center">Description</th>
//                             <th className="py-3 px-6 text-center">Status</th>
//                             <th className="py-3 px-6 text-center">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {paginatedDisputes?.map((dispute: any, index: any) => (
//                             <tr
//                                 className={index % 2 === 0 ? "relative bg-[#F4F4F4]" : "relative bg-white"}
//                                 key={dispute.id}
//                             >
//                                 <td className="py-3 px-6 text-black text-center">
//                                     {dispute.lawyer_id}
//                                 </td>
//                                 <td className="py-3 px-6 text-black text-center">
//                                     {dispute.client_id}
//                                 </td>
//                                 <td className="py-3 px-6 text-black max-w-[200px] text-center truncate hover:text-clip">
//                                     <span title={dispute.content}>{dispute.content}</span>
//                                 </td>
//                                 <td className="py-3 px-6 text-black text-center">
//                                     {dispute.status}
//                                 </td>
//                                 <td className="py-3 px-6 text-black text-center">
//                                     <div className="flex gap-4 items-center justify-center">
//                                         {dispute.status === "PENDING" && (
//                                             <button
//                                                 className="rounded py-2 px-6 text-lg font-semibold outline-double outline-[#7B3B99] hover:bg-gray-200 transition"
//                                                 onClick={() => handleAccept(dispute.id)}
//                                             >
//                                                 Acknowledge
//                                             </button>
//                                         )}
//                                         {dispute.status === "UNDER_REVIEW" && (
//                                             <button
//                                                 className="rounded py-2 px-6 text-lg font-semibold bg-[#7B3B99] text-white hover:bg-[#5a2e7a] transition"
//                                                 onClick={() => handleResolve(dispute.id)}
//                                             >
//                                                 Resolve
//                                             </button>
//                                         )}
//                                     </div>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//                 <div className="flex justify-between w-full text-black bg-white p-3 mt-4 rounded-lg">
//                     <div className="flex items-center gap-4">
//                         <p>Showing Page</p>
//                         <div className="px-2 h-fit text-[#7B3B99] border-2">{currentPage}</div>
//                         <p>Out of {totalPages}</p>
//                     </div>
//                     <div className="flex items-center gap-2 text-black">
//                         <div onClick={prevPage} className="cursor-pointer text-black">
//                             <Icon icon="ep:arrow-left-bold" />
//                         </div>
//                         {pages.map((page, index) => (
//                             <div
//                                 key={index}
//                                 onClick={() => setCurrentPage(Number(page))}
//                                 className={`px-1 cursor-pointer ${
//                                     currentPage === page
//                                         ? "bg-[#7B3B99] border-2 rounded-lg text-white"
//                                         : "text-black"
//                                 }`}
//                             >
//                                 {page}
//                             </div>
//                         ))}
//                         <div onClick={nextPage} className="cursor-pointer">
//                             <Icon icon="ep:arrow-right-bold" />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Dispute;



















// "use client"

// import { useState } from "react"
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
// import { toast } from "sonner"
// import { ChevronLeft, ChevronRight } from "lucide-react"

// import { ErrorComponent, LoadingComponent } from "@/components/LoadingErrorComponents"
// import { acceptDispute, getDisputes, resolveDispute } from "@/app/lawyer/api/dispute"

// // Define proper TypeScript interface
// interface Dispute {
//   id: number
//   lawyer_id: string
//   client_id: string
//   content: string
//   status: string
// }

// const DisputeManagement = () => {
//   const queryClient = useQueryClient()
//   const [currentPage, setCurrentPage] = useState(1)

//   // Configuration constants
//   const PAGE_SIZE = 5

//   // Fetch disputes data
//   const {
//     data: disputes = [],
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["disputes"],
//     queryFn: getDisputes,
//     refetchInterval: 3000,
//   })

//   // Mutations for dispute actions
//   const acceptMutation = useMutation({
//     mutationFn: acceptDispute,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["disputes"] })
//       toast.success("Dispute accepted successfully!")
//     },
//     onError: () => toast.error("Failed to accept the dispute."),
//   })

//   const resolveMutation = useMutation({
//     mutationFn: resolveDispute,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["disputes"] })
//       toast.success("Dispute resolved successfully!")
//     },
//     onError: () => toast.error("Failed to resolve the dispute."),
//   })

//   // Pagination calculations
//   const totalPages = Math.ceil(disputes.length / PAGE_SIZE)
//   const startIndex = (currentPage - 1) * PAGE_SIZE
//   const currentDisputes = disputes.slice(startIndex, startIndex + PAGE_SIZE)

//   // Simplified pagination display
//   const generatePaginationNumbers = () => {
//     const pages = []
//     const maxVisiblePages = 5

//     if (totalPages <= maxVisiblePages) {
//       // Show all pages if total is less than max visible
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i)
//       }
//     } else {
//       // Always show first page
//       pages.push(1)

//       // Calculate middle pages
//       const leftBound = Math.max(2, currentPage - 1)
//       const rightBound = Math.min(totalPages - 1, currentPage + 1)

//       // Add ellipsis after first page if needed
//       if (leftBound > 2) pages.push("...")

//       // Add visible page numbers
//       for (let i = leftBound; i <= rightBound; i++) {
//         pages.push(i)
//       }

//       // Add ellipsis before last page if needed
//       if (rightBound < totalPages - 1) pages.push("...")

//       // Always show last page
//       pages.push(totalPages)
//     }

//     return pages
//   }

//   // Loading and error states
//   if (isLoading) return <LoadingComponent />
//   if (error) return <ErrorComponent errorMessage="Failed to load disputes. Please try again." />

//   return (
//     <div className="w-full font-sans min-h-screen pt-28 pl-10 lg:pl-16 bg-[#f2f6fa] text-black overflow-auto">
//       <div className="rounded-2xl overflow-auto py-10 pr-10">
//         {disputes.length === 0 ? (
//           <div className="bg-white rounded-xl p-8 text-center text-gray-500">No disputes found</div>
//         ) : (
//           <>
//             <div className="overflow-x-auto">
//               <table className="w-full text-left rounded-xl border-separate border-spacing-0">
//                 <thead>
//                   <tr className="bg-white text-gray-600 rounded-xl">
//                     <th className="py-4 px-6 text-center">Lawyer ID</th>
//                     <th className="py-4 px-6 text-center">Client ID</th>
//                     <th className="py-4 px-6 text-center">Description</th>
//                     <th className="py-4 px-6 text-center">Status</th>
//                     <th className="py-4 px-6 text-center">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentDisputes.map((dispute: Dispute, index: number) => (
//                     <tr key={dispute.id} className={index % 2 === 0 ? "bg-[#F4F4F4]" : "bg-white"}>
//                       <td className="py-4 px-6 text-black text-center">{dispute.lawyer_id}</td>
//                       <td className="py-4 px-6 text-black text-center">{dispute.client_id}</td>
//                       <td className="py-4 px-6 text-black text-center">
//                         <div className="max-w-[200px] truncate" title={dispute.content}>
//                           {dispute.content}
//                         </div>
//                       </td>
//                       <td className="py-4 px-6 text-black text-center">
//                         <span
//                           className={`px-3 py-1 rounded-full text-sm ${
//                             dispute.status === "pending"
//                               ? "bg-yellow-100 text-yellow-800"
//                               : dispute.status === "accepted"
//                                 ? "bg-blue-100 text-blue-800"
//                                 : "bg-green-100 text-green-800"
//                           }`}
//                         >
//                           {dispute.status}
//                         </span>
//                       </td>
//                       <td className="py-4 px-6 text-black text-center">
//                         <div className="flex gap-4 items-center justify-center">
//                           {dispute.status === "pending" && (
//                             <button
//                               className="rounded py-2 px-4 text-sm font-semibold outline-double outline-[#7B3B99] hover:bg-gray-200 transition"
//                               onClick={() => acceptMutation.mutate(dispute.id)}
//                             >
//                               Accept
//                             </button>
//                           )}
//                           {dispute.status === "accepted" && (
//                             <button
//                               className="rounded py-2 px-4 text-sm font-semibold bg-[#7B3B99] text-white hover:bg-[#5a2e7a] transition"
//                               onClick={() => resolveMutation.mutate(dispute.id)}
//                             >
//                               Resolve
//                             </button>
//                           )}
//                           {dispute.status === "resolved" && (
//                             <span className="text-sm text-gray-500">No actions available</span>
//                           )}
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {totalPages > 1 && (
//               <div className="flex justify-between items-center w-full text-black bg-white p-4 mt-4 rounded-lg shadow-sm">
//                 <div className="text-sm text-gray-600">
//                   Page {currentPage} of {totalPages}
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <button
//                     onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
//                     disabled={currentPage === 1}
//                     className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     <ChevronLeft className="h-5 w-5" />
//                   </button>

//                   <div className="flex items-center">
//                     {generatePaginationNumbers().map((page, index) => (
//                       <div
//                         key={index}
//                         onClick={() => typeof page === "number" && setCurrentPage(page)}
//                         className={`
//                           mx-1 min-w-[32px] h-8 flex items-center justify-center rounded-md text-sm
//                           ${typeof page === "number" ? "cursor-pointer hover:bg-gray-100" : ""}
//                           ${currentPage === page ? "bg-[#7B3B99] text-white" : "text-gray-700"}
//                         `}
//                       >
//                         {page}
//                       </div>
//                     ))}
//                   </div>

//                   <button
//                     onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
//                     disabled={currentPage === totalPages}
//                     className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     <ChevronRight className="h-5 w-5" />
//                   </button>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   )
// }

// export default DisputeManagement







"use client"

import type React from "react"

import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { ChevronLeft, ChevronRight, Filter, Search, AlertTriangle, Eye, CheckCircle } from "lucide-react"
import { ErrorComponent, LoadingComponent } from "@/components/LoadingErrorComponents"
import { acceptDispute, getDisputes, resolveDispute } from "@/app/lawyer/api/dispute"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { formatDistanceToNow } from "date-fns"

// Define proper TypeScript interface
interface Dispute {
  id: number
  lawyer_id: string
  client_id: string
  content: string
  status: string
  created_at?: string
  case_id?: number
}

const DisputeManagement: React.FC = () => {
  const queryClient = useQueryClient()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null)

  // Configuration constants
  const PAGE_SIZE = 10

  // Fetch disputes data
  const {
    data: disputes = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["disputes"],
    queryFn: getDisputes,
    refetchInterval: 60000, // Refetch every minute instead of every 3 seconds
  })

  // Mutations for dispute actions
  const acceptMutation = useMutation({
    mutationFn: acceptDispute,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["disputes"] })
      toast.success("Dispute accepted successfully!")
    },
    onError: () => toast.error("Failed to accept the dispute."),
  })

  const resolveMutation = useMutation({
    mutationFn: resolveDispute,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["disputes"] })
      toast.success("Dispute resolved successfully!")
    },
    onError: () => toast.error("Failed to resolve the dispute."),
  })

  // Filter and search disputes
  const filteredDisputes = disputes.filter((dispute: Dispute) => {
    const matchesSearch =
      searchTerm === "" ||
      dispute.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.lawyer_id.toString().includes(searchTerm) ||
      dispute.client_id.toString().includes(searchTerm)

    const matchesStatus = statusFilter === null || dispute.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  // Pagination calculations
  const totalPages = Math.ceil(filteredDisputes.length / PAGE_SIZE)
  const startIndex = (currentPage - 1) * PAGE_SIZE
  const currentDisputes = filteredDisputes.slice(startIndex, startIndex + PAGE_SIZE)

  // Reset to first page when filters change
  const handleFilterChange = (status: string | null) => {
    setStatusFilter(status)
    setCurrentPage(1)
  }

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  // Simplified pagination display
  const generatePaginationNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      // Calculate middle pages
      const leftBound = Math.max(2, currentPage - 1)
      const rightBound = Math.min(totalPages - 1, currentPage + 1)

      // Add ellipsis after first page if needed
      if (leftBound > 2) pages.push("...")

      // Add visible page numbers
      for (let i = leftBound; i <= rightBound; i++) {
        pages.push(i)
      }

      // Add ellipsis before last page if needed
      if (rightBound < totalPages - 1) pages.push("...")

      // Always show last page
      pages.push(totalPages)
    }

    return pages
  }

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            Pending
          </Badge>
        )
      case "accepted":
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

  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A"
    try {
      const date = new Date(dateString)
      return formatDistanceToNow(date, { addSuffix: true })
    } catch (e) {
      return dateString
    }
  }

  // Loading and error states
  if (isLoading) return <LoadingComponent />
  if (error) return <ErrorComponent errorMessage="Failed to load disputes. Please try again." />

  return (
    <div className="w-full min-h-screen pt-28 pl-10 lg:pl-72 pr-10 bg-gray-50">
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold">Dispute Management</CardTitle>
              <CardDescription>Review and resolve disputes between lawyers and clients</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search disputes..."
                  className="pl-9 w-full md:w-[250px]"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleFilterChange(null)}>All Statuses</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleFilterChange("pending")}>Pending</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleFilterChange("accepted")}>Under Review</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleFilterChange("resolved")}>Resolved</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          {filteredDisputes.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center text-gray-500 border border-gray-100">
              <AlertTriangle className="h-12 w-12 mx-auto text-gray-300 mb-3" />
              <h3 className="text-lg font-medium text-gray-700">No disputes found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || statusFilter
                  ? "Try adjusting your search or filter criteria"
                  : "There are no disputes to manage at this time"}
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto rounded-lg border border-gray-100">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50 text-gray-600 text-sm">
                      <th className="py-3 px-4">Case ID</th>
                      <th className="py-3 px-4">Lawyer</th>
                      <th className="py-3 px-4">Client</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Submitted</th>
                      <th className="py-3 px-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {currentDisputes.map((dispute: Dispute) => (
                      <tr key={dispute.id} className="bg-white hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">#{dispute.case_id || dispute.id}</td>
                        <td className="py-3 px-4">{dispute.lawyer_id}</td>
                        <td className="py-3 px-4">{dispute.client_id}</td>
                        <td className="py-3 px-4">{getStatusBadge(dispute.status)}</td>
                        <td className="py-3 px-4 text-gray-500 text-sm">{formatDate(dispute.created_at)}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-center gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 px-2"
                                  onClick={() => setSelectedDispute(dispute)}
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Dispute Details</DialogTitle>
                                  <DialogDescription>
                                    Case #{selectedDispute?.case_id || selectedDispute?.id}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                      <p className="text-gray-500">Lawyer ID</p>
                                      <p className="font-medium">{selectedDispute?.lawyer_id}</p>
                                    </div>
                                    <div>
                                      <p className="text-gray-500">Client ID</p>
                                      <p className="font-medium">{selectedDispute?.client_id}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <p className="text-gray-500 text-sm">Status</p>
                                    <div className="mt-1">
                                      {selectedDispute && getStatusBadge(selectedDispute.status)}
                                    </div>
                                  </div>
                                  <div>
                                    <p className="text-gray-500 text-sm">Description</p>
                                    <p className="mt-1 p-3 bg-gray-50 rounded-md text-gray-700">
                                      {selectedDispute?.content}
                                    </p>
                                  </div>
                                </div>
                                <DialogFooter>
                                  {selectedDispute?.status.toLowerCase() === "pending" && (
                                    <Button
                                      onClick={() => {
                                        acceptMutation.mutate(selectedDispute.id)
                                        setSelectedDispute(null)
                                      }}
                                      disabled={acceptMutation.isPending}
                                    >
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      {acceptMutation.isPending ? "Processing..." : "Accept Dispute"}
                                    </Button>
                                  )}
                                  {selectedDispute?.status.toLowerCase() === "accepted" && (
                                    <Button
                                      onClick={() => {
                                        resolveMutation.mutate(selectedDispute.id)
                                        setSelectedDispute(null)
                                      }}
                                      disabled={resolveMutation.isPending}
                                    >
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      {resolveMutation.isPending ? "Processing..." : "Resolve Dispute"}
                                    </Button>
                                  )}
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>

                            {dispute.status.toLowerCase() === "pending" && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 px-2 border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100"
                                onClick={() => acceptMutation.mutate(dispute.id)}
                                disabled={acceptMutation.isPending}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Accept
                              </Button>
                            )}

                            {dispute.status.toLowerCase() === "accepted" && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 px-2 border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                                onClick={() => resolveMutation.mutate(dispute.id)}
                                disabled={resolveMutation.isPending}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Resolve
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="flex justify-between items-center mt-4 px-2">
                  <div className="text-sm text-gray-500">
                    Showing {startIndex + 1}-{Math.min(startIndex + PAGE_SIZE, filteredDisputes.length)} of{" "}
                    {filteredDisputes.length} disputes
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <div className="flex items-center">
                      {generatePaginationNumbers().map((page, index) => (
                        <div
                          key={index}
                          onClick={() => typeof page === "number" && setCurrentPage(page)}
                          className={`
                            mx-1 min-w-[32px] h-8 flex items-center justify-center rounded-md text-sm
                            ${typeof page === "number" ? "cursor-pointer hover:bg-gray-100" : ""}
                            ${
                              currentPage === page
                                ? "bg-purple-600 text-white"
                                : typeof page === "number"
                                  ? "text-gray-700"
                                  : "text-gray-400"
                            }
                          `}
                        >
                          {page}
                        </div>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default DisputeManagement
