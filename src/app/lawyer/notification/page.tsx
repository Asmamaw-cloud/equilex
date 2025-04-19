import { getCurrentDate } from "@/lib/utils";
import { MapPin } from "lucide-react";
import React from "react";

const LawyerNotifications = () => {
  const data: any = [];
  return (
    <div>
      <div>
        <b>Trials</b>
        <p>[{getCurrentDate()}]</p>
      </div>
      {data.map((trials: any, index: number) => (
        <div key={index}>
          <div>
            <MapPin className="w-4 h-4  text-gray-400" /> {}
          </div>
          <div className="text-gray-500">{}</div>
        </div>
      ))}
    </div>
  );
};

export default LawyerNotifications;
