"use client";

import type React from "react";
import { useRef, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FileUploader } from "@/components/file-uploader";
import OfferModal from "@/app/lawyer/offer/offer";
import { postData } from "@/app/chat/action/message-action";
import { pusherClient } from "@/lib/pusher";
import ChatComponent from "./chat";

interface Props {
  recipient_id: string;
}

interface Message {
  messageType: string;
  fileType?: string;
  clientId?: number;
  message: string;
  lawyerId?: number;
  sender_email?: string;
  recipientId?: number;
  lawyer?: {
    photo: string;
  };
  client?: {
    full_name: string;
  };
}

const ChatForm: React.FC<Props> = ({ recipient_id }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { data: session } = useSession();
  const [inputMessage, setInputMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userType = session?.user?.image?.type;
  const userEmail = session?.user?.email;

  // Subscribe to Pusher channel for real-time messages
  useEffect(() => {
    pusherClient.subscribe("private-chat");

    const handleMessage = (newMessage: Message) => {
      setMessages((prev) => {
        // Simple check to avoid duplicates
        const isDuplicate = prev.some(
          (msg) =>
            msg.message === newMessage.message &&
            msg.messageType === newMessage.messageType &&
            msg.sender_email === newMessage.sender_email
        );

        if (isDuplicate) return prev;
        return [...prev, newMessage];
      });
    };

    pusherClient.bind("chat-message", handleMessage);

    // Cleanup on unmount
    return () => {
      pusherClient.unbind("chat-message", handleMessage);
      pusherClient.unsubscribe("private-chat");
    };
  }, []);

  const handleFileSend = (url: string, fileType: string) => {
    const simplifiedType =
      fileType === "image/png"
        ? "png"
        : fileType === "application/pdf"
        ? "pdf"
        : fileType;

    // Add file message to local state for immediate display
    const newMessage: Message = {
      message: url,
      messageType: "file",
      fileType: simplifiedType,
      sender_email: userEmail!,
    };

    // Add to local state for immediate display
    setMessages((prev) => [...prev, newMessage]);

    const fileData = {
      recipient_id,
      message: url,
      fileType: simplifiedType,
      messageType: "file",
    };

    postData(undefined, fileData);
    setIsUploaderOpen(false);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputMessage.trim()) return;

    // Add text message to local state for immediate display
    const newMessage: Message = {
      message: inputMessage,
      messageType: "text",
      sender_email: userEmail!,
    };
    console.log("newMessage", newMessage);

    // Add to local state for immediate display
    setMessages((prev) => [...prev, newMessage]);

    // Create form data
    const formData = new FormData();
    console.log("formData", formData);
    formData.append("message", inputMessage);
    formData.append("recipient_id", recipient_id.toString());
    formData.append("messageType", "text");

    console.log("FormData length", [...formData.entries()].length);


    // Reset input
    setInputMessage("");

    // Send message
    await postData(formData);
  };
  console.log("messages: ", messages);

  return (
    <>
      <ChatComponent data={messages} />
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="p-4 sm:p-6 absolute bottom-0 left-0 w-full bg-white border-t"
      >
        <div className="flex items-center gap-3">
          <div className="cursor-pointer">
            {isUploaderOpen ? (
              <FileUploader
                onUploadComplete={(res) => {
                  handleFileSend(res[0].url, res[0].type);
                }}
                maxFiles={5}
                maxSize={4}
                fileTypes={["image", "pdf"]}
              />
            ) : (
              <Paperclip
                onClick={() => setIsUploaderOpen(true)}
                className="text-gray-600 hover:text-gray-800"
              />
            )}
          </div>

          <input
            type="text"
            name="message"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
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
    </>
  );
};

export default ChatForm;
