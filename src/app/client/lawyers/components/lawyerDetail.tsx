// "use client";

// import { motion } from "framer-motion";
// import React, { use, useState } from "react";
// import { LawyerProps } from "./lawyersCard";
// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useQuery } from "@tanstack/react-query";
// import { getLawyerById } from "@/app/admin/api/lawyers";
// import { useSession } from "next-auth/react";
// import { getAverageRating, getRatings } from "../../api/rating";
// import { FaStar } from "react-icons/fa";
// import {
//   ErrorComponent,
//   LoadingComponent,
// } from "@/components/LoadingErrorComponents";
// import ReviewSectionCard from "@/components/reviewCard";
// import RatingPopup from "@/components/ratingPopup";

// const LawyerDetail: React.FC<{ lawyers: LawyerProps[] }> = ({ lawyers }) => {
//   const [hoveredLawyer, setHoveredLawyer] = useState<LawyerProps | null>(null);
//   const [showPopup, setShowPopup] = useState(false);

//   const param = useParams();
//   const { id } = param;

//   const {
//     data: lawyerData,
//     isLoading: lawyerLoading,
//     error: lawyerError,
//   } = useQuery({
//     queryKey: ["clientlawyer"],
//     queryFn: () => getLawyerById(id),
//   });

//   const lawyer_id = Number(id);

//   const {
//     data: Lawyerratings,
//     isLoading: ratingsLoading,
//     error: ratingsError,
//   } = useQuery({
//     queryKey: ["ratings"],
//     queryFn: () => getRatings(lawyer_id),
//   });

//   const {
//     data: averageRate,
//     isLoading: averageLoading,
//     error: averageError,
//   } = useQuery({
//     queryKey: ["average"],
//     queryFn: () => getAverageRating(lawyer_id),
//   });

//   const { data: session } = useSession();
//   // @ts-ignore
//   const client_id = session?.user?.image?.id;

//   const filteredLawyers = lawyers?.filter((item) => item.id !== lawyerData?.id);

//   const handleClosePopup = () => {
//     setShowPopup(false);
//   };

//   const renderStars = (rating: number) => {
//     const stars = [];
//     for (let i = 0; i < 5; i++) {
//       stars.push(<FaStar key={i} color={i < rating ? "#ffd700" : "#e4e5e9"} />);
//     }
//     return stars;
//   };

//   if (averageLoading && lawyerLoading && ratingsLoading)
//     return <LoadingComponent />;
//   if (averageError && lawyerError && ratingsError)
//     return (
//       <ErrorComponent errorMessage="Failed to load data. Please try again." />
//     );

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.6 }}
//       className="container mx-auto mt-10 px-4 md:px-0"
//     >
//       <motion.div
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.2, duration: 0.6 }}
//         className=" bg-gray-100 p-4 rounded-lg md:p-8 flex lg:flex-col "
//       >
//         <motion.div className=" flex justify-between ">
//           <div className=" md:w-1/4 md:mr-8 ">
//             <h3 className=" text-xl font-semibold text-gray-800 mb-4 ">
//               Other Lawyers
//             </h3>
//             <ul>
//               {filteredLawyers?.map((otherLawyer: any) => (
//                 <li
//                   key={otherLawyer.id}
//                   onMouseEnter={() => setHoveredLawyer(otherLawyer)}
//                   onMouseLeave={() => setHoveredLawyer(null)}
//                   className=" mb-4 p-2 rounded-lg hover:bg-gray-200 transition-all "
//                 >
//                   <Link
//                     href={`/client/lawyers/${otherLawyer.id}`}
//                     className=" text-blue-500 hover:underline "
//                   >
//                     {otherLawyer?.full_name}
//                   </Link>
//                   {hoveredLawyer && hoveredLawyer.id === otherLawyer.id && (
//                     <motion.div
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ duration: 0.3 }}
//                       className=" text-sm bg-white shadow rounded-lg p-2 "
//                     >
//                       <p>{otherLawyer.description}</p>
//                     </motion.div>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <motion.div
//             initial={{ x: 20 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ delay: 0.4, duration: 0.6 }}
//             className=" md:w-3/4 "
//           >
//             <div className=" mb-4 flex justify-between items-center ">
//               <Link
//                 href={"/client/lawyers"}
//                 className=" bg-[#7B3B99] text-white font-bold py-2 px-4 rounded transition duration-300 hover:bg-purple-700 inline-block mb-2 md:mb-0 "
//               >
//                 Back
//               </Link>
//               <div>
//                 <Link
//                   href={`/chat/${lawyerData?.id}`}
//                   className=" bg-[#7B3B99] text-white font-bold py-2 px-4 rounded hover:bg-purple-700 inline-block mr-2 "
//                 >
//                   Chat with Lawyer
//                 </Link>
//               </div>
//             </div>
//             <div>
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.6, duration: 0.6 }}
//                 className=" relative h-[400px] w-full "
//               >
//                 <motion.img
//                   src={lawyerData?.photo}
//                   alt={lawyerData?.full_name}
//                   className="w-full h-full object-cover rounded-t-lg"
//                   whileHover={{ scale: 1.1 }}
//                 />
//                 <div className="absolute bottom-0 left-0 p-6 bg-gray-800 bg-opacity-75 rounded-br-lg w-full">
//                   <h2 className="text-3xl font-semibold text-white">
//                     {lawyerData?.full_name}
//                   </h2>
//                 </div>
//               </motion.div>
//               <div className=" p-4 md:p-8 ">
//                 <h3 className="text-xl font-semibold text-gray-800 mb-4">
//                   Personal Information
//                 </h3>
//                 <p className="text-gray-600 mt-2">{lawyerData?.description}</p>
//                 <div className="flex items-center mt-4">
//                   <div className="flex items-center mt-2">
//                     {renderStars(averageRate)}
//                   </div>
//                 </div>
//                 <hr className="my-6 border-t border-gray-200" />
//                 <>
//                   <h3 className="text-xl font-semibold text-gray-800 mb-4">
//                     Languages
//                   </h3>
//                   <ul className="list-disc pl-5">
//                     {lawyerData?.languages?.map((language: any) => (
//                       <li key={language} className="text-gray-600">
//                         {language}
//                       </li>
//                     ))}
//                   </ul>
//                   <h3 className="text-xl font-semibold text-gray-800 mb-4">
//                     Specialties
//                   </h3>
//                   <ul className="list-disc pl-5">
//                     {lawyerData?.specialties?.map((specialtie: any) => (
//                       <li key={specialtie} className="text-gray-600">
//                         {specialtie}
//                       </li>
//                     ))}
//                   </ul>
//                   <hr className="my-6 border-t border-gray-200" />
//                   <h3 className="text-xl font-semibold text-gray-800 mb-4">
//                     Courts
//                   </h3>
//                   <ul className="list-disc pl-5">
//                     {lawyerData?.courts?.map((court: any) => (
//                       <li key={court} className="text-gray-600">
//                         {court}
//                       </li>
//                     ))}
//                   </ul>
//                 </>
//               </div>
//             </div>
//           </motion.div>
//         </motion.div>

//         <div className=" p-4 mt-8 ">
//           <h2 className="text-xl font-semibold mb-4 text-black text-center">
//             Client Comments and Reviews
//           </h2>
//           {Lawyerratings?.map((clientName: any, index: any) => (
//             <ReviewSectionCard
//               key={index}
//               clientName={clientName?.client?.full_name}
//               rating={clientName.rate}
//               comment={clientName.comment}
//             />
//           ))}
//         </div>
//       </motion.div>

//       <RatingPopup
//         show={showPopup}
//         onClose={handleClosePopup}
//         case_id={client_id}
//         lawyer_id={lawyerData?.id}
//       />
//     </motion.div>
//   );
// };

// export default LawyerDetail;





"use client"

import { motion } from "framer-motion"
import type React from "react"
import { useState } from "react"
import type { LawyerProps } from "./lawyersCard"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { getLawyerById } from "@/app/admin/api/lawyers"
import { useSession } from "next-auth/react"
import { getAverageRating, getRatings } from "../../api/rating"
import { ErrorComponent, LoadingComponent } from "@/components/LoadingErrorComponents"
import ReviewSectionCard from "@/components/reviewCard"
import RatingPopup from "@/components/ratingPopup"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, MessageCircle, Globe, Scale, Building, Star, Users } from "lucide-react"

const LawyerDetail: React.FC<{ lawyers: LawyerProps[] }> = ({ lawyers }) => {
  const [hoveredLawyer, setHoveredLawyer] = useState<LawyerProps | null>(null)
  const [showPopup, setShowPopup] = useState(false)

  const param = useParams()
  const { id } = param

  const {
    data: lawyerData,
    isLoading: lawyerLoading,
    error: lawyerError,
  } = useQuery({
    queryKey: ["clientlawyer"],
    queryFn: () => getLawyerById(id),
  })

  const lawyer_id = Number(id)

  const {
    data: Lawyerratings,
    isLoading: ratingsLoading,
    error: ratingsError,
  } = useQuery({
    queryKey: ["ratings"],
    queryFn: () => getRatings(lawyer_id),
  })

  const {
    data: averageRate,
    isLoading: averageLoading,
    error: averageError,
  } = useQuery({
    queryKey: ["average"],
    queryFn: () => getAverageRating(lawyer_id),
  })

  const { data: session } = useSession()
  // @ts-ignore
  const client_id = session?.user?.image?.id

  const filteredLawyers = lawyers?.filter((item) => item.id !== lawyerData?.id)

  const handleClosePopup = () => {
    setShowPopup(false)
  }

  const renderStars = (rating: number) => {
    const stars = []
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />,
      )
    }
    return stars
  }

  if (averageLoading || lawyerLoading || ratingsLoading) return <LoadingComponent />
  if (averageError || lawyerError || ratingsError)
    return <ErrorComponent errorMessage="Failed to load data. Please try again." />

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Navigation */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <Button variant="outline" asChild className="gap-2">
            <Link href="/client/lawyers">
              <ArrowLeft className="w-4 h-4" />
              Back to Lawyers
            </Link>
          </Button>

          <Button asChild className="gap-2 bg-purple-600 hover:bg-purple-700">
            <Link href={`/chat/${lawyerData?.id}`}>
              <MessageCircle className="w-4 h-4" />
              Chat with Lawyer
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Other Lawyers */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="lg:col-span-1"
          >
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="w-5 h-5" />
                  Other Lawyers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {filteredLawyers?.slice(0, 5).map((otherLawyer: any) => (
                  <motion.div
                    key={otherLawyer.id}
                    onMouseEnter={() => setHoveredLawyer(otherLawyer)}
                    onMouseLeave={() => setHoveredLawyer(null)}
                    className="relative"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Link
                      href={`/client/lawyers/${otherLawyer.id}`}
                      className="block p-3 rounded-lg border hover:border-purple-200 hover:bg-purple-50 transition-all duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={otherLawyer.photo || "/placeholder.svg"} />
                          <AvatarFallback>{otherLawyer.full_name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{otherLawyer.full_name}</p>
                          <p className="text-xs text-muted-foreground truncate">{otherLawyer.specialties?.[0]}</p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="lg:col-span-3 space-y-8"
          >
            {/* Lawyer Profile Card */}
            <Card className="overflow-hidden">
              <div className="relative h-64 bg-gradient-to-r from-purple-600 to-purple-800">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-end gap-6">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                        <AvatarImage src={lawyerData?.photo || "/placeholder.svg"} />
                        <AvatarFallback className="text-2xl">{lawyerData?.full_name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </motion.div>
                    <div className="flex-1 text-white">
                      <h1 className="text-3xl font-bold mb-2">{lawyerData?.full_name}</h1>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">{renderStars(averageRate || 0)}</div>
                        <span className="text-white/90">({Lawyerratings?.length || 0} reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">About</h3>
                    <p className="text-muted-foreground leading-relaxed">{lawyerData?.description}</p>
                  </div>

                  <Separator />

                  {/* Professional Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Languages */}
                    <div className="space-y-3">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Globe className="w-4 h-4 text-purple-600" />
                        Languages
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {lawyerData?.languages?.map((language: any) => (
                          <Badge key={language} variant="secondary">
                            {language}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="space-y-3">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Scale className="w-4 h-4 text-purple-600" />
                        Specialties
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {lawyerData?.specialties?.map((specialty: any) => (
                          <Badge key={specialty} variant="outline">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Courts */}
                    <div className="space-y-3">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Building className="w-4 h-4 text-purple-600" />
                        Courts
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {lawyerData?.courts?.map((court: any) => (
                          <Badge key={court} variant="outline">
                            {court}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Client Reviews & Ratings
                </CardTitle>
              </CardHeader>
              <CardContent>
                {Lawyerratings && Lawyerratings.length > 0 ? (
                  <div className="space-y-4">
                    {Lawyerratings.map((review: any, index: any) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                      >
                        <ReviewSectionCard
                          clientName={review?.client?.full_name}
                          rating={review.rate}
                          comment={review.comment}
                        />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Star className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No reviews yet. Be the first to leave a review!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <RatingPopup show={showPopup} onClose={handleClosePopup} case_id={client_id} lawyer_id={lawyerData?.id} />
    </div>
  )
}

export default LawyerDetail
