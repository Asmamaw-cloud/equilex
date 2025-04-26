import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { acceptOffer, getCasesById, rejectOffer } from "../api/offer";
import {
  ErrorComponent,
  LoadingComponent,
} from "@/components/LoadingErrorComponents";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface message {
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

const OfferDisplay = ({
  caseId,
  userType,
}: {
  caseId: number;
  userType: string;
}) => {
  const [isAccepting, setIsAcceptiong] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["offer-chat" + caseId],
    queryFn: () => getCasesById(caseId),
  });

  const acceptMutation = useMutation({
    mutationFn: (id: number) => acceptOffer(id),
    onSuccess: (data: any) => {
      setIsAcceptiong(false);
      router.replace(data.acceptCase);
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (id: number) => rejectOffer(id),
    onSuccess: (data: any) => {
      setIsRejecting(false);
      queryClient.invalidateQueries({ queryKey: ["offer-chat"] });
    },
  });
  
  if (isLoading) {
    return <LoadingComponent />;
  }
  if (error) {
    return <ErrorComponent errorMessage="Error Occured" />;
  }

  const handleAccept = (id: number) => {
    setIsAcceptiong(true);
    acceptMutation.mutate(id);
  };

  const handleReject = (id: number) => {
    setIsRejecting(true);
    rejectMutation.mutate(id);
  };


    return (
      <Card className=" w-[50%] ">
        <CardHeader className=" border-b ">
          <CardTitle> {data?.title} </CardTitle>
        </CardHeader>
        <CardContent className=" p-6 ">
          <p className="text-lg text-gray-400 font-bold">{data.price}ETB</p>
          <p>{data.description}</p>
          <div className=" mt-4 ">
            {userType == "client" ? (
              <div className=" flex gap-2 ">
                <Button
                  onClick={() => handleAccept(caseId)}
                  className="bg-[#7B3B99]"
                >
                  {isAccepting && <Loader2 className=" animate-spin " />}Accept
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleReject(caseId)}
                  disabled={data.status !== "PENDING" || isRejecting}
                >
                  {isRejecting && <Loader2 className="animate-spin" />}
                  Reject
                </Button>
              </div>
            ) : (
              ""
            )}
          </div>
        </CardContent>
      </Card>
    );
};
export default OfferDisplay;
