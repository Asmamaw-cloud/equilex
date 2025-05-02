"use client";

import { getCurrentDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BellOff, Loader2, MapPin } from "lucide-react";
import React from "react";

const LawyerNotifications = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await axios.get("/api/trial/lawyer");
      return res.data.trials;
    },
  });
  if (isLoading) {
    return <Loader2 className="animate-spin" />;
  }

  if (!data || data?.length == 0) {
    return (
      <div className="flex items-center justify-center">
        <div className="w-[400px] h-[300px] flex flex-col gap-3 items-center justify-center border rounded-lg shadow-md">
          <BellOff className="w-[100px] h-[100px] text-gray-400" />
          <div className="text-lg">No Notifications!</div>
        </div>
      </div>
    );
  }
  return (
    <div className="p-6 bg-gray-200 h-screen relative overflow-hidden">
      <div className="bg-white w-[80%] overflow-y-scroll h-[80vh] items-center justify-center rounded-xl m-auto p-10 relative flex flex-col gap-8">
        <div className="w-full h-full">
          <div className="flex items-center gap-2 mb-2">
            <b className="text-lg">Trials</b>
            <p className="text-sm">[{getCurrentDate()}]</p>
          </div>
          {data.map((trial: any, i: number) => (
        <div
          key={i}
          className="border-l-2 border-l-red-400 flex flex-col items-start p-3 rounded-l-md shadow-sm mb-2"
        >
          <div className="flex items-center font-bold gap-[3px]">
            <MapPin className="w-4 h-4  text-gray-400" /> {trial.location}
          </div>
          <div className="text-gray-500">{trial.description}</div>
        </div>
      ))}
        </div>
      </div>
    </div>
  );
};

export default LawyerNotifications;
