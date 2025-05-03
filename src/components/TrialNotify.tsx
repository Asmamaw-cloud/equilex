"use client";
import React from "react";
import { useNotifications } from "@/app/context/NotificationContext";
export interface props {
  show: Boolean;
}
const TrialNotify: React.FC<props> = ( ) => {
    const {showPopup,handleClosePopup} = useNotifications()
  return (
    <>
      {showPopup ? (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
         <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
           <p className="text-xl font-semibold text-[#7B3B99] mb-4">
             Trial Date: <span className="font-normal text-black">10/2/2024</span>
           </p>
           <p className="text-xl font-semibold text-[#7B3B99] mb-4">
             Trial Place: <span className="font-normal text-black">4 Kilo</span>
           </p>
           <p className="text-xl font-semibold text-[#7B3B99] mb-4 text-justify">
             Trial Note:
             <span className="font-normal text-black block mt-2">
               Prow scuttle parrel provost Sail ho shrouds spirits boom mizzenmast yardarm. Pinnace holystone mizzenmast quarter crows nest nipperkin grog yardarm hempen halter furl. Swab barque interloper chantey doubloon starboard grog black jack gangway rutters.
             </span>
           </p>
           <div className="flex justify-end mt-6 gap-4">
             <button 
               className="px-6 py-2 text-lg font-semibold rounded border border-[#7B3B99] text-[#7B3B99] hover:bg-[#7B3B99] hover:text-white transition-colors"
               onClick={handleClosePopup}
             >
               Cancel
             </button>
             <button 
               className="px-6 py-2 text-lg font-semibold rounded bg-[#7B3B99] text-white hover:bg-[#592973] transition-colors"
               onClick={handleClosePopup}
             >
               Acknowledge
             </button>
           </div>
         </div>
       </div>
     ) : null}
    </>
  );
};

export default TrialNotify;
