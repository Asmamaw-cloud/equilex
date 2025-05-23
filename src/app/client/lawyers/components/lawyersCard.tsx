// import Image from "next/image";
// import Link from "next/link";
// import { FaStar } from "react-icons/fa";

// export interface LawyerProps {
//   id: string;
//   name: string;
//   des: string;
//   imageUrl: string;
//   rate: number[];
// }

// const LawyersCard: React.FC<LawyerProps> = ({
//   id,
//   name,
//   imageUrl,
//   des,
//   rate,
// }) => {

    
//     const rateValues = rate?.map((item) => item?.rate);
//     const averageRate =
//       rateValues?.reduce((sum, rate) => sum + rate, 0) / rateValues?.length;


//   const renderStars = (rating: number) => {
//     const stars = [];
//     for (let i = 0; i < 5; i++) {
//       stars.push(<FaStar key={i} color={i < rating ? "#ffd700" : "#e4e5e9"} />);
//     }

//     return stars;
//   };

//   return (
//     <Link
//       className="text-start mx-auto md:mx-2 my-2 bg-white rounded-lg shadow-lg overflow-hidden  w-[60%] sm:w-[40%]  lg:w-[23%] transform transition duration-500 hover:scale-105"
//       href={`/client/lawyers/${id}`}
//     >
//       <div className="w-full">
//         <Image
//           src={imageUrl}
//           alt="Profile picture"
//           width={400}
//           height={400}
//           className="w-full h-64 object-cover"
//         />
//         <div className="p-6">
//           <h2 className="text-xl font-bold text-gray-800 mb-2">{name}</h2>
//           <p className="text-gray-700 text-sm leading-tight mb-4">{des}</p>
//           <div className="flex felx-row">
//             <div className="flex items-center mt-2">
//               {renderStars(averageRate)}
//             </div>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default LawyersCard;





import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"

 interface Rating {
  rate: number
}

 

 interface LawyerCardProps {
  id: string
  name: string
  des: string
  imageUrl: string
  rate: Rating[]
}

 


const LawyersCard: React.FC<LawyerCardProps> = ({ id, name, imageUrl, des, rate }) => {
  const rateValues = rate?.map((item) => item?.rate) || []
  const averageRate = rateValues.length > 0 ? rateValues.reduce((sum, rate) => sum + rate, 0) / rateValues.length : 0

  const renderStars = (rating: number) => {
    const stars = []
    const roundedRating = Math.round(rating)

    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 ${i < roundedRating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
        />,
      )
    }
    return stars
  }

  return (
    <Link
      className="group text-start mx-auto md:mx-2 my-2 bg-white rounded-lg shadow-lg overflow-hidden w-[60%] sm:w-[40%] lg:w-[23%] transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
      href={`/client/lawyers/${id}`}
    >
      <div className="w-full">
        <div className="relative overflow-hidden">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={`${name} profile picture`}
            width={400}
            height={400}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
        </div>

        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {name}
          </h2>

          <p className="text-gray-700 text-sm leading-tight mb-4 line-clamp-3">{des}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">{renderStars(averageRate)}</div>

            {rateValues.length > 0 && (
              <div className="text-sm text-gray-500">
                <span className="font-medium">{averageRate.toFixed(1)}</span>
                <span className="ml-1">({rateValues.length})</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default LawyersCard
