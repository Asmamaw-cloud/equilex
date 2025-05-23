"use client";

import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import { getVerifiedLawyers } from "../api/lawyers";
import {
  ErrorComponent,
  LoadingComponent,
} from "@/components/LoadingErrorComponents";
import { Icon } from "@iconify/react";

const Lawyers = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["lawyers"],
    queryFn: getVerifiedLawyers,
  });

  const pageSize = 5;
  const visiblePages = 3;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => {
    return Math.ceil(data?.length / pageSize);
  }, [data]);

  const startPage = useMemo(() => {
    let start = 1;
    if (totalPages > visiblePages) {
      const halfVisiblePages = Math.floor(visiblePages / 2);
      start = currentPage - halfVisiblePages;
      start = Math.max(start, 1);
      start = Math.min(start, totalPages - visiblePages + 1);
    }
    return start;
  }, [currentPage, totalPages, visiblePages]);

  const endPage = useMemo(() => {
    return Math.min(startPage + visiblePages - 1, totalPages);
  }, [startPage, totalPages, visiblePages]);

  const pages = useMemo(() => {
    const array = [];
    if (startPage > 1) {
      array.push(1);
      if (startPage > 2) {
        array.push("...");
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      array.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        array.push("...");
      }
      array.push(totalPages);
    }
    return array;
  }, [startPage, endPage, totalPages]);

  const paginatedLawyers = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data?.slice(startIndex, endIndex);
  }, [currentPage, data, pageSize]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  if (isLoading) return <LoadingComponent />;
  if (error)
    return (
      <ErrorComponent errorMessage="Failed to load data. Please try again." />
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-24 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10 tracking-tight">
          Lawyers
        </h1>

        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gradient-to-r from-purple-50 to-indigo-50">
                <tr>
                  <th className="py-5 px-6 text-sm font-semibold text-gray-800 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="py-5 px-6 text-sm font-semibold text-gray-800 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="py-5 px-6 text-sm font-semibold text-gray-800 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="py-5 px-6 text-sm font-semibold text-gray-800 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="py-5 px-6 text-sm font-semibold text-gray-800 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedLawyers?.map((lawyer: any, index: any) => (
                  <tr
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-purple-50 transition-colors duration-200 ease-in-out`}
                    key={index}
                  >
                    <td className="py-5 px-6 text-sm text-gray-900 font-medium">
                      {lawyer.id}
                    </td>
                    <td className="py-5 px-6 text-sm text-gray-900 font-medium">
                      {lawyer.full_name}
                    </td>
                    <td className="py-5 px-6 text-sm text-gray-900 font-medium">
                      {lawyer.phone_number}
                    </td>
                    <td className="py-5 px-6 text-sm text-gray-900 font-medium">
                      {lawyer.email}
                    </td>
                    <td className="py-5 px-6 text-sm">
                      <button
                        className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                          lawyer.isVerified
                            ? "border-2 border-purple-500 text-purple-500 hover:bg-purple-50"
                            : "bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600"
                        }`}
                      >
                        {lawyer.isVerified ? "Verified" : "Not Verified"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center p-6 bg-white border-t border-gray-200">
            <div className="flex items-center gap-4 text-gray-700 mb-4 sm:mb-0">
              <span className="text-sm font-medium">Showing Page</span>
              <span className="px-4 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                {currentPage}
              </span>
              <span className="text-sm font-medium">of {totalPages}</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="p-2 rounded-full bg-gray-100 hover:bg-purple-100 text-gray-600 hover:text-purple-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <Icon icon="ep:arrow-left-bold" className="w-5 h-5" />
              </button>
              {pages.map((page, index) => (
                <button
                  key={index}
                  onClick={() => typeof page === "number" && setCurrentPage(page)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    currentPage === page
                      ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
                      : typeof page === "number"
                      ? "text-gray-700 hover:bg-purple-100 hover:text-purple-600"
                      : "text-gray-400 cursor-default"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="p-2 rounded-full bg-gray-100 hover:bg-purple-100 text-gray-600 hover:text-purple-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <Icon icon="ep:arrow-right-bold" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lawyers;