import { authOptions } from '@/server/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'
import ChatUserList from './components/chatUserList'

const ChatHomepage = async() => {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect("/signin")
    }
  return (
    <div className=' h-screen flex flex-row relative '>
        <div className=' w-[25%] relative bg-gray-200 '>
            <ChatUserList />
        </div>
        <div className=' h-screen bg-gray-200 flex justify-center w-[75%] relative items-center '>
            <h1 className=' font-bold text-3xl text-slate-500 '>
                Select user to chat with
            </h1>
        </div>
    </div>
  )
}

export default ChatHomepage