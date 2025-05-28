
"use client";

import type React from "react";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  AlertTriangle,
  Eye,
  CheckCircle,
  FileText,
  DollarSign,
} from "lucide-react";
import {
  ErrorComponent,
  LoadingComponent,
} from "@/components/LoadingErrorComponents";
import {
  acceptDispute,
  getDisputes,
  resolveDispute,
} from "@/app/lawyer/api/dispute";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";

// Dispute interface matching API response
interface Dispute {
  id: number;
  lawyer_id: number;
  client_id: number;
  content: string;
  status: string;
  created_at?: string;
  creator_email: string;
  client: {
    email: string;
    full_name: string;
    phone_number: string;
  };
  lawyer: {
    email: string;
    full_name: string;
    phone_number: string;
  };
  documents: string[];
}

const DisputeManagement: React.FC = () => {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [caseId, setCaseId] = useState<number | undefined>();

  // Configuration constants
  const PAGE_SIZE = 10;

  // Fetch disputes data
  const {
    data: disputes = [],
    isLoading,
    error,
  } = useQuery<Dispute[]>({
    queryKey: ["disputes"],
    queryFn: getDisputes,
    refetchInterval: 60000,
  });

  // Mutations for dispute actions
  const acceptMutation = useMutation({
    mutationFn: acceptDispute,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["disputes"] });
      toast.success("Dispute accepted successfully!");
    },
    onError: () => toast.error("Failed to accept the dispute."),
  });

  const resolveMutation = useMutation({
    mutationFn: resolveDispute,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["disputes"] });
      toast.success("Dispute resolved successfully!");
    },
    onError: () => toast.error("Failed to resolve the dispute."),
  });

  const refundMutation = useMutation({
    mutationFn: async (disputeId: number) => {
      console.log("Requesting refund for case ID:", disputeId);
      const response = await axios.post(`/api/refund/${disputeId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["disputes"] });
      toast.success("Refund processed successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Refund failed.");
    },
  });

  const payMutation = useMutation({
    mutationFn: async (disputeId: number) => {
      console.log("Requesting payment for case ID:", disputeId);
      const response = await axios.post(`/api/pay/${disputeId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["disputes"] });
      toast.success("Payment to lawyer processed successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Payment failed.");
    },
  });

  // Filter and search disputes
  const filteredDisputes = disputes.filter((dispute: Dispute) => {
    const matchesSearch =
      searchTerm === "" ||
      dispute.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.lawyer.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.client.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.creator_email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === null ||
      dispute.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredDisputes.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentDisputes = filteredDisputes.slice(
    startIndex,
    startIndex + PAGE_SIZE,
  );

  // Reset to first page when filters change
  const handleFilterChange = (status: string | null) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Pagination display
  const generatePaginationNumbers = () => {
    const pages = [];
    const maxVisiblePages = 3; // Reduced for mobile

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      const leftBound = Math.max(2, currentPage - 1);
      const rightBound = Math.min(totalPages - 1, currentPage + 1);
      if (leftBound > 2) pages.push("...");
      for (let i = leftBound; i <= rightBound; i++) {
        pages.push(i);
      }
      if (rightBound < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-800 border-yellow-200"
          >
            Pending
          </Badge>
        );
      case "accepted":
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 border-blue-200"
          >
            Under Review
          </Badge>
        );
      case "resolved":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 border-green-200"
          >
            Resolved
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (e) {
      return dateString;
    }
  };

  // Get document name from URL
  const getDocumentName = (url: string) => {
    return url.split("/").pop()?.split("?")[0] || `Document ${url.slice(-8)}`;
  };

  // Loading and error states
  if (isLoading) return <LoadingComponent />;
  if (error)
    return (
      <ErrorComponent errorMessage="Failed to load disputes. Please try again." />
    );

  return (
    <div className="w-full min-h-screen px-4 sm:px-6 lg:px-10 py-6 bg-gray-50">
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex flex-col gap-4">
            <div>
              <CardTitle className="text-xl sm:text-2xl font-bold">
                Dispute Management System
              </CardTitle>
              <CardDescription className="text-sm">
                Manage and resolve disputes efficiently with associated documents
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search disputes..."
                  className="pl-9 w-full sm:w-[250px] border-gray-200 text-sm"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto border-gray-200 flex items-center gap-1 text-sm"
                  >
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleFilterChange(null)}>
                    All Statuses
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleFilterChange("pending")}>
                    Pending
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleFilterChange("accepted")}
                  >
                    Under Review
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleFilterChange("resolved")}
                  >
                    Resolved
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-4">
          {filteredDisputes.length === 0 ? (
            <div className="bg-white rounded-xl p-6 text-center text-gray-500 border border-gray-100">
              <AlertTriangle className="h-10 w-10 mx-auto text-gray-300 mb-2" />
              <h3 className="text-base font-medium text-gray-700">
                No Disputes Found
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                {searchTerm || statusFilter
                  ? "Try adjusting your search or filter criteria"
                  : "There are no disputes to manage at this time"}
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-gray-100 text-gray-600 font-medium">
                      <th className="py-3 px-4">Dispute ID</th>
                      <th className="py-3 px-4">Lawyer</th>
                      <th className="py-3 px-4">Client</th>
                      <th className="py-3 px-4">Documents</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Submitted</th>
                      <th className="py-3 px-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {currentDisputes.map((dispute: Dispute) => (
                      <tr
                        key={dispute.id}
                        className="bg-white hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-3 px-4 font-medium">#{dispute.id}</td>
                        <td className="py-3 px-4">{dispute.lawyer.full_name}</td>
                        <td className="py-3 px-4">{dispute.client.full_name}</td>
                        <td className="py-3 px-4">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="flex items-center gap-2 p-0 hover:bg-transparent"
                                onClick={() => {
                                  setSelectedDispute(dispute);
                                  setCaseId(dispute.id);
                                }}
                                data-slot="dialog-trigger"
                              >
                                <FileText className="h-4 w-4 text-gray-400" />
                                {dispute.documents.length > 0 ? (
                                  <span className="text-purple-600 hover:underline">
                                    {dispute.documents.length} document
                                    {dispute.documents.length > 1 ? "s" : ""}
                                  </span>
                                ) : (
                                  <span className="text-gray-400">
                                    No documents
                                  </span>
                                )}
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-[90vw] sm:max-w-lg md:max-w-xl">
                              <DialogHeader>
                                <DialogTitle className="text-lg">
                                  Dispute Details - #{dispute.id}
                                </DialogTitle>
                                <DialogDescription className="text-sm">
                                  Review dispute information and associated
                                  documents
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 py-3 max-h-[70vh] overflow-y-auto">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm border-b pb-3">
                                  <div>
                                    <p className="text-gray-500 font-medium">
                                      Lawyer
                                    </p>
                                    <p className="mt-1 text-sm">
                                      {dispute.lawyer.full_name}
                                    </p>
                                    <p className="text-gray-500 text-xs">
                                      {dispute.lawyer.email}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-gray-500 font-medium">
                                      Client
                                    </p>
                                    <p className="mt-1 text-sm">
                                      {dispute.client.full_name}
                                    </p>
                                    <p className="text-gray-500 text-xs">
                                      {dispute.client.email}
                                    </p>
                                  </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm border-b pb-3">
                                  <div>
                                    <p className="text-gray-500 font-medium">
                                      Status
                                    </p>
                                    <div className="mt-1">
                                      {getStatusBadge(dispute.status)}
                                    </div>
                                  </div>
                                  <div>
                                    <p className="text-gray-500 font-medium">
                                      Submitted
                                    </p>
                                    <p className="mt-1 text-sm">
                                      {formatDate(dispute.created_at)}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-gray-500 font-medium">
                                    Description
                                  </p>
                                  <p className="mt-1 p-2 bg-gray-50 rounded-md text-gray-700 text-sm">
                                    {dispute.content}
                                  </p>
                                </div>
                                <div className="p-2">
                                  <h3 className="font-medium text-gray-700 mb-2 text-sm">
                                    Documents
                                  </h3>
                                  {dispute.documents.length === 0 ? (
                                    <p className="text-gray-400 text-sm">
                                      No documents attached
                                    </p>
                                  ) : (
                                    <ul className="list-disc pl-4 text-gray-600 space-y-2 text-sm">
                                      {dispute.documents.map((doc, index) => (
                                        <li
                                          key={index}
                                          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
                                        >
                                          <div className="flex items-center gap-2">
                                            <FileText className="h-4 w-4 text-gray-400" />
                                            <a
                                              href={doc}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="text-purple-600 hover:underline"
                                            >
                                              {getDocumentName(doc)}
                                            </a>
                                          </div>
                                          <div className="flex flex-wrap gap-2">
                                            {doc.toLowerCase().endsWith(".pdf") && (
                                              <Button
                                                variant="outline"
                                                size="sm"
                                                asChild
                                                className="text-xs"
                                              >
                                                <a
                                                  href={doc}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                >
                                                  Preview
                                                </a>
                                              </Button>
                                            )}
                                            <Button
                                              variant="outline"
                                              size="sm"
                                              asChild
                                              className="text-xs"
                                            >
                                              <a href={doc} download>
                                                Download
                                              </a>
                                            </Button>
                                          </div>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              </div>
                              <DialogFooter className="flex flex-col sm:flex-row gap-2">
                                {dispute.status.toLowerCase() === "pending" && (
                                  <Button
                                    onClick={() => {
                                      acceptMutation.mutate(dispute.id);
                                      setSelectedDispute(null);
                                    }}
                                    disabled={acceptMutation.isPending}
                                    className="bg-purple-600 hover:bg-purple-700 text-sm w-full sm:w-auto"
                                  >
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    {acceptMutation.isPending
                                      ? "Processing..."
                                      : "Accept Dispute"}
                                  </Button>
                                )}
                                {dispute.status.toLowerCase() === "accepted" && (
                                  <>
                                    <Button
                                      onClick={() =>
                                        refundMutation.mutate(dispute.id)
                                      }
                                      disabled={refundMutation.isPending}
                                      className="bg-red-600 hover:bg-red-700 text-sm w-full sm:w-auto"
                                    >
                                      <DollarSign className="h-4 w-4 mr-1" />
                                      {refundMutation.isPending
                                        ? "Processing..."
                                        : "Refund to Client"}
                                    </Button>
                                    <Button
                                      onClick={() => payMutation.mutate(dispute.id)}
                                      disabled={payMutation.isPending}
                                      className="bg-green-600 hover:bg-green-700 text-sm w-full sm:w-auto"
                                    >
                                      <DollarSign className="h-4 w-4 mr-1" />
                                      {payMutation.isPending
                                        ? "Processing..."
                                        : "Pay to Lawyer"}
                                    </Button>
                                  </>
                                )}
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </td>
                        <td className="py-3 px-4">{getStatusBadge(dispute.status)}</td>
                        <td className="py-3 px-4 text-gray-500">
                          {formatDate(dispute.created_at)}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-center gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 px-3 border-gray-200 text-sm"
                                  onClick={() => {
                                    setSelectedDispute(dispute);
                                    setCaseId(dispute.id);
                                  }}
                                  data-slot="dialog-trigger"
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-[90vw] sm:max-w-lg md:max-w-xl">
                                <DialogHeader>
                                  <DialogTitle className="text-lg">
                                    Dispute Details - #{dispute.id}
                                  </DialogTitle>
                                  <DialogDescription className="text-sm">
                                    Review dispute information and associated
                                    documents
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-3 max-h-[70vh] overflow-y-auto">
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm border-b pb-3">
                                    <div>
                                      <p className="text-gray-500 font-medium">
                                        Lawyer
                                      </p>
                                      <p className="mt-1 text-sm">
                                        {dispute.lawyer.full_name}
                                      </p>
                                      <p className="text-gray-500 text-xs">
                                        {dispute.lawyer.email}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-gray-500 font-medium">
                                        Client
                                      </p>
                                      <p className="mt-1 text-sm">
                                        {dispute.client.full_name}
                                      </p>
                                      <p className="text-gray-500 text-xs">
                                        {dispute.client.email}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm border-b pb-3">
                                    <div>
                                      <p className="text-gray-500 font-medium">
                                        Status
                                      </p>
                                      <div className="mt-1">
                                        {getStatusBadge(dispute.status)}
                                      </div>
                                    </div>
                                    <div>
                                      <p className="text-gray-500 font-medium">
                                        Submitted
                                      </p>
                                      <p className="mt-1 text-sm">
                                        {formatDate(dispute.created_at)}
                                      </p>
                                    </div>
                                  </div>
                                  <div>
                                    <p className="text-gray-500 font-medium">
                                      Description
                                    </p>
                                    <p className="mt-1 p-2 bg-gray-50 rounded-md text-gray-700 text-sm">
                                      {dispute.content}
                                    </p>
                                  </div>
                                  <div className="p-2">
                                    <h3 className="font-medium text-gray-700 mb-2 text-sm">
                                      Documents
                                    </h3>
                                    {dispute.documents.length === 0 ? (
                                      <p className="text-gray-400 text-sm">
                                        No documents attached
                                      </p>
                                    ) : (
                                      <ul className="list-disc pl-4 text-gray-600 space-y-2 text-sm">
                                        {dispute.documents.map((doc, index) => (
                                          <li
                                            key={index}
                                            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
                                          >
                                            <div className="flex items-center gap-2">
                                              <FileText className="h-4 w-4 text-gray-400" />
                                              <a
                                                href={doc}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-purple-600 hover:underline"
                                              >
                                                {getDocumentName(doc)}
                                              </a>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                              {doc
                                                .toLowerCase()
                                                .endsWith(".pdf") && (
                                                <Button
                                                  variant="outline"
                                                  size="sm"
                                                  asChild
                                                  className="text-xs"
                                                >
                                                  <a
                                                    href={doc}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                  >
                                                    Preview
                                                  </a>
                                                </Button>
                                              )}
                                              <Button
                                                variant="outline"
                                                size="sm"
                                                asChild
                                                className="text-xs"
                                              >
                                                <a href={doc} download>
                                                  Download
                                                </a>
                                              </Button>
                                            </div>
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </div>
                                </div>
                                <DialogFooter className="flex flex-col sm:flex-row gap-2">
                                  {dispute.status.toLowerCase() === "pending" && (
                                    <Button
                                      onClick={() => {
                                        acceptMutation.mutate(dispute.id);
                                        setSelectedDispute(null);
                                      }}
                                      disabled={acceptMutation.isPending}
                                      className="bg-purple-600 hover:bg-purple-700 text-sm w-full sm:w-auto"
                                    >
                                      <CheckCircle className="h-4 w-4 mr-1" />
                                      {acceptMutation.isPending
                                        ? "Processing..."
                                        : "Accept Dispute"}
                                    </Button>
                                  )}
                                  {dispute.status.toLowerCase() === "accepted" && (
                                    <>
                                      <Button
                                        onClick={() =>
                                          refundMutation.mutate(dispute.id)
                                        }
                                        disabled={refundMutation.isPending}
                                        className="bg-red-600 hover:bg-red-700 text-sm w-full sm:w-auto"
                                      >
                                        <DollarSign className="h-4 w-4 mr-1" />
                                        {refundMutation.isPending
                                          ? "Processing..."
                                          : "Refund to Client"}
                                      </Button>
                                      <Button
                                        onClick={() =>
                                          payMutation.mutate(dispute.id)
                                        }
                                        disabled={payMutation.isPending}
                                        className="bg-green-600 hover:bg-green-700 text-sm w-full sm:w-auto"
                                      >
                                        <DollarSign className="h-4 w-4 mr-1" />
                                        {payMutation.isPending
                                          ? "Processing..."
                                          : "Pay to Lawyer"}
                                      </Button>
                                    </>
                                  )}
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            {dispute.status.toLowerCase() === "pending" && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 px-3 border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100 text-sm"
                                onClick={() => acceptMutation.mutate(dispute.id)}
                                disabled={acceptMutation.isPending}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Accept
                              </Button>
                            )}
                            {dispute.status.toLowerCase() === "accepted" && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 px-3 border-green-200 bg-green-50 text-green-700 hover:bg-green-100 text-sm"
                                onClick={() => resolveMutation.mutate(dispute.id)}
                                disabled={resolveMutation.isPending}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                {resolveMutation.isPending
                                  ? "Processing..."
                                  : "Resolve"}
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile/Tablet Card View */}
              <div className="lg:hidden flex flex-col gap-3">
                {currentDisputes.map((dispute: Dispute) => (
                  <Card
                    key={dispute.id}
                    className="bg-white border border-gray-200"
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col gap-2 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-700">
                            #{dispute.id}
                          </span>
                          {getStatusBadge(dispute.status)}
                        </div>
                        <div>
                          <p className="text-gray-500 font-medium">Lawyer</p>
                          <p className="text-gray-700">
                            {dispute.lawyer.full_name}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 font-medium">Client</p>
                          <p className="text-gray-700">
                            {dispute.client.full_name}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 font-medium">Submitted</p>
                          <p className="text-gray-700">
                            {formatDate(dispute.created_at)}
                          </p>
                        </div>
                        <div>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="flex items-center gap-2 p-0 hover:bg-transparent text-purple-600"
                                onClick={() => {
                                  setSelectedDispute(dispute);
                                  setCaseId(dispute.id);
                                }}
                                data-slot="dialog-trigger"
                              >
                                <FileText className="h-4 w-4 text-gray-400" />
                                <span>
                                  {dispute.documents.length} document
                                  {dispute.documents.length !== 1 ? "s" : ""}
                                </span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-[90vw] sm:max-w-lg md:max-w-xl">
                              <DialogHeader>
                                <DialogTitle className="text-lg">
                                  Dispute Details - #{dispute.id}
                                </DialogTitle>
                                <DialogDescription className="text-sm">
                                  Review dispute information and associated
                                  documents
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 py-3 max-h-[70vh] overflow-y-auto">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm border-b pb-3">
                                  <div>
                                    <p className="text-gray-500 font-medium">
                                      Lawyer
                                    </p>
                                    <p className="mt-1 text-sm">
                                      {dispute.lawyer.full_name}
                                    </p>
                                    <p className="text-gray-500 text-xs">
                                      {dispute.lawyer.email}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-gray-500 font-medium">
                                      Client
                                    </p>
                                    <p className="mt-1 text-sm">
                                      {dispute.client.full_name}
                                    </p>
                                    <p className="text-gray-500 text-xs">
                                      {dispute.client.email}
                                    </p>
                                  </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm border-b pb-3">
                                  <div>
                                    <p className="text-gray-500 font-medium">
                                      Status
                                    </p>
                                    <div className="mt-1">
                                      {getStatusBadge(dispute.status)}
                                    </div>
                                  </div>
                                  <div>
                                    <p className="text-gray-500 font-medium">
                                      Submitted
                                    </p>
                                    <p className="mt-1 text-sm">
                                      {formatDate(dispute.created_at)}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-gray-500 font-medium">
                                    Description
                                  </p>
                                  <p className="mt-1 p-2 bg-gray-50 rounded-md text-gray-700 text-sm">
                                    {dispute.content}
                                  </p>
                                </div>
                                <div className="p-2">
                                  <h3 className="font-medium text-gray-700 mb-2 text-sm">
                                    Documents
                                  </h3>
                                  {dispute.documents.length === 0 ? (
                                    <p className="text-gray-400 text-sm">
                                      No documents attached
                                    </p>
                                  ) : (
                                    <ul className="list-disc pl-4 text-gray-600 space-y-2 text-sm">
                                      {dispute.documents.map((doc, index) => (
                                        <li
                                          key={index}
                                          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
                                        >
                                          <div className="flex items-center gap-2">
                                            <FileText className="h-4 w-4 text-gray-400" />
                                            <a
                                              href={doc}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="text-purple-600 hover:underline"
                                            >
                                              {getDocumentName(doc)}
                                            </a>
                                          </div>
                                          <div className="flex flex-wrap gap-2">
                                            {doc
                                              .toLowerCase()
                                              .endsWith(".pdf") && (
                                              <Button
                                                variant="outline"
                                                size="sm"
                                                asChild
                                                className="text-xs"
                                              >
                                                <a
                                                  href={doc}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                >
                                                  Preview
                                                </a>
                                              </Button>
                                            )}
                                            <Button
                                              variant="outline"
                                              size="sm"
                                              asChild
                                              className="text-xs"
                                              >
                                                <a href={doc} download>
                                                  Download
                                                </a>
                                              </Button>
                                            </div>
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </div>
                                </div>
                                <DialogFooter className="flex flex-col sm:flex-row gap-2">
                                  {dispute.status.toLowerCase() === "pending" && (
                                    <Button
                                      onClick={() => {
                                        acceptMutation.mutate(dispute.id);
                                        setSelectedDispute(null);
                                      }}
                                      disabled={acceptMutation.isPending}
                                      className="bg-purple-600 hover:bg-purple-700 text-sm w-full sm:w-auto"
                                    >
                                      <CheckCircle className="h-4 w-4 mr-1" />
                                      {acceptMutation.isPending
                                        ? "Processing..."
                                        : "Accept Dispute"}
                                    </Button>
                                  )}
                                  {dispute.status.toLowerCase() === "accepted" && (
                                    <>
                                      <Button
                                        onClick={() =>
                                          refundMutation.mutate(dispute.id)
                                        }
                                        disabled={refundMutation.isPending}
                                        className="bg-red-600 hover:bg-red-700 text-sm w-full sm:w-auto"
                                      >
                                        <DollarSign className="h-4 w-4 mr-1" />
                                        {refundMutation.isPending
                                          ? "Processing..."
                                          : "Refund to Client"}
                                      </Button>
                                      <Button
                                        onClick={() =>
                                          payMutation.mutate(dispute.id)
                                        }
                                        disabled={payMutation.isPending}
                                        className="bg-green-600 hover:bg-green-700 text-sm w-full sm:w-auto"
                                      >
                                        <DollarSign className="h-4 w-4 mr-1" />
                                        {payMutation.isPending
                                          ? "Processing..."
                                          : "Pay to Lawyer"}
                                      </Button>
                                    </>
                                  )}
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-full sm:w-auto text-sm"
                              onClick={() => {
                                setSelectedDispute(dispute);
                                setCaseId(dispute.id);
                              }}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            {dispute.status.toLowerCase() === "pending" && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-full sm:w-auto border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100 text-sm"
                                onClick={() => acceptMutation.mutate(dispute.id)}
                                disabled={acceptMutation.isPending}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Accept
                              </Button>
                            )}
                            {dispute.status.toLowerCase() === "accepted" && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-full sm:w-auto border-green-200 bg-green-50 text-green-700 hover:bg-green-100 text-sm"
                                onClick={() => resolveMutation.mutate(dispute.id)}
                                disabled={resolveMutation.isPending}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                {resolveMutation.isPending
                                  ? "Processing..."
                                  : "Resolve"}
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2 px-2">
                    <div className="text-xs text-gray-500">
                      Showing {startIndex + 1}-
                      {Math.min(startIndex + PAGE_SIZE, filteredDisputes.length)}{" "}
                      of {filteredDisputes.length} disputes
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 border-gray-200"
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(1, prev - 1))
                        }
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <div className="flex items-center">
                        {generatePaginationNumbers().map((page, index) => (
                          <div
                            key={index}
                            onClick={() =>
                              typeof page === "number" && setCurrentPage(page)
                            }
                            className={`
                              mx-0.5 min-w-[28px] h-7 flex items-center justify-center rounded-md text-xs
                              ${
                                typeof page === "number"
                                  ? "cursor-pointer hover:bg-gray-100"
                                  : ""
                              }
                              ${
                                currentPage === page
                                  ? "bg-purple-600 text-white"
                                  : typeof page === "number"
                                  ? "text-gray-700"
                                  : "text-gray-400"
                              }
                            `}
                          >
                            {page}
                          </div>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 border-gray-200"
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(totalPages, prev + 1),
                          )
                        }
                        disabled={currentPage === totalPages}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  export default DisputeManagement;
