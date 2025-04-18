import { useSession } from "next-auth/react";
import React, { useRef, useState } from "react";


interface Props {
    recipient_id: number;
  }
  
  interface OfferProps {
    caseId: string;
    title: string;
    describtion: string;
    price: number;
  }

const ChatForm:React.FC<Props> = ({recipient_id}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  //@ts-ignore
  const userType = session?.user?.image?.type;


  return (
    <form action="">
      <div>
        <div>
          
        </div>
      </div>
    </form>
  )
}

export default ChatForm