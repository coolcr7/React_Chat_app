import React, { useRef } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useContact } from '../context/ContactProvider'

export default function NewContacts({ close }) {
    const idRef=useRef()
    const nameRef=useRef()
    const {createContacts}=useContact()

    function handleSubmit(e) {
        // console.log("hi")
        e.preventDefault()
        createContacts(idRef.current.value,nameRef.current.value)
        close()
    }
    return (
        <div>
            <Modal.Header closeButton>
                New Contact
            </Modal.Header>
            <Modal.Body>
                <Form >
                    <Form.Group>
                        <Form.Label for="1" >Id</Form.Label>
                        <Form.Control ref={idRef} id="1" type='text' />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label for="2" >Name</Form.Label>
                        <Form.Control ref={nameRef} id="2" type='text' />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSubmit}> Submit</Button>
            </Modal.Footer>

        </div>
    )
}
