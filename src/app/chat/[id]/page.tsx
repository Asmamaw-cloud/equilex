import { getServerAuthSession } from '@/server/auth'
import React from 'react'
import getData from '../components/helpers'
import ChatComponent from '../components/chat'
import ChatForm from '../components/form'
import { redirect } from 'next/navigation'
import ChatUserList from '../components/chatUserList'

const ChatHomepage = async({params} : {params: {id: string}}) => {

    const session = await getServerAuthSession()
    const recepientId = Number(params.id)
    const data = await getData(recepientId)

    console.log("data: ", data)
    if (!session) {
      redirect("/signin")
    }

  return (
    <div className=' h-screen flex flex-row relative bg-gray-200 '>
        <div className=' w-[25%] relative '>
            <ChatUserList />
        </div>
        <div className=' h-[85vh] bg-white border rounded-md flex flex-col w-[73%] relative mt-3 '>
            <ChatComponent data= {data as any} />
            <ChatForm recipient_id = {recepientId} />
        </div>
    </div>
  )
}

export default ChatHomepage