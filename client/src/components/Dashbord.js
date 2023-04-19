import React from 'react'
import Sidebar from './Sidebar'
import { useConversation } from '../context/ConversationProvider'
import OpenConversation from './OpenConversation'

export default function Dashbord({id}) {
  const {selectedConversation}=useConversation()
  return (
    <div style={{height:"100vh"}} className="d-flex">
      <Sidebar id={id}/>
      {selectedConversation && <OpenConversation id={id}/>}
    </div>
  )
}
