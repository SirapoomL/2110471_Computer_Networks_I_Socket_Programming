import Message from "./Message"
import { useSocket } from "../../SocketProvider"
import { useUser } from "../../UserProvider";
import { useEffect } from "react";

import { LIGHTCOLOR, DARKCOLOR } from "../../../utils/theme";

export function ChatRoomContainer() {
  const { messages } = useSocket();
  const { room } = useUser();

  let theme = sessionStorage.getItem('theme');
  const getTheme = () => {
    let theme = sessionStorage.getItem('theme');
    if(theme==="lighttheme")return LIGHTCOLOR
    return DARKCOLOR
  }

  useEffect(()=>{
    const isEchoeBack = messages && messages.length > 0 ? messages[messages.length -1].echoeBack : false;
    let chatContainer = document.getElementById("chat-messages-container");
    if(chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;
  },[messages])

  return <>
    <div id="chat-messages-container" style={{
      minWidth:"20rem", flex:"1 1 auto", overflowY:"auto",
      backgroundColor: getTheme().lighter,
    }}>
      {
        room !== "" 
        ? messages?.map((msg, idx) => (
          <Message key={idx} msg={msg}/>
        ))
        : <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"100%", background:getTheme().lighter,color:getTheme().text}}>
            <h1 style={{fontSize:"3rem"}}>Join a room to chat!</h1>
          </div>
      }
    </div>
  </>
}