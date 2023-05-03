import { useState } from "react";
import { useSocket } from "../../SocketProvider"
import { CreateRoomContainer } from "./CreateRoomContainer";
import { RoomNameContainer } from "./RoomNameContainer";
import { LIGHTCOLOR, DARKCOLOR } from "../../../utils/theme";

let theme = sessionStorage.getItem('theme');
const getTheme = () => {
  theme = sessionStorage.getItem('theme');
      if(theme==="lighttheme")return LIGHTCOLOR
      return DARKCOLOR
}

export function RoomListContainer() {
  const  [searchRoomInput, setSearchRoomInput ] = useState<string>("");
  const { chatRooms } = useSocket(); 

  const filteredChatRooms = chatRooms?.filter((chatRoom)=>{
    return chatRoom.roomName.startsWith(searchRoomInput);
  })

  return <>
  <div style={{display:"flex", flexDirection:"column", justifyContent:"flex-start",alignItems:"center",height:"100%", maxWidth:"25vw", minWidth:"200px", flex:"1 1 auto", overflowY:"auto", backgroundColor:getTheme().primary,paddingInline:"5px"}}>
    <div style={{color:getTheme().text,marginTop:"2rem",marginBottom:"10px"}}>
      <h1 style={{fontSize:"1.5rem",fontWeight:"bold"}}>Create room</h1>
    </div>
   <CreateRoomContainer/>
   <div style={{color:getTheme().text,marginTop:"2rem",marginBottom:"10px"}}>
      <h1 style={{fontSize:"1.5rem",fontWeight:"bold"}}>Available room(s)</h1>
    </div>
   <div style={{ flexGrow:1, display:"flex", flexDirection:"column", overflow:"auto", width:"100%"}}>
    {
      filteredChatRooms && filteredChatRooms.map((chatRoom,index)=>{
        return <div key={index}>
          <RoomNameContainer chatRoom={chatRoom}/>
        </div>
      })
    }
    </div>
    {/* <CreateRoomContainer/> */}
  </div>
  </>
}