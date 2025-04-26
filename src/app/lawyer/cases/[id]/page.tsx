"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useRouter, usePathname } from "next/navigation";
import {
  QueryClient,
  useMutation,
  useQuery,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { deliver, getCasesById } from "../../api/offer";
import {
  LoadingComponent,
  ErrorComponent,
} from "@/components/LoadingErrorComponents";
import { addTrial, getTrialsForCase } from "../../api/trial";
import { toast } from "sonner";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

function CaseDetail() {
  const queryClient = useQueryClient();

  const [inputData, setInputData] = useState({
    trial_date: "",
    description: "",
    location: "",
  });
  const router = useRouter();
  const path = usePathname();

  // Extract the id from the path
  const id = Number(path.split("/").pop()); // Assumes the id is the last part of the path

  const {
    data: trialData,
    isLoading: trialLoading,
    error: trialError,
  } = useQuery({
    queryKey: ["trial"],
    queryFn: () => getTrialsForCase(id),
    refetchInterval: 600,
    // Ensure the query only runs if id is defined
  });

  const {
    data: caseData,
    isLoading: caseLoading,
    error: caseError,
  } = useQuery({
    queryKey: ["case"],
    queryFn: () => getCasesById(id),
    // Ensure the query only runs if id is defined
  });

  const handleChange = (e: any) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };
  const mutationFn = async (data: Object) => {
    return addTrial(data);
  };

  const { mutateAsync }: UseMutationResult<void, unknown, Object> = useMutation(
    {
      mutationFn,

      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["trial"] });
        toast.success("Trial submited successfully!");

        setInputData({
          trial_date: "",
          description: "",
          location: "",
        });
      },
      onError: () => {
        toast.error("Failed to submite trial.");
      },
    }
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formattedDate = new Date(inputData.trial_date).toISOString();
    const data = {
      ...inputData,
      case_id: id,
      trial_date: formattedDate,
    };
    await mutateAsync(data);
  };

  const deliverMutation: UseMutationResult<void, unknown, number> = useMutation(
    {
      mutationFn: (id: number) => deliver(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["case"] });
        toast.success("Delivery request is made successfully!");
      },
      onError: () => {
        toast.error("Failed to make Delivery.");
      },
    }
  );

  const handleDeliver = async (id: number) => {
    await deliverMutation.mutateAsync(id);
  };

  if (caseLoading && trialLoading) return <LoadingComponent />;
  if (trialError && caseError)
    return (
      <ErrorComponent errorMessage="Failed to load data. Please try again." />
    );

  return (
    <>
      <div className="container mx-auto px-4 pt-10 relative">
        <div className="mb-4 p-10 border rounded shadow-md relative">
          <div className="flex justify-between  items-center mb-4 ">
            <div
              onClick={() => router.back()}
              className=" bg-[#7B3B99] text-white font-bold py-2 px-4 rounded transition duration-300 hover:bg-purple-700 inline-block mb-2 md:mb-0 cursor-pointer"
            >
              Back
            </div>
            {caseData?.status !== "DELIVERED" && (
              <div className="flex gap-4 items-center">
                <button
                  className="px-6 py-2 rounded-md text-lg font-semibold text-white bg-[#7e31a2] "
                  onClick={() => handleDeliver(id)}
                >
                  Deliver
                </button>
                <button
                  className="px-6 py-2 rounded-md text-lg font-semibold text-white bg-[#7e31a2] "
                  onClick={() =>
                    router.push(
                      `${path}/dispute?client_id=${caseData?.client_id}`
                    )
                  }
                >
                  DISPUTE
                </button>
              </div>
            )}
          </div>

          <div>
            <h1 className="text-2xl font-bold mb-2">{caseData?.caseName}</h1>
            <p className="text-lg mb-1">
              <span className="font-semibold text-xl">Client Name:</span>{" "}
              {caseData?.client?.full_name}
            </p>
            <div className=" flex flex-col gap-4 text-lg mb-1">
              <span className="font-semibold text-xl">Description:</span>{" "}
              <p className="px-4">{caseData?.description}</p>
            </div>
            <p className="text-lg mb-1">
              <span className="font-semibold text-xl">Case ID:</span>{" "}
              {caseData?.id}
            </p>
            <p className="text-lg mb-1">
              <span className="font-semibold text-xl">Status:</span>{" "}
              {caseData?.status}
            </p>
          </div>
        </div>

        <div className="mb-4 px-10 border h-[200px] rounded shadow-md overflow-auto">
          <h2 className="text-2xl font-bold mb-2 sticky top-0 py-4 bg-white">
            Previous Trials
          </h2>
          {trialData?.length === 0 ? (
            <p>No trials added yet.</p>
          ) : (
            <ul>
              {trialData?.map((trial: any) => (
                <li key={trial.date} className="mb-4 ">
                  <p>{trialData.indexOf(trial) + 1}</p>
                  <div className="px-10">
                    <div className="flex justify-between items-center">
                      <p>
                        <span className="font-semibold text-lg text-[#7B3B99]">
                          Location:
                        </span>{" "}
                        {trial.location}
                      </p>
                      <p>
                        <span className="font-semibold text-lg text-[#7B3B99]">
                          Date:
                        </span>{" "}
                        {trial.trial_date}
                      </p>
                    </div>

                    <p>
                      <span className="font-semibold text-lg text-[#7B3B99]">
                        Note:
                      </span>{" "}
                      {trial.description}
                    </p>
                  </div>
                  <hr />
                </li>
              ))}
            </ul>
          )}
        </div>

        {caseData?.status !== "DELIVERED" && (
          <div className="p-10 border rounded shadow-md">
            <h2 className="text-xl font-bold mb-2">Add Next Trial</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Location
                </label>
                <input
                  name="location"
                  type="text"
                  id="location"
                  value={inputData.location}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#7B3B99] focus:ring-[#7B3B99] sm:text-sm p-4"
                  required
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date
                </label>
                <input
                  name="trial_date"
                  type="datetime-local"
                  id="date"
                  value={inputData.trial_date}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#7B3B99] focus:ring-[#7B3B99] sm:text-sm"
                  required
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="note"
                  className="block text-sm font-medium text-gray-700"
                >
                  Note
                </label>
                <textarea
                  name="description"
                  id="note"
                  value={inputData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#7B3B99] focus:ring-[#7B3B99] sm:text-sm"
                  required
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#7B3B99] hover:bg-[#59286f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Trial
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default CaseDetail;
