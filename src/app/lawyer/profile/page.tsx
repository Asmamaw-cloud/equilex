"use client";

import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getLawyerById } from "@/app/admin/api/lawyers";
import { updateLawyer } from "../api/profile";
import { FileUploader } from "@/components/file-uploader";
import { toast } from "sonner";

const ProfileForm = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  // @ts-ignore
  const lawyer_id = session?.user?.image?.id;

  const {
    data: profileData,
    isLoading: profileLoading,
    error: profileError,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getLawyerById(lawyer_id),
  });

  const updateMutation: UseMutationResult<void, unknown, object> = useMutation({
    mutationFn: (data: object) => updateLawyer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast(`Profile Updated successfully!`);
    },
    onError: (error: any) => {
      toast(`ERROR! "Failed to update profile."`);
    },
  });

  const [isEditingBio, setIsEditingBio] = useState(false);
  const [newBio, setNewBio] = useState("");
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const [newLanguage, setNewLanguage] = useState<string>("");
  const [languages, setLanguages] = useState<string[]>([]);
  const [editingLanguageIndex, setEditingLanguageIndex] = useState<
    number | null
  >(null);
  const [profilePhoto1, setProfilePhoto] = useState<string>();
  const [newFullName, setNewFullName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [isEditingResume, setIsEditingResume] = useState(false);
  const [newResume, setNewResume] = useState<string>(""); // Stores the resume URL

  const handleBioSubmit = () => {
    setNewBio(newBio.toUpperCase());
    setIsEditingBio(false);
  };

  const handleUpdateLanguage = () => {
    if (editingLanguageIndex !== null) {
      const updatedLanguages = [...languages];
      updatedLanguages[editingLanguageIndex] = newLanguage.toUpperCase();
      setLanguages(updatedLanguages);
      setEditingLanguageIndex(null);
      setNewLanguage("");
    }
  };

  const handleAddLanguage = () => {
    if (newLanguage.trim()) {
      setLanguages([...languages, newLanguage.toUpperCase()]);
      setNewLanguage("");
    }
  };

  useEffect(() => {
    setProfilePhoto(profileData?.photo);
    setNewPhoneNumber(profileData?.phone_number);
    setNewFullName(profileData?.full_name);
    setNewBio(profileData?.description);
    setNewResume(profileData?.resume);
    setLanguages(profileData?.languages || []);
  }, [profileData]);

  const handleUpdateProfile = async () => {
    if (isEditingBio) handleBioSubmit();
    if (editingLanguageIndex !== null) handleUpdateLanguage();
    if (isEditingPhoto) setIsEditingPhoto(false);
    setNewFullName(newFullName.toUpperCase());
    setNewPhoneNumber(newPhoneNumber.toUpperCase());
    if (isEditingResume) {
      setNewResume(newResume); // Assuming newResume holds the URL of the uploaded resume
      setIsEditingResume(false);
    }

    console.log("this is languages 11", languages);

    const updatedProfile = {
      full_name: newFullName.toUpperCase(),
      phone_number: newPhoneNumber,
      description: newBio,
      languages: languages,
      photo: profilePhoto1,
      resume: newResume,
    };

    console.log("this is languages 22", updatedProfile);

    await updateMutation.mutateAsync(updatedProfile);
  };

  const startEditingLanguage = (index: number) => {
    setNewLanguage(languages[index]);
    setEditingLanguageIndex(index);
  };

  return (
    <div className="p-4 mx-auto w-1/2">
      <h2 className="text-2xl mb-4">Update Profile</h2>
      <div className="mb-4 text-center">
        <div className="relative inline-block">
          <img
            src={profilePhoto1}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto"
            width={400}
            height={400}
          />
          <div
            className="absolute bottom-0 bg-white right-0 w-8 h-8 rounded-full outline outline-green-500 flex justify-center items-center cursor-pointer"
            onClick={() => setIsEditingPhoto(true)}
          >
            <Icon icon="ic:outline-edit" color="green" width={20} height={20} />
          </div>
        </div>
        {isEditingPhoto && (
          <div className="mt-4">
            <FileUploader
              onUploadComplete={(urls) => {
                const photoUrl = urls[0];
                setProfilePhoto(photoUrl);
                setIsEditingPhoto(false);
              }}
              maxFiles={5}
              maxSize={4}
              fileTypes={["image", "pdf"]}
            />
          </div>
        )}
      </div>
      <div className="flex mb-4">
        <div className="w-1/2 pr-2">
          <label className="block text-gray-700 font-semibold">Full Name</label>
          <input
            type="text"
            value={newFullName}
            onChange={(e) => setNewFullName(e.target.value)}
            className="border p-2 w-full mb-2"
          />
        </div>
        <div className="w-1/2 pl-2">
          <label className="block text-gray-700 font-semibold">
            Phone Number
          </label>
          <input
            type="text"
            value={newPhoneNumber}
            onChange={(e) => setNewPhoneNumber(e.target.value)}
            className="border p-2 w-full mb-2"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Languages</label>
        <ul>
          {languages.map((language: string, index: number) => (
            <li key={index} className="flex justify-between items-center mb-2">
              <span>{language}</span>
              <div
                className="bottom-0 bg-white right-0 w-8 h-8 flex justify-center items-center cursor-pointer"
                onClick={() => startEditingLanguage(index)}
              >
                <Icon
                  icon="ri:edit-2-fill"
                  color="#7B3B99"
                  width={25}
                  height={25}
                />
              </div>
            </li>
          ))}
        </ul>
        {editingLanguageIndex !== null && (
          <div className="mt-4">
            <input
              type="text"
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value.toUpperCase())}
              placeholder="Language"
              className="border p-2 w-full mb-2"
            />
            <button
              onClick={handleUpdateLanguage}
              className="bg-[#7B3B99] text-white py-1 px-3 rounded"
            >
              Update Language
            </button>
          </div>
        )}
        <div className="mt-4">
          <input
            type="text"
            value={newLanguage}
            onChange={(e) => setNewLanguage(e.target.value.toUpperCase())}
            placeholder="Add New Language"
            className="border p-2 w-full mb-2"
          />
          <button
            onClick={handleAddLanguage}
            className="bg-[#7B3B99] text-white py-1 px-3 rounded"
          >
            Add Language
          </button>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Resume</label>
        <div className="flex justify-between items-center">
          <p>{newResume ? "Resume Uploaded" : "No Resume Uploaded"}</p>
          <div
            className="bottom-0 bg-white right-0 w-8 h-8 flex justify-center items-center cursor-pointer"
            onClick={() => setIsEditingResume(true)}
          >
            <Icon
              icon="ri:edit-2-fill"
              color="#7B3B99"
              width={25}
              height={25}
            />
          </div>
        </div>
        {isEditingResume && (
          <div className="mt-4">
            <FileUploader
              onUploadComplete={(urls) => {
                const resumeUrl = urls[0];
                setNewResume(resumeUrl);
                setIsEditingResume(false);
              }}
              maxFiles={5}
              maxSize={4}
              fileTypes={["image", "pdf"]}
            />
          </div>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Bio</label>
        {isEditingBio ? (
          <textarea
            value={newBio}
            onChange={(e) => setNewBio(e.target.value)}
            className="border p-2 w-full mb-2"
          />
        ) : (
          <div className="flex justify-between items-center">
            <p>{newBio}</p>
            <div
              className="bottom-0 bg-white right-0 w-8 h-8 flex justify-center items-center cursor-pointer"
              onClick={() => setIsEditingBio(true)}
            >
              <Icon
                icon="ri:edit-2-fill"
                color="#7B3B99"
                width={25}
                height={25}
              />
            </div>
          </div>
        )}
      </div>
      <button
        onClick={handleUpdateProfile}
        className="bg-[#7B3B99] hover:bg-purple-700 text-white font-bold py-2 px-4 rounded w-full"
      >
        Update Profile
      </button>
    </div>
  );
};

export default ProfileForm;
