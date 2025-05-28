
"use client"

import type React from "react"

import { useEffect } from "react"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { getNewLawyers } from "../api/lawyers"
import { useNotifications } from "@/app/context/NotificationContext"
import { LoadingComponent, ErrorComponent } from "@/components/LoadingErrorComponents"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, User, Clock, ChevronRight } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface Lawyer {
  id: string
  email: string
  photo: string
  date: string
  full_name?: string
  specialization?: string
}

const ManageLawyers: React.FC = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["lawyers"],
    queryFn: getNewLawyers,
    refetchInterval: 180000, // Refetch every 3 minutes
  })

  const { setLawyerNotifications } = useNotifications()

  useEffect(() => {
    if (data?.lawyers?.length) {
      setLawyerNotifications(data.lawyers.length)
    }
  }, [data, setLawyerNotifications])

  if (isLoading) return <LoadingComponent />
  if (error) return <ErrorComponent errorMessage="Failed to load data. Please try again." />

  const lawyers = data?.lawyers || []

  // Format date to relative time (e.g., "2 days ago")
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return formatDistanceToNow(date, { addSuffix: true })
    } catch (e) {
      return dateString
    }
  }

  return (
    <div className="w-full p-6 pt-28 lg:pl-72">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Lawyer Applications</h1>
        <p className="text-gray-500 mt-1">Review and approve new lawyer applications for the platform</p>
      </div>

      {lawyers.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <User className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-700">No pending applications</h3>
          <p className="text-gray-500 mt-2">There are no new lawyer applications to review at this time.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {lawyers.map((lawyer: Lawyer) => (
            <Link
              href={`/admin/manage/${lawyer.id}`}
              key={lawyer.id}
              className="block transition-transform duration-200 hover:translate-y-[-4px]"
            >
              <Card className="overflow-hidden h-full border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-r from-purple-600/90 to-purple-800/90 p-4">
                    <div className="flex justify-between items-center">
                      <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                        New Application
                      </Badge>
                      <div className="flex items-center text-white/80 text-sm">
                        <Clock size={14} className="mr-1" />
                        {formatDate(lawyer.date)}
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-white shadow-md">
                        <Image
                          src={lawyer.photo || "/placeholder.svg?height=64&width=64"}
                          alt={lawyer.full_name || "Lawyer"}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">{lawyer.full_name || "New Applicant"}</h3>
                        <div className="flex items-center text-gray-500 text-sm mt-1">
                          <Mail size={14} className="mr-1 flex-shrink-0" />
                          <span className="truncate">{lawyer.email}</span>
                        </div>
                        {lawyer.specialization && (
                          <div className="mt-2">
                            <Badge variant="outline" className="text-xs">
                              {lawyer.specialization}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <div className="text-purple-600 flex items-center text-sm font-medium">
                        View details
                        <ChevronRight size={16} className="ml-1" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default ManageLawyers
