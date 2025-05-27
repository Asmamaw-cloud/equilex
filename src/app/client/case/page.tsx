// "use client";
// import React from "react";
// import Link from "next/link";
// import { useSession } from "next-auth/react";
// import {
//   useQuery,
//   useQueryClient,
// } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
// import {
//   LoadingComponent,
//   ErrorComponent,
// } from "@/components/LoadingErrorComponents";
// import { getClientCases } from "../api/case";

// const Cases: React.FC = () => {
//   const { data: session } = useSession();
//   const { data, isLoading, error } = useQuery({
//     queryKey: ["clientcases"],
//     // @ts-ignore
//     queryFn: () => getClientCases(session?.user?.image?.id),
//   });
//   const router = useRouter();

//   // Filter cases based on their status
//   const currentCases = data?.filter(
//     (clientcase: any) => clientcase.status !== "FINISHED"
//   );
//   const recentCases = data?.filter(
//     (clientcase: any) => clientcase.status === "FINISHED"
//   );

//   if (isLoading) return <LoadingComponent />;
//   if (error)
//     return (
//       <ErrorComponent errorMessage="Failed to load data. Please try again." />
//     );

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-4xl font-bold mb-8 text-center text-[#7B3B99]">
//           Client Cases
//         </h1>

//         <div className="bg-white p-10 flex flex-col gap-4 mb-12">
//           <button
//             onClick={() => router.back()}
//             className="bg-[#7B3B99] text-white font-bold py-2 px-4 rounded transition duration-300 hover:bg-purple-700 inline-block mb-2 md:mb-0 cursor-pointer w-20"
//           >
//             Back
//           </button>
//           <h2 className="text-3xl font-semibold mb-4 text-[#7B3B99]">
//             Current Case
//           </h2>
//           {currentCases?.map((clientcase: any) => (
//             <Link href={`/client/case/${clientcase.id}`} key={clientcase?.id}>
//               <div className="block p-6 bg-white hover:bg-blue-50 relative">
//                 <div className="flex items-center gap-4 w-1/3">
//                   <p className="text-xl text-[#7B3B99] font-semibold">Case</p>
//                   <p className="text-gray-800">{clientcase?.title}</p>
//                 </div>
//                 <div className="flex items-center gap-4 w-1/3">
//                   <p className="text-xl text-[#7B3B99] font-semibold">Lawyer</p>
//                   <p className="text-gray-800">{clientcase?.lawyer_id}</p>
//                 </div>
//                 <div className="flex items-center flex-col gap-4 w-1/3 absolute top-6 right-4">
//                   <p className="text-xl text-[#7B3B99] font-semibold">Date</p>
//                   <p className="text-gray-800">{clientcase?.date}</p>
//                 </div>
//                 <div className="mt-6">
//                   <p className="text-xl text-[#7B3B99] font-semibold">
//                     Summary
//                   </p>
//                   <p className="text-gray-800">{clientcase?.description}</p>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>

//         <div className="bg-white p-10 flex flex-col gap-4">
//           <h2 className="text-3xl font-semibold mb-4 text-[#7B3B99]">
//             Recent Cases
//           </h2>
//           {recentCases?.map((clientcase: any) => (
//             <Link href={`/client/case/${clientcase.id}`} key={clientcase?.id}>
//               <div className="block p-6 bg-white hover:bg-blue-50 relative">
//                 <div className="flex items-center gap-4 w-1/3">
//                   <p className="text-xl text-[#7B3B99] font-semibold">Case</p>
//                   <p className="text-gray-800">{clientcase?.title}</p>
//                 </div>
//                 <div className="flex items-center gap-4 w-1/3">
//                   <p className="text-xl text-[#7B3B99] font-semibold">Lawyer</p>
//                   <p className="text-gray-800">{clientcase?.lawyer_id}</p>
//                 </div>
//                 <div className="flex items-center flex-col gap-4 w-1/3 absolute top-6 right-4">
//                   <p className="text-xl text-[#7B3B99] font-semibold">Date</p>
//                   <p className="text-gray-800">{clientcase?.date}</p>
//                 </div>
//                 <div className="mt-6 flex gap-4 items-center">
//                   <p className="text-xl text-[#7B3B99] font-semibold">Status</p>
//                   <p className="text-gray-800">{clientcase?.status}</p>
//                 </div>
//                 <div className="mt-6">
//                   <p className="text-xl text-[#7B3B99] font-semibold">
//                     Summary
//                   </p>
//                   <p className="text-gray-800">{clientcase?.description}</p>
//                 </div>
//               </div>
//               <hr />
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cases;



"use client"
import type React from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Scale, Calendar, User, FileText } from "lucide-react"
import { LoadingComponent, ErrorComponent } from "@/components/LoadingErrorComponents"
import { getClientCases } from "../api/case"

// Types
interface ClientCase {
  id: string
  title: string
  lawyer_id: string
  date: string
  description: string
  status: "ACTIVE" | "PENDING" | "FINISHED" | "CANCELLED"
}

interface SessionUser {
  id: string
  name?: string
  email?: string
  image?: {
    id: string
  }
}

const Cases: React.FC = () => {
  const { data: session } = useSession()
  const router = useRouter()

  const { data, isLoading, error } = useQuery<ClientCase[]>({
    queryKey: ["clientcases"],
    queryFn: () => {
      const user = session?.user as SessionUser
      return getClientCases(user?.image?.id)
    },
    enabled: !!session?.user,
  })

  // Filter cases based on their status
  const currentCases = data?.filter((clientcase) => clientcase.status !== "FINISHED") || []

  const recentCases = data?.filter((clientcase) => clientcase.status === "FINISHED") || []

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      case "FINISHED":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "CANCELLED":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  const CaseCard = ({ clientcase, showStatus = false }: { clientcase: ClientCase; showStatus?: boolean }) => (
    <Link href={`/client/case/${clientcase.id}`} key={clientcase.id}>
      <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold text-purple-700 line-clamp-1">{clientcase.title}</h3>
            {showStatus && <Badge className={getStatusColor(clientcase.status)}>{clientcase.status}</Badge>}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <User className="h-4 w-4" />
            <span className="font-medium">Lawyer:</span>
            <span>{clientcase.lawyer_id}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span className="font-medium">Date:</span>
            <span>{new Date(clientcase.date).toLocaleDateString()}</span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FileText className="h-4 w-4" />
              <span className="font-medium">Summary:</span>
            </div>
            <p className="text-sm text-gray-700 line-clamp-2">{clientcase.description}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )

  const CasesSection = ({
    title,
    cases,
    showStatus = false,
    emptyMessage = "No cases found.",
  }: {
    title: string
    cases: ClientCase[]
    showStatus?: boolean
    emptyMessage?: string
  }) => (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold text-purple-700">{title}</h2>
      {cases.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>{emptyMessage}</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
          {cases.map((clientcase) => (
            <CaseCard key={clientcase.id} clientcase={clientcase} showStatus={showStatus} />
          ))}
        </div>
      )}
    </section>
  )

  if (isLoading) return <LoadingComponent />

  if (error) {
    return <ErrorComponent errorMessage="Failed to load cases. Please try again." />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <Button variant="outline" onClick={() => router.back()} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <div className="flex items-center gap-3 mb-2">
            <Scale className="h-8 w-8 text-purple-700" />
            <h1 className="text-3xl font-bold text-purple-700">My Cases</h1>
          </div>
          <p className="text-gray-600">Manage and track your legal cases</p>
        </div>

        {/* Cases Sections */}
        <div className="space-y-8">
          <CasesSection
            title="Current Cases"
            cases={currentCases}
            emptyMessage="You have no active cases at the moment."
          />

          <CasesSection
            title="Recent Cases"
            cases={recentCases}
            showStatus={true}
            emptyMessage="No completed cases found."
          />
        </div>
      </div>
    </div>
  )
}

export default Cases























// "use client"

// import type React from "react"
// import Link from "next/link"
// import { useSession } from "next-auth/react"
// import { useQuery } from "@tanstack/react-query"
// import { useRouter } from "next/navigation"
// import { LoadingComponent, ErrorComponent } from "@/components/LoadingErrorComponents"
// import { getClientCases } from "../api/case"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// // import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { ChevronLeft, Calendar, User, FileText, Clock, CheckCircle } from "lucide-react"
// import { Separator } from "@/components/ui/separator"

// const Cases: React.FC = () => {
//   const { data: session } = useSession()
//   const { data, isLoading, error } = useQuery({
//     queryKey: ["clientcases"],
//     // @ts-ignore
//     queryFn: () => getClientCases(session?.user?.image?.id),
//   })
//   const router = useRouter()

//   // Filter cases based on their status
//   const currentCases = data?.filter((clientcase: any) => clientcase.status !== "FINISHED")
//   const recentCases = data?.filter((clientcase: any) => clientcase.status === "FINISHED")

//   if (isLoading) return <LoadingComponent />
//   if (error) return <ErrorComponent errorMessage="Failed to load data. Please try again." />

//   const formatDate = (dateString: string) => {
//     if (!dateString) return "N/A"
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     })
//   }

//   const CaseCard = ({ caseData }: { caseData: any }) => (
//     <Link href={`/client/case/${caseData.id}`} className="block transition-all duration-200 hover:scale-[1.01]">
//       <Card className="mb-4 border shadow-sm hover:shadow-md transition-shadow duration-200">
//         <CardHeader className="pb-2">
//           <div className="flex justify-between items-start">
//             <div className="space-y-1">
//               <CardTitle className="text-xl text-gray-800">{caseData.title}</CardTitle>
//               <CardDescription className="flex items-center text-sm">
//                 <User className="h-4 w-4 mr-1 text-purple-600" />
//                 Lawyer: {caseData.lawyer_id}
//               </CardDescription>
//             </div>
//             <div className="text-right">
//               <div className="flex items-center text-sm text-gray-500 mb-1">
//                 <Calendar className="h-4 w-4 mr-1" />
//                 {formatDate(caseData.date)}
//               </div>
//               {caseData.status && (
//                 <Badge
//                   className={
//                     caseData.status === "FINISHED"
//                       ? "bg-green-500 hover:bg-green-600"
//                       : caseData.status === "IN_PROGRESS"
//                         ? "bg-blue-500 hover:bg-blue-600"
//                         : "bg-yellow-500 hover:bg-yellow-600"
//                   }
//                 >
//                   {caseData.status}
//                 </Badge>
//               )}
//             </div>
//           </div>
//         </CardHeader>
//         <CardContent>
//           <div className="mt-2">
//             <h4 className="text-sm font-medium text-gray-500 flex items-center mb-1">
//               <FileText className="h-4 w-4 mr-1 text-purple-600" />
//               Summary
//             </h4>
//             <p className="text-gray-700 text-sm line-clamp-2">{caseData.description}</p>
//           </div>
//         </CardContent>
//       </Card>
//     </Link>
//   )

//   return (
//     <div className="p-6 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
//       <div className="max-w-4xl mx-auto">
//         <div className="flex items-center mb-6">
//           <Button variant="ghost" onClick={() => router.back()} className="mr-4">
//             <ChevronLeft className="h-4 w-4 mr-2" />
//             Back
//           </Button>
//           <h1 className="text-3xl font-bold text-gray-800">Client Cases</h1>
//         </div>

//         <Tabs defaultValue="current" className="w-full">
//           <TabsList className="grid w-full grid-cols-2 mb-6">
//             <TabsTrigger value="current" className="flex items-center">
//               <Clock className="h-4 w-4 mr-2" />
//               Current Cases ({currentCases?.length || 0})
//             </TabsTrigger>
//             <TabsTrigger value="recent" className="flex items-center">
//               <CheckCircle className="h-4 w-4 mr-2" />
//               Recent Cases ({recentCases?.length || 0})
//             </TabsTrigger>
//           </TabsList>

//           <TabsContent value="current" className="mt-0">
//             <Card>
//               <CardHeader className="pb-3">
//                 <CardTitle className="text-2xl text-purple-700">Current Cases</CardTitle>
//                 <CardDescription>
//                   These are your active cases that are currently in progress or pending resolution.
//                 </CardDescription>
//                 <Separator className="mt-2" />
//               </CardHeader>
//               <CardContent className="pt-2">
//                 {currentCases?.length > 0 ? (
//                   currentCases.map((clientcase: any) => <CaseCard key={clientcase.id} caseData={clientcase} />)
//                 ) : (
//                   <div className="text-center py-8 text-gray-500">
//                     <p>You don't have any current cases.</p>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="recent" className="mt-0">
//             <Card>
//               <CardHeader className="pb-3">
//                 <CardTitle className="text-2xl text-purple-700">Recent Cases</CardTitle>
//                 <CardDescription>These are your completed cases that have been resolved.</CardDescription>
//                 <Separator className="mt-2" />
//               </CardHeader>
//               <CardContent className="pt-2">
//                 {recentCases?.length > 0 ? (
//                   recentCases.map((clientcase: any) => <CaseCard key={clientcase.id} caseData={clientcase} />)
//                 ) : (
//                   <div className="text-center py-8 text-gray-500">
//                     <p>You don't have any completed cases yet.</p>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   )
// }

// export default Cases
