import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useContact } from '../context/ContactProvider'

export default function Contacts() {
  const { contacts } = useContact()

  return (
    <div>
      <ListGroup variant='flush' >
        {contacts&&contacts.map(content => (
          <ListGroup.Item className='border-top border-bottom' key={content.id}>{content.name}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}
