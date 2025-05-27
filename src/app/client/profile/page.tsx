// "use client";
// import { Icon } from "@iconify/react/dist/iconify.js";
// import React, { useEffect, useState } from "react";

// import {
//   useMutation,
//   useQuery,
//   useQueryClient,
//   UseMutationResult,
// } from "@tanstack/react-query";

// import Image from "next/image";
// // import { useToast } from "@/components/ui/sonner";

// import { getClientById, updateClient } from "../api/client";
// import { useSession } from "next-auth/react";
// import { FileUploader } from "@/components/file-uploader";
// import { toast } from "sonner";

// const ClientProfileForm = () => {
//   const queryClient = useQueryClient();
//   const { data: session } = useSession();

//   // @ts-ignore
//   const client_id = session?.user?.image?.id;

//   const {
//     data: profileData,
//     isLoading: profileLoading,
//     error: profileError,
//   } = useQuery({
//     queryKey: ["profile"],
//     queryFn: () => getClientById(client_id),
//   });


//   const updateMutation: UseMutationResult<void, unknown, object> = useMutation({
//     mutationFn: (data: object) => updateClient(data),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["profile"] });
//       toast(`Profile Updated successfully!`);
//     },
//     onError: (error: any) => {
//       toast(`ERROR! "Failed to update profile."`);

//     },
//   });

//   const [isEditingPhoneNumber, setIsEditingPhoneNumber] = useState(false);
//   const [isEditingFullName, setIsEditingFullName] = useState(false);
//   //   const { toast } = useToast();

//   const [profilePhoto, setProfilePhoto] = useState<string>(profileData?.photo);
//   const [phoneNumber, setPhoneNumber] = useState<string>(
//     profileData?.phone_number
//   );
//   const [newFullName, setNewFullName] = useState(profileData?.full_name);

//   useEffect(() => {
//     setProfilePhoto(profileData?.photo);
//     setPhoneNumber(profileData?.phone_number);
//     setNewFullName(profileData?.full_name);
//   }, [profileData]);

//   const handleUpdateSubmit = async () => {
//     const data = {
//       photo: profilePhoto,
//       phone_number: phoneNumber,
//       full_name: newFullName,
//     };

//     await updateMutation.mutateAsync(data);
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl mb-4">Client Profile</h2>
//       <div className="mb-4 text-center relative">
//         <div className="relative inline-block space-y-2 lg:w-[300px]">
//           <label className="block text-gray-700 font-bold">Profile Photo</label>
//           {!profilePhoto ? (
//             <FileUploader
//               onUploadComplete={(urls) => {
//                 setProfilePhoto(urls[0]);
//               }}
//               maxFiles={5}
//               maxSize={4}
//               fileTypes={["image", "pdf"]}
//             />
//           ) : (
//             <div className="flex flex-col items-center">
//               <Image
//                 src={profilePhoto}
//                 width={200}
//                 height={200}
//                 alt="Profile Photo"
//                 className="w-[200px] h-[200px] object-cover rounded-full"
//               />
//               <button
//                 onClick={() => {
//                   setProfilePhoto("");
//                   // setNewPhoto("");
//                 }}
//                 className="w-[200px] bg-[#7B3B99] hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-2"
//               >
//                 Choose Another Photo
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-700 font-bold">Full Name</label>
//         {isEditingFullName ? (
//           <div className="flex">
//             <input
//               type="text"
//               value={newFullName}
//               onChange={(e) => setNewFullName(e.target.value)}
//               className="border p-2 w-full mb-2"
//             />
//           </div>
//         ) : (
//           <div className="flex justify-between items-center">
//             <p>{newFullName}</p>
//             <div
//               className="bg-white w-8 h-8 rounded-full outline outline-green-500 flex justify-center items-center cursor-pointer"
//               onClick={() => setIsEditingFullName(true)}
//             >
//               <Icon
//                 icon="ic:outline-edit"
//                 color="green"
//                 width={20}
//                 height={20}
//               />
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-700 font-bold">Phone Number</label>
//         {isEditingPhoneNumber ? (
//           <div className="flex">
//             <input
//               type="tel"
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               className="border p-2 w-full mb-2"
//             />
//           </div>
//         ) : (
//           <div className="flex justify-between items-center">
//             <p>{phoneNumber}</p>
//             <div
//               className="bg-white w-8 h-8 rounded-full outline outline-green-500 flex justify-center items-center cursor-pointer"
//               onClick={() => setIsEditingPhoneNumber(true)}
//             >
//               <Icon
//                 icon="ic:outline-edit"
//                 color="green"
//                 width={20}
//                 height={20}
//               />
//             </div>
//           </div>
//         )}
//       </div>

//       {isEditingPhoneNumber && (
//         <button
//           onClick={handleUpdateSubmit}
//           className="bg-[#7B3B99] hover:bg-purple-700 text-white font-bold py-2 px-4 rounded ml-2"
//         >
//           Update
//         </button>
//       )}
//     </div>
//   );
// };

// export default ClientProfileForm;






"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { Edit2, User, Phone, Camera, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileUploader } from "@/components/file-uploader"

import { getClientById, updateClient } from "../api/client"

interface ClientProfile {
  id: string
  photo?: string
  phone_number?: string
  full_name?: string
}

interface EditState {
  fullName: boolean
  phoneNumber: boolean
}

const ClientProfileForm: React.FC = () => {
  const queryClient = useQueryClient()
  const { data: session } = useSession()

  // Type-safe client ID extraction
  const clientId = session?.user?.image?.id as string

  // Form state
  const [formData, setFormData] = useState<Partial<ClientProfile>>({})
  const [editState, setEditState] = useState<EditState>({
    fullName: false,
    phoneNumber: false,
  })

  // API queries and mutations
  const {
    data: profileData,
    isLoading: isProfileLoading,
    error: profileError,
  } = useQuery({
    queryKey: ["client-profile", clientId],
    queryFn: () => getClientById(Number(clientId)),
    enabled: !!clientId,
  })

  const updateMutation = useMutation({
    mutationFn: (data: Partial<ClientProfile>) => updateClient(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client-profile", clientId] })
      toast.success("Profile updated successfully!")
      setEditState({ fullName: false, phoneNumber: false })
    },
    onError: (error: Error) => {
      toast.error("Failed to update profile. Please try again.")
      console.error("Profile update error:", error)
    },
  })

  // Sync form data with profile data
  useEffect(() => {
    if (profileData) {
      setFormData({
        photo: profileData.photo,
        phone_number: profileData.phone_number,
        full_name: profileData.full_name,
      })
    }
  }, [profileData])

  // Handlers
  const handleFieldUpdate = (field: keyof ClientProfile, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleEditToggle = (field: keyof EditState) => {
    setEditState((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  const handleSave = async () => {
    if (!formData) return

    try {
      await updateMutation.mutateAsync(formData)
    } catch (error) {
      // Error is handled in mutation onError
    }
  }

  const handlePhotoUpload = (urls: string[]) => {
    if (urls.length > 0) {
      handleFieldUpdate("photo", urls[0])
    }
  }

  const handlePhotoRemove = () => {
    handleFieldUpdate("photo", "")
  }

  // Loading state
  if (isProfileLoading) {
    return <ProfileSkeleton />
  }

  // Error state
  if (profileError) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="text-center text-red-600">Failed to load profile data. Please refresh the page.</div>
        </CardContent>
      </Card>
    )
  }

  const hasChanges =
    JSON.stringify(formData) !==
    JSON.stringify({
      photo: profileData?.photo,
      phone_number: profileData?.phone_number,
      full_name: profileData?.full_name,
    })

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Client Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Photo Section */}
          <div className="flex flex-col items-center space-y-4">
            <Label className="text-base font-semibold">Profile Photo</Label>

            {formData.photo ? (
              <div className="flex flex-col items-center space-y-3">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={formData.photo || "/placeholder.svg"} alt="Profile photo" />
                  <AvatarFallback>
                    <User className="h-16 w-16" />
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" onClick={handlePhotoRemove} className="flex items-center gap-2">
                  <Camera className="h-4 w-4" />
                  Change Photo
                </Button>
              </div>
            ) : (
              <div className="w-full max-w-sm">
                <FileUploader onUploadComplete={handlePhotoUpload} maxFiles={1} maxSize={4} fileTypes={["image"]} />
              </div>
            )}
          </div>

          {/* Full Name Section */}
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-base font-semibold">
              Full Name
            </Label>
            {editState.fullName ? (
              <div className="flex gap-2">
                <Input
                  id="fullName"
                  value={formData.full_name || ""}
                  onChange={(e) => handleFieldUpdate("full_name", e.target.value)}
                  placeholder="Enter your full name"
                  className="flex-1"
                />
                <Button size="sm" onClick={() => handleEditToggle("fullName")} variant="outline">
                  Cancel
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between p-3 border rounded-md bg-gray-50">
                <span className="text-sm">{formData.full_name || "Not provided"}</span>
                <Button size="sm" variant="ghost" onClick={() => handleEditToggle("fullName")} className="h-8 w-8 p-0">
                  <Edit2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Phone Number Section */}
          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="text-base font-semibold">
              Phone Number
            </Label>
            {editState.phoneNumber ? (
              <div className="flex gap-2">
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={formData.phone_number || ""}
                  onChange={(e) => handleFieldUpdate("phone_number", e.target.value)}
                  placeholder="Enter your phone number"
                  className="flex-1"
                />
                <Button size="sm" onClick={() => handleEditToggle("phoneNumber")} variant="outline">
                  Cancel
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between p-3 border rounded-md bg-gray-50">
                <span className="text-sm flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {formData.phone_number || "Not provided"}
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleEditToggle("phoneNumber")}
                  className="h-8 w-8 p-0"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Save Button */}
          {hasChanges && (
            <div className="flex justify-end pt-4 border-t">
              <Button onClick={handleSave} disabled={updateMutation.isPending} className="min-w-[120px]">
                {updateMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Loading skeleton component
const ProfileSkeleton: React.FC = () => (
  <div className="max-w-2xl mx-auto p-6">
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-32" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <Skeleton className="h-32 w-32 rounded-full" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-12 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-12 w-full" />
        </div>
      </CardContent>
    </Card>
  </div>
)

export default ClientProfileForm
