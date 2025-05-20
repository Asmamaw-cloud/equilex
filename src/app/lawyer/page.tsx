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
//             <p>{!statisticsData?.completedCases && 0}</p>
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
//           <LineChart data={[45000]} />
//         </div>
//       </div>
//       <TrialNotify show={true} />
//     </div>
//   );
// };

// export default Lawyer;






"use client"

import { useQuery } from "@tanstack/react-query"
import { getTrials } from "./api/trial"
import { getStatistics } from "./api/statistics"
import { ErrorComponent, LoadingComponent } from "@/components/LoadingErrorComponents"
import { Briefcase, CheckCircle, Clock, AlertCircle, Calendar, MapPin, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DoughnutChart from "@/components/chart/DoughnutChart"
import LineChart from "@/components/chart/LineChart"
import TrialNotify from "@/components/TrialNotify"

const LawyerDashboard = () => {
  const {
    data: trialsData,
    isLoading: isLoadingTrials,
    error: trialsError,
  } = useQuery({
    queryKey: ["trials"],
    queryFn: getTrials,
    refetchInterval: 6000, // Refetch every minute
  })

  const {
    data: statisticsData,
    isLoading: isLoadingStatistics,
    error: statisticsError,
  } = useQuery({
    queryKey: ["statistics"],
    queryFn: getStatistics,
    refetchInterval: 120000, // Refetch every 2 minutes
  })

  if (isLoadingTrials || isLoadingStatistics) return <LoadingComponent />
  if (trialsError || statisticsError)
    return <ErrorComponent errorMessage="Failed to load dashboard data. Please try again." />

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 px-4 py-6 lg:px-8 lg:pl-64">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-500">Welcome back. Here's an overview of your cases.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <StatsCard
          title="Total Cases"
          value={statisticsData?.totalCases || 0}
          icon={<Briefcase className="h-5 w-5" />}
          color="bg-purple-50"
          iconColor="text-purple-500"
        />
        <StatsCard
          title="Completed Cases"
          value={statisticsData?.completedCases || 0}
          icon={<CheckCircle className="h-5 w-5" />}
          color="bg-green-50"
          iconColor="text-green-500"
        />
        <StatsCard
          title="Pending Cases"
          value={statisticsData?.inProgressCases || 0}
          icon={<Clock className="h-5 w-5" />}
          color="bg-blue-50"
          iconColor="text-blue-500"
        />
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming Trials */}
        <Card className="overflow-hidden">
          <CardHeader className="bg-white pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold text-slate-800">Upcoming Trials</CardTitle>
              <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
                {trialsData?.length || 0} Upcoming
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-[400px] overflow-auto">
              {trialsData?.length > 0 ? (
                <table className="w-full">
                  <thead className="sticky top-0 bg-slate-50 text-xs uppercase text-slate-500">
                    <tr>
                      <th className="px-4 py-3 font-medium text-left">Case ID</th>
                      <th className="px-4 py-3 font-medium text-left">Court Location</th>
                      <th className="px-4 py-3 font-medium text-left">Description</th>
                      <th className="px-4 py-3 font-medium text-left">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trialsData?.map((trial, index) => (
                      <tr
                        key={trial.id}
                        className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${
                          index % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                        }`}
                      >
                        <td className="px-4 py-3 text-sm font-medium text-slate-700">
                          <div className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4 text-slate-400" />
                            {trial.id}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-700">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-slate-400" />
                            {trial.location}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-700">
                          <div className="flex items-center gap-2 max-w-[200px]">
                            <FileText className="h-4 w-4 flex-shrink-0 text-slate-400" />
                            <span className="truncate" title={trial.description}>
                              {trial.description}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-700">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-slate-400" />
                            {new Date(trial.trial_date).toLocaleDateString()}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <AlertCircle className="h-12 w-12 text-slate-300 mb-4" />
                  <h3 className="text-lg font-medium text-slate-700">No upcoming trials</h3>
                  <p className="text-sm text-slate-500 mt-1">You don't have any trials scheduled at the moment.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Analytics */}
        <Tabs defaultValue="caseDistribution" className="h-full">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold text-slate-800">Analytics</CardTitle>
                <TabsList className="bg-slate-100">
                  <TabsTrigger value="caseDistribution">Distribution</TabsTrigger>
                  <TabsTrigger value="revenue">Revenue</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent>
              <TabsContent value="caseDistribution" className="mt-0 h-[400px] flex items-center justify-center">
                <div className="w-full p-4">
                  <DoughnutChart
                    data={[
                      statisticsData?.totalCases || 0,
                      statisticsData?.completedCases || 0,
                      statisticsData?.inProgressCases || 0,
                    ]}
                  />
                  <div className="flex justify-center gap-6 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                      <span className="text-sm text-slate-600">Total</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <span className="text-sm text-slate-600">Completed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                      <span className="text-sm text-slate-600">Pending</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="revenue" className="mt-0 h-[400px] flex items-center justify-center">
                <div className="w-full h-full p-4">
                  <LineChart data={[45000]} />
                  <div className="flex justify-center mt-4">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                      <span className="text-sm text-slate-600">Revenue (Birr)</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
      </div>

      {/* Recent Activity */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-800">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                <div
                  className={`rounded-full p-2 ${
                    index === 0
                      ? "bg-blue-50 text-blue-500"
                      : index === 1
                        ? "bg-green-50 text-green-500"
                        : "bg-purple-50 text-purple-500"
                  }`}
                >
                  {index === 0 ? (
                    <FileText className="h-5 w-5" />
                  ) : index === 1 ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <Briefcase className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-slate-800">
                    {index === 0
                      ? "Case document updated"
                      : index === 1
                        ? "Case #1234 marked as complete"
                        : "New case assigned"}
                  </p>
                  <p className="text-sm text-slate-500">
                    {index === 0
                      ? "You updated documents for Case #5678"
                      : index === 1
                        ? "Case for Smith vs. Johnson completed"
                        : "You were assigned to Case #9012"}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {index === 0 ? "2 hours ago" : index === 1 ? "Yesterday" : "3 days ago"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <TrialNotify show={true} />
    </div>
  )
}

const StatsCard = ({ title, value, icon, color, iconColor }) => (
  <Card className="overflow-hidden">
    <CardContent className={`p-6 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="text-3xl font-bold text-slate-800 mt-1">{value}</h3>
        </div>
        <div className={`rounded-full p-3 ${color} ${iconColor}`}>{icon}</div>
      </div>
    </CardContent>
  </Card>
)

export default LawyerDashboard
