"use client";

import { motion } from "framer-motion";
import React, { use, useState } from "react";
import { LawyerProps } from "./lawyersCard";
import Link from "next/link";
import { data } from "@/app/data/lawyersMockData";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getLawyerById } from "@/app/admin/api/lawyers";
import { useSession } from "next-auth/react";

const LawyerDetail: React.FC<{ lawyers: LawyerProps[] }> = ({ lawyers }) => {
  const [hoveredLawyer, setHoveredLawyer] = useState<LawyerProps | null>(null);

  const param = useParams();
  const { id } = param;

  const {
    data: lawyerData,
    isLoading: lawyerLoading,
    error: lawyerError,
  } = useQuery({
    queryKey: ["clientlawyer"],
    queryFn: () => getLawyerById(id),
  });

  const lawyer_id = Number(id);
  console.log("id: ", id);
  console.log("lawyer_id: : ", lawyer_id);
  console.log("params: ", param);

  const { data: session } = useSession();
  const filteredLawyers = lawyers?.filter((item) => item.id !== lawyerData?.id);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="container mx-auto mt-10 px-4 md:px-0"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className=" bg-gray-100 p-4 rounded-lg md:p-8 flex lg:flex-col "
      >
        <motion.div className=" flex justify-between ">
          <div className=" md:w-1/4 md:mr-8 ">
            <h3 className=" text-xl font-semibold text-gray-800 mb-4 ">
              Other Lawyers
            </h3>
            <ul>
              {lawyers?.map((otherLawyer: any) => (
                <li
                  key={otherLawyer.id}
                  onMouseEnter={() => setHoveredLawyer(otherLawyer)}
                  onMouseLeave={() => setHoveredLawyer(null)}
                  className=" mb-4 p-2 rounded-lg hover:bg-gray-200 transition-all "
                >
                  <Link
                    href={`/client/lawyers/${otherLawyer.id}`}
                    className=" text-blue-500 hover:underline "
                  >
                    {otherLawyer?.full_name}
                  </Link>
                  {hoveredLawyer && hoveredLawyer.id === otherLawyer.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className=" text-sm bg-white shadow rounded-lg p-2 "
                    >
                      <p>{otherLawyer.description}</p>
                    </motion.div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <motion.div
            initial={{ x: 20 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className=" md:w-3/4 "
          >
            <div className=" mb-4 flex justify-between items-center ">
              <Link
                href={"/client/lawyers"}
                className=" bg-[#7B3B99] text-white font-bold py-2 px-4 rounded transition duration-300 hover:bg-purple-700 inline-block mb-2 md:mb-0 "
              >
                Back
              </Link>
              <div>
                <Link
                  href={`/chat2/${""}`}
                  className=" bg-[#7B3B99] text-white font-bold py-2 px-4 rounded hover:bg-purple-700 inline-block mr-2 "
                >
                  Chat with Lawyer
                </Link>
              </div>
            </div>
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                {/* <motion.img
                src={""}
                alt={"name"}
                className="w-full h-full object-cover rounded-t-lg"
                whileHover={{ scale: 1.1 }}
                >
                  <div>
                    <h2>{}</h2>
                  </div>
                </motion.img> */}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LawyerDetail;
