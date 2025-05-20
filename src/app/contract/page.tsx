"use client";
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const ContractListPage = () => {
  const { data: contracts, isLoading } = useQuery({
    queryKey: ['contracts'],
    queryFn: async () => {
      const response = await axios.get('/api/contract');
      return response.data.contracts;
    }
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Contracts</h1>
      <div className="grid gap-4">
        {contracts?.map((contract: any) => (
          <Card key={contract.id}>
            <CardHeader>
              <CardTitle>Contract #{contract.id}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Status: {contract.status}</p>
              <p>Created: {new Date(contract.created_at).toLocaleDateString()}</p>
              <Link href={`/contract/${contract.id}`}>
                <Button>View Details</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ContractListPage;