// import { data } from "@/app/data/lawyersMockData";
import LawyersCard from "./lawyersCard";
import { useQuery } from "@tanstack/react-query";
import { getVerifiedLawyers } from "@/app/admin/api/lawyers";
import {
  ErrorComponent,
  LoadingComponent,
} from "@/components/LoadingErrorComponents";

interface Props {
  selectedSpecialization: string;
  selectedCourt: string;
  selectedLanguage: string;
}

const LawyersList: React.FC<Props> = ({
  selectedSpecialization,
  selectedCourt,
  selectedLanguage,
}) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["clientlawyers"],
    queryFn: () => getVerifiedLawyers(),
    refetchInterval: 3000,
  });
  

  const filteredLawyers = data?.filter((lawyer: any) => {
    return (
      (!selectedLanguage || lawyer.languages.includes(selectedLanguage)) &&
      (!selectedSpecialization ||
        lawyer.specialties.includes(selectedSpecialization)) &&
      (!selectedCourt || lawyer.courts.includes(selectedCourt))
    );
  });
  console.log("Client lawyers: ", data);
  console.log("Filtered lawyers: ", filteredLawyers);

  if (isLoading) return <LoadingComponent />;
  if (error)
    return (
      <ErrorComponent errorMessage="Failed to load data. Please try again." />
    );

  return (
    <div className="container px-5 py-5 mx-auto mt-4">
      <div className="flex flex-wrap -m-4 text-center mx-auto justify-center">
        {filteredLawyers?.length > 0 ? (
          filteredLawyers.map((item: any, index: any) => {
            return (
              <LawyersCard
                key={index}
                id={item.id}
                name={item.full_name}
                imageUrl={item.photo}
                des={item.description}
                rate={item.ratings}
              />
            );
          })
        ) : (
          <div className="mx-auto  items-center">
            <h1 className="text-2xl text-black">
              No lawyers on {selectedSpecialization} yet.
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default LawyersList;
