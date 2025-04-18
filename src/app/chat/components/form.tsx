import { useSession } from "next-auth/react";
import React, { useRef, useState } from "react";
import { FileUploader } from "@/components/file-uploader";
import { postData } from "./action";
import { Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";


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

  const HandleFileSend = (url: string, fileType: string) => {
    if (fileType === "image/png") {
      console.log("file type");
      fileType = "png";
    }
    if (fileType == "application/pdf") {
      fileType = "pdf";
    }

    const fileData = {
      recipient_id: recipient_id,
      message: url,
      fileType: fileType,
      messageType: "file",
    };
    //@ts-ignore
    postData(undefined, fileData);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <form action="">
      <div className="flex flex-row items-center ">
        <div className=" cursor-pointer">
          {
            open ? (
              <FileUploader
              
              onUploadComplete={(urls) => {
                console.log(res[0].url, res[0].type);
                HandleFileSend(res[0].url, res[0].type);
                setOpen(!open);
              }}
              maxFiles={5}
              maxSize={4}
              fileTypes={["image", "pdf"]}
              />
            ) : (
              <Paperclip onClick={() => setOpen(!open)} />
            )
          }
        </div>
        <input
          type="text"
          name="message"
          placeholder="Type your message..."
          className="flex-grow py-2 px-4 outline-none"
        />
        <div className="flex items-center ">
          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-full mr-2"
          >
            Send
          </button>
          {userType === "lawyer" ? (
            <Button
              onClick={handleOpenModal}
              className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-full"
            >
              Create Offer
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
    </form>
  )
}

export default ChatForm