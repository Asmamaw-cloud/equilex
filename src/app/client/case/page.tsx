"use client";
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  LoadingComponent,
  ErrorComponent,
} from "@/components/LoadingErrorComponents";
import { getClientCases } from "../api/case";

const Cases: React.FC = () => {
  const { data: session } = useSession();
  const { data, isLoading, error } = useQuery({
    queryKey: ["clientcases"],
    // @ts-ignore
    queryFn: () => getClientCases(session?.user?.image?.id),
  });
  const router = useRouter();

  // Filter cases based on their status
  const currentCases = data?.filter(
    (clientcase: any) => clientcase.status !== "FINISHED"
  );
  const recentCases = data?.filter(
    (clientcase: any) => clientcase.status === "FINISHED"
  );

  if (isLoading) return <LoadingComponent />;
  if (error)
    return (
      <ErrorComponent errorMessage="Failed to load data. Please try again." />
    );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-[#7B3B99]">
          Client Cases
        </h1>

        <div className="bg-white p-10 flex flex-col gap-4 mb-12">
          <button
            onClick={() => router.back()}
            className="bg-[#7B3B99] text-white font-bold py-2 px-4 rounded transition duration-300 hover:bg-purple-700 inline-block mb-2 md:mb-0 cursor-pointer w-20"
          >
            Back
          </button>
          <h2 className="text-3xl font-semibold mb-4 text-[#7B3B99]">
            Current Case
          </h2>
          {currentCases?.map((clientcase: any) => (
            <Link href={`/client/case/${clientcase.id}`} key={clientcase?.id}>
              <div className="block p-6 bg-white hover:bg-blue-50 relative">
                <div className="flex items-center gap-4 w-1/3">
                  <p className="text-xl text-[#7B3B99] font-semibold">Case</p>
                  <p className="text-gray-800">{clientcase?.title}</p>
                </div>
                <div className="flex items-center gap-4 w-1/3">
                  <p className="text-xl text-[#7B3B99] font-semibold">Lawyer</p>
                  <p className="text-gray-800">{clientcase?.lawyer_id}</p>
                </div>
                <div className="flex items-center flex-col gap-4 w-1/3 absolute top-6 right-4">
                  <p className="text-xl text-[#7B3B99] font-semibold">Date</p>
                  <p className="text-gray-800">{clientcase?.date}</p>
                </div>
                <div className="mt-6">
                  <p className="text-xl text-[#7B3B99] font-semibold">
                    Summary
                  </p>
                  <p className="text-gray-800">{clientcase?.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="bg-white p-10 flex flex-col gap-4">
          <h2 className="text-3xl font-semibold mb-4 text-[#7B3B99]">
            Recent Cases
          </h2>
          {recentCases?.map((clientcase: any) => (
            <Link href={`/client/case/${clientcase.id}`} key={clientcase?.id}>
              <div className="block p-6 bg-white hover:bg-blue-50 relative">
                <div className="flex items-center gap-4 w-1/3">
                  <p className="text-xl text-[#7B3B99] font-semibold">Case</p>
                  <p className="text-gray-800">{clientcase?.title}</p>
                </div>
                <div className="flex items-center gap-4 w-1/3">
                  <p className="text-xl text-[#7B3B99] font-semibold">Lawyer</p>
                  <p className="text-gray-800">{clientcase?.lawyer_id}</p>
                </div>
                <div className="flex items-center flex-col gap-4 w-1/3 absolute top-6 right-4">
                  <p className="text-xl text-[#7B3B99] font-semibold">Date</p>
                  <p className="text-gray-800">{clientcase?.date}</p>
                </div>
                <div className="mt-6 flex gap-4 items-center">
                  <p className="text-xl text-[#7B3B99] font-semibold">Status</p>
                  <p className="text-gray-800">{clientcase?.status}</p>
                </div>
                <div className="mt-6">
                  <p className="text-xl text-[#7B3B99] font-semibold">
                    Summary
                  </p>
                  <p className="text-gray-800">{clientcase?.description}</p>
                </div>
              </div>
              <hr />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cases;
