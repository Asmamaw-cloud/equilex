// "use client";

// import { Suspense, useState } from "react";
// import MoreFilteringOptions from "./components/moreFilteringOptions";
// import LawyersList from "./components/lawyersList";

// const Lawyers = () => {
//   const MenuItems = [
//     { id: 1, text: "All", type: "" },
//     { id: 2, text: "FAMILY_LAW", type: "FAMILY_LAW" },
//     { id: 3, text: "REAL_ESTATE_LAW", type: "REAL_ESTATE_LAW" },
//     {
//       id: 4,
//       text: "INTELLECTUAL_PROPERTY_LAW",
//       type: "INTELLECTUAL_PROPERTY_LAW",
//     },
//     { id: 5, text: "ENVIRONMENTAL_LAW", type: "ENVIRONMENTAL_LAW" },
//     { id: 6, text: "CRIMINAL_LAW", type: "CRIMINAL_LAW" },
//   ];

//   const [selectedType, setSelectedType] = useState("");
//   const [selectedLanguage, setSelectedLanguage] = useState<string>("");
//   const [selectedSpecialization, setSelectedSpecialization] =
//     useState<string>("");
//   const [selectedCourt, setSelectedCourt] = useState<string>("");

//   return (
//     <div className="min-w-full relative text-center">
//       <ul className="items-center w-full justify-center  border-2 sticky top-24 z-30 backdrop:blur-lg bg-background/95">
//         {MenuItems.map((item, index) => {
//           return (
//             <li
//               key={index}
//               className="p-2 md:p-4 text-sm md:text-xl rounded-xl md:m-2 cursor-pointer duration-300 hover:text-black relative inline-flex items-center justify-start overflow-hidden transition-all bg-white  hover:bg-purple-600 group"
//               onClick={() => setSelectedSpecialization(item.type)}
//             >
//               <span
//                 className={
//                   selectedSpecialization === item.type
//                     ? `w-full h-full rounded bg-purple-600 absolute left-0 ease-out duration-200 transition-all text-white`
//                     : `w-0 h-0 rounded bg-purple-600 absolute left-0 ease-out duration-200 transition-all group-hover:w-full group-hover:h-full -z-1`
//                 }
//               ></span>
//               <span
//                 className={
//                   selectedSpecialization === item.type
//                     ? `text-white w-full transition-colors duration-100 ease-in-out group-hover:text-white z-10`
//                     : `w-full text-black transition-colors duration-100 ease-in-out group-hover:text-white z-10`
//                 }
//               >
//                 {item.text}
//               </span>
//             </li>
//           );
//         })}

//         <li className="p-2 md:p-4 text-sm md:text-xl rounded-xl md:m-2 cursor-pointer duration-300 hover:text-black relative inline-flex items-center justify-start overflow-hidden transition-all bg-white  hover:bg-white group">
//           <MoreFilteringOptions
//             setSelectedCourt={setSelectedCourt}
//             setSelectedLanguage={setSelectedLanguage}
//             setSelectedSpecialization={setSelectedSpecialization}
//             selectedSpecialization={selectedSpecialization}
//           />
//         </li>
//       </ul>
//       <Suspense fallback={<div>Loading lawyers...</div>}>
//         <LawyersList
//           selectedSpecialization={selectedSpecialization}
//           selectedLanguage={selectedLanguage}
//           selectedCourt={selectedCourt}
//         />
//       </Suspense>

//     </div>
//   );
// };

// export default Lawyers;





"use client"

import { Suspense, useState } from "react"
import MoreFilteringOptions from "./components/moreFilteringOptions"
import LawyersList from "./components/lawyersList"

const Lawyers = () => {
  const MenuItems = [
    { id: 1, text: "All", type: "" },
    { id: 2, text: "Family Law", type: "FAMILY_LAW" },
    { id: 3, text: "Real Estate", type: "REAL_ESTATE_LAW" },
    { id: 4, text: "Intellectual Property", type: "INTELLECTUAL_PROPERTY_LAW" },
    { id: 5, text: "Environmental", type: "ENVIRONMENTAL_LAW" },
    { id: 6, text: "Criminal Law", type: "CRIMINAL_LAW" },
  ]

  const [selectedSpecialization, setSelectedSpecialization] = useState<string>("")
  const [selectedLanguage, setSelectedLanguage] = useState<string>("")
  const [selectedCourt, setSelectedCourt] = useState<string>("")

  const clearAllFilters = () => {
    setSelectedSpecialization("")
    setSelectedLanguage("")
    setSelectedCourt("")
  }

  const hasActiveFilters = selectedSpecialization || selectedLanguage || selectedCourt

  return (
    <div className="min-w-full relative">
      {/* Filter Header */}
      <div className="sticky top-24 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-4">
          {/* Active Filters Display
          {hasActiveFilters && (
            <div className="mb-4 flex flex-wrap gap-2 items-center">
              <span className="text-sm font-medium text-muted-foreground">Active filters:</span>
              {selectedSpecialization && (
                <div className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 rounded-md text-sm">
                  {MenuItems.find((item) => item.type === selectedSpecialization)?.text || selectedSpecialization}
                  <button
                    onClick={() => setSelectedSpecialization("")}
                    className="ml-1 hover:bg-purple-200 rounded-full p-0.5"
                  >
                    ×
                  </button>
                </div>
              )}
              {selectedLanguage && (
                <div className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm">
                  {selectedLanguage}
                  <button onClick={() => setSelectedLanguage("")} className="ml-1 hover:bg-blue-200 rounded-full p-0.5">
                    ×
                  </button>
                </div>
              )}
              {selectedCourt && (
                <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-md text-sm">
                  {selectedCourt.replace(/_/g, " ")}
                  <button onClick={() => setSelectedCourt("")} className="ml-1 hover:bg-green-200 rounded-full p-0.5">
                    ×
                  </button>
                </div>
              )}
              <button
                onClick={clearAllFilters}
                className="text-sm text-muted-foreground hover:text-foreground underline"
              >
                Clear all
              </button>
            </div>
          )} */}

          {/* Main Filter Buttons */}
          <div className="flex flex-wrap gap-2 items-center justify-center">
            {MenuItems.map((item) => (
              <button
                key={item.id}
                className={`
                  px-4 py-2 text-sm md:text-base rounded-lg transition-all duration-200 
                  relative overflow-hidden group
                  ${
                    selectedSpecialization === item.type
                      ? "bg-purple-600 text-white shadow-md"
                      : "bg-white text-gray-700 border border-gray-200 hover:bg-purple-50 hover:border-purple-200"
                  }
                `}
                onClick={() => setSelectedSpecialization(item.type)}
              >
                <span className="relative z-10">{item.text}</span>
                {selectedSpecialization !== item.type && (
                  <span className="absolute inset-0 bg-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                )}
              </button>
            ))}

            <MoreFilteringOptions
              setSelectedCourt={setSelectedCourt}
              setSelectedLanguage={setSelectedLanguage}
              setSelectedSpecialization={setSelectedSpecialization}
              selectedSpecialization={selectedSpecialization}
              selectedLanguage={selectedLanguage}
              selectedCourt={selectedCourt}
            />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 py-6">
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              <span className="ml-2 text-muted-foreground">Loading lawyers...</span>
            </div>
          }
        >
          <LawyersList
            selectedSpecialization={selectedSpecialization}
            selectedLanguage={selectedLanguage}
            selectedCourt={selectedCourt}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default Lawyers
