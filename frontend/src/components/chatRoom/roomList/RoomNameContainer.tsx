import { ChatRoomInterface } from "../../../interfaces/ChatRoomInterface";
import { useSocket } from "../../SocketProvider";
import { LIGHTCOLOR, DARKCOLOR } from "../../../utils/theme";

const theme = sessionStorage.getItem('theme');
const getTheme = () => {
      if(theme==="lighttheme")return LIGHTCOLOR
      return DARKCOLOR
}

export function RoomNameContainer({chatRoom}:{chatRoom:ChatRoomInterface}) {
  const { joinRoom } = useSocket();
  const onClick = ()=>{
    if(!joinRoom)return;
    joinRoom(chatRoom.roomName)
  }
  return <>
    <button 
      className="hover:cursor-pointer rounded-lg"
      style={
        {
          display:"inline-block", 
          width:"calc(100% - 1rem)", 
          padding:"0.5rem", 
          margin:"0.2rem 0.5rem", 
          alignItems:"center", 
          textAlign:"left", 
          fontSize:"1.2rem", 
          fontWeight:"bold", 
          color: getTheme().text,
          backgroundColor: getTheme().lighter,
        }
      }
      onClick={onClick}
      >
      {chatRoom.roomName}
    </button>
  </>
}