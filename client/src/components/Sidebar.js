import React, { useState ,useCallback} from 'react'
import { Tab, Nav, Button, Modal } from 'react-bootstrap'
import Conversations from './Conversations'
import Contacts from "./Contacts"
import NewContacts from './NewContacts'
import NewConversations from './NewConversations'

export default function Sidebar({ id }) {
    const conversation = "converse"
    const contacts = "contacts"
    const [activeState, setActiveState] = useState(conversation)
    const [modalShow,setModalShow]=useState(false)
    const conversationBool=activeState==conversation

    const handleHide=()=>{
        setModalShow(false)
    }
    const handleClick=()=>{
        setModalShow(true)
    }

    return (
        <div style={{width:"300px"}} className="d-flex flex-column ">
            <Tab.Container activeKey={activeState}>
                <Nav variant="tabs"  onSelect={setActiveState}>
                    <Nav.Item>
                        <Nav.Link eventKey={conversation} >Conversation</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={contacts} >Contacts</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content className='border-end overflow-auto flex-grow-1'>
                    <Tab.Pane eventKey={conversation}>
                         <Conversations/>  
                    </Tab.Pane>
                    <Tab.Pane eventKey={contacts}>
                        <Contacts/>
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
            <div className='border-end border-top small border-2 d-flex flex-column'>
                <Button onClick={handleClick} className=''>{conversationBool?"New chat":"add contacts"}</Button>
                <span className='m-2'> Your Id -<b>{id}</b></span>
            </div>
            <Modal show={modalShow} onHide={handleHide}>
              {conversationBool?<NewConversations close={handleHide}/>:<NewContacts close={handleHide}/>}
            </Modal>

        </div>
    )
}
