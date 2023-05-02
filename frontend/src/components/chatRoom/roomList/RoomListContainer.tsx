import { useState } from "react";
import { useSocket } from "../../SocketProvider"
import { CreateRoomContainer } from "./CreateRoomContainer";
import { RoomNameContainer } from "./RoomNameContainer";
import { LIGHTCOLOR, DARKCOLOR } from "../../../utils/theme";

const theme = sessionStorage.getItem('theme');
const getTheme = () => {
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
  <div style={{ display:"flex", flexDirection:"column", height:"100%", maxWidth:"25vw", minWidth:"200px", flex:"1 1 auto", overflowY:"auto", backgroundColor:getTheme().primary}}>
    <div style={{ flexGrow:1, display:"flex", flexDirection:"column", overflow:"auto", width:"100%"}}>
    {
      filteredChatRooms && filteredChatRooms.map((chatRoom,index)=>{
        return <div key={index}>
          <RoomNameContainer chatRoom={chatRoom}/>
        </div>
      })
    }
    </div>
    <CreateRoomContainer/>
  </div>
  </>
}