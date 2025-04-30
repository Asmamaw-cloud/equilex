'use client'

import { acceptDispute, getDisputes, resolveDispute } from "@/app/lawyer/api/dispute";
import { ErrorComponent, LoadingComponent } from "@/components/LoadingErrorComponents";
import { Icon } from "@iconify/react";
import { useMutation, UseMutationResult, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "sonner";

const Dispute = () => {
    const queryClient = useQueryClient();
    const pageSize = 5;
    const visiblePages = 3;
    const [currentPage, setCurrentPage] = useState(1);

    const { data, isLoading, error } = useQuery({
        queryKey: ["disputes"],
        queryFn: () => getDisputes(),
        refetchInterval: 3000,
      });

      const acceptMutation: UseMutationResult<void, unknown, number> = useMutation({
        mutationFn: (id: number) => acceptDispute(id),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["disputes"] });
          toast.success("Dispute Accepted successfully!");
        },
        onError:()=>{
          toast.error("Failed to Accept the dispute.");
        }
    
      });

      const handleAccept = async (id: number) => {
        await acceptMutation.mutateAsync(id);
      };

      const resolveMutation: UseMutationResult<void, unknown, number> = useMutation({
        mutationFn: (id: number) => resolveDispute(id),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["disputes"] });
          toast.success("Dispute Resolved successfully!");
        },
        onError:()=>{
          toast.error("Failed to Resolve the dispute.");
        }
      });

      const handleResolve = async (id: number) => {
        await resolveMutation.mutateAsync(id);
      };

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

    const paginatedDisputes = useMemo(() => {
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
    <div className="w-full font-sans min-h-screen pt-28 pl-10 lg:pl-72 bg-[#f2f6fa] text-black overflow-auto">
        <div className="rounded-2xl overflow-auto py-10 pr-10">
        <table className="w-3/4 lg:w-full text-left rounded-xl">
          <thead>
            <tr className="bg-white text-gray-600 rounded-xl">
              <th className="py-3 px-6 text-center">Lawyer ID</th>
              <th className="py-3 px-6 text-center">Client ID</th>
              <th className="py-3 px-6 text-center">Description</th>
              <th className="py-3 px-6 text-center">Status</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedDisputes?.map((dispute: any, index: any) => (
              <tr
                className={
                  index % 2 === 0
                    ? "relative bg-[#F4F4F4]"
                    : "relative bg-white"
                }
                key={index}
              >
                <td className="py-3 px-6 text-black text-center">
                  {dispute.lawyer_id}
                </td>
                <td className="py-3 px-6 text-black text-center">
                  {dispute.client_id}
                </td>
                <td className="py-3 px-6 text-black max-w-[200px] text-center truncate hover:text-clip">
                  <span title={dispute.content}>{dispute.content}</span>
                </td>
                <td className="py-3 px-6 text-black text-center">
                  {dispute.status}
                </td>
                <td className="py-3 px-6 text-black text-center">
                  <div className="flex gap-4 items-center justify-center">
                    <button
                      className="rounded py-2 px-6 text-lg font-semibold outline-double outline-[#7B3B99] hover:bg-gray-200 transition"
                      onClick={() => handleAccept(dispute.id)}
                    >
                      Accept
                    </button>
                    <button
                      className="rounded py-2 px-6 text-lg font-semibold bg-[#7B3B99] text-white hover:bg-[#5a2e7a] transition"
                      onClick={() => handleResolve(dispute.id)}
                    >
                      Resolve
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between w-full text-black bg-white p-3 mt-4 rounded-lg">
          <div className="flex items-center gap-4">
            <p>Showing Page</p>
            <div className="px-2 h-fit text-[#7B3B99] border-2">
              {currentPage}
            </div>
            <p>Out of {totalPages}</p>
          </div>
          <div className="flex items-center gap-2 text-black">
            <div onClick={prevPage} className="cursor-pointer text-black">
              <Icon icon="ep:arrow-left-bold" />
            </div>
            {pages.map((page, index) => (
              <div
                key={index}
                onClick={() => setCurrentPage(Number(page))}
                className={`px-1 cursor-pointer ${currentPage === page ? "bg-[#7B3B99] border-2 rounded-lg text-white" : "text-black"}`}
              >
                {page}
              </div>
            ))}
            <div onClick={nextPage} className="cursor-pointer">
              <Icon icon="ep:arrow-right-bold" />
            </div>
          </div>
        </div>
        </div>
    </div>
  )
}

export default Dispute