import { useUser } from "../UserProvider"
import { RoomListContainer } from "../chatRoom/roomList/RoomListContainer";
import { ChatRoomContainer } from "../chatRoom/chatRoom/ChatRoomContainer";
import { UserListContainer } from "../chatRoom/userList/UserListContainer";
import ChatInput from "../chatRoom/chatRoom/ChatInput";
import { useSocket } from "../SocketProvider";
import { ChatNoti } from "../chatRoom/chatRoom/ChatNoti";
import { useEffect, useState } from "react";

// import "./component.css"
import { LIGHTCOLOR, DARKCOLOR } from "../../utils/theme";

export function ChatRoom() {
  const { room } = useUser();
  const { isDmRoom, users, notiDm } = useSocket();
  const [showNoti, setShowNoti] = useState<boolean>(false);

  // theme
  const [theme, setTheme] = useState("lighttheme");
  const toggleTheme = () => {
    setTheme((curr) => (curr === "lighttheme" ? "darktheme" : "lighttheme"));
  };
  const getTheme = () => {
    if(theme==="lighttheme")return LIGHTCOLOR
    return DARKCOLOR
  }

  useEffect(()=>{
    if(notiDm) setShowNoti(true);
    setTimeout(()=>{
      setShowNoti(false);
    }, 4000)
  },[notiDm])

  return <>
    {/* <div style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",width:"100vw",height:"100vh",gap:"20px"}}>
    </div> */}


    { /* OLD CODE */ }
    <div style={{backgroundColor:getTheme().primary,display:"flex", flexDirection:"column", width:"100vw",height:"100vh", position:"relative"}}>
      {/* <TopBar/> */}
      <div style={{display:"flex", flexDirection:"row", height:"100vh",backgroundColor:getTheme().primary}}>
        <RoomListContainer/>
        <div style={{display:"flex", flexDirection:"column", flexGrow:1,backgroundColor:getTheme().primary}}>
          <div style={{display:"flex", alignItems:"center", fontSize:"20px", color:"white", padding:"8px 16px", backgroundColor:"#1E2532"}}>
            {room !== "" && (isDmRoom 
            ? <label style={{paddingLeft:"6px"}}>{(users?.find((u) => u.id === room))?.name ?? 'disconnected'}</label>
            : <label style={{paddingLeft:"6px"}}>ROOM - {room}</label>)}
          </div>
          <hr style={{border:"1px solid #1A202C"}}/>
          <ChatRoomContainer/>
          <ChatInput/>
        </div>
        <div style={{
          display: "flex", flexDirection: "column", height: "100vh", backgroundColor: "#1A202C", 
          borderLeft: "10px solid #1A202C", borderRight: "10px solid #1A202C"
        }}>
          <UserListContainer/>
        </div>
      </div>
    </div>
    {notiDm && <ChatNoti message={notiDm} show={showNoti}/>}
  </>
}