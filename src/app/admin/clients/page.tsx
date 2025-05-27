"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import { getClients, addClient, updateClient, deleteClient } from "../api/clients";
import {
  ErrorComponent,
  LoadingComponent,
} from "@/components/LoadingErrorComponents";
import { Icon } from "@iconify/react";

const Clients = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["client"],
    queryFn: getClients,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    email: "",
  });
  const [modalError, setModalError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log("client data: ", data);

  const pageSize = 5;
  const visiblePages = 3;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => {
    return Math.ceil(data?.clients.length / pageSize);
  }, [data?.clients]);

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

  const paginatedClients = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data?.clients?.slice(startIndex, endIndex);
  }, [currentPage, data?.clients, pageSize]);

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

  const addMutation = useMutation({
    mutationFn: addClient,
    onSuccess: () => {
      queryClient.invalidateQueries(["client"]);
      setIsModalOpen(false);
      setFormData({ full_name: "", phone_number: "", email: "" });
      setModalError(null);
    },
    onError: (error) => {
      console.error("Add client error:", error);
      setModalError(error.message || "Failed to add client");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateClient,
    onSuccess: () => {
      queryClient.invalidateQueries(["client"]);
      setIsModalOpen(false);
      setEditingClient(null);
      setFormData({ full_name: "", phone_number: "", email: "" });
      setModalError(null);
    },
    onError: (error) => {
      console.error("Update client error:", error);
      setModalError(error.message || "Failed to update client");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteClient,
    onSuccess: () => {
      queryClient.invalidateQueries(["client"]);
    },
    onError: (error) => {
      console.error("Delete client error:", error);
    },
  });

  const handleAddEdit = () => {
    setModalError(null);
    setIsSubmitting(true);
    if (editingClient) {
      console.log("Updating client with data:", { id: editingClient.id, ...formData });
      updateMutation.mutate({ id: editingClient.id, ...formData });
    } else {
      console.log("Adding client with data:", formData);
      addMutation.mutate(formData);
    }
    setIsSubmitting(false);
  };

  const openAddModal = () => {
    setEditingClient(null);
    setFormData({ full_name: "", phone_number: "", email: "" });
    setModalError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (client) => {
    setEditingClient(client);
    setFormData({
      full_name: client.full_name,
      phone_number: client.phone_number,
      email: client.email,
    });
    setModalError(null);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <LoadingComponent />;
  if (error)
    return (
      <ErrorComponent errorMessage="Failed to load data. Please try again." />
    );

  return (
    <div className="w-full font-sans min-h-screen pt-24 pl-10 lg:pl-18 bg-[#F2F6F6]">
      <div className="w-full p-4">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-3xl text-black">Clients</h1>
          <button
            onClick={openAddModal}
            className="bg-[#7B3B99] text-white px-4 py-2 rounded-lg"
          >
            Add Client
          </button>
        </div>
      </div>

      <div className="rounded-2xl overflow-auto py-10 pr-10">
        <table className="w-full text-left rounded-xl">
          <thead>
            <tr className="bg-white text-gray-600 rounded-xl">
              <th className="py-3 px-6">ID</th>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Phone</th>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedClients.map((client: any, index: any) => (
              <tr
                className={
                  index % 2 === 0
                    ? "relative bg-[#F4F4F4]"
                    : "relative bg-white"
                }
                key={index}
              >
                <td className="py-3 px-6 text-black">{client?.id}</td>
                <td className="py-3 px-6 text-black">{client?.full_name}</td>
                <td className="py-3 px-6 text-black">{client?.phone_number}</td>
                <td className="py-3 px-6 text-black">{client?.email}</td>
                <td className="py-3 px-6 text-black">
                  <button
                    onClick={() => openEditModal(client)}
                    className="mr-2 text-blue-600"
                  >
                    <Icon icon="material-symbols:edit" />
                  </button>
                  <button
                    onClick={() => handleDelete(client.id)}
                    className="text-red-600"
                  >
                    <Icon icon="material-symbols:delete" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between w-full text-black bg-white p-3">
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
                className={
                  currentPage === page
                    ? "px-1 bg-[#7B3B99] border-2 rounded-lg text-white"
                    : "px-1 text-black"
                }
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {editingClient ? "Edit Client" : "Add Client"}
            </h2>
            {modalError && (
              <div className="text-red-600 mb-4">{modalError}</div>
            )}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) =>
                  setFormData({ ...formData, full_name: e.target.value })
                }
                className="mt-1 p-2 w-full border rounded-md"
                disabled={isSubmitting}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="text"
                value={formData.phone_number}
                onChange={(e) =>
                  setFormData({ ...formData, phone_number: e.target.value })
                }
                className="mt-1 p-2 w-full border rounded-md"
                disabled={isSubmitting}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="mt-1 p-2 w-full border rounded-md"
                disabled={isSubmitting}
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setModalError(null);
                }}
                className="px-4 py-2 bg-gray-300 rounded-md"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                onClick={handleAddEdit}
                className="px-4 py-2 bg-[#7B3B99] text-white rounded-md disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? editingClient
                    ? "Updating..."
                    : "Adding..."
                  : editingClient
                  ? "Update"
                  : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clients;