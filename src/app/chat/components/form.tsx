import React from "react";


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
  return (
    <div>ChatForm</div>
  )
}

export default ChatForm