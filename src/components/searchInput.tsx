// import React from "react";

// const SearchInput = () => {
//   return (
//     <form className=" mx-auto w-full">
//       <div className="flex">
//         <div className="relative w-full">
//           <input
//             type="search"
//             id="location-search"
//             className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-e-gray-50 border-2  border-gray-300 focus:ring-black focus:border-black dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400
//              dark:text-white dark:focus:border-blue-500"
//             placeholder="what are you looking for ? "
//             required
//           />
//           <button
//             type="submit"
//             className="absolute top-0 end-0 h-full p-2.5 text-sm font-medium text-white bg-[#7B3B99] rounded-e-lg border border-[#7B3B99] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//           >
//             <svg
//               className="w-4 h-4"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 20 20"
//             >
//               <path
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
//               />
//             </svg>
//             <span className="sr-only">Search</span>
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default SearchInput;





"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getVerifiedLawyers } from "@/app/admin/api/lawyers";

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const { data: lawyers, isLoading } = useQuery({
    queryKey: ["lawyers"],
    queryFn: getVerifiedLawyers,
  });

  const filteredLawyers = lawyers?.filter((lawyer) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      lawyer.full_name.toLowerCase().includes(searchLower) ||
      lawyer.description.toLowerCase().includes(searchLower) ||
      lawyer.specialties.some((s) => s.toLowerCase().includes(searchLower)) ||
      lawyer.languages.some((l) => l.toLowerCase().includes(searchLower))
    );
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/client/lawyers?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSearch} className="w-full">
        <div className="relative">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-[#7B3B99] focus:border-[#7B3B99]"
            placeholder="Search for lawyers by name, specialty, or language..."
            required
          />
          <button
            type="submit"
            className="absolute top-0 end-0 h-full p-2.5 text-sm font-medium text-white bg-[#7B3B99] rounded-e-lg border border-[#7B3B99] hover:bg-[#6A2D8F] focus:ring-4 focus:outline-none focus:ring-[#7B3B99]"
          >
            <Search className="w-4 h-4" />
            <span className="sr-only">Search</span>
          </button>
        </div>
      </form>

      {searchQuery && filteredLawyers && filteredLawyers.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
          {filteredLawyers.map((lawyer) => (
            <div
              key={lawyer.id}
              className="p-3 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                router.push(`/client/lawyers/${lawyer.id}`);
                setSearchQuery("");
              }}
            >
              <div className="flex items-center gap-3">
                <img
                  src={lawyer.photo}
                  alt={lawyer.full_name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium text-gray-900">{lawyer.full_name}</h3>
                  <p className="text-sm text-gray-500">
                    {lawyer.specialties.join(", ")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
