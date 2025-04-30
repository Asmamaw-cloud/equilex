'use client'


import { geClientDisputes } from '@/app/lawyer/api/dispute';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'

const Dispute = () => {

    const queryClient = useQueryClient();
    const  { data:session } = useSession();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newDispute, setNewDispute] = useState({
      content: "",
    });
    // @ts-ignore
  const clientId = session?.user?.image?.id;
  const { data, isLoading, error } = useQuery({
    queryKey: ["disputes"],
    queryFn: () => geClientDisputes(clientId),
  });
  return (
    <div>
        
    </div>
  )
}

export default Dispute