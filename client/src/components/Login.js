import React,{useRef} from 'react'
import {Container,Form,Button} from "react-bootstrap"
import {v4 as uuidV4} from "uuid"


export default function Login({onSubmit}) {
  const myRef=useRef()
  const mySubmit=(e)=>{
    e.preventDefault()
    console.log(myRef.current.value)
    onSubmit(myRef.current.value)
  }
  const handleId=()=>{
    onSubmit(uuidV4())
  }
  return (
    <div>
        <Container className='d-flex align-items-center' style={{height:"100vh"}}>
            <Form onSubmit={mySubmit}>
                <Form.Group className='mb-2'>
                    <Form.Label  for="1"  > Id</Form.Label>
                    <Form.Control id="1" type='text' ref={myRef} required />
                </Form.Group>
                <Button type="submit" className='me-2'> login</Button>
                <Button variant='secondary' onClick={handleId}> Create New Id</Button>
            </Form>
        </Container>

      
    </div>
  )
}
