import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

interface ContractCardProps {
  contracts: {
    id: number;
    case_id: number;
    lawyer: {
      full_name: string;
      photo: string;
    };
    client: {
      full_name: string;
    };
    terms: string;
    status: string;
    created_at: Date;
    signed_at: Date | null;
  }[];
}

const ContractCard: React.FC<ContractCardProps> = ({ contracts }) => {
  const router = useRouter();

  return (
    <>
      {contracts.map((contract) => (
        <Card key={contract.id} className="w-full max-w-md m-4">
          <CardHeader>
            <CardTitle>Contract #{contract.id}</CardTitle>
            <CardDescription>
              Case ID: {contract.case_id}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="font-semibold">Lawyer:</p>
                <p>{contract.lawyer.full_name}</p>
              </div>
              <div>
                <p className="font-semibold">Client:</p>
                <p>{contract.client.full_name}</p>
              </div>
              <div>
                <p className="font-semibold">Status:</p>
                <p className={`capitalize ${contract.status === 'SIGNED' ? 'text-green-600' : 'text-yellow-600'}`}>
                  {contract.status.toLowerCase()}
                </p>
              </div>
              <div>
                <p className="font-semibold">Created:</p>
                <p>{format(new Date(contract.created_at), 'PPP')}</p>
              </div>
              {contract.signed_at && (
                <div>
                  <p className="font-semibold">Signed:</p>
                  <p>{format(new Date(contract.signed_at), 'PPP')}</p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => router.push(`/contract/${contract.case_id}`)}
            >
              View Details
            </Button>
            {contract.status === 'DRAFT' && (
              <Button
                variant="default"
                onClick={() => router.push(`/contract/${contract.case_id}/edit`)}
              >
                Edit Terms
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export default ContractCard;