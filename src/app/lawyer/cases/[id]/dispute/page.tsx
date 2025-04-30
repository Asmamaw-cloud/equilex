"use client";

import { getLawyerDisputes, submitDispute } from "@/app/lawyer/api/dispute";
import {
  ErrorComponent,
  LoadingComponent,
} from "@/components/LoadingErrorComponents";
import { useMutation, UseMutationResult, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

type DisputeData = {
  creator_email: string | null | undefined;
  client_id: number;
  content: string;
  lawyer_id: number;
};

const Dispute = () => {
  const queryClient = useQueryClient();

  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDispute, setNewDispute] = useState({
    content: "",
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const client_id = Number(searchParams.get("client_id"));

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleChange = (e: any) => {
    setNewDispute({ ...newDispute, [e.target.name]: e.target.value });
  };

  // @ts-ignore
  const lawyerid = session?.user?.image?.id;
  const { data, isLoading, error } = useQuery({
    queryKey: ["disputes"],
    queryFn: () => getLawyerDisputes(lawyerid),
  });

  console.log("dispute data: ", data);

  const mutationFn = async (data: DisputeData) => {
    return submitDispute(data);
  };


  const { mutateAsync }: UseMutationResult<void, unknown, DisputeData> =
    useMutation({
      mutationFn,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["disputes"] });
        toast.success("Dispute submited successfully!");

        handleCloseModal();
      },
      onError: () => {
        toast.error("Failed to Submite the dispute.");
        handleCloseModal();
      },
    });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // @ts-ignore
    if (!session?.user?.email || !session?.user?.image?.id) {
      console.error("Session data is missing");
      return;
    }

    const data: DisputeData = {
      ...newDispute,
      creator_email: session.user.email,
      lawyer_id: lawyerid,
      client_id: client_id,
    };

    try {
      await mutateAsync(data);
    } catch (e) {
      console.error(e);
    }
  };

  if (isLoading) return <LoadingComponent />;
  if (error)
    return (
      <ErrorComponent errorMessage="Failed to load data. Please try again." />
    );

  return (
    <div>
      <div>
        <div
          onClick={() => router.back()}
          className="bg-[#7B3B99] text-white font-bold py-2 px-4 rounded transition duration-300 hover:bg-purple-700 inline-block mb-2 md:mb-0 cursor-pointer"
        >
          Back
        </div>

        <div className="flex justify-between items-center p-8">
          <h1 className="text-2xl font-bold">Dispute Details</h1>
          <button
            onClick={handleOpenModal}
            className="bg-[#692a85] text-white py-2 px-4 rounded shadow hover:bg-[#5d2b75] transition duration-200 "
          >
            Submit New Dispute
          </button>
        </div>

        <div>
          <div className="flex  gap-8">
            <p className="flex gap-4 items-center">
              <span className="text-xl font-bold text-[#60287a]">
                Client Name:
              </span>
              {data[0]?.client?.full_name}
            </p>
            <p className="flex gap-4 items-center">
              <span className="text-xl font-bold text-[#60287a]">
                Client ID:
              </span>
              {data?.[0]?.client_id}
            </p>
          </div>
        </div>
        <p className="flex gap-4 items-center">
          <span className="text-xl font-bold text-[#60287a]">
            Lawyer_Email:
          </span>
          {data?.[0]?.creator_email}
        </p>

        <p className="flex gap-4 items-center">
          <span className="text-xl font-bold text-[#60287a]">
            Client_Email:
          </span>
          {data?.[0]?.client?.email}
        </p>
      </div>

      {data?.map((dispute: any) => (
        <>
          <div
            key={dispute.id}
            className=" p-10  mb-4  flex flex-col gap-4 relative"
          >
            {/* <div className="flex  gap-4">
                <p className="text-2xl font-bold text-[#60287a]">Email:</p>
                {dispute.creator_email}
              </div> */}
            <div className="flex flex-col gap-4">
              <p className="text-2xl font-bold text-[#602979]">Description:</p>
              <div className="px-4 text-justify ">{dispute.content}</div>
            </div>
            <div className="flex gap-2 items-center absolute right-12 top-12 text-sm">
              <p className=" font-bold text-[#60277b]">Submission Date:</p>
              {new Date(dispute.created_at).toLocaleDateString()}
            </div>
            <div className="flex gap-2 items-center">
              <p className="text-2xl font-bold text-[#60287a]">Status:</p>
              {dispute.status}
            </div>
            {dispute.solved && (
              <div>
                <p className="text-2xl font-bold text-[#60297a]">Resolution:</p>
                {dispute.resolution}
              </div>
            )}
          </div>
          <hr className="border w-[90%] m-auto" />
        </>
      ))}

{isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded shadow-lg w-1/3">
              <h2 className="text-xl mb-4 font-semibold">Submit New Dispute</h2>
              <form onSubmit={handleSubmit}>
                {/* <div className="mb-4">
                  <label className="block text-gray-700">Client ID</label>
                  <input
                    type="number"
                    name="clientId"
                    value={id}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div> */}
                <div className="mb-4">
                  <label className="block text-gray-700">Description</label>
                  <textarea
                    name="content"
                    value={newDispute.content}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  ></textarea>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="bg-[#7b7b7b] text-white py-2 px-4 rounded mr-2  hover:bg-[#414141]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#8b47aa] text-white py-2 px-4 rounded  hover:bg-[#6b3286]"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
    </div>
  );
};

export default Dispute;
