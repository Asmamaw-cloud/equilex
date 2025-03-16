import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React from "react";

interface props {
  setSelectedCourt: (court: string) => void;
  setSelectedSpecialization: (specialization: string) => void;
  setSelectedLanguage: (language: string) => void;
  selectedSpecialization: string;
}

const specilization = [
  { id: 1, text: "All", type: "" },
  { id: 2, text: "EMPLOYMENT", type: "EMPLOYMENT_LAW" },
  { id: 3, text: "IMMIGRATION", type: "IMMIGRATION_LAW" },
  { id: 4, text: "REAL_ESTATE", type: "REAL_ESTATE_LAW" },
  { id: 5, text: "REAL_ESTATE", type: "REAL_ESTATE_LAW" },
  { id: 6, text: "ENVIRONMENTAL", type: "ENVIRONMENTAL_LAW" },
  { id: 7, text: "TAX", type: "TAX_LAW" },
  { id: 8, text: "FAMILY", type: "FAMILY_LAW" },
  { id: 9, text: "Intellectual_Property", type: "INTELLECTUAL_PROPERTY_LAW" },

  { id: 8, text: "CRIMINAL", type: "CRIMINAL_LAW" },
  { id: 9, text: "CORPORATE", type: "CORPORATE_LAW" },
  { id: 10, text: "BANKRUPTCY", type: "BANKRUPTCY_LAW" },
];

const languages = [
  { id: 0, label: "All", value: "" },
  { id: 1, label: "AMHARIC", value: "AMHARIC" },
  { id: 2, label: "OROMO", value: "OROMO" },
  { id: 3, label: "TIGRINYA", value: "TIGRINYA" },
  { id: 4, label: "SOMALI", value: "SOMALI" },
  { id: 5, label: "SIDAMO", value: "SIDAMO" },
  { id: 6, label: "GURAGE", value: "GURAGE" },
  { id: 7, label: "AFAR", value: "AFAR" },
  { id: 8, label: "GAMO", value: "GAMO" },
  { id: 9, label: "HADIYYA", value: "HADIYYA" },
  // { id: 10, label: "Konso", value: "konso" },
  { id: 10, label: "WOLAYTTA", value: "WOLAYTTA" },
];

const courts = [
  { id: 0, label: "All", value: "" },
  { id: 1, label: "Supreme Court", value: "SUPREME_COURT" },
  { id: 2, label: "Appellate Court", value: "APPELLATE_COURT" },
  { id: 3, label: "High Court", value: "HIGH_COURT" },
  { id: 4, label: "District Court", value: "DISTRICT_COURT" },
  { id: 9, label: "Small Claims Court", value: "SMALL_CLAIMS_COURT" },
  { id: 10, label: "Administrative Court", value: "ADMINISTRATIVE_COURT" },
];

const MoreFilteringOptions: React.FC<props> = ({
  setSelectedCourt,
  setSelectedLanguage,
  setSelectedSpecialization,
  selectedSpecialization,
}) => {
  return (
    <Sheet>
      <SheetTrigger>More</SheetTrigger>
      <SheetContent side={"left"} className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Filter lawyers with many options</SheetTitle>
          <SheetDescription>
            Here you can filter lawyers by their specilization domain, languages
            and also court levels.
          </SheetDescription>
        </SheetHeader>
        <div className="grid grid-cols-1 gap-2 py-4">
          <div>
            <h1 className="text-lg font-bold text-gray-800 ">Specialization</h1>
            <RadioGroup
              defaultValue={selectedSpecialization}
              className="grid grid-cols-2 gap-4 py-4"
            >
                {
                    specilization.map((item, index) => {
                        return (
                            <div className="flex items-center space-x-2" key={index}>
                                <RadioGroupItem
                                    value={item.type}
                                    id={`${index}`}
                                    onClick={() => setSelectedSpecialization(item.type)}
                                />
                                <Label> {item.text} </Label>
                            </div>
                        )
                    })
                }
            </RadioGroup>
          </div>

          <div>
              <h1 className="text-lg font-bold text-gray-800 ">Languages</h1>
              <RadioGroup className="grid grid-cols-3 gap-2 py-4">
                {languages.map((item, index) => {
                  return (
                    <div className="flex items-center space-x-2" key={index}>
                      <RadioGroupItem
                        value={item.value}
                        id={`${index}`}
                        onClick={() => setSelectedLanguage(item.value)}
                      />
                      <Label htmlFor="r1">{item.label}</Label>
                    </div>
                  );
                })}
              </RadioGroup>
            </div>
        </div>
        <div>
            <h1 className="text-lg font-bold text-gray-800 ">Courts</h1>
            <RadioGroup className="grid grid-cols-2 gap-2 py-4">
              {courts.map((item, index) => {
                return (
                  <div className="flex items-center space-x-2" key={index}>
                    <RadioGroupItem
                      value={item.value}
                      id={`${index}`}
                      onClick={() => setSelectedCourt(item.value)}
                    />
                    <Label htmlFor="r1">{item.label}</Label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>
      </SheetContent>
    </Sheet>
  );
};

export default MoreFilteringOptions;
