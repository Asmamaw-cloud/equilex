"use client";

import React, { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FileUploader } from "@/components/file-uploader";
import OfferModal from "@/app/lawyer/offer/offer";
import { postData } from "./action";

interface Props {
  recipient_id: number;
}

const ChatForm: React.FC<Props> = ({ recipient_id }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { data: session } = useSession();

  const userType = session?.user?.image?.type;

  const [isUploaderOpen, setIsUploaderOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFileSend = (url: string, fileType: string) => {
    const simplifiedType = fileType === "image/png" ? "png" : fileType === "application/pdf" ? "pdf" : fileType;

    const fileData = {
      recipient_id,
      message: url,
      fileType: simplifiedType,
      messageType: "file",
    };

    postData(undefined, fileData);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        formData.append("recipient_id", recipient_id.toString());
        formData.append("messageType", "text");

        await postData(formData);
        formRef.current?.reset();
      }}
      className="p-4 sm:p-6 absolute bottom-0 left-0 w-full bg-white border-t"
    >
      <div className="flex items-center gap-3">
        <div className="cursor-pointer">
          {isUploaderOpen ? (
            <FileUploader
              onUploadComplete={(res) => {
                handleFileSend(res[0].url, res[0].type);
                setIsUploaderOpen(false);
              }}
              maxFiles={5}
              maxSize={4}
              fileTypes={["image", "pdf"]}
            />
          ) : (
            <Paperclip onClick={() => setIsUploaderOpen(true)} className="text-gray-600 hover:text-gray-800" />
          )}
        </div>

        <input
          type="text"
          name="message"
          placeholder="Type your message..."
          className="flex-grow border rounded-full py-2 px-4 outline-none focus:ring-2 focus:ring-teal-500"
        />

        <button
          type="submit"
          className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-full"
        >
          Send
        </button>

        {userType === "lawyer" && (
          <Button
            type="button"
            onClick={handleOpenModal}
            className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-full"
          >
            Create Offer
          </Button>
        )}
      </div>

      {isModalOpen && (
        <OfferModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          client_id={recipient_id}
        />
      )}
    </form>
  );
};

export default ChatForm;
