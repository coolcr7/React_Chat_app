import React, { useRef, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useContact } from "../context/ContactProvider"
import{useConversation} from "../context/ConversationProvider"

export default function NewConversations({ close }) {

  const [selectedContactIds, setSelectedContactIds] = useState([])
  console.log(useContact)
  const { contacts } = useContact()

  function handleChange(contactId) {
    // console.log(selectedContactIds)
    setSelectedContactIds((prv) => {
      if (prv.includes(contactId)){
        return prv.filter((oldid)=>(oldid!==contactId))
      }
      else {
        return [...prv,contactId]
      }
  })
  }
  const {createConversation}=useConversation()
  function handleSubmit(e) {
    e.preventDefault()
    createConversation(selectedContactIds)
    close()
  }
  return (
    <div>
      <Modal.Header closeButton>
        New Contact
      </Modal.Header>
      <Modal.Body>
        <Form >
          {contacts && contacts.map(contact => {
            return (
              <Form.Group controlId={contact.id} key={contact.id}>
                <Form.Check
                  type="checkbox"
                  label={contact.name}
                  value={selectedContactIds.includes(contact.id)}
                  onChange={() => { handleChange(contact.id) }}
                />
              </Form.Group>
            )
          })}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit}> Submit</Button>
      </Modal.Footer>
    </div>
  )
}
