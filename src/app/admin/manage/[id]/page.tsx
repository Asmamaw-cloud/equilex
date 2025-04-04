"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { getLawyerById } from "../../api/lawyers";

const ManageEachLawyers = () => {

    const param = useParams()
    const { id } = param
    console.log("params: ", param)

    const { data, isLoading, error } = useQuery({
        queryKey: ["lawyer"],
        queryFn: () => getLawyerById(id),
      });
      console.log("Get lawyer by Id: ", data)

  return (
    <div className="min-h-screen bg-[#f2f6fa] text-black flex items-center justify-center font-sans pt-24 px-10">
      <div className="w-full max-w-4xl p-8 pt-16 bg-white border border-gray-300 rounded-xl shadow-md relative">
        <Link
          href="/admin/manage"
          className="absolute left-2 top-3 cursor-pointer"
        >
          <Icon
            icon="tdesign:arrow-left"
            style={{ color: "black" }}
            width={30}
            height={27}
          />
        </Link>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-lg">Name:</h1>
            <p className="text-gray-700">{data?.full_name}</p>
          </div>
          <hr className="border-gray-300" />
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-lg">Email:</h1>
            <p className="text-gray-700">{data?.email}</p>
          </div>
          <hr className="border-gray-300" />
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-lg">Resume:</h1>
            <a
              className="text-blue-500 hover:underline"
              href={data?.resume}
              target="_blank"
            >
              {data?.resume}
            </a>
          </div>
          <hr className="border-gray-300" />
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-lg">Photo</h1>
            <a
              className="text-blue-500 hover:underline"
              href={data?.photo}
              target="_blank"
            >
              {data?.photo}
            </a>
          </div>
          <hr className="border-gray-300" />
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-lg">Working Language:</h1>
            <p className="text-gray-700">Amharic, Tigray, Oromifa</p>
          </div>
          <hr className="border-gray-300" />
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-lg">Working Area:</h1>
            <p className="text-gray-700">Suprim Court, High Court</p>
          </div>
          <hr className="border-gray-300" />
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-lg">Lawyer Document:</h1>
            <a
              className="text-blue-500 hover:underline"
              href={data?.qualification}
              target="_blank"
            >
              {data?.qualification}
            </a>
          </div>
          <hr className="border-gray-300" />
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-lg">Kebele ID:</h1>
            <a
              className="text-blue-500 hover:underline"
              href={data?.identification_card}
              target="_blank"
            >
              {data?.identification_card}
            </a>
          </div>
          <hr className="border-gray-300" />
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-lg">CV:</h1>
            <a
              className="text-blue-500 hover:underline"
              href={data?.CV}
              target="_blank"
            >
              {data?.CV}
            </a>
          </div>
          <hr className="border-gray-300" />
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-lg">Description:</h1>
            <p className="text-gray-700">{data?.description}</p>
          </div>
          <hr className="border-gray-300" />
        </div>
        <div className="flex items-center justify-between p-4 mt-4 ">
          <button
            className="px-6 py-2  rounded-2xl outline outline-[#c156f3] text-[#61207f]"
            onClick={() => null}
          >
            REJECT
          </button>
          <button
            className="px-6 py-2  rounded-2xl outline bg-[#5e207b] text-white"
            onClick={() => null}
          >
            ACCEPT
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageEachLawyers;
