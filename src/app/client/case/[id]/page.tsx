"use client";

import { getCasesById } from "@/app/lawyer/api/offer";
import { ErrorComponent, LoadingComponent } from "@/components/LoadingErrorComponents";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React, { use } from "react";

const CaseDetail = () => {
  const queryClient = useQueryClient();

  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const caseId = Number(id);

  const { data, isLoading, error } = useQuery({
    queryKey: ["case"],
    queryFn: () => getCasesById(caseId),
  });

  if (isLoading) return <LoadingComponent />;
  if (error)
    return (
      <ErrorComponent errorMessage="Failed to load data. Please try again." />
    );

  return <div>CaseDetail</div>;
};

export default CaseDetail;
