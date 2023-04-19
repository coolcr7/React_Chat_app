import React, { useCallback, useContext, useState,useEffect } from 'react'
import useLocalStorage from "../hooks/useLocalStorage"
import { useContact } from "../context/ContactProvider"
import { useSocket } from '../context/SocketProvider' 
const ConversationContext = React.createContext()
console.log("conversation rendering")
export function useConversation() {
  return useContext(ConversationContext)
}

export function ConversationProvider({ children,id }) {
  console.log(useSocket())
  const socket=useSocket()

  console.log(useContact())
  const [activeId, setActiveId] = useState(0)
  const { contacts } = useContact()
  const [conversations, setConversation] = useLocalStorage("conversations", [])
  console.log(console.log(conversations))

  const selectedConversation = conversations[activeId]
  
  const createConversation = (recipients) => {
    setConversation((prv) => {
      return [...prv, { recipients, message: [] }]
    })
  }
  console.log("this is conversation",conversations)
  const formatedConversations=conversations.map((converse)=>{
    const newRecipients = converse.recipients.map((r) => {
      const contact = contacts.find(contact => {
        return contact.id === r
      })
      const name = (contact && contact.name) || r
      return { id: r, name }
    })
    return {recipients:newRecipients,message:converse.message}
  })
  
  
  
  const addMessage=useCallback(({sender,recipients,text})=>{

    console.log("inside add contact",sender,recipients,text)
    const contact = contacts.find(contact => {
      return contact.id == sender
    })
    const name = (contact && contact.name) || sender
    const idArray=recipients
    const group=conversations.find(converse=>{
      const array=converse.recipients
      return match(array,idArray)
    })
    if (group){
      console.log("inside group")
      setConversation(prv=>{
        const new1=prv.map(conversation => {
        if (match(conversation.recipients, recipients)) {
          return {
            ...conversation,
            message: [...conversation.message,{id:sender,name,message:text}]
          }
        }

        return conversation
      })
      return new1
    })
    
      console.log("group found")
    }else{
      console.log("group not found")
      setConversation([...conversations,{recipients,message:[{id:sender,name,message:text}]}])
    }
  }
  ,[])
  useEffect(()=>{
    if (!socket){
      console.log("no connection")
      return}
      console.log("made connection")
    socket.on("receive-message",addMessage)
    return ()=>{
      console.log("unmounting")
      socket.off("receive-message")
    }
  },[addMessage,socket])
  
  const match=(arr1,arr2)=>{
    arr1.sort()
    arr2.sort()
    return JSON.stringify(arr1)==JSON.stringify(arr2)
  }
  const createNewConversation=(recipients,text)=>{
    if (socket){
      console.log("sending message")
      socket.emit("send-message",{recipients,text})}
    addMessage({sender:id,recipients,text})
    console.log("inside createmessage",id,recipients,text)
  }
  const pass_value = {
    conversations,
    createConversation,
    setActiveId,
    activeId,
    selectedConversation,
    createNewConversation,
    formatedConversations

  }

  return (
    <div>
      <ConversationContext.Provider value={pass_value} >
        {children}
      </ConversationContext.Provider>

    </div>
  )
}
