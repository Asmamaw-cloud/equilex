// // import { data } from "@/app/data/lawyersMockData";
// import LawyersCard from "./lawyersCard";
// import { useQuery } from "@tanstack/react-query";
// import { getVerifiedLawyers } from "@/app/admin/api/lawyers";
// import {
//   ErrorComponent,
//   LoadingComponent,
// } from "@/components/LoadingErrorComponents";

// interface Props {
//   selectedSpecialization: string;
//   selectedCourt: string;
//   selectedLanguage: string;
// }

// const LawyersList: React.FC<Props> = ({
//   selectedSpecialization,
//   selectedCourt,
//   selectedLanguage,
// }) => {
//   const { data, isLoading, error } = useQuery({
//     queryKey: ["clientlawyers"],
//     queryFn: () => getVerifiedLawyers(),
//     refetchInterval: 3000,
//   });
  

//   const filteredLawyers = data?.filter((lawyer: any) => {
//     return (
//       (!selectedLanguage || lawyer.languages.includes(selectedLanguage)) &&
//       (!selectedSpecialization ||
//         lawyer.specialties.includes(selectedSpecialization)) &&
//       (!selectedCourt || lawyer.courts.includes(selectedCourt))
//     );
//   });


//   if (isLoading) return <LoadingComponent />;
//   if (error)
//     return (
//       <ErrorComponent errorMessage="Failed to load data. Please try again." />
//     );

//   return (
//     <div className="container px-5 py-5 mx-auto mt-4">
//       <div className="flex flex-wrap -m-4 text-center mx-auto justify-center">
//         {filteredLawyers?.length > 0 ? (
//           filteredLawyers.map((item: any, index: any) => {
//             return (
//               <LawyersCard
//                 key={index}
//                 id={item.id}
//                 name={item.full_name}
//                 imageUrl={item.photo}
//                 des={item.description}
//                 rate={item.ratings}
//               />
//             );
//           })
//         ) : (
//           <div className="mx-auto  items-center">
//             <h1 className="text-2xl text-black">
//               No lawyers on {selectedSpecialization} yet.
//             </h1>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LawyersList;








// "use client";

// // import { data } from "@/app/data/lawyersMockData";
// import LawyersCard from "./lawyersCard";
// import { useQuery } from "@tanstack/react-query";
// import { getVerifiedLawyers } from "@/app/admin/api/lawyers";
// import {
//   ErrorComponent,
//   LoadingComponent,
// } from "@/components/LoadingErrorComponents";
// import { useSearchParams } from "next/navigation";

// interface Lawyer {
//   id: string;
//   full_name: string;
//   description: string;
//   specialties: string[];
//   languages: string[];
//   courts: string[];
//   photo: string;
//   ratings: number[];
// }

// interface Props {
//   selectedSpecialization: string;
//   selectedCourt: string;
//   selectedLanguage: string;
// }

// const LawyersList: React.FC<Props> = ({
//   selectedSpecialization,
//   selectedCourt,
//   selectedLanguage,
// }) => {
//   const searchParams = useSearchParams();
//   const searchQuery = searchParams.get('search')?.toLowerCase() || '';

//   const { data, isLoading, error } = useQuery({
//     queryKey: ["clientlawyers"],
//     queryFn: () => getVerifiedLawyers(),
//     refetchInterval: 3000,
//   });
  

//   const filteredLawyers = data?.filter((lawyer: Lawyer) => {
//     const matchesFilters = 
//       (!selectedLanguage || lawyer.languages.includes(selectedLanguage)) &&
//       (!selectedSpecialization || lawyer.specialties.includes(selectedSpecialization)) &&
//       (!selectedCourt || lawyer.courts.includes(selectedCourt));

//     if (!searchQuery) return matchesFilters;

//     return matchesFilters && (
//       lawyer.full_name.toLowerCase().includes(searchQuery) ||
//       lawyer.description.toLowerCase().includes(searchQuery) ||
//       lawyer.specialties.some((s: string) => s.toLowerCase().includes(searchQuery)) ||
//       lawyer.languages.some((l: string) => l.toLowerCase().includes(searchQuery))
//     );
//   });


//   if (isLoading) return <LoadingComponent />;
//   if (error)
//     return (
//       <ErrorComponent errorMessage="Failed to load data. Please try again." />
//     );

//   return (
//     <div className="container px-5 py-5 mx-auto mt-4">
//       <div className="flex flex-wrap -m-4 text-center mx-auto justify-center">
//         {filteredLawyers?.length > 0 ? (
//           filteredLawyers.map((item: Lawyer) => {
//             return (
//               <LawyersCard
//                 key={item.id}
//                 id={item.id}
//                 name={item.full_name}
//                 imageUrl={item.photo}
//                 des={item.description}
//                 rate={item.ratings}
//               />
//             );
//           })
//         ) : (
//           <div className="mx-auto items-center">
//             <h1 className="text-2xl text-black">
//               {searchQuery 
//                 ? `No lawyers found matching "${searchQuery}"`
//                 : `No lawyers found with the selected filters.`}
//             </h1>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LawyersList;






"use client"

import type React from "react"

import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import { Search, Filter } from "lucide-react"
import LawyersCard from "./lawyersCard"
import { getVerifiedLawyers } from "@/app/admin/api/lawyers"
import { ErrorComponent, LoadingComponent } from "@/components/LoadingErrorComponents"

interface Rating {
  rate: number
}

interface Lawyer {
  id: string
  full_name: string
  description: string
  specialties: string[]
  languages: string[]
  courts: string[]
  photo: string
  ratings: Rating[]
}

interface LawyersListProps {
  selectedSpecialization: string
  selectedCourt: string
  selectedLanguage: string
}

const LawyersList: React.FC<LawyersListProps> = ({ selectedSpecialization, selectedCourt, selectedLanguage }) => {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("search")?.toLowerCase() || ""

  const { data, isLoading, error } = useQuery({
    queryKey: ["clientlawyers"],
    queryFn: () => getVerifiedLawyers(),
    refetchInterval: 30000, // Reduced from 3 seconds to 30 seconds for better performance
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  const filteredLawyers = data?.filter((lawyer: Lawyer) => {
    const matchesFilters =
      (!selectedLanguage || lawyer.languages?.includes(selectedLanguage)) &&
      (!selectedSpecialization || lawyer.specialties?.includes(selectedSpecialization)) &&
      (!selectedCourt || lawyer.courts?.includes(selectedCourt))

    if (!searchQuery) return matchesFilters

    return (
      matchesFilters &&
      (lawyer.full_name?.toLowerCase().includes(searchQuery) ||
        lawyer.description?.toLowerCase().includes(searchQuery) ||
        lawyer.specialties?.some((s: string) => s?.toLowerCase().includes(searchQuery)) ||
        lawyer.languages?.some((l: string) => l?.toLowerCase().includes(searchQuery)))
    )
  })

  const hasActiveFilters = selectedSpecialization || selectedCourt || selectedLanguage || searchQuery

  if (isLoading) return <LoadingComponent />

  if (error) {
    return <ErrorComponent errorMessage="Failed to load lawyers. Please try again." />
  }

  return (
    <div className="container px-5 py-5 mx-auto mt-4">
      {/* Results Summary */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {hasActiveFilters ? "Filtered Results" : "All Lawyers"}
        </h2>
        <p className="text-gray-600">
          {filteredLawyers?.length || 0} lawyer{filteredLawyers?.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mb-6 flex flex-wrap gap-2 justify-center">
          {searchQuery && (
            <div className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              <Search className="w-3 h-3" />
              Search: "{searchQuery}"
            </div>
          )}
          {selectedSpecialization && (
            <div className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              <Filter className="w-3 h-3" />
              {selectedSpecialization}
            </div>
          )}
          {selectedCourt && (
            <div className="flex items-center gap-1 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
              <Filter className="w-3 h-3" />
              {selectedCourt}
            </div>
          )}
          {selectedLanguage && (
            <div className="flex items-center gap-1 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
              <Filter className="w-3 h-3" />
              {selectedLanguage}
            </div>
          )}
        </div>
      )}

      {/* Lawyers Grid */}
      <div className="flex flex-wrap -m-4 text-center mx-auto justify-center">
        {filteredLawyers?.length > 0 ? (
          filteredLawyers.map((lawyer: Lawyer) => (
            <LawyersCard
              key={lawyer.id}
              id={lawyer.id}
              name={lawyer.full_name}
              imageUrl={lawyer.photo}
              des={lawyer.description}
              rate={lawyer.ratings}
            />
          ))
        ) : (
          <div className="mx-auto items-center text-center py-12">
            <div className="mb-4">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No lawyers found</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {searchQuery
                ? `No lawyers match your search for "${searchQuery}" with the current filters.`
                : "No lawyers match your current filter selection."}
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Try adjusting your search terms or filters to see more results.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default LawyersList
