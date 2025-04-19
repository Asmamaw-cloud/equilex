"use client";

import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import FileDownloader from "./fileDownloader";
import Image from "next/image";
import OfferDisplay from "@/app/lawyer/offer/offerDisplay";
interface iAppProps {
  data: {
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
  }[];
}

const ChatComponent = ({ data }: iAppProps) => {
  const [totalComments, setTotalComments] = useState(data);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();

  const userEmail = session?.user.email;
  const userType = session?.user.image?.type;

  return (
    <div className=" p-6 flex-grow h-[80vh] overflow-y-auto py-24 ">
      <div className=" flex flex-col gap-4 ">
        {totalComments?.map(
          (message, index) =>
            message.message && (
              <div key={index}>
                {
                  //@ts-ignore
                  message.sender_email == userEmail ? (
                    <div className=" flex items-center justify-end ">
                      {message.messageType === "text" ? (
                        <div className=" ml-3 rounded-lg bg-white p-4 shadow-md self-start mr-4 ">
                          {message.message}
                        </div>
                      ) : message.messageType === "offer" ? (
                        <OfferDisplay
                          caseId={Number(message.message)}
                          userType={userType}
                        />
                      ) : (
                        <div className=" flex flex-col ">
                          <DocViewer
                            documents={[{ uri: message.message }]}
                            pluginRenderers={DocViewerRenderers}
                            style={{ width: "300px", height: "200px" }}
                            config={{ header: { disableHeader: true } }}
                          />
                          {<FileDownloader fileUrl={message.message} />}
                        </div>
                      )}
                      {userType === "lawyer" ? (
                        <Image
                          src={message.lawyer?.photo}
                          alt="Profile image of user"
                          className=" w-12 h-12 object-cover rounded-lg "
                          width={50}
                          height={50}
                        />
                      ) : (
                        <div className="flex p-1 bg-[#7B3B99] cursor-pointer items-center justify-center h-[40px] w-[40px] rounded-full ">
                          <span className="text-xl text-white font-semibold capitalize ">
                            {message.client?.full_name?.slice(0, 1)}
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className=" flex items-center ">
                      {userType === "lawyer" ? (
                        <Image
                          src={message?.lawyer.photo}
                          alt="Profile image of user"
                          className="w-12 h-12 object-cover rounded-lg "
                          width={50}
                          height={50}
                        />
                      ) : (
                        <div className="mr-3 flex p-1 bg-[#7B3B99] cursor-pointer items-center justify-center h-[40px] w-[40px] rounded-full ">
                          <span className="text-xl text-white font-semibold capitalize ">
                            {message.client?.full_name?.slice(0, 1)}
                          </span>
                        </div>
                      )}
                      {message.messageType == "text" ? (
                        <div className="rounded-lg bg-white p-4 shadow-md self-start mr-4">
                          {message.message}
                        </div>
                      ) : message.messageType === "offer" ? (
                        //@ts-ignore
                        <OfferDisplay
                          caseId={Number(message.message)}
                          userType={userType}
                        />
                      ) : (
                        <div className="flex flex-col">
                          <DocViewer
                            documents={[{ uri: message.message }]}
                            pluginRenderers={DocViewerRenderers}
                            style={{ width: "300px", height: "200px" }}
                            config={{ header: { disableHeader: true } }}
                            className=" rounded-md "
                          />
                          {<FileDownloader fileUrl={message.message} />}
                        </div>
                      )}
                    </div>
                  )
                }
              </div>
            )
        )}
        <div ref={messageEndRef}></div>
      </div>
    </div>
  );
};

export default ChatComponent;
