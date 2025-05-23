"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const ChatUserList = () => {
  const router = useRouter();

  const { data: chat, isLoading } = useQuery({
    queryKey: ["chat-list"],
    queryFn: async () => {
      const res = await axios.get("/api/chat/get-chat-list");
      return res.data.chatList;
    },
  });
  const chatList = chat ? chat : [];

  return (
    <div className="flex flex-col bg-white shadow-md items-start m-3 h-[85vh] overflow-scroll rounded-md">
      {chatList.map((chat: any, index: number) => (
        <div
          className="flex p-3 border-b w-full gap-3 cursor-pointer"
          key={index}
          onClick={() => {
            router.push(`/chat/${chat.otherUser.id}`);
          }}
        >
          <Image
            src={chat.otherUser.photo || "/fallback.png"}
            width={80}
            height={80}
            className="w-16 h-16 rounded-full object-cover shadow-md"
            alt="chat-picture"
          />
          <div className="flex flex-col items-start">
            <div className="text-lg font-semibold">
              {chat.otherUser.full_name || "Unknown User"}
            </div>
            <div className="text-gray-500 text-sm">{chat.message}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatUserList;
