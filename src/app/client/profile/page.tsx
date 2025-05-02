"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";

import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";

import Image from "next/image";
// import { useToast } from "@/components/ui/sonner";

import { getClientById, updateClient } from "../api/client";
import { useSession } from "next-auth/react";
import { FileUploader } from "@/components/file-uploader";
import { toast } from "sonner";

const ClientProfileForm = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  // @ts-ignore
  const client_id = session?.user?.image?.id;

  const {
    data: profileData,
    isLoading: profileLoading,
    error: profileError,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getClientById(client_id),
  });


  const updateMutation: UseMutationResult<void, unknown, object> = useMutation({
    mutationFn: (data: object) => updateClient(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast(`Profile Updated successfully!`);
    },
    onError: (error: any) => {
      toast(`ERROR! "Failed to update profile."`);

    },
  });

  const [isEditingPhoneNumber, setIsEditingPhoneNumber] = useState(false);
  const [isEditingFullName, setIsEditingFullName] = useState(false);
  //   const { toast } = useToast();

  const [profilePhoto, setProfilePhoto] = useState<string>(profileData?.photo);
  const [phoneNumber, setPhoneNumber] = useState<string>(
    profileData?.phone_number
  );
  const [newFullName, setNewFullName] = useState(profileData?.full_name);

  useEffect(() => {
    setProfilePhoto(profileData?.photo);
    setPhoneNumber(profileData?.phone_number);
    setNewFullName(profileData?.full_name);
  }, [profileData]);

  const handleUpdateSubmit = async () => {
    const data = {
      photo: profilePhoto,
      phone_number: phoneNumber,
      full_name: newFullName,
    };

    await updateMutation.mutateAsync(data);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Client Profile</h2>
      <div className="mb-4 text-center relative">
        <div className="relative inline-block space-y-2 lg:w-[300px]">
          <label className="block text-gray-700 font-bold">Profile Photo</label>
          {!profilePhoto ? (
            <FileUploader
              onUploadComplete={(urls) => {
                setProfilePhoto(urls[0]);
              }}
              maxFiles={5}
              maxSize={4}
              fileTypes={["image", "pdf"]}
            />
          ) : (
            <div className="flex flex-col items-center">
              <Image
                src={profilePhoto}
                width={200}
                height={200}
                alt="Profile Photo"
                className="w-[200px] h-[200px] object-cover rounded-full"
              />
              <button
                onClick={() => {
                  setProfilePhoto("");
                  // setNewPhoto("");
                }}
                className="w-[200px] bg-[#7B3B99] hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-2"
              >
                Choose Another Photo
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold">Full Name</label>
        {isEditingFullName ? (
          <div className="flex">
            <input
              type="text"
              value={newFullName}
              onChange={(e) => setNewFullName(e.target.value)}
              className="border p-2 w-full mb-2"
            />
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <p>{newFullName}</p>
            <div
              className="bg-white w-8 h-8 rounded-full outline outline-green-500 flex justify-center items-center cursor-pointer"
              onClick={() => setIsEditingFullName(true)}
            >
              <Icon
                icon="ic:outline-edit"
                color="green"
                width={20}
                height={20}
              />
            </div>
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold">Phone Number</label>
        {isEditingPhoneNumber ? (
          <div className="flex">
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="border p-2 w-full mb-2"
            />
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <p>{phoneNumber}</p>
            <div
              className="bg-white w-8 h-8 rounded-full outline outline-green-500 flex justify-center items-center cursor-pointer"
              onClick={() => setIsEditingPhoneNumber(true)}
            >
              <Icon
                icon="ic:outline-edit"
                color="green"
                width={20}
                height={20}
              />
            </div>
          </div>
        )}
      </div>

      {isEditingPhoneNumber && (
        <button
          onClick={handleUpdateSubmit}
          className="bg-[#7B3B99] hover:bg-purple-700 text-white font-bold py-2 px-4 rounded ml-2"
        >
          Update
        </button>
      )}
    </div>
  );
};

export default ClientProfileForm;
