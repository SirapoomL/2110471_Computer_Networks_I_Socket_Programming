import { useState } from "react";
import { useSocket } from "../../SocketProvider"
import { CreateRoomContainer } from "./CreateRoomContainer";
import { RoomNameContainer } from "./RoomNameContainer";

export function RoomListContainer() {
  const  [searchRoomInput, setSearchRoomInput ] = useState<string>("");
  const { chatRooms } = useSocket(); 

  const filteredChatRooms = chatRooms?.filter((chatRoom)=>{
    return chatRoom.roomName.startsWith(searchRoomInput);
  })

  return <>
  <div style={{ display:"flex", flexDirection:"column", height:"100%", maxWidth:"15vw", minWidth:"200px", flex:"1 1 auto", overflowY:"auto", backgroundColor:"#1A202C"}}>
    <input 
      type="text" 
      id="search-room" 
      value={searchRoomInput} 
      onChange={e=>{setSearchRoomInput(e.target.value)}} 
      placeholder="Search room. . ." 
      style={{ width:"calc(100% - 1rem)", padding:"0.3rem 1rem", margin:"0.5rem", height:"2.5rem", borderRadius:"0.5rem"}}
    />
    <hr className="w-2/4 mx-auto border-slate-500"/>
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