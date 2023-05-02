import Message from "./Message"
import { useSocket } from "../../SocketProvider"
import { useUser } from "../../UserProvider";
import { useEffect } from "react";

export function ChatRoomContainer() {
  const { messages } = useSocket();
  const { room } = useUser();

  useEffect(()=>{
    const isEchoeBack = messages && messages.length > 0 ? messages[messages.length -1].echoeBack : false;
    let chatContainer = document.getElementById("chat-messages-container");
    if(chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;
  },[messages])

  return <>
  <div id="chat-messages-container" style={{
    minWidth:"20rem", flex:"1 1 auto", overflowY:"auto",
    // background: "linear-gradient(90deg, #2E3440, #4C566A)"
    backgroundColor: "#2E3440"
    // backgroundColor: "#f9fafb"
  }}>
    {
      room !== "" 
      ? messages?.map((msg, idx) => (
        <Message key={idx} msg={msg}/>
      ))
      : <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"100%"}}>
          <label style={{fontSize:"22px", paddingLeft:"6px", fontWeight:"bold", color:"white"}}>Select a room to start chatting</label>
        </div>
    }
  </div>
  </>
}