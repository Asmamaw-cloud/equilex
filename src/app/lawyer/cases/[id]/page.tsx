// "use client";
// import React, { useState } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import {
//   useMutation,
//   useQuery,
//   UseMutationResult,
//   useQueryClient,
// } from "@tanstack/react-query";
// import { deliver, getCasesById } from "../../api/offer";
// import {
//   LoadingComponent,
//   ErrorComponent,
// } from "@/components/LoadingErrorComponents";
// import { addTrial, getTrialsForCase } from "../../api/trial";
// import { toast } from "sonner";

// function CaseDetail() {
//   const queryClient = useQueryClient();

//   const [inputData, setInputData] = useState({
//     trial_date: "",
//     description: "",
//     location: "",
//   });
//   const router = useRouter();
//   const path = usePathname();

//   // Extract the id from the path
//   const id = Number(path.split("/").pop()); // Assumes the id is the last part of the path

//   const {
//     data: trialData,
//     isLoading: trialLoading,
//     error: trialError,
//   } = useQuery({
//     queryKey: ["trial"],
//     queryFn: () => getTrialsForCase(id),
//     refetchInterval: 600,
//     // Ensure the query only runs if id is defined
//   });

//   const {
//     data: caseData,
//     isLoading: caseLoading,
//     error: caseError,
//   } = useQuery({
//     queryKey: ["case"],
//     queryFn: () => getCasesById(id),
//     // Ensure the query only runs if id is defined
//   });

//   const handleChange = (e: any) => {
//     setInputData({ ...inputData, [e.target.name]: e.target.value });
//   };
//   const mutationFn = async (data: Object) => {
//     return addTrial(data);
//   };

//   const { mutateAsync }: UseMutationResult<void, unknown, Object> = useMutation(
//     {
//       mutationFn,

//       onSuccess: () => {
//         queryClient.invalidateQueries({ queryKey: ["trial"] });
//         toast.success("Trial submited successfully!");

//         setInputData({
//           trial_date: "",
//           description: "",
//           location: "",
//         });
//       },
//       onError: () => {
//         toast.error("Failed to submite trial.");
//       },
//     }
//   );

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     const formattedDate = new Date(inputData.trial_date).toISOString();
//     const data = {
//       ...inputData,
//       case_id: id,
//       trial_date: formattedDate,
//     };
//     await mutateAsync(data);
//   };

//   const deliverMutation: UseMutationResult<void, unknown, number> = useMutation(
//     {
//       mutationFn: (id: number) => deliver(id),
//       onSuccess: () => {
//         queryClient.invalidateQueries({ queryKey: ["case"] });
//         toast.success("Delivery request is made successfully!");
//       },
//       onError: () => {
//         toast.error("Failed to make Delivery.");
//       },
//     }
//   );

//   const handleDeliver = async (id: number) => {
//     await deliverMutation.mutateAsync(id);
//   };

//   if (caseLoading && trialLoading) return <LoadingComponent />;
//   if (trialError && caseError)
//     return (
//       <ErrorComponent errorMessage="Failed to load data. Please try again." />
//     );

//     console.log("caseData", caseData);

//   return (
//     <>
//       <div className="container mx-auto px-4 pt-10 relative">
//         <div className="mb-4 p-10 border rounded shadow-md relative">
//           <div className="flex justify-between  items-center mb-4 ">
//             <div
//               onClick={() => router.back()}
//               className=" bg-[#7B3B99] text-white font-bold py-2 px-4 rounded transition duration-300 hover:bg-purple-700 inline-block mb-2 md:mb-0 cursor-pointer"
//             >
//               Back
//             </div>
//             {caseData?.status !== "FINISHED" && (
//               <div className="flex gap-4 items-center">
//                 <button
//                   className="px-6 py-2 rounded-md text-lg font-semibold text-white bg-[#7e31a2] "
//                   onClick={() => handleDeliver(id)}
//                 >
//                   Deliver
//                 </button>
//                 <button
//                   className="px-6 py-2 rounded-md text-lg font-semibold text-white bg-[#7e31a2] "
//                   onClick={() =>
//                     router.push(
//                       `${path}/dispute?client_id=${caseData?.client_id}`
//                     )
//                   }
//                 >
//                   DISPUTE
//                 </button>
//               </div>
//             )}
//           </div>

//           <div>
//             <h1 className="text-2xl font-bold mb-2">{caseData?.caseName}</h1>
//             <p className="text-lg mb-1">
//               <span className="font-semibold text-xl">Client Name:</span>{" "}
//               {caseData?.client?.full_name}
//             </p>
//             <div className=" flex flex-col gap-4 text-lg mb-1">
//               <span className="font-semibold text-xl">Description:</span>{" "}
//               <p className="px-4">{caseData?.description}</p>
//             </div>
//             <p className="text-lg mb-1">
//               <span className="font-semibold text-xl">Case ID:</span>{" "}
//               {caseData?.id}
//             </p>
//             <p className="text-lg mb-1">
//               <span className="font-semibold text-xl">Status:</span>{" "}
//               {caseData?.status}
//             </p>
//           </div>
//         </div>

//         <div className="mb-4 px-10 border h-[200px] rounded shadow-md overflow-auto">
//           <h2 className="text-2xl font-bold mb-2 sticky top-0 py-4 bg-white">
//             Previous Trials
//           </h2>
//           {trialData?.length === 0 ? (
//             <p>No trials added yet.</p>
//           ) : (
//             <ul>
//               {trialData?.map((trial: any) => (
//                 <li key={trial.date} className="mb-4 ">
//                   <p>{trialData.indexOf(trial) + 1}</p>
//                   <div className="px-10">
//                     <div className="flex justify-between items-center">
//                       <p>
//                         <span className="font-semibold text-lg text-[#7B3B99]">
//                           Location:
//                         </span>{" "}
//                         {trial.location}
//                       </p>
//                       <p>
//                         <span className="font-semibold text-lg text-[#7B3B99]">
//                           Date:
//                         </span>{" "}
//                         {trial.trial_date}
//                       </p>
//                     </div>

//                     <p>
//                       <span className="font-semibold text-lg text-[#7B3B99]">
//                         Note:
//                       </span>{" "}
//                       {trial.description}
//                     </p>
//                   </div>
//                   <hr />
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {caseData?.status !== "DELIVERED" && (
//           <div className="p-10 border rounded shadow-md">
//             <h2 className="text-xl font-bold mb-2">Add Next Trial</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-2">
//                 <label
//                   htmlFor="date"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Location
//                 </label>
//                 <input
//                   name="location"
//                   type="text"
//                   id="location"
//                   value={inputData.location}
//                   onChange={handleChange}
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#7B3B99] focus:ring-[#7B3B99] sm:text-sm p-4"
//                   required
//                 />
//               </div>
//               <div className="mb-2">
//                 <label
//                   htmlFor="date"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Date
//                 </label>
//                 <input
//                   name="trial_date"
//                   type="datetime-local"
//                   id="date"
//                   value={inputData.trial_date}
//                   onChange={handleChange}
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#7B3B99] focus:ring-[#7B3B99] sm:text-sm"
//                   required
//                 />
//               </div>
//               <div className="mb-2">
//                 <label
//                   htmlFor="note"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Note
//                 </label>
//                 <textarea
//                   name="description"
//                   id="note"
//                   value={inputData.description}
//                   onChange={handleChange}
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#7B3B99] focus:ring-[#7B3B99] sm:text-sm"
//                   required
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#7B3B99] hover:bg-[#59286f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 Add Trial
//               </button>
//             </form>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default CaseDetail;





// "use client"
// import type React from "react"
// import { useState } from "react"
// import { useRouter, usePathname } from "next/navigation"
// import { useMutation, useQuery, type UseMutationResult, useQueryClient } from "@tanstack/react-query"
// import { deliver, getCasesById } from "../../api/offer"
// import { LoadingComponent, ErrorComponent } from "@/components/LoadingErrorComponents"
// import { addTrial, getTrialsForCase } from "../../api/trial"
// import { toast } from "sonner"
// import { ArrowLeft, Calendar, MapPin, FileText, Truck, AlertTriangle, Clock } from "lucide-react"
// import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Badge } from "@/components/ui/badge"
// import { Separator } from "@/components/ui/separator"

// function CaseDetail() {
//   const queryClient = useQueryClient()

//   const [inputData, setInputData] = useState({
//     trial_date: "",
//     description: "",
//     location: "",
//   })
//   const router = useRouter()
//   const path = usePathname()

//   // Extract the id from the path
//   const id = Number(path.split("/").pop()) // Assumes the id is the last part of the path

//   const {
//     data: trialData,
//     isLoading: trialLoading,
//     error: trialError,
//   } = useQuery({
//     queryKey: ["trial"],
//     queryFn: () => getTrialsForCase(id),
//     refetchInterval: 600,
//   })

//   const {
//     data: caseData,
//     isLoading: caseLoading,
//     error: caseError,
//   } = useQuery({
//     queryKey: ["case"],
//     queryFn: () => getCasesById(id),
//   })

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setInputData({ ...inputData, [e.target.name]: e.target.value })
//   }

//   const mutationFn = async (data: Object) => {
//     return addTrial(data)
//   }

//   const { mutateAsync }: UseMutationResult<void, unknown, Object> = useMutation({
//     mutationFn,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["trial"] })
//       toast.success("Trial submitted successfully!")

//       setInputData({
//         trial_date: "",
//         description: "",
//         location: "",
//       })
//     },
//     onError: () => {
//       toast.error("Failed to submit trial.")
//     },
//   })

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     const formattedDate = new Date(inputData.trial_date).toISOString()
//     const data = {
//       ...inputData,
//       case_id: id,
//       trial_date: formattedDate,
//     }
//     await mutateAsync(data)
//   }

//   const deliverMutation: UseMutationResult<void, unknown, number> = useMutation({
//     mutationFn: (id: number) => deliver(id),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["case"] })
//       toast.success("Delivery request is made successfully!")
//     },
//     onError: () => {
//       toast.error("Failed to make Delivery.")
//     },
//   })

//   const handleDeliver = async (id: number) => {
//     await deliverMutation.mutateAsync(id)
//   }

//   if (caseLoading && trialLoading) return <LoadingComponent />
//   if (trialError && caseError) return <ErrorComponent errorMessage="Failed to load data. Please try again." />

//   // Get status badge color
//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "FINISHED":
//         return "bg-green-100 text-green-800 border-green-200"
//       case "DELIVERED":
//         return "bg-blue-100 text-blue-800 border-blue-200"
//       default:
//         return "bg-amber-100 text-amber-800 border-amber-200"
//     }
//   }

//   // Format date for display
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString)
//     return new Intl.DateTimeFormat("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     }).format(date)
//   }

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-6xl">
//       <div className="mb-8 flex items-center">
//         <Button variant="outline" onClick={() => router.back()} className="flex items-center gap-2">
//           <ArrowLeft size={16} />
//           Back to Cases
//         </Button>
//         <h1 className="text-3xl font-bold ml-6 flex-grow">Case Details</h1>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Case Information */}
//         <Card className="lg:col-span-2">
//           <CardHeader className="pb-2">
//             <div className="flex justify-between items-start">
//               <div>
//                 <CardTitle className="text-2xl font-bold">{caseData?.caseName}</CardTitle>
//                 <CardDescription className="text-base mt-1">Case #{caseData?.id}</CardDescription>
//               </div>
//               <Badge className={`${getStatusColor(caseData?.status)} px-3 py-1 text-sm font-medium`}>
//                 {caseData?.status}
//               </Badge>
//             </div>
//           </CardHeader>
//           <CardContent className="pt-4">
//             <div className="space-y-4">
//               <div>
//                 <h3 className="text-sm font-medium text-gray-500">Client</h3>
//                 <p className="text-lg font-medium">{caseData?.client?.full_name}</p>
//               </div>

//               <div>
//                 <h3 className="text-sm font-medium text-gray-500">Description</h3>
//                 <p className="mt-1 text-gray-700 bg-gray-50 p-4 rounded-md border border-gray-100">
//                   {caseData?.description}
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//           <CardFooter className="pt-2 flex justify-end gap-3">
//             {caseData?.status !== "FINISHED" && (
//               <>
//                 <Button
//                   variant="outline"
//                   onClick={() => router.push(`${path}/dispute?client_id=${caseData?.client_id}`)}
//                   className="flex items-center gap-2"
//                 >
//                   <AlertTriangle size={16} />
//                   Dispute
//                 </Button>
//                 <Button
//                   onClick={() => handleDeliver(id)}
//                   className="flex items-center gap-2 bg-purple-700 hover:bg-purple-800"
//                 >
//                   <Truck size={16} />
//                   Deliver
//                 </Button>
//               </>
//             )}
//           </CardFooter>
//         </Card>

//         {/* Add Trial Form */}
//         {caseData?.status !== "DELIVERED" && (
//           <Card>
//             <CardHeader>
//               <CardTitle className="text-xl">Add Next Trial</CardTitle>
//               <CardDescription>Schedule the next trial for this case</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                   <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
//                     Location
//                   </label>
//                   <div className="relative">
//                     <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
//                     <Input
//                       id="location"
//                       name="location"
//                       value={inputData.location}
//                       onChange={handleChange}
//                       className="pl-10"
//                       placeholder="Enter trial location"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label htmlFor="trial_date" className="block text-sm font-medium text-gray-700 mb-1">
//                     Date & Time
//                   </label>
//                   <div className="relative">
//                     <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
//                     <Input
//                       id="trial_date"
//                       name="trial_date"
//                       type="datetime-local"
//                       value={inputData.trial_date}
//                       onChange={handleChange}
//                       className="pl-10"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
//                     Notes
//                   </label>
//                   <div className="relative">
//                     <FileText className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
//                     <Textarea
//                       id="description"
//                       name="description"
//                       value={inputData.description}
//                       onChange={handleChange}
//                       className="pl-10 min-h-[100px]"
//                       placeholder="Add trial notes or details"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <Button type="submit" className="w-full bg-purple-700 hover:bg-purple-800">
//                   Schedule Trial
//                 </Button>
//               </form>
//             </CardContent>
//           </Card>
//         )}
//       </div>

//       {/* Previous Trials */}
//       <Card className="mt-6">
//         <CardHeader className="pb-2">
//           <CardTitle className="text-xl flex items-center gap-2">
//             <Clock size={20} />
//             Previous Trials
//           </CardTitle>
//           <CardDescription>
//             {trialData?.length === 0
//               ? "No trials have been scheduled yet"
//               : `${trialData?.length} trial${trialData?.length === 1 ? "" : "s"} scheduled`}
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           {trialData?.length === 0 ? (
//             <div className="text-center py-8 text-gray-500">
//               No trials added yet. Schedule the first trial using the form.
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {trialData?.map((trial: any, index: number) => (
//                 <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
//                   <div className="flex justify-between items-start mb-2">
//                     <div className="flex items-center">
//                       <Badge variant="outline" className="mr-2 bg-white">
//                         Trial #{index + 1}
//                       </Badge>
//                       <div className="flex items-center text-gray-600">
//                         <MapPin size={16} className="mr-1" />
//                         <span>{trial.location}</span>
//                       </div>
//                     </div>
//                     <div className="flex items-center text-gray-600">
//                       <Calendar size={16} className="mr-1" />
//                       <span>{formatDate(trial.trial_date)}</span>
//                     </div>
//                   </div>
//                   <Separator className="my-2" />
//                   <div className="mt-2">
//                     <h4 className="text-sm font-medium text-gray-500 mb-1">Notes</h4>
//                     <p className="text-gray-700">{trial.description}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

// export default CaseDetail




"use client"

import { useParams, usePathname, useRouter } from "next/navigation"
import type React from "react"
import { useState } from "react"
import { useMutation, useQuery, type UseMutationResult, useQueryClient } from "@tanstack/react-query"
import { deliver, getCasesById } from "../../api/offer"
import { addTrial, getTrialsForCase } from "../../api/trial"
import { LoadingComponent, ErrorComponent } from "@/components/LoadingErrorComponents"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Calendar, MapPin, FileText, Truck, AlertTriangle, Clock, User } from "lucide-react"

const CaseDetail: React.FC = () => {
  const queryClient = useQueryClient()
  const params = useParams()
  const router = useRouter()
  const path = usePathname()
  const { id } = params
  const caseId = Number(id)

  const [inputData, setInputData] = useState({
    trial_date: "",
    description: "",
    location: "",
  })

  const {
    data: trialData,
    isLoading: trialLoading,
    error: trialError,
  } = useQuery({
    queryKey: ["trial"],
    queryFn: () => getTrialsForCase(caseId),
    refetchInterval: 600,
  })

  const {
    data: caseData,
    isLoading: caseLoading,
    error: caseError,
  } = useQuery({
    queryKey: ["case"],
    queryFn: () => getCasesById(caseId),
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value })
  }

  const mutationFn = async (data: Object) => {
    return addTrial(data)
  }

  const { mutateAsync }: UseMutationResult<void, unknown, Object> = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trial"] })
      toast.success("Trial submitted successfully!")

      setInputData({
        trial_date: "",
        description: "",
        location: "",
      })
    },
    onError: () => {
      toast.error("Failed to submit trial.")
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formattedDate = new Date(inputData.trial_date).toISOString()
    const data = {
      ...inputData,
      case_id: caseId,
      trial_date: formattedDate,
    }
    await mutateAsync(data)
  }

  const deliverMutation: UseMutationResult<void, unknown, number> = useMutation({
    mutationFn: (id: number) => deliver(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["case"] })
      toast.success("Delivery request is made successfully!")
    },
    onError: () => {
      toast.error("Failed to make Delivery.")
    },
  })

  const handleDeliver = async (id: number) => {
    await deliverMutation.mutateAsync(id)
  }

  if (caseLoading && trialLoading) return <LoadingComponent />
  if (trialError && caseError) return <ErrorComponent errorMessage="Failed to load data. Please try again." />

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="p-6 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => router.back()} className="mr-4">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-gray-800">Case Details</h1>
        </div>

        <Card className="shadow-lg border-0 mb-6">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-t-lg">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl">{caseData?.caseName}</CardTitle>
              <div className="text-sm font-medium flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {caseData?.created_at
                  ? new Date(caseData.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Date not available"}
              </div>
            </div>
            <CardDescription className="text-gray-100">Case #{caseData?.id}</CardDescription>
          </CardHeader>

          <CardContent className="pt-6 pb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <div className="flex items-center text-gray-500">
                  <User className="h-5 w-5 mr-2 text-purple-600" />
                  <span className="font-medium">Client</span>
                </div>
                <p className="text-lg font-medium pl-7">{caseData?.client?.full_name}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-gray-500">
                  <FileText className="h-5 w-5 mr-2 text-purple-600" />
                  <span className="font-medium">Status</span>
                </div>
                <div className="pl-7">
                  <Badge
                    className={`${
                      caseData?.status === "FINISHED"
                        ? "bg-green-100 text-green-800 border-green-200"
                        : caseData?.status === "DELIVERED"
                          ? "bg-blue-100 text-blue-800 border-blue-200"
                          : "bg-amber-100 text-amber-800 border-amber-200"
                    } px-3 py-1 text-sm font-medium`}
                  >
                    {caseData?.status}
                  </Badge>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-700 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-purple-600" />
                Case Summary
              </h3>
              <div className="bg-gray-50 p-4 rounded-md text-gray-700 leading-relaxed">{caseData?.description}</div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row justify-end gap-4 pt-2 pb-6">
            {caseData?.status !== "FINISHED" && (
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Button
                  onClick={() => handleDeliver(caseId)}
                  className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto"
                >
                  <Truck className="h-4 w-4 mr-2" />
                  Deliver
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => router.push(`${path}/dispute?client_id=${caseData?.client_id}`)}
                  className="w-full sm:w-auto"
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Raise Dispute
                </Button>
              </div>
            )}
          </CardFooter>
        </Card>

        {/* Previous Trials */}
        <Card className="shadow-lg border-0 mb-6">
          <CardHeader className="bg-gradient-to-r from-purple-600/90 to-purple-800/90 text-white rounded-t-lg">
            <CardTitle className="text-xl flex items-center gap-2">
              <Clock size={20} />
              Previous Trials
            </CardTitle>
            <CardDescription className="text-gray-100">
              {trialData?.length === 0
                ? "No trials have been scheduled yet"
                : `${trialData?.length} trial${trialData?.length === 1 ? "" : "s"} scheduled`}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 pb-4">
            {trialData?.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No trials added yet. Schedule the first trial using the form.
              </div>
            ) : (
              <div className="space-y-4">
                {trialData?.map((trial: any, index: number) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <Badge variant="outline" className="mr-2 bg-white">
                          Trial #{index + 1}
                        </Badge>
                        <div className="flex items-center text-gray-600">
                          <MapPin size={16} className="mr-1" />
                          <span>{trial.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Calendar size={16} className="mr-1" />
                        <span>{formatDate(trial.trial_date)}</span>
                      </div>
                    </div>
                    <Separator className="my-2" />
                    <div className="mt-2">
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Notes</h4>
                      <p className="text-gray-700">{trial.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add Trial Form */}
        {caseData?.status !== "DELIVERED" && (
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-purple-600/80 to-purple-800/80 text-white rounded-t-lg">
              <CardTitle className="text-xl">Add Next Trial</CardTitle>
              <CardDescription className="text-gray-100">Schedule the next trial for this case</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 pb-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      id="location"
                      name="location"
                      value={inputData.location}
                      onChange={handleChange}
                      className="pl-10"
                      placeholder="Enter trial location"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="trial_date" className="block text-sm font-medium text-gray-700 mb-1">
                    Date & Time
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      id="trial_date"
                      name="trial_date"
                      type="datetime-local"
                      value={inputData.trial_date}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Textarea
                      id="description"
                      name="description"
                      value={inputData.description}
                      onChange={handleChange}
                      className="pl-10 min-h-[100px]"
                      placeholder="Add trial notes or details"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                  Schedule Trial
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default CaseDetail
