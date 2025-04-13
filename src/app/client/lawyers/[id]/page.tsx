"use client";

import React from "react";
import LawyerDetail from "../components/lawyerDetail";
import { useQuery } from "@tanstack/react-query";
import { getVerifiedLawyers } from "@/app/admin/api/lawyers";
import {
  ErrorComponent,
  LoadingComponent,
} from "@/components/LoadingErrorComponents";

const EachLawyer = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["clientlawyers"],
    queryFn: () => getVerifiedLawyers(),
  });

  if (isLoading) return <LoadingComponent />;
  if (error)
    return (
      <ErrorComponent errorMessage="Failed to load data. Please try again." />
    );

  return (
    <div>
      <LawyerDetail lawyers={data} />
    </div>
  );
};

export default EachLawyer;
