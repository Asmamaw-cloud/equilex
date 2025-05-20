"use client";
import React from 'react';
import ContractCard from '@/components/contractCard';
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { LoadingComponent, ErrorComponent } from "@/components/LoadingErrorComponents";
import axios from "axios";

const LawyerContract = () => {
  const { data: session } = useSession();
  const { data, isLoading, error } = useQuery({
    queryKey: ["lawyerContracts"],
    queryFn: async () => {
      const response = await axios.get(`/api/contract/lawyer/${session?.user?.image?.id}`);
      return response.data.contracts;
    },
  });

  if (isLoading) return <LoadingComponent />;
  if (error) return <ErrorComponent errorMessage="Failed to load contracts" />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="container px-5 py-5 mx-auto">
        <div className="flex flex-wrap -m-4 justify-center">
          <ContractCard contracts={data} />
        </div>
      </div>
    </div>
  );
};

export default LawyerContract;