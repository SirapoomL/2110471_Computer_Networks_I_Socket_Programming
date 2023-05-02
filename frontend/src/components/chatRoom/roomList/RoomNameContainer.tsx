import { ChatRoomInterface } from "../../../interfaces/ChatRoomInterface";
import { useSocket } from "../../SocketProvider";

export function RoomNameContainer({chatRoom}:{chatRoom:ChatRoomInterface}) {
  const { joinRoom } = useSocket();
  const onClick = ()=>{
    if(!joinRoom)return;
    joinRoom(chatRoom.roomName)
  }
  return <>
    <button 
      className="hover:bg-slate-700 hover:cursor-pointer rounded-lg"
      style={{display:"inline-block", width:"calc(100% - 1rem)", padding:"0.5rem", margin:"0.2rem 0.5rem", alignItems:"center", fontSize:"1.2rem", fontWeight:"bold", color:"white" }}
      onClick={onClick}
      >
      {chatRoom.roomName}
    </button>
  </>
}