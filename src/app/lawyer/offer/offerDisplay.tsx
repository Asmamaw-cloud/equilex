import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getCaseById } from "../api/offer";
import { ErrorComponent, LoadingComponent } from "@/components/LoadingErrorComponents";
import { Button } from "@/components/ui/button";

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
  const { data, isLoading, error } = useQuery({
    queryKey: ["offer-chat" + caseId],
    queryFn: () => getCaseById(caseId),
  });

  if (isLoading) {
    return <LoadingComponent/>
  }
  if (error) {
    return <ErrorComponent errorMessage="Error Occured"/>
  }

  return (
    <Card className=" w-[50%] ">
      <CardHeader className=" border-b ">
        <CardTitle> { data?.title } </CardTitle>
      </CardHeader>
      <CardContent className=" p-6 ">
        <p className="text-lg text-gray-400 font-bold">{data.price}ETB</p>
        <p>{data.description}</p>
        <div>{
        userType == "client" ? (
            <div>
                <Button>

                </Button>
                <Button>

                </Button>
            </div>
        ) : (
            ""
        )
        }</div>
      </CardContent>
    </Card>
  );
};

export default OfferDisplay;
