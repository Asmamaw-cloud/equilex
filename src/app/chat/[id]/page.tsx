import { getServerAuthSession } from '@/server/auth'
import React from 'react'
import ChatComponent from '../components/chat'
import ChatForm from '../components/form'
import { redirect } from 'next/navigation'
import ChatUserList from '../components/chatUserList'
import getData from '../components/helpers'

type PageProps = {
  params: { id: string }
}

const ChatHomepage = async({ params }: PageProps) => {

    const session = await getServerAuthSession()
    // let recipientId = Number(params.id)
    const { id } = await params
    const recipientId = Number(id)
    const data = await getData(recipientId);

    if (!session) {
      redirect("/signin")
    }

  return (
    <div className=' h-screen flex flex-row relative bg-gray-200 '>
        <div className=' w-[25%] relative '>
            <ChatUserList />
        </div>
        <div className=' h-[85vh] bg-white border rounded-md flex flex-col w-[73%] relative mt-3 '>
            {/* <ChatComponent data= {data as any} /> */}
            <ChatForm recipient_id = {recipientId} initialMessages={data as any} />
        </div>
    </div>
  )
}

export default ChatHomepage