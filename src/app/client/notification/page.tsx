// "use client";

// import { getCurrentDate } from "@/lib/utils";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { BellOff, Loader2, MapPin } from "lucide-react";
// import React from "react";

// const ClientNotification = () => {
//   const { data, isLoading, error } = useQuery({
//     queryKey: ["notifications"],
//     queryFn: async () => {
//       const res = await axios.get("/api/trial/client");
//       return res.data.trials;
//     },
//   });

//   console.log("Client Notification Data: ", data);

//   if (isLoading) {
//     return <Loader2 className="animate-spin" />;
//   }

//   if (!data || data?.length == 0) {
//     return (
//       <div className="flex items-center justify-center">
//         <div className="w-[400px] h-[300px] flex flex-col gap-3 items-center justify-center border rounded-lg shadow-md">
//           <BellOff className="w-[100px] h-[100px] text-gray-400" />
//           <div className="text-lg">No Notifications!</div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-gray-200 h-screen relative overflow-hidden">
//       <div className="bg-white w-[80%] overflow-y-scroll h-[80vh] items-center justify-center rounded-xl m-auto p-10 relative flex flex-col gap-8">
//         <div className="w-full h-full">
//           <div className="flex items-center gap-2 mb-2">
//             <b>Trials</b>
//             <p>[{getCurrentDate()}]</p>
//           </div>
//           {data.map((trial: any, index: any) => (
//             <div
//               key={index}
//               className="border-l-2 border-l-red-400 flex flex-col items-start p-3 rounded-l-md shadow-sm mb-2"
//             >
//               <div className="flex items-center font-semibold gap-[3px]">
//                 <MapPin className="w-4 h-4  text-gray-400" /> {trial.location}
//               </div>
//               <div className="text-gray-500">{trial.description}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClientNotification;





// "use client"

// import { getCurrentDate } from "@/lib/utils"
// import { useQuery } from "@tanstack/react-query"
// import axios from "axios"
// import { Bell, BellOff, Calendar, Clock, Filter, MapPin, Search } from "lucide-react"
// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Skeleton } from "@/components/ui/skeleton"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// const ClientNotification = () => {
//   const [searchQuery, setSearchQuery] = useState("")

//   const { data, isLoading, error } = useQuery({
//     queryKey: ["notifications"],
//     queryFn: async () => {
//       const res = await axios.get("/api/trial/client")
//       return res.data.trials
//     },
//   })
//   console.log("Client Notification Data: ", data)

//   // Filter notifications based on search query
//   const filteredData = data?.filter(
//     (trial: any) =>
//       trial.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       trial.description.toLowerCase().includes(searchQuery.toLowerCase()),
//   )
//   console.log("Filtered Data: ", filteredData)

//   // Handle error state
//   if (error) {
//     return (
//       <Card className="w-full max-w-3xl mx-auto mt-8">
//         <CardHeader className="pb-3">
//           <CardTitle className="text-red-500">Error Loading Notifications</CardTitle>
//           <CardDescription>There was a problem loading your notifications. Please try again later.</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Button onClick={() => window.location.reload()}>Retry</Button>
//         </CardContent>
//       </Card>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-4 md:p-8">
//       <Card className="w-full max-w-4xl mx-auto shadow-md">
//         <CardHeader className="pb-3 border-b">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <Bell className="h-5 w-5 text-primary" />
//               <CardTitle>Notifications</CardTitle>
//             </div>
//             <Badge variant="outline" className="text-xs font-normal">
//               {getCurrentDate()}
//             </Badge>
//           </div>
//           <CardDescription>Stay updated with your latest trial notifications</CardDescription>
//         </CardHeader>

//         <div className="p-4 border-b">
//           <div className="flex items-center gap-2">
//             <div className="relative flex-1">
//               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search notifications..."
//                 className="pl-8"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="outline" size="icon">
//                   <Filter className="h-4 w-4" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 <DropdownMenuItem onClick={() => setSearchQuery("")}>All Notifications</DropdownMenuItem>
//                 <DropdownMenuItem onClick={() => setSearchQuery("urgent")}>Urgent Only</DropdownMenuItem>
//                 <DropdownMenuItem onClick={() => setSearchQuery("today")}>Today Only</DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </div>

//         <CardContent className="p-0">
//           {isLoading ? (
//             <div className="p-6 space-y-4">
//               {[1, 2, 3].map((i) => (
//                 <div key={i} className="flex gap-4">
//                   <Skeleton className="h-12 w-12 rounded-full" />
//                   <div className="space-y-2 flex-1">
//                     <Skeleton className="h-4 w-full" />
//                     <Skeleton className="h-4 w-3/4" />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : !filteredData || filteredData.length === 0 ? (
//             <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
//               <div className="bg-slate-50 p-4 rounded-full mb-4">
//                 <BellOff className="w-12 h-12 text-slate-400" />
//               </div>
//               <h3 className="text-lg font-medium mb-1">No Notifications</h3>
//               <p className="text-muted-foreground max-w-sm">
//                 {searchQuery
//                   ? "No notifications match your search criteria."
//                   : "You don't have any notifications at the moment."}
//               </p>
//             </div>
//           ) : (
//             <div className="divide-y max-h-[60vh] overflow-y-auto">
//               {filteredData.map((trial: any, index: number) => (
//                 <div key={index} className="p-4 hover:bg-slate-50 transition-colors">
//                   <div className="flex items-start gap-4">
//                     <div className="bg-primary/10 p-2 rounded-full">
//                       <MapPin className="w-5 h-5 text-primary" />
//                     </div>
//                     <div className="flex-1">
//                       <div className="flex items-center justify-between mb-1">
//                         <h3 className="font-medium">{trial.location}</h3>
//                         <div className="flex items-center text-xs text-muted-foreground">
//                           <Clock className="w-3 h-3 mr-1" />
//                           <span>{new Date(trial.trial_date).toLocaleDateString() - getCurrentDate()} ago</span>
//                         </div>
//                       </div>
//                       <p className="text-sm text-muted-foreground">{trial.description}</p>

//                       <div className="flex items-center gap-2 mt-2">
//                         <Badge variant="outline" className="text-xs">
//                           <Calendar className="w-3 h-3 mr-1" />
//                           {new Date(trial.trial_date).toLocaleDateString()}

//                           {/* {trial.trial_date.toLocaleDateString()} */}
//                           {/* {new Date().toLocaleDateString()} */}
//                         </Badge>
//                         {/* {index % 3 === 0 && (
//                           <Badge variant="secondary" className="text-xs">
//                             Urgent
//                           </Badge>
//                         )} */}
//                       </div>
//                     </div>
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

// export default ClientNotification





"use client"

import { getCurrentDate } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Bell, BellOff, Calendar, Clock, Filter, MapPin, Search } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Function to format time left
const formatTimeLeft = (dateString: string) => {
  const trialDate = new Date(dateString)
  const now = new Date()

  // Check if date is valid
  if (isNaN(trialDate.getTime())) {
    return "Invalid date"
  }

  // Calculate seconds difference
  const seconds = Math.floor((trialDate.getTime() - now.getTime()) / 1000)

  // If trial date has passed
  if (seconds < 0) {
    return "Expired"
  }

  // Time intervals in seconds
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  }

  let counter
  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    counter = Math.floor(seconds / secondsInUnit)
    if (counter > 0) {
      return `${counter} ${unit}${counter === 1 ? "" : "s"} left`
    }
  }

  return "Just now"
}

const ClientNotification = () => {
  const [searchQuery, setSearchQuery] = useState("")

  const { data, isLoading, error } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await axios.get("/api/trial/client")
      return res.data.trials
    },
  })

  // Filter notifications based on search query
  const filteredData = data?.filter(
    (trial: any) =>
      trial.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trial.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Handle error state
  if (error) {
    return (
      <Card className="w-full max-w-3xl mx-auto mt-8">
        <CardHeader className="pb-3">
          <CardTitle className="text-red-500">Error Loading Notifications</CardTitle>
          <CardDescription>There was a problem loading your notifications. Please try again later.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-4 md:p-8">
      <Card className="w-full max-w-4xl mx-auto shadow-md">
        <CardHeader className="pb-3 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <CardTitle>Notifications</CardTitle>
            </div>
            <Badge variant="outline" className="text-xs font-normal">
              {getCurrentDate()}
            </Badge>
          </div>
          <CardDescription>Stay updated with your upcoming trial notifications</CardDescription>
        </CardHeader>

        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notifications..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSearchQuery("")}>All Notifications</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSearchQuery("urgent")}>Urgent Only</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSearchQuery("today")}>Today Only</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : !filteredData || filteredData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <div className="bg-slate-50 p-4 rounded-full mb-4">
                <BellOff className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium mb-1">No Notifications</h3>
              <p className="text-muted-foreground max-w-sm">
                {searchQuery
                  ? "No notifications match your search criteria."
                  : "You don't have any notifications at the moment."}
              </p>
            </div>
          ) : (
            <div className="divide-y max-h-[60vh] overflow-y-auto">
              {filteredData.map((trial: any, index: number) => {
                const timeLeft = formatTimeLeft(trial.trial_date)
                const isExpired = timeLeft === "Expired"

                return (
                  <div key={index} className="p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-full ${isExpired ? "bg-red-100" : "bg-primary/10"}`}>
                        <MapPin className={`w-5 h-5 ${isExpired ? "text-red-500" : "text-primary"}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium">{trial.location}</h3>
                          <div className="flex items-center text-xs">
                            <Clock className={`w-3 h-3 mr-1 ${isExpired ? "text-red-500" : "text-muted-foreground"}`} />
                            <span className={isExpired ? "text-red-500 font-medium" : "text-muted-foreground"}>
                              {timeLeft}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{trial.description}</p>

                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(trial.trial_date).toLocaleDateString()}
                          </Badge>
                          {isExpired ? (
                            <Badge variant="destructive" className="text-xs">
                              Expired
                            </Badge>
                          ) : index % 3 === 0 ? (
                            <Badge variant="secondary" className="text-xs">
                              Urgent
                            </Badge>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default ClientNotification
