'use client'


import { ErrorComponent, LoadingComponent } from '@/components/LoadingErrorComponents';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { transactionHistory } from '../api/transaction';

const TransactionPage = () => {
    let { data, isLoading, error } = useQuery({
    queryKey: ["transactionHistory"],
    queryFn: () => transactionHistory(),
  });
  ;

  console.log("transaction history: ", data);


  if (isLoading) return <LoadingComponent />;
  if (error)
    return (
      <ErrorComponent errorMessage="Failed to load data. Please try again." />
    );
  return (
    <div className="w-full font-sans min-h-screen pt-28 pl-10 lg:pl-16 bg-[#f2f6fa] text-black overflow-auto">
      <h1 className="text-2xl font-bold mb-4">Transaction History</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-4 border-b text-left">ID</th>
              <th className="py-2 px-4 border-b text-left">Lawyer ID</th>
              <th className="py-2 px-4 border-b text-left">Client ID</th>
              <th className="py-2 px-4 border-b text-left">Payment ID</th>
              <th className="py-2 px-4 border-b text-left">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((transaction: any, index: any) => (
              <tr
                key={transaction.id}
                className={`border-t ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-gray-200`}
              >
                <td className="py-2 px-4 border-b">{transaction?.id}</td>
                <td className="py-2 px-4 border-b">
                  {transaction.case.lawyer_id}
                </td>
                <td className="py-2 px-4 border-b">
                  {transaction.case.client_id}
                </td>
                <td className="py-2 px-4 border-b">
                  {transaction?.payment_id}
                </td>
                <td className="py-2 px-4 border-b">
                  {/* ${transaction?.amount.toFixed(2)} */}
                  {transaction?.amount ? `$${transaction.amount.toFixed(2)}` : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TransactionPage