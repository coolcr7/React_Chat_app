import Login from "./Login";
import useLocalStorage from "../hooks/useLocalStorage"
import Dashbord from "./Dashbord";
import { ContactProvider } from "../context/ContactProvider";
import { ConversationProvider } from "../context/ConversationProvider";
import { SocketProvider } from "../context/SocketProvider";

function App() {
  const [id, setId] = useLocalStorage("id", "")
  const dashboard = (
    <SocketProvider id={id}>
    <ContactProvider id={id}>
    <ConversationProvider id={id}>
      <Dashbord id={id} />
    </ConversationProvider>
    </ContactProvider>
    </SocketProvider>
  )
  return (
    <>
      <div className="App">
        {id ? dashboard : <Login onSubmit={setId} />}
      </div>
    </>
  );
}

export default App;
