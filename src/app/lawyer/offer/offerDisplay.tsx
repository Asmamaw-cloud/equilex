// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { acceptOffer, getCasesById, rejectOffer } from "../api/offer";
// import {
//   ErrorComponent,
//   LoadingComponent,
// } from "@/components/LoadingErrorComponents";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Loader2 } from "lucide-react";

// interface message {
//   messageType: string;
//   fileType: string;
//   clientId: number;
//   message: string;
//   lawyerId: number;
//   lawyer: {
//     photo: string;
//   };
//   client: {
//     full_name: string;
//   };
// }

// const OfferDisplay = ({
//   caseId,
//   userType,
// }: {
//   caseId: number;
//   userType: string;
// }) => {
//   const [isAccepting, setIsAcceptiong] = useState(false);
//   const [isRejecting, setIsRejecting] = useState(false);
//   const queryClient = useQueryClient();
//   const router = useRouter();

//   const { data, isLoading, error } = useQuery({
//     queryKey: ["offer-chat" + caseId],
//     queryFn: () => getCasesById(caseId),
//   });

//   const acceptMutation = useMutation({
//     mutationFn: (id: number) => acceptOffer(id),
//     onSuccess: (data: any) => {
//       console.log( "this is onsuccess data", data);

//       setIsAcceptiong(false);
//       router.replace(data.acceptedCase);
//     },
//   });

//   const rejectMutation = useMutation({
//     mutationFn: (id: number) => rejectOffer(id),
//     onSuccess: (data: any) => {
//       setIsRejecting(false);
//       queryClient.invalidateQueries({ queryKey: ["offer-chat"] });
//     },
//   });
  
//   if (isLoading) {
//     return <LoadingComponent />;
//   }
//   if (error) {
//     return <ErrorComponent errorMessage="Error Occured" />;
//   }

//   const handleAccept = (id: number) => {
//     setIsAcceptiong(true);
//     acceptMutation.mutate(id);
//   };

//   const handleReject = (id: number) => {
//     setIsRejecting(true);
//     rejectMutation.mutate(id);
//   };


//     return (
//       <Card className=" w-[50%] ">
//         <CardHeader className=" border-b ">
//           <CardTitle> {data?.title} </CardTitle>
//         </CardHeader>
//         <CardContent className=" p-6 ">
//           <p className="text-lg text-gray-400 font-bold">{data.price}ETB</p>
//           <p>{data.description}</p>
//           <div className=" mt-4 ">
//             {userType == "client" ? (
//               <div className=" flex gap-2 ">
//                 <Button
//                   onClick={() => handleAccept(caseId)}
//                   className="bg-[#7B3B99]"
//                 >
//                   {isAccepting && <Loader2 className=" animate-spin " />}Accept
//                 </Button>
//                 <Button
//                   variant="destructive"
//                   onClick={() => handleReject(caseId)}
//                   disabled={data.status !== "PENDING" || isRejecting}
//                 >
//                   {isRejecting && <Loader2 className="animate-spin" />}
//                   Reject
//                 </Button>
//               </div>
//             ) : (
//               ""
//             )}
//           </div>
//         </CardContent>
//       </Card>
//     );
// };
// export default OfferDisplay;





import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { acceptOffer, getCasesById, rejectOffer } from "../api/offer";
import {
  ErrorComponent,
  LoadingComponent,
} from "@/components/LoadingErrorComponents";

interface Message {
  messageType: string;
  fileType: string;
  clientId: number;
  message: string;
  lawyerId: number;
  lawyer: {
    photo: string;
  };
  client: {
    full_name: string;
  };
}

interface OfferDisplayProps {
  caseId: number;
  userType: string;
}

const OfferDisplay = ({ caseId, userType }: OfferDisplayProps) => {
  const [isAccepting, setIsAccepting] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    data: caseData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["offer-chat", caseId],
    queryFn: () => getCasesById(caseId),
  });

  const acceptMutation = useMutation({
    mutationFn: acceptOffer,
    onSuccess: (data: any) => {
      setIsAccepting(false);
      if (data?.acceptedCase) {
        router.replace(data.acceptedCase);
      }
    },
    onError: () => setIsAccepting(false),
  });

  const rejectMutation = useMutation({
    mutationFn: rejectOffer,
    onSuccess: () => {
      setIsRejecting(false);
      queryClient.invalidateQueries({ queryKey: ["offer-chat", caseId] });
    },
    onError: () => setIsRejecting(false),
  });

  const handleAccept = () => {
    setIsAccepting(true);
    acceptMutation.mutate(caseId);
  };

  const handleReject = () => {
    setIsRejecting(true);
    rejectMutation.mutate(caseId);
  };

  if (isLoading) return <LoadingComponent />;
  if (error) return <ErrorComponent errorMessage="Failed to load offer details." />;

  const isAccepted = caseData?.status === "ACCEPTED";

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-md border border-gray-200">
      <CardHeader className="border-b px-6 py-4 bg-gray-50">
        <CardTitle className="text-xl font-semibold text-gray-800">
          {caseData?.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        <div className="text-gray-700 text-lg font-medium">
          <span className="block text-sm text-gray-400">Proposed Price</span>
          {caseData.price} ETB
        </div>

        <p className="text-gray-600">{caseData.description}</p>

        {userType === "client" && (
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <Button
              onClick={handleAccept}
              disabled={isAccepted || isAccepting || isRejecting}
              className={`flex items-center gap-2 ${
                isAccepted
                  ? "bg-green-600 hover:bg-green-700 cursor-default"
                  : "bg-purple-700 hover:bg-purple-800 text-white"
              }`}
            >
              {isAccepting && !isAccepted && <Loader2 className="animate-spin h-4 w-4" />}
              {isAccepted ? "Accepted" : "Accept"}
            </Button>

            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={caseData.status !== "PENDING" || isRejecting || isAccepting}
              className="flex items-center gap-2"
            >
              {isRejecting && <Loader2 className="animate-spin h-4 w-4" />}
              Reject
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OfferDisplay;
