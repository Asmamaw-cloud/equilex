"use client";
import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const ContractEditPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const { data: contract, isLoading } = useQuery({
    queryKey: ['contract', params.id],
    queryFn: async () => {
      const response = await axios.get(`/api/contract/${params.id}`);
      return response.data.contract;
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: { terms: string }) => {
      const response = await axios.put(`/api/contract/${params.id}/edit`, data);
      return response.data.contract;
    },
    onSuccess: () => {
      router.push(`/contract/${params.id}`);
    }
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Contract</h1>
      <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
        <Textarea
          {...register('terms')}
          defaultValue={contract.terms}
          className="mb-4"
        />
        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  );
};

export default ContractEditPage;