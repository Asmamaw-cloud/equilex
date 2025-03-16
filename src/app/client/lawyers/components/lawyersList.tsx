import { data } from "@/app/data/lawyersMockData";
import LawyersCard from "./lawyersCard";

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
  return (
    <div className="container px-5 py-5 mx-auto mt-4">
      <div className="flex flex-wrap -m-4 text-center mx-auto justify-center">
        {data?.length > 0 ? (
          data.map((item: any, index: any) => {
            return (
              <LawyersCard
                key={index}
                id={item.id}
                name={item.name}
                imageUrl={item.imageUrl}
                des={item.des}
                rate={item.rate}
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
