

"use client"

import type React from "react"

import { useMutation, type UseMutationResult, useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"
import { getLawyerById, rejectLawyer, verifyLawyer } from "../../api/lawyers"
import { toast } from "sonner"
import { ErrorComponent, LoadingComponent } from "@/components/LoadingErrorComponents"
import {
  ChevronLeft,
  FileText,
  Mail,
  Globe,
  Briefcase,
  FileCheck,
  BadgeIcon as IdCard,
  FileSpreadsheet,
  Info,
  Check,
  X,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

interface LawyerDetail {
  id: string
  full_name: string
  email: string
  resume: string
  photo: string
  qualification: string
  identification_card: string
  CV: string
  description: string
  specialization?: string
  working_languages?: string[]
  working_areas?: string[]
}

const LawyerDetailPage: React.FC = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const params = useParams()
  const { id } = params

  const { data, isLoading, error } = useQuery({
    queryKey: ["lawyer", id],
    queryFn: () => getLawyerById(id),
  })

  const verifyMutation: UseMutationResult<void, unknown> = useMutation({
    mutationFn: () => verifyLawyer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lawyers"] })
      toast.success("Lawyer application approved successfully")
      router.back()
    },
    onError: () => {
      toast.error("Failed to approve the lawyer application")
    },
  })

  const rejectMutation: UseMutationResult<void, unknown> = useMutation({
    mutationFn: () => rejectLawyer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lawyers"] })
      toast.success("Lawyer application rejected")
      router.back()
    },
    onError: () => {
      toast.error("Failed to reject the lawyer application")
    },
  })

  const handleVerify = async () => {
    await verifyMutation.mutateAsync()
  }

  const handleReject = async () => {
    await rejectMutation.mutateAsync()
  }

  if (isLoading) return <LoadingComponent />
  if (error) return <ErrorComponent errorMessage="Failed to load lawyer data. Please try again." />

  const lawyer = data as LawyerDetail
  const workingLanguages = lawyer.working_languages || ["Amharic", "Tigray", "Oromifa"]
  const workingAreas = lawyer.working_areas || ["Supreme Court", "High Court"]

  // Function to format document links
  const formatDocumentLink = (url: string, type: string) => {
    if (!url) return "Not provided"

    const fileName = url.split("/").pop() || type
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center text-purple-600 hover:text-purple-800 hover:underline"
      >
        <span className="truncate max-w-[250px]">{fileName}</span>
        <ExternalLink size={14} className="ml-1 flex-shrink-0" />
      </a>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => router.back()} className="mr-4">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Applications
          </Button>
          <h1 className="text-2xl font-bold text-gray-800">Lawyer Application</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Profile Card */}
          <Card className="md:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Profile</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
              <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-white shadow-md mb-4">
                <Image
                  src={lawyer.photo || "/placeholder.svg?height=128&width=128"}
                  alt={lawyer.full_name}
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="text-xl font-bold">{lawyer.full_name}</h2>
              <p className="text-gray-500 flex items-center mt-1">
                <Mail size={14} className="mr-1" />
                {lawyer.email}
              </p>
              {lawyer.specialization && (
                <Badge variant="outline" className="mt-3">
                  {lawyer.specialization}
                </Badge>
              )}
            </CardContent>
          </Card>

          {/* Details Card */}
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Application Details</CardTitle>
              <CardDescription>Review the lawyer's professional information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                {/* Working Languages */}
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Globe size={16} className="mr-2 text-purple-600" />
                    <span>Working Languages</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {workingLanguages.map((language) => (
                      <Badge key={language} variant="secondary">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Working Areas */}
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Briefcase size={16} className="mr-2 text-purple-600" />
                    <span>Working Areas</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {workingAreas.map((area) => (
                      <Badge key={area} variant="secondary">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Info size={16} className="mr-2 text-purple-600" />
                    <span>Description</span>
                  </div>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-md">
                    {lawyer.description || "No description provided"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Documents Card */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Documents</CardTitle>
            <CardDescription>Review the lawyer's submitted documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div className="space-y-1">
                <div className="flex items-center text-sm text-gray-500">
                  <FileText size={16} className="mr-2 text-purple-600" />
                  <span>Resume</span>
                </div>
                {formatDocumentLink(lawyer.resume, "Resume")}
              </div>

              <div className="space-y-1">
                <div className="flex items-center text-sm text-gray-500">
                  <FileCheck size={16} className="mr-2 text-purple-600" />
                  <span>Qualification</span>
                </div>
                {formatDocumentLink(lawyer.qualification, "Qualification")}
              </div>

              <div className="space-y-1">
                <div className="flex items-center text-sm text-gray-500">
                  <IdCard size={16} className="mr-2 text-purple-600" />
                  <span>Identification Card</span>
                </div>
                {formatDocumentLink(lawyer.identification_card, "ID Card")}
              </div>

              <div className="space-y-1">
                <div className="flex items-center text-sm text-gray-500">
                  <FileSpreadsheet size={16} className="mr-2 text-purple-600" />
                  <span>CV</span>
                </div>
                {formatDocumentLink(lawyer.CV, "CV")}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mb-8">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700">
                <X className="h-4 w-4 mr-2" />
                Reject Application
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reject Lawyer Application</DialogTitle>
                <DialogDescription>
                  Are you sure you want to reject this lawyer application? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button variant="destructive" onClick={handleReject} disabled={rejectMutation.isPending}>
                  {rejectMutation.isPending ? "Rejecting..." : "Confirm Rejection"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Check className="h-4 w-4 mr-2" />
                Approve Application
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Approve Lawyer Application</DialogTitle>
                <DialogDescription>
                  Are you sure you want to approve this lawyer application? This will grant them access to the platform.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={handleVerify}
                  disabled={verifyMutation.isPending}
                >
                  {verifyMutation.isPending ? "Approving..." : "Confirm Approval"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

export default LawyerDetailPage
