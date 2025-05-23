// "use client";

// import React from "react";
// import LawyerDetail from "../components/lawyerDetail";
// import { useQuery } from "@tanstack/react-query";
// import { getVerifiedLawyers } from "@/app/admin/api/lawyers";
// import {
//   ErrorComponent,
//   LoadingComponent,
// } from "@/components/LoadingErrorComponents";

// const EachLawyer = () => {
//   const { data, isLoading, error } = useQuery({
//     queryKey: ["clientlawyers"],
//     queryFn: () => getVerifiedLawyers(),
//   });

//   if (isLoading) return <LoadingComponent />;
//   if (error)
//     return (
//       <ErrorComponent errorMessage="Failed to load data. Please try again." />
//     );

//   return (
//     <div>
//       <LawyerDetail lawyers={data} />
//     </div>
//   );
// };

// export default EachLawyer;



"use client"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { getVerifiedLawyers } from "@/app/admin/api/lawyers"
import { LawyerDetail } from "@/components/lawyers/lawyer-detail"
import { LawyerListSkeleton } from "@/components/lawyers/lawyer-list-skeleton"
import { LawyerListError } from "@/components/lawyers/lawyer-list-error"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import type { Lawyer } from "@/types/lawyer"

/**
 * Query configuration for verified lawyers
 */
const VERIFIED_LAWYERS_QUERY = {
  queryKey: ["lawyers", "verified"] as const,
  queryFn: getVerifiedLawyers,
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 10 * 60 * 1000, // 10 minutes
  retry: 3,
  retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
} as const

/**
 * VerifiedLawyers component displays a list of verified lawyers
 * with proper loading states, error handling, and responsive design.
 */
export function VerifiedLawyers() {
  const router = useRouter()

  const { data: lawyers, isLoading, error, refetch, isError } = useQuery<Lawyer[], Error>(VERIFIED_LAWYERS_QUERY)

  /**
   * Handle retry action
   */
  const handleRetry = () => {
    refetch()
  }

  /**
   * Navigate to home page
   */
  const handleGoHome = () => {
    router.push("/")
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LawyerListSkeleton />
      </div>
    )
  }

  // Error state
  if (isError || error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LawyerListError error={error} onRetry={handleRetry} onGoHome={handleGoHome} />
      </div>
    )
  }

  // Empty state
  if (!lawyers || lawyers.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">No Verified Lawyers Found</h2>
          <p className="text-muted-foreground">
            We're currently working on verifying more lawyers. Please check back soon.
          </p>
        </div>
      </div>
    )
  }

  // Success state
  return (
    <ErrorBoundary>
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Verified Lawyers</h1>
            <p className="text-muted-foreground">Connect with our verified legal professionals</p>
          </div>

          <LawyerDetail lawyers={lawyers} />
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default VerifiedLawyers
