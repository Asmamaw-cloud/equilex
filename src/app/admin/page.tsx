"use client";

import BarChart from "@/components/chart/BarChart";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getClientData, getLawyerData } from "./api/dashboard";

const Admin = () => {
  const {
    data: clientdata,
    isLoading: clientLoading,
    error: clientError,
  } = useQuery({
    queryKey: ["clientdata"],
    queryFn: () => getClientData(),
    refetchInterval: 6000,
  });

  const {
    data: lawyerdata,
    isLoading: lawyerLoading,
    error: lawyerError,
  } = useQuery({
    queryKey: ["lawyerdata"],
    queryFn: () => getLawyerData(),
    refetchInterval: 6000,
  });

  console.log("CLient data: ", clientdata);
  console.log("Lawyer count: ", lawyerdata);

  const data1 = [clientdata, lawyerdata, 15];

  return (
    <div className="min-w-max min-h-screen pt-24 pl-10 lg:pl-72 bg-[#f2f6fa]        ">
      <div className="w-full h-fit text-black p-4">
        <h1 className="font-bold text-3xl ">Dashboard</h1>
      </div>

      <div className="w-full h-[400px] lg:h-72 flex  flex-col lg:flex-row gap-4 justify-between">
        <div className="w-3/4 lg:w-1/2 h-full border-2 border-gray-300 px-10 p-2 bg-white">
          <BarChart data={data1} />
        </div>

        <div className="flex flex-col gap-4 w-full lg:w-1/2 lg:px-10">
          <div className="bg-white  w-3/4  lg:w-1/2 h-20 text-black flex gap-4 items-center px-10 lg:m-auto">
            <svg
              className="w-8 h-8 text-red-300 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
            </svg>
            <p>Total clients</p>
            <p>{clientdata}</p>
          </div>

          <div className="bg-white  w-3/4 lg:w-1/2 h-20 flex text-black gap-4 items-center px-10 lg:m-auto">
            <svg
              className="w-8 h-8 text-green-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
            </svg>
            <p>Total Lawyer</p>
            <p>{lawyerdata}</p>
          </div>

          <div className="bg-white w-3/4 lg:w-1/2 h-20 flex gap-4 text-black items-center px-10 lg:m-auto">
            <svg
              className="w-8 h-8 text-blue-300 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
            </svg>
            <p>Total Cases</p>
            <p>{15}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
