"use client";
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const ContractDetailPage = ({ params }: { params: { id: string } }) => {
  const { data: contract, isLoading } = useQuery({
    queryKey: ['contract', params.id],
    queryFn: async () => {
      const response = await axios.get(`/api/contract/${params.id}`);
      return response.data.contract;
    }
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Contract #{contract.id}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Status: {contract.status}</p>
          <p>Created: {new Date(contract.created_at).toLocaleDateString()}</p>
          <p>Terms: {contract.terms}</p>
          {contract.status === 'DRAFT' && (
            <Link href={`/contract/${contract.id}/edit`}>
              <Button>Edit Contract</Button>
            </Link>
          )}
          {contract.status === 'PENDING' && (
            <Button onClick={() => handleSign(contract.id)}>Sign Contract</Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContractDetailPage;