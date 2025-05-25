// "use client";

// import DoughnutChart from "@/components/chart/DoughnutChart";
// import LineChart from "@/components/chart/LineChart";
// import { Icon } from "@iconify/react";
// import { useQuery } from "@tanstack/react-query";
// import { getTrials } from "./api/trial";
// import { getStatistics } from "./api/statistics";
// import { ErrorComponent, LoadingComponent } from "@/components/LoadingErrorComponents";
// import TrialNotify from "@/components/TrialNotify";

// const Lawyer = () => {

//   const {
//     data: trialsData,
//     isLoading: isLoadingTrials,
//     error: trialsError,
//   } = useQuery({
//     queryKey: ["trials"],
//     queryFn: getTrials,
//     refetchInterval: 6000, // Refetch every 2 minutes
//   });

//   const {
//     data: statisticsData,
//     isLoading: isLoadingStatistics,
//     error: statisticsError,
//   } = useQuery({
//     queryKey: ["statistics"],
//     queryFn: getStatistics,
//     refetchInterval: 120000, // Refetch every 2 minutes
//   });

//   console.log("statisticsData: ", statisticsData);


//   if (isLoadingTrials) return <LoadingComponent />;
//   if (trialsError)
//     return (
//       <ErrorComponent errorMessage="Failed to load data. Please try again." />
//     );

//   return (
//     <div className="w-full font-sans min-h-screen  px-10 lg:pl-64 bg-[#f2f6fa]">
//       <div className="w-full h-1/2 flex flex-col lg:flex-row gap-4 justify-between items-center pt-6">
//         <div className="w-full lg:w-1/3  flex flex-col gap-4">
//           <div className="w-full lg:w-3/4 h-20 flex gap-3 shadow-md rounded-lg p-4 bg-white text-black items-center justify-center">
//             <Icon
//               icon="material-symbols:cases"
//               width={30}
//               height={30}
//               color="#C075E3"
//             />
//             <p>{statisticsData?.totalCases}</p>
//             <p>Total cases</p>
//           </div>
//           <div className="w-full lg:w-3/4 h-20 flex gap-3 shadow-md rounded-lg p-4 bg-white text-black items-center justify-center">
//             <Icon
//               icon="material-symbols:cases"
//               width={30}
//               height={30}
//               color="#C6EF67"
//             />
//             <p>{statisticsData?.completedCase }</p>
//             <p>Complated Cases</p>
//           </div>
//           <div className="w-full lg:w-3/4 h-20 flex gap-3 shadow-md rounded-lg p-4 bg-white text-black items-center justify-center">
//             <Icon
//               icon="material-symbols:cases"
//               width={30}
//               height={30}
//               color="#69BEF0"
//             />
//             <p>{statisticsData?.inProgressCases}</p>
//             <p>Pending case</p>
//           </div>
//         </div>

//         <div className="w-full lg:w-2/3 flex flex-col items-center gap-4 p-4 bg-white h-72">
//           <h1 className="font-bold text-xl text-gray-700">Upcoming Trials</h1>

//           <div className="w-full h-4/5 overflow-auto">
//             <table className="w-full text-left rounded-xl ">
//               <thead className="sticky top-0 bg-white z-40">
//                 <tr className="bg-white text-gray-600 rounded-xl">
//                   <th className="py-3 px-6 ">CASE_ID</th>
//                   {/* <th className="py-3 px-6 ">CLIENT NAME</th> */}
                 
//                   <th className="py-3 px-6">COURT PLACE</th>
//                   <th className="py-3 px-6 ">DESCRIPTION</th>
//                   <th className="py-3 px-6">DATE</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {trialsData?.map((apointment: any, index: any) => ( 
//                   <tr
//                     className={
//                       index % 2 === 0
//                         ? "relative bg-[#F4F4F4]"
//                         : "relative bg-white"
//                     }
//                     key={index}
//                   >
//                     <td className="py-3 px-6 text-black text-center">
//                       {apointment?.id}
//                     </td>
//                     {/* <td className="py-3 px-6 text-black text-center">
//                       {apointment?.clientname}
//                     </td> */}
//                     <td className="py-3 px-6 text-black text-center">
//                       {apointment?.location}
//                     </td>
//                     <td className="py-3 px-6 text-black max-w-[100px] text-center truncate hover:text-clip">
//                       <span title={"hello"}>
//                         {" "}
//                         {apointment?.description}
//                       </span>
//                     </td>
//                     <td className="py-3 px-6 text-black text-center">
//                       {new Date(apointment?.trial_date).toLocaleDateString()}
//                     </td>
//                   </tr>
//                  ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       <div className="w-full flex flex-col lg:flex-row gap-4 justify-between mt-6">
//         <div className="w-full lg:w-1/2 h-full border-2 border-gray-300 px-2  bg-white flex justify-center ">
//           <DoughnutChart data={[statisticsData?.totalCases,statisticsData?.completedCases, statisticsData?.inProgressCases]} />
//         </div>
//         <div className="w-full lg:w-1/2 h-full border-2 border-gray-300 px-10 p-2 bg-white">
//           <LineChart data={statisticsData?.filteredIncomePerMonth} />
//         </div>
//       </div>
//       <TrialNotify show={true} />
//     </div>
//   );
// };

// export default Lawyer;






// "use client"

// import { useMemo } from "react"
// import DoughnutChart from "@/components/chart/DoughnutChart"
// import LineChart from "@/components/chart/LineChart"
// import { Icon } from "@iconify/react"
// import { useQuery } from "@tanstack/react-query"
// import { getTrials } from "./api/trial"
// import { getStatistics } from "./api/statistics"
// import { ErrorComponent, LoadingComponent } from "@/components/LoadingErrorComponents"
// import TrialNotify from "@/components/TrialNotify"

// // Types
// interface Trial {
//   id: string
//   location: string
//   description: string
//   trial_date: string
// }

// interface Statistics {
//   totalCases: number
//   completedCases: number
//   inProgressCases: number
//   filteredIncomePerMonth: number[]
// }

// interface StatisticCardData {
//   icon: string
//   value: number
//   label: string
//   color: string
// }

// // Constants
// const REFETCH_INTERVALS = {
//   TRIALS: 60000, // 1 minute
//   STATISTICS: 120000, // 2 minutes
// } as const

// const COLORS = {
//   PRIMARY: "#C075E3",
//   SUCCESS: "#C6EF67",
//   INFO: "#69BEF0",
// } as const

// const TABLE_HEADERS = ["CASE_ID", "COURT PLACE", "DESCRIPTION", "DATE"] as const

// const LawyerDashboard = () => {
//   // Data fetching with proper typing
//   const {
//     data: trialsData,
//     isLoading: isLoadingTrials,
//     error: trialsError,
//   } = useQuery<Trial[]>({
//     queryKey: ["trials"],
//     queryFn: getTrials,
//     refetchInterval: REFETCH_INTERVALS.TRIALS,
//     staleTime: 30000, // Consider data fresh for 30 seconds
//   })

//   const {
//     data: statisticsData,
//     isLoading: isLoadingStatistics,
//     error: statisticsError,
//   } = useQuery<Statistics>({
//     queryKey: ["statistics"],
//     queryFn: getStatistics,
//     refetchInterval: REFETCH_INTERVALS.STATISTICS,
//     staleTime: 60000, // Consider data fresh for 1 minute
//   })

//   // Memoized computed values
//   const statisticCards: StatisticCardData[] = useMemo(() => {
//     if (!statisticsData) return []

//     return [
//       {
//         icon: "material-symbols:cases",
//         value: statisticsData.totalCases || 0,
//         label: "Total Cases",
//         color: COLORS.PRIMARY,
//       },
//       {
//         icon: "material-symbols:cases",
//         value: statisticsData.completedCases || 0,
//         label: "Completed Cases",
//         color: COLORS.SUCCESS,
//       },
//       {
//         icon: "material-symbols:cases",
//         value: statisticsData.inProgressCases || 0,
//         label: "Pending Cases",
//         color: COLORS.INFO,
//       },
//     ]
//   }, [statisticsData])

//   const chartData = useMemo(() => {
//     if (!statisticsData) return [0, 0, 0]
//     return [statisticsData.totalCases || 0, statisticsData.completedCases || 0, statisticsData.inProgressCases || 0]
//   }, [statisticsData])

//   // Utility functions
//   const formatDate = (dateString: string): string => {
//     try {
//       return new Date(dateString).toLocaleDateString("en-US", {
//         year: "numeric",
//         month: "short",
//         day: "numeric",
//       })
//     } catch {
//       return "Invalid Date"
//     }
//   }

//   const truncateText = (text: string, maxLength = 50): string => {
//     return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text
//   }

//   // Component: Statistic Card
//   const StatisticCard = ({ statistic }: { statistic: StatisticCardData }) => (
//     <div className="w-full lg:w-3/4 h-20 flex gap-3 shadow-md rounded-lg p-4 bg-white text-black items-center justify-center transition-shadow hover:shadow-lg">
//       <Icon icon={statistic.icon} width={30} height={30} color={statistic.color} aria-hidden="true" />
//       <span className="text-2xl font-semibold" aria-label={`${statistic.value} ${statistic.label}`}>
//         {statistic.value}
//       </span>
//       <span className="text-sm text-gray-600">{statistic.label}</span>
//     </div>
//   )

//   // Component: Trials Table
//   const TrialsTable = ({ trials }: { trials: Trial[] }) => (
//     <div className="w-full h-4/5 overflow-auto">
//       <table className="w-full text-left rounded-xl" role="table">
//         <thead className="sticky top-0 bg-white z-40">
//           <tr className="bg-white text-gray-600 rounded-xl">
//             {TABLE_HEADERS.map((header) => (
//               <th key={header} className="py-3 px-6 font-medium" scope="col">
//                 {header}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {trials.map((trial, index) => (
//             <tr
//               key={trial.id}
//               className={`relative transition-colors hover:bg-gray-50 ${index % 2 === 0 ? "bg-[#F4F4F4]" : "bg-white"}`}
//             >
//               <td className="py-3 px-6 text-black text-center font-mono">{trial.id}</td>
//               <td className="py-3 px-6 text-black text-center">{trial.location}</td>
//               <td className="py-3 px-6 text-black text-center">
//                 <span title={trial.description} className="cursor-help">
//                   {truncateText(trial.description)}
//                 </span>
//               </td>
//               <td className="py-3 px-6 text-black text-center">{formatDate(trial.trial_date)}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {trials.length === 0 && <div className="text-center py-8 text-gray-500">No upcoming trials found</div>}
//     </div>
//   )

//   // Loading and error states
//   if (isLoadingTrials || isLoadingStatistics) {
//     return <LoadingComponent />
//   }

//   if (trialsError || statisticsError) {
//     const errorMessage = trialsError?.message || statisticsError?.message || "Failed to load data"
//     return <ErrorComponent errorMessage={`${errorMessage}. Please try again.`} />
//   }

//   // Ensure we have data before rendering
//   const trials = trialsData || []
//   const statistics = statisticsData

//   return (
//     <main className="w-full font-sans min-h-screen px-10 lg:pl-64 bg-[#f2f6fa]">
//       {/* Statistics and Trials Section */}
//       <section className="w-full flex flex-col lg:flex-row gap-4 justify-between items-start pt-6">
//         {/* Statistics Cards */}
//         <aside className="w-full lg:w-1/3 flex flex-col gap-4" aria-label="Case Statistics">
//           {statisticCards.map((card, index) => (
//             <StatisticCard key={`${card.label}-${index}`} statistic={card} />
//           ))}
//         </aside>

//         {/* Upcoming Trials Table */}
//         <section className="w-full lg:w-2/3 flex flex-col items-center gap-4 p-4 bg-white h-72 rounded-lg shadow-md">
//           <header>
//             <h1 className="font-bold text-xl text-gray-700">Upcoming Trials</h1>
//           </header>
//           <TrialsTable trials={trials} />
//         </section>
//       </section>

//       {/* Charts Section */}
//       <section className="w-full flex flex-col lg:flex-row gap-4 justify-between mt-6">
//         <div className="w-full lg:w-1/2 border-2 border-gray-300 bg-white rounded-lg shadow-md overflow-hidden">
//           <div className="p-4">
//             <h2 className="text-lg font-semibold text-gray-700 mb-4">Case Distribution</h2>
//             <div className="flex justify-center">
//               <DoughnutChart data={chartData} />
//             </div>
//           </div>
//         </div>

//         <div className="w-full lg:w-1/2 border-2 border-gray-300 bg-white rounded-lg shadow-md overflow-hidden">
//           <div className="p-4">
//             <h2 className="text-lg font-semibold text-gray-700 mb-4">Monthly Income</h2>
//             <LineChart data={statistics?.filteredIncomePerMonth || []} />
//           </div>
//         </div>
//       </section>

//       {/* Trial Notifications */}
//       <TrialNotify show={true} />
//     </main>
//   )
// }

// export default LawyerDashboard




// "use client";

// import { useQuery } from "@tanstack/react-query";
// import { Icon } from "@iconify/react";
// import DoughnutChart from "@/components/chart/DoughnutChart";
// import LineChart from "@/components/chart/LineChart";
// import { LoadingComponent, ErrorComponent } from "@/components/LoadingErrorComponents";
// import TrialNotify from "@/components/TrialNotify";
// import { getTrials } from "./api/trial";
// import { getStatistics } from "./api/statistics";

// // Define types for better type safety
// interface Trial {
//   id: string;
//   location: string;
//   description: string;
//   trial_date: string;
// }

// interface Statistics {
//   totalCases: number;
//   completedCases: number;
//   inProgressCases: number;
//   filteredIncomePerMonth: number[];
// }

// // Card component for statistics
// const StatCard = ({
//   icon,
//   value,
//   label,
//   color,
// }: {
//   icon: string;
//   value: number;
//   label: string;
//   color: string;
// }) => (
//   <div className="flex h-20 w-full items-center justify-center gap-3 rounded-lg bg-white p-4 shadow-md">
//     <Icon icon={icon} width={30} height={30} className={color} />
//     <p className="text-lg font-semibold">{value}</p>
//     <p className="text-sm text-gray-600">{label}</p>
//   </div>
// );

// const LawyerDashboard = () => {
//   const {
//     data: trialsData,
//     isLoading: isLoadingTrials,
//     error: trialsError,
//   } = useQuery<Trial[]>({
//     queryKey: ["trials"],
//     queryFn: getTrials,
//     refetchInterval: 120_000, // 2 minutes in milliseconds
//   });

//   const {
//     data: statisticsData,
//     isLoading: isLoadingStatistics,
//     error: statisticsError,
//   } = useQuery<Statistics>({
//     queryKey: ["statistics"],
//     queryFn: getStatistics,
//     refetchInterval: 120_000,
//   });

//   if (isLoadingTrials || isLoadingStatistics) return <LoadingComponent />;
//   if (trialsError || statisticsError)
//     return <ErrorComponent errorMessage="Failed to load dashboard data. Please try again." />;

//   return (
//     <div className="min-h-screen bg-gray-100 px-4 py-6 lg:pl-64 lg:px-10">
//       <div className="flex flex-col gap-6 lg:flex-row">
//         {/* Statistics Cards */}
//         <div className="flex w-full flex-col gap-4 lg:w-1/3">
//           <StatCard
//             icon="material-symbols:cases"
//             value={statisticsData?.totalCases ?? 0}
//             label="Total Cases"
//             color="text-purple-500"
//           />
//           <StatCard
//             icon="material-symbols:cases"
//             value={statisticsData?.completedCases ?? 0}
//             label="Completed Cases"
//             color="text-green-500"
//           />
//           <StatCard
//             icon="material-symbols:cases"
//             value={statisticsData?.inProgressCases ?? 0}
//             label="Pending Cases"
//             color="text-blue-500"
//           />
//         </div>

//         {/* Trials Table */}
//         <div className="flex w-full flex-col rounded-lg bg-white p-4 shadow-md lg:w-2/3">
//           <h2 className="mb-4 text-xl font-bold text-gray-700">Upcoming Trials</h2>
//           <div className="overflow-x-auto">
//             <table className="w-full text-left">
//               <thead className="sticky top-0 bg-white text-gray-600">
//                 <tr>
//                   <th className="px-6 py-3">Case ID</th>
//                   <th className="px-6 py-3">Court Place</th>
//                   <th className="px-6 py-3">Description</th>
//                   <th className="px-6 py-3">Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {trialsData?.map((trial, index) => (
//                   <tr
//                     key={trial.id}
//                     className={`${
//                       index % 2 === 0 ? "bg-gray-50" : "bg-white"
//                     } hover:bg-gray-100`}
//                   >
//                     <td className="px-6 py-3 text-center text-gray-800">{trial.id}</td>
//                     <td className="px-6 py-3 text-center text-gray-800">{trial.location}</td>
//                     <td className="max-w-[150px] truncate px-6 py-3 text-center text-gray-800">
//                       <span title={trial.description}>{trial.description}</span>
//                     </td>
//                     <td className="px-6 py-3 text-center text-gray-800">
//                       {new Date(trial.trial_date).toLocaleDateString("en-US", {
//                         year: "numeric",
//                         month: "short",
//                         day: "numeric",
//                       })}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Charts Section */}
//       <div className="mt-6 flex flex-col gap-6 lg:flex-row">
//         <div className="w-full rounded-lg bg-white p-4 shadow-md lg:w-1/2">
//           <DoughnutChart
//             data={[
//               statisticsData?.totalCases ?? 0,
//               statisticsData?.completedCases ?? 0,
//               statisticsData?.inProgressCases ?? 0,
//             ]}
//           />
//         </div>
//         <div className="w-full rounded-lg bg-white p-4 shadow-md lg:w-1/2">
//           <LineChart data={statisticsData?.filteredIncomePerMonth ?? []} />
//         </div>
//       </div>

//       <TrialNotify show={true} />
//     </div>
//   );
// };

// export default LawyerDashboard;






"use client"

import type React from "react"

import { useQuery } from "@tanstack/react-query"
import { Calendar, FileText, Clock, TrendingUp, Users, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import DoughnutChart from "@/components/chart/DoughnutChart"
import LineChart from "@/components/chart/LineChart"
import TrialNotify from "@/components/TrialNotify"
import { getTrials } from "./api/trial"
import { getStatistics } from "./api/statistics"

// Enhanced type definitions
interface Trial {
  id: string
  location: string
  description: string
  trial_date: string
  priority?: "high" | "medium" | "low"
  status?: "upcoming" | "in-progress" | "completed"
}

interface Statistics {
  totalCases: number
  completedCases: number
  inProgressCases: number
  filteredIncomePerMonth: number[]
}

// Enhanced StatCard component with better design
const StatCard = ({
  icon: Icon,
  value,
  label,
  description,
  trend,
  color = "text-primary",
}: {
  icon: React.ElementType
  value: number
  label: string
  description?: string
  trend?: number
  color?: string
}) => (
  <Card className="transition-all duration-200 hover:shadow-lg">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
      <Icon className={`h-4 w-4 ${color}`} />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value.toLocaleString()}</div>
      {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      {trend !== undefined && (
        <div className="flex items-center mt-2">
          <TrendingUp className={`h-3 w-3 mr-1 ${trend >= 0 ? "text-green-500" : "text-red-500"}`} />
          <span className={`text-xs ${trend >= 0 ? "text-green-500" : "text-red-500"}`}>
            {trend >= 0 ? "+" : ""}
            {trend}% from last month
          </span>
        </div>
      )}
    </CardContent>
  </Card>
)

// Enhanced TrialsTable component
const TrialsTable = ({ trials }: { trials: Trial[] }) => {
  const getPriorityColor = (priority = "medium") => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "default"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const diffTime = date.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Tomorrow"
    if (diffDays > 0 && diffDays <= 7) return `In ${diffDays} days`

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (!trials || trials.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Trials
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No upcoming trials scheduled</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Upcoming Trials
        </CardTitle>
        <CardDescription>
          {trials.length} trial{trials.length !== 1 ? "s" : ""} scheduled
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Case ID</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Location</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Description</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Priority</th>
              </tr>
            </thead>
            <tbody>
              {trials.map((trial, index) => (
                <tr key={trial.id} className="border-b hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-4 font-mono text-sm">{trial.id}</td>
                  <td className="py-3 px-4">{trial.location}</td>
                  <td className="py-3 px-4 max-w-[200px]">
                    <div className="truncate" title={trial.description}>
                      {trial.description}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col">
                      <span className="text-sm">{formatDate(trial.trial_date)}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(trial.trial_date).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={getPriorityColor(trial.priority)}>{trial.priority || "medium"}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

// Loading skeleton component
const DashboardSkeleton = () => (
  <div className="space-y-6">
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-[60px] mb-2" />
            <Skeleton className="h-3 w-[120px]" />
          </CardContent>
        </Card>
      ))}
    </div>
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-[150px]" />
        <Skeleton className="h-4 w-[100px]" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
)

// Main Dashboard Component
const LawyerDashboard = () => {
  const {
    data: trialsData,
    isLoading: isLoadingTrials,
    error: trialsError,
  } = useQuery<Trial[]>({
    queryKey: ["trials"],
    queryFn: getTrials,
    refetchInterval: 120_000,
    staleTime: 60_000, // Consider data fresh for 1 minute
  })

  const {
    data: statisticsData,
    isLoading: isLoadingStatistics,
    error: statisticsError,
  } = useQuery<Statistics>({
    queryKey: ["statistics"],
    queryFn: getStatistics,
    refetchInterval: 120_000,
    staleTime: 60_000,
  })

  const isLoading = isLoadingTrials || isLoadingStatistics
  const hasError = trialsError || statisticsError

  if (isLoading) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <DashboardSkeleton />
      </div>
    )
  }

  if (hasError) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <Alert variant="destructive">
          <AlertDescription>
            Failed to load dashboard data. Please refresh the page or try again later.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  const stats = statisticsData || {
    totalCases: 0,
    completedCases: 0,
    inProgressCases: 0,
    filteredIncomePerMonth: [],
  }

  const completionRate = stats.totalCases > 0 ? Math.round((stats.completedCases / stats.totalCases) * 100) : 0

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-xs">
            Last updated: {new Date().toLocaleTimeString()}
          </Badge>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          icon={FileText}
          value={stats.totalCases}
          label="Total Cases"
          description="All cases in your portfolio"
          color="text-blue-500"
        />
        <StatCard
          icon={CheckCircle}
          value={stats.completedCases}
          label="Completed Cases"
          description={`${completionRate}% completion rate`}
          color="text-green-500"
        />
        <StatCard
          icon={Clock}
          value={stats.inProgressCases}
          label="Active Cases"
          description="Currently in progress"
          color="text-orange-500"
        />
      </div>

      {/* Trials Table */}
      <TrialsTable trials={trialsData || []} />

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Case Distribution
            </CardTitle>
            <CardDescription>Overview of your case portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <DoughnutChart data={[stats.totalCases, stats.completedCases, stats.inProgressCases]} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Monthly Revenue
            </CardTitle>
            <CardDescription>Income trends over the past months</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart data={stats.filteredIncomePerMonth} />
          </CardContent>
        </Card>
      </div>

      {/* Trial Notifications */}
      <TrialNotify show={true} />
    </div>
  )
}

export default LawyerDashboard






// "use client"

// import { useQuery } from "@tanstack/react-query"
// import { getTrials } from "./api/trial"
// import { getStatistics } from "./api/statistics"
// import { ErrorComponent, LoadingComponent } from "@/components/LoadingErrorComponents"
// import { Briefcase, CheckCircle, Clock, AlertCircle, Calendar, MapPin, FileText } from "lucide-react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import DoughnutChart from "@/components/chart/DoughnutChart"
// import LineChart from "@/components/chart/LineChart"
// import TrialNotify from "@/components/TrialNotify"

// const LawyerDashboard = () => {
//   const {
//     data: trialsData,
//     isLoading: isLoadingTrials,
//     error: trialsError,
//   } = useQuery({
//     queryKey: ["trials"],
//     queryFn: getTrials,
//     refetchInterval: 6000, // Refetch every minute
//   })

//   const {
//     data: statisticsData,
//     isLoading: isLoadingStatistics,
//     error: statisticsError,
//   } = useQuery({
//     queryKey: ["statistics"],
//     queryFn: getStatistics,
//     refetchInterval: 120000, // Refetch every 2 minutes
//   })

//   if (isLoadingTrials || isLoadingStatistics) return <LoadingComponent />
//   if (trialsError || statisticsError)
//     return <ErrorComponent errorMessage="Failed to load dashboard data. Please try again." />

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 px-4 py-6 lg:px-8 lg:pl-64">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
//         <p className="text-slate-500">Welcome back. Here's an overview of your cases.</p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid gap-6 md:grid-cols-3 mb-8">
//         <StatsCard
//           title="Total Cases"
//           value={statisticsData?.totalCases || 0}
//           icon={<Briefcase className="h-5 w-5" />}
//           color="bg-purple-50"
//           iconColor="text-purple-500"
//         />
//         <StatsCard
//           title="Completed Cases"
//           value={statisticsData?.completedCases || 0}
//           icon={<CheckCircle className="h-5 w-5" />}
//           color="bg-green-50"
//           iconColor="text-green-500"
//         />
//         <StatsCard
//           title="Pending Cases"
//           value={statisticsData?.inProgressCases || 0}
//           icon={<Clock className="h-5 w-5" />}
//           color="bg-blue-50"
//           iconColor="text-blue-500"
//         />
//       </div>

//       {/* Main Content */}
//       <div className="grid gap-6 lg:grid-cols-2">
//         {/* Upcoming Trials */}
//         <Card className="overflow-hidden">
//           <CardHeader className="bg-white pb-2">
//             <div className="flex items-center justify-between">
//               <CardTitle className="text-xl font-semibold text-slate-800">Upcoming Trials</CardTitle>
//               <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
//                 {trialsData?.length || 0} Upcoming
//               </Badge>
//             </div>
//           </CardHeader>
//           <CardContent className="p-0">
//             <div className="max-h-[400px] overflow-auto">
//               {trialsData?.length > 0 ? (
//                 <table className="w-full">
//                   <thead className="sticky top-0 bg-slate-50 text-xs uppercase text-slate-500">
//                     <tr>
//                       <th className="px-4 py-3 font-medium text-left">Case ID</th>
//                       <th className="px-4 py-3 font-medium text-left">Court Location</th>
//                       <th className="px-4 py-3 font-medium text-left">Description</th>
//                       <th className="px-4 py-3 font-medium text-left">Date</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {trialsData?.map((trial, index) => (
//                       <tr
//                         key={trial.id}
//                         className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${
//                           index % 2 === 0 ? "bg-white" : "bg-slate-50/50"
//                         }`}
//                       >
//                         <td className="px-4 py-3 text-sm font-medium text-slate-700">
//                           <div className="flex items-center gap-2">
//                             <Briefcase className="h-4 w-4 text-slate-400" />
//                             {trial.id}
//                           </div>
//                         </td>
//                         <td className="px-4 py-3 text-sm text-slate-700">
//                           <div className="flex items-center gap-2">
//                             <MapPin className="h-4 w-4 text-slate-400" />
//                             {trial.location}
//                           </div>
//                         </td>
//                         <td className="px-4 py-3 text-sm text-slate-700">
//                           <div className="flex items-center gap-2 max-w-[200px]">
//                             <FileText className="h-4 w-4 flex-shrink-0 text-slate-400" />
//                             <span className="truncate" title={trial.description}>
//                               {trial.description}
//                             </span>
//                           </div>
//                         </td>
//                         <td className="px-4 py-3 text-sm text-slate-700">
//                           <div className="flex items-center gap-2">
//                             <Calendar className="h-4 w-4 text-slate-400" />
//                             {new Date(trial.trial_date).toLocaleDateString()}
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               ) : (
//                 <div className="flex flex-col items-center justify-center py-12 text-center">
//                   <AlertCircle className="h-12 w-12 text-slate-300 mb-4" />
//                   <h3 className="text-lg font-medium text-slate-700">No upcoming trials</h3>
//                   <p className="text-sm text-slate-500 mt-1">You don't have any trials scheduled at the moment.</p>
//                 </div>
//               )}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Analytics */}
//         <Tabs defaultValue="caseDistribution" className="h-full">
//           <Card className="h-full">
//             <CardHeader className="pb-2">
//               <div className="flex items-center justify-between">
//                 <CardTitle className="text-xl font-semibold text-slate-800">Analytics</CardTitle>
//                 <TabsList className="bg-slate-100">
//                   <TabsTrigger value="caseDistribution">Distribution</TabsTrigger>
//                   <TabsTrigger value="revenue">Revenue</TabsTrigger>
//                 </TabsList>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <TabsContent value="caseDistribution" className="mt-0 h-[400px] flex items-center justify-center">
//                 <div className="w-full p-4">
//                   <DoughnutChart
//                     data={[
//                       statisticsData?.totalCases || 0,
//                       statisticsData?.completedCases || 0,
//                       statisticsData?.inProgressCases || 0,
//                     ]}
//                   />
//                   <div className="flex justify-center gap-6 mt-4">
//                     <div className="flex items-center gap-2">
//                       <div className="h-3 w-3 rounded-full bg-purple-500"></div>
//                       <span className="text-sm text-slate-600">Total</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <div className="h-3 w-3 rounded-full bg-green-500"></div>
//                       <span className="text-sm text-slate-600">Completed</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <div className="h-3 w-3 rounded-full bg-blue-500"></div>
//                       <span className="text-sm text-slate-600">Pending</span>
//                     </div>
//                   </div>
//                 </div>
//               </TabsContent>
//               <TabsContent value="revenue" className="mt-0 h-[400px] flex items-center justify-center">
//                 <div className="w-full h-full p-4">
//                   <LineChart data={[45000]} />
//                   <div className="flex justify-center mt-4">
//                     <div className="flex items-center gap-2">
//                       <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
//                       <span className="text-sm text-slate-600">Revenue (Birr)</span>
//                     </div>
//                   </div>
//                 </div>
//               </TabsContent>
//             </CardContent>
//           </Card>
//         </Tabs>
//       </div>

//       {/* Recent Activity */}
//       <Card className="mt-6">
//         <CardHeader>
//           <CardTitle className="text-xl font-semibold text-slate-800">Recent Activity</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             {[1, 2, 3].map((_, index) => (
//               <div key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
//                 <div
//                   className={`rounded-full p-2 ${
//                     index === 0
//                       ? "bg-blue-50 text-blue-500"
//                       : index === 1
//                         ? "bg-green-50 text-green-500"
//                         : "bg-purple-50 text-purple-500"
//                   }`}
//                 >
//                   {index === 0 ? (
//                     <FileText className="h-5 w-5" />
//                   ) : index === 1 ? (
//                     <CheckCircle className="h-5 w-5" />
//                   ) : (
//                     <Briefcase className="h-5 w-5" />
//                   )}
//                 </div>
//                 <div>
//                   <p className="font-medium text-slate-800">
//                     {index === 0
//                       ? "Case document updated"
//                       : index === 1
//                         ? "Case #1234 marked as complete"
//                         : "New case assigned"}
//                   </p>
//                   <p className="text-sm text-slate-500">
//                     {index === 0
//                       ? "You updated documents for Case #5678"
//                       : index === 1
//                         ? "Case for Smith vs. Johnson completed"
//                         : "You were assigned to Case #9012"}
//                   </p>
//                   <p className="text-xs text-slate-400 mt-1">
//                     {index === 0 ? "2 hours ago" : index === 1 ? "Yesterday" : "3 days ago"}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>

//       <TrialNotify show={true} />
//     </div>
//   )
// }

// const StatsCard = ({ title, value, icon, color, iconColor }) => (
//   <Card className="overflow-hidden">
//     <CardContent className={`p-6 ${color}`}>
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm font-medium text-slate-500">{title}</p>
//           <h3 className="text-3xl font-bold text-slate-800 mt-1">{value}</h3>
//         </div>
//         <div className={`rounded-full p-3 ${color} ${iconColor}`}>{icon}</div>
//       </div>
//     </CardContent>
//   </Card>
// )

// export default LawyerDashboard






// "use client"

// import { useQuery } from "@tanstack/react-query"
// import { getTrials } from "./api/trial"
// import { getStatistics } from "./api/statistics"
// import { ErrorComponent, LoadingComponent } from "@/components/LoadingErrorComponents"
// import { Briefcase, CheckCircle, Clock, AlertCircle, Calendar, MapPin, FileText } from "lucide-react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import DoughnutChart from "@/components/chart/DoughnutChart"
// import LineChart from "@/components/chart/LineChart"
// import TrialNotify from "@/components/TrialNotify"

// const LawyerDashboard = () => {
//   const {
//     data: trialsData,
//     isLoading: isLoadingTrials,
//     error: trialsError,
//   } = useQuery({
//     queryKey: ["trials"],
//     queryFn: getTrials,
//     refetchInterval: 6000, // Refetch every minute
//   })

//   const {
//     data: statisticsData,
//     isLoading: isLoadingStatistics,
//     error: statisticsError,
//   } = useQuery({
//     queryKey: ["statistics"],
//     queryFn: getStatistics,
//     refetchInterval: 120000, // Refetch every 2 minutes
//   })

//   if (isLoadingTrials || isLoadingStatistics) return <LoadingComponent />
//   if (trialsError || statisticsError)
//     return <ErrorComponent errorMessage="Failed to load dashboard data. Please try again." />

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 px-4 py-6 lg:px-8 lg:ml-56">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
//         <p className="text-slate-500">Welcome back. Here's an overview of your cases.</p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid gap-6 md:grid-cols-3 mb-8">
//         <StatsCard
//           title="Total Cases"
//           value={statisticsData?.totalCases || 0}
//           icon={<Briefcase className="h-5 w-5" />}
//           color="bg-purple-50"
//           iconColor="text-purple-500"
//         />
//         <StatsCard
//           title="Completed Cases"
//           value={statisticsData?.completedCases || 0}
//           icon={<CheckCircle className="h-5 w-5" />}
//           color="bg-green-50"
//           iconColor="text-green-500"
//         />
//         <StatsCard
//           title="Pending Cases"
//           value={statisticsData?.inProgressCases || 0}
//           icon={<Clock className="h-5 w-5" />}
//           color="bg-blue-50"
//           iconColor="text-blue-500"
//         />
//       </div>

//       {/* Main Content */}
//       <div className="grid gap-6 lg:grid-cols-2">
//         {/* Upcoming Trials */}
//         <Card className="overflow-hidden">
//           <CardHeader className="bg-white pb-2">
//             <div className="flex items-center justify-between">
//               <CardTitle className="text-xl font-semibold text-slate-800">Upcoming Trials</CardTitle>
//               <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
//                 {trialsData?.length || 0} Upcoming
//               </Badge>
//             </div>
//           </CardHeader>
//           <CardContent className="p-0">
//             <div className="max-h-[400px] overflow-auto">
//               {trialsData?.length > 0 ? (
//                 <table className="w-full">
//                   <thead className="sticky top-0 bg-slate-50 text-xs uppercase text-slate-500">
//                     <tr>
//                       <th className="px-4 py-3 font-medium text-left">Case ID</th>
//                       <th className="px-4 py-3 font-medium text-left">Court Location</th>
//                       <th className="px-4 py-3 font-medium text-left">Description</th>
//                       <th className="px-4 py-3 font-medium text-left">Date</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {trialsData?.map((trial, index) => (
//                       <tr
//                         key={trial.id}
//                         className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${
//                           index % 2 === 0 ? "bg-white" : "bg-slate-50/50"
//                         }`}
//                       >
//                         <td className="px-4 py-3 text-sm font-medium text-slate-700">
//                           <div className="flex items-center gap-2">
//                             <Briefcase className="h-4 w-4 text-slate-400" />
//                             {trial.id}
//                           </div>
//                         </td>
//                         <td className="px-4 py-3 text-sm text-slate-700">
//                           <div className="flex items-center gap-2">
//                             <MapPin className="h-4 w-4 text-slate-400" />
//                             {trial.location}
//                           </div>
//                         </td>
//                         <td className="px-4 py-3 text-sm text-slate-700">
//                           <div className="flex items-center gap-2 max-w-[200px]">
//                             <FileText className="h-4 w-4 flex-shrink-0 text-slate-400" />
//                             <span className="truncate" title={trial.description}>
//                               {trial.description}
//                             </span>
//                           </div>
//                         </td>
//                         <td className="px-4 py-3 text-sm text-slate-700">
//                           <div className="flex items-center gap-2">
//                             <Calendar className="h-4 w-4 text-slate-400" />
//                             {new Date(trial.trial_date).toLocaleDateString()}
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               ) : (
//                 <div className="flex flex-col items-center justify-center py-12 text-center">
//                   <AlertCircle className="h-12 w-12 text-slate-300 mb-4" />
//                   <h3 className="text-lg font-medium text-slate-700">No upcoming trials</h3>
//                   <p className="text-sm text-slate-500 mt-1">You don't have any trials scheduled at the moment.</p>
//                 </div>
//               )}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Analytics */}
//         <Tabs defaultValue="caseDistribution" className="h-full">
//           <Card className="h-full">
//             <CardHeader className="pb-2">
//               <div className="flex items-center justify-between">
//                 <CardTitle className="text-xl font-semibold text-slate-800">Analytics</CardTitle>
//                 <TabsList className="bg-slate-100">
//                   <TabsTrigger value="caseDistribution">Distribution</TabsTrigger>
//                   <TabsTrigger value="revenue">Revenue</TabsTrigger>
//                 </TabsList>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <TabsContent value="caseDistribution" className="mt-0 h-[400px] flex items-center justify-center">
//                 <div className="w-full p-4">
//                   <DoughnutChart
//                     data={[
//                       statisticsData?.totalCases || 0,
//                       statisticsData?.completedCases || 0,
//                       statisticsData?.inProgressCases || 0,
//                     ]}
//                   />
//                   <div className="flex justify-center gap-6 mt-4">
//                     <div className="flex items-center gap-2">
//                       <div className="h-3 w-3 rounded-full bg-purple-500"></div>
//                       <span className="text-sm text-slate-600">Total</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <div className="h-3 w-3 rounded-full bg-green-500"></div>
//                       <span className="text-sm text-slate-600">Completed</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <div className="h-3 w-3 rounded-full bg-blue-500"></div>
//                       <span className="text-sm text-slate-600">Pending</span>
//                     </div>
//                   </div>
//                 </div>
//               </TabsContent>
//               <TabsContent value="revenue" className="mt-0 h-[400px] flex items-center justify-center">
//                 <div className="w-full h-full p-4">
//                   <LineChart data={[45000]} />
//                   <div className="flex justify-center mt-4">
//                     <div className="flex items-center gap-2">
//                       <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
//                       <span className="text-sm text-slate-600">Revenue (Birr)</span>
//                     </div>
//                   </div>
//                 </div>
//               </TabsContent>
//             </CardContent>
//           </Card>
//         </Tabs>
//       </div>

//       {/* Recent Activity */}
//       <Card className="mt-6">
//         <CardHeader>
//           <CardTitle className="text-xl font-semibold text-slate-800">Recent Activity</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             {[1, 2, 3].map((_, index) => (
//               <div key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
//                 <div
//                   className={`rounded-full p-2 ${
//                     index === 0
//                       ? "bg-blue-50 text-blue-500"
//                       : index === 1
//                         ? "bg-green-50 text-green-500"
//                         : "bg-purple-50 text-purple-500"
//                   }`}
//                 >
//                   {index === 0 ? (
//                     <FileText className="h-5 w-5" />
//                   ) : index === 1 ? (
//                     <CheckCircle className="h-5 w-5" />
//                   ) : (
//                     <Briefcase className="h-5 w-5" />
//                   )}
//                 </div>
//                 <div>
//                   <p className="font-medium text-slate-800">
//                     {index === 0
//                       ? "Case document updated"
//                       : index === 1
//                         ? "Case #1234 marked as complete"
//                         : "New case assigned"}
//                   </p>
//                   <p className="text-sm text-slate-500">
//                     {index === 0
//                       ? "You updated documents for Case #5678"
//                       : index === 1
//                         ? "Case for Smith vs. Johnson completed"
//                         : "You were assigned to Case #9012"}
//                   </p>
//                   <p className="text-xs text-slate-400 mt-1">
//                     {index === 0 ? "2 hours ago" : index === 1 ? "Yesterday" : "3 days ago"}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>

//       <TrialNotify show={true} />
//     </div>
//   )
// }

// const StatsCard = ({ title, value, icon, color, iconColor }) => (
//   <Card className="overflow-hidden">
//     <CardContent className={`p-6 ${color}`}>
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm font-medium text-slate-500">{title}</p>
//           <h3 className="text-3xl font-bold text-slate-800 mt-1">{value}</h3>
//         </div>
//         <div className={`rounded-full p-3 ${color} ${iconColor}`}>{icon}</div>
//       </div>
//     </CardContent>
//   </Card>
// )

// export default LawyerDashboard
