import React, { useState } from 'react'
import { useConversation } from '../context/ConversationProvider'
import { ListGroup } from 'react-bootstrap'


export default function Conversations() {
  const {formatedConversations : conversations}=useConversation()
  // console.log(conversations)
  const {setActiveId,activeId}=useConversation()
  const handleSelect=(index)=>{
     setActiveId(index)
  }
  return (
    <div>
       <ListGroup variant='flush' >
        {conversations&&conversations.map((conversation,index) => (
          <ListGroup.Item key={index}
          className='border-top border-bottom'
          action
          onClick={()=>{return handleSelect(index)}}
          active={index==activeId}
          >
            {conversation.recipients.map(r=>(r.name)).join(", ")}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}
