"use client";

import DoughnutChart from "@/components/chart/DoughnutChart";
import LineChart from "@/components/chart/LineChart";
import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";
import { getTrials } from "./api/trial";
import { getStatistics } from "./api/statistics";
import { ErrorComponent, LoadingComponent } from "@/components/LoadingErrorComponents";
import TrialNotify from "@/components/TrialNotify";

const Lawyer = () => {

  const {
    data: trialsData,
    isLoading: isLoadingTrials,
    error: trialsError,
  } = useQuery({
    queryKey: ["trials"],
    queryFn: getTrials,
    refetchInterval: 6000, // Refetch every 2 minutes
  });

  const {
    data: statisticsData,
    isLoading: isLoadingStatistics,
    error: statisticsError,
  } = useQuery({
    queryKey: ["statistics"],
    queryFn: getStatistics,
    refetchInterval: 120000, // Refetch every 2 minutes
  });


  if (isLoadingTrials) return <LoadingComponent />;
  if (trialsError)
    return (
      <ErrorComponent errorMessage="Failed to load data. Please try again." />
    );

  return (
    <div className="w-full font-sans min-h-screen  px-10 lg:pl-64 bg-[#f2f6fa]">
      <div className="w-full h-1/2 flex flex-col lg:flex-row gap-4 justify-between items-center pt-6">
        <div className="w-full lg:w-1/3  flex flex-col gap-4">
          <div className="w-full lg:w-3/4 h-20 flex gap-3 shadow-md rounded-lg p-4 bg-white text-black items-center justify-center">
            <Icon
              icon="material-symbols:cases"
              width={30}
              height={30}
              color="#C075E3"
            />
            <p>{statisticsData?.totalCases}</p>
            <p>Total cases</p>
          </div>
          <div className="w-full lg:w-3/4 h-20 flex gap-3 shadow-md rounded-lg p-4 bg-white text-black items-center justify-center">
            <Icon
              icon="material-symbols:cases"
              width={30}
              height={30}
              color="#C6EF67"
            />
            <p>{statisticsData?.completedCases}</p>
            <p>Complated Cases</p>
          </div>
          <div className="w-full lg:w-3/4 h-20 flex gap-3 shadow-md rounded-lg p-4 bg-white text-black items-center justify-center">
            <Icon
              icon="material-symbols:cases"
              width={30}
              height={30}
              color="#69BEF0"
            />
            <p>{statisticsData?.inProgressCases}</p>
            <p>Pending case</p>
          </div>
        </div>

        <div className="w-full lg:w-2/3 flex flex-col items-center gap-4 p-4 bg-white h-72">
          <h1 className="font-bold text-xl text-gray-700">Upcoming Trials</h1>

          <div className="w-full h-4/5 overflow-auto">
            <table className="w-full text-left rounded-xl ">
              <thead className="sticky top-0 bg-white z-40">
                <tr className="bg-white text-gray-600 rounded-xl">
                  <th className="py-3 px-6 ">CASE_ID</th>
                  {/* <th className="py-3 px-6 ">CLIENT NAME</th> */}
                 
                  <th className="py-3 px-6">COURT PLACE</th>
                  <th className="py-3 px-6 ">DESCRIPTION</th>
                  <th className="py-3 px-6">DATE</th>
                </tr>
              </thead>
              <tbody>
                {trialsData?.map((apointment: any, index: any) => ( 
                  <tr
                    className={
                      index % 2 === 0
                        ? "relative bg-[#F4F4F4]"
                        : "relative bg-white"
                    }
                    key={index}
                  >
                    <td className="py-3 px-6 text-black text-center">
                      {apointment?.id}
                    </td>
                    {/* <td className="py-3 px-6 text-black text-center">
                      {apointment?.clientname}
                    </td> */}
                    <td className="py-3 px-6 text-black text-center">
                      {apointment?.location}
                    </td>
                    <td className="py-3 px-6 text-black max-w-[100px] text-center truncate hover:text-clip">
                      <span title={"hello"}>
                        {" "}
                        {apointment?.description}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-black text-center">
                      {new Date(apointment?.trial_date).toLocaleDateString()}
                    </td>
                  </tr>
                 ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col lg:flex-row gap-4 justify-between mt-6">
        <div className="w-full lg:w-1/2 h-full border-2 border-gray-300 px-2  bg-white flex justify-center ">
          <DoughnutChart data={[statisticsData?.totalCases,statisticsData?.completedCases, statisticsData?.inProgressCases]} />
        </div>
        <div className="w-full lg:w-1/2 h-full border-2 border-gray-300 px-10 p-2 bg-white">
          <LineChart data={[45000]} />
        </div>
      </div>
      <TrialNotify show={true} />
    </div>
  );
};

export default Lawyer;
