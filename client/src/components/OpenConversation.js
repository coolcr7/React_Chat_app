import React, { useRef, useState ,useCallback} from 'react'
import { useConversation } from '../context/ConversationProvider'
import { Form,Button,InputGroup } from 'react-bootstrap'

export default function OpenConversation({id}) {
    const {selectedConversation,createNewConversation}=useConversation()
    const [text,setText]=useState("")
    
    const handleClick=(e)=>{
     e.preventDefault()
     createNewConversation(selectedConversation.recipients,text)
     console.log(selectedConversation.recipients,text)
     setText("")
    }
    const handleChange=(e)=>{
        setText(e.target.value)
    }
    const refFUnct=useCallback((node)=>{
        if(node){
            node.scrollIntoView({smooth:true})
        }
    },[])




  return (
    <div className='border flex-grow-1 d-flex flex-column'>
        <div className='flex-grow-1 overflow-auto'>
      <div className='d-flex flex-column align-items-start flex-grow-1 justify-content-end'>
         {selectedConversation.message.map((r,index)=>{
            const you=r.id==id
            const last=index==selectedConversation.message.lenght-1
            return(
            <div className={`d-flex flex-column m-2 ${you?'align-self-end':""}`} key={index}>
                <div className={`border rounded-2 p-2 m-1 ${you?"bg-primary ":""}`}>

                {r.message}
                </div>
                <div className='small text-muted align-self-end' ref={refFUnct}>
                    {you?"you":(r.name&& r.name) || r.id}                
                </div>
            </div>
            )
         })}
      </div>
      </div>
      <div>
        <Form onSubmit={(e)=>(handleClick(e))}>
       <InputGroup className="mb-3">
        <Form.Control
          required
          value={text}
          onChange={(e)=>(handleChange(e))}
          as="textarea"
          placeholder="type message "
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <Button type="submit" variant="primary" id="button-addon2">
          Send
        </Button>
      </InputGroup>
      </Form>
      </div>
    </div>
  )
}
