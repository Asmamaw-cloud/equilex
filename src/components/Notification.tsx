// import { Bell } from "lucide-react";
// import { useSession } from "next-auth/react";
// import Link from "next/link";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// const Notification = () => {
//   const { data: session } = useSession();
//   //@ts-ignore
//   const { data } = session?.user.image.type == "client";
//   const notificationData = useQuery({
//     queryKey: ["notifications"],
//     queryFn: async () => {
//       const res = await axios.get(
//         `/api/trial/${
//           //@ts-ignore
//           session.user.image.type
//         }`
//       );
//       return res.data.trials`${
//         //@ts-ignore
//         session.user.image.type == "client" ? "/client/" : "/lawyer/"
//       }notification`;
//     },
//   });

//   console.log("Here are the notifications: ", data);

//   return (
//     <Link
//       href={`${
//         //@ts-ignore
//         session.user.image.type == "client" ? "/client/" : "/lawyer/"
//       }notification`}
//     >
//       <Bell />
//       {data?.length >= 1 ? (
//         <span className="bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] absolute top-0 left-7">
//           {data?.length}
//         </span>
//       ) : (
//         ""
//       )}
//     </Link>
//   );
// };

// export default Notification;

// import { Bell } from "lucide-react";
// import { useSession } from "next-auth/react";
// import Link from "next/link";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// const Notification = () => {
//   const { data: session } = useSession();
//   const type = session?.user?.image?.type;

//   const { data: notifications } = useQuery({
//     queryKey: ["notifications"],
//     queryFn: async () => {
//       const res = await axios.get(`/api/trial/${type}/notification`);
//       return res.data.trials;
//     },
//     enabled: !!type, // wait until type is available
//   });

//   return (
//     <Link href={`/${type}/notification`} className="relative">
//       <Bell />
//       {notifications?.length >= 1 && (
//         <span className="bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] absolute top-0 left-7">
//           {notifications.length}
//         </span>
//       )}
//     </Link>
//   );
// };

// export default Notification;



"use client"

import { Bell } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const Notification = () => {
  const { data: session } = useSession()
  const queryClient = useQueryClient()
  const [isRead, setIsRead] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const type = session?.user?.image?.type

  // Store read status in localStorage to persist between page refreshes
  useEffect(() => {
    const storedReadStatus = localStorage.getItem("notificationsRead")
    if (storedReadStatus) {
      setIsRead(JSON.parse(storedReadStatus))
    }
  }, [])

  const {
    data: notifications,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      try {
        const res = await axios.get(`/api/trial/${type}`)
        return res.data.trials
      } catch (error) {
        console.error("Error fetching notifications:", error)
        return []
      }
    },
    enabled: !!type, // Only run query when type is available
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  const notificationCount = notifications?.length || 0

  // Add animation when new notifications arrive
  useEffect(() => {
    if (notificationCount > 0 && !hasAnimated && !isRead) {
      setHasAnimated(true)
    }
  }, [notificationCount, hasAnimated, isRead])

  const handleNotificationClick = () => {
    setIsRead(true)
    localStorage.setItem("notificationsRead", "true")

    // Optional: Mark notifications as read on the server
    // This would require an API endpoint to update notification status
    // axios.post(`/api/notifications/mark-read`);

    // Refetch notifications after a delay to simulate server update
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] })
    }, 300)
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={`/${type}/notification`}
            className="relative inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-100 transition-colors"
            onClick={handleNotificationClick}
            aria-label={`${notificationCount} notifications`}
          >
            <Bell
              className={cn(
                "h-5 w-5 transition-colors",
                notificationCount > 0 && !isRead ? "text-primary" : "text-slate-500",
              )}
            />

            {notificationCount > 0 && !isRead && (
              <Badge
                variant="destructive"
                className={cn(
                  "absolute -top-1 -right-1 min-w-5 h-5 flex items-center justify-center text-[10px] font-medium px-1 rounded-full",
                  hasAnimated && "animate-pulse",
                )}
              >
                {notificationCount > 99 ? "99+" : notificationCount}
              </Badge>
            )}
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {notificationCount > 0
              ? `You have ${notificationCount} notification${notificationCount !== 1 ? "s" : ""}`
              : "No new notifications"}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default Notification
