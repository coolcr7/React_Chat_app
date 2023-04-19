import React,{useContext, useState} from 'react'
import useLocalStorage from "../hooks/useLocalStorage"
const ContactContext=React.createContext()

export function useContact(){
    return useContext(ContactContext)
}
export function ContactProvider({children}) {
  const [contacts,setContact]=useLocalStorage("contacts",[])
  const createContacts=(id,name)=>{
    setContact((prv)=>{
       return [...prv,{id,name}]
    })
  }
  return (
    <div>
        <ContactContext.Provider value={{contacts,createContacts}} >
            {children}
        </ContactContext.Provider>
      
    </div>
  )
}
