"use client";

import { useState } from "react";
import MoreFilteringOptions from "./components/moreFilteringOptions";
import LawyersList from "./components/lawyersList";

const Lawyers = () => {
  const MenuItems = [
    { id: 1, text: "All", type: "" },
    { id: 2, text: "FAMILY_LAW", type: "FAMILY_LAW" },
    { id: 3, text: "REAL_ESTATE_LAW", type: "REAL_ESTATE_LAW" },
    {
      id: 4,
      text: "INTELLECTUAL_PROPERTY_LAW",
      type: "INTELLECTUAL_PROPERTY_LAW",
    },
    { id: 5, text: "ENVIRONMENTAL_LAW", type: "ENVIRONMENTAL_LAW" },
    { id: 6, text: "CRIMINAL_LAW", type: "CRIMINAL_LAW" },
  ];

  const [selectedType, setSelectedType] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [selectedSpecialization, setSelectedSpecialization] =
    useState<string>("");
  const [selectedCourt, setSelectedCourt] = useState<string>("");

  return (
    <div className="min-w-full relative text-center">
      <ul className="items-center w-full justify-center  border-2 sticky top-24 z-30 backdrop:blur-lg bg-background/95">
        {MenuItems.map((item, index) => {
          return (
            <li
              key={index}
              className="p-2 md:p-4 text-sm md:text-xl rounded-xl md:m-2 cursor-pointer duration-300 hover:text-black relative inline-flex items-center justify-start overflow-hidden transition-all bg-white  hover:bg-purple-600 group"
              onClick={() => setSelectedSpecialization(item.type)}
            >
              <span
                className={
                  selectedSpecialization === item.type
                    ? `w-full h-full rounded bg-purple-600 absolute left-0 ease-out duration-200 transition-all text-white`
                    : `w-0 h-0 rounded bg-purple-600 absolute left-0 ease-out duration-200 transition-all group-hover:w-full group-hover:h-full -z-1`
                }
              ></span>
              <span
                className={
                  selectedSpecialization === item.type
                    ? `text-white w-full transition-colors duration-100 ease-in-out group-hover:text-white z-10`
                    : `w-full text-black transition-colors duration-100 ease-in-out group-hover:text-white z-10`
                }
              >
                {item.text}
              </span>
            </li>
          );
        })}

        <li className="p-2 md:p-4 text-sm md:text-xl rounded-xl md:m-2 cursor-pointer duration-300 hover:text-black relative inline-flex items-center justify-start overflow-hidden transition-all bg-white  hover:bg-white group">
          <MoreFilteringOptions
          
            setSelectedCourt={setSelectedCourt}
            setSelectedLanguage={setSelectedLanguage}
            setSelectedSpecialization={setSelectedSpecialization}
            selectedSpecialization={selectedSpecialization}
          />
        </li>
      </ul>
      <LawyersList
        selectedSpecialization={selectedSpecialization}
        selectedLanguage={selectedLanguage}
        selectedCourt={selectedCourt}
      />
    </div>
  );
};

export default Lawyers;
