import { useEffect, useState } from "react";
import { useSocket } from "../../SocketProvider";
import { LIGHTCOLOR, DARKCOLOR } from "../../../utils/theme";


export function CreateRoomContainer() {
  const [ roomNameInput, setRoomNameInput ] = useState<string>(""); 
  const { createRoom } = useSocket();
  const [dummy,setDummy] = useState("dummy");
  const onClick = ()=>{
    if(roomNameInput==="")return;
    if(!createRoom)return;
    createRoom(roomNameInput);
    setRoomNameInput("");
  }
  let theme = sessionStorage.getItem('theme');
  useEffect(()=>{
    setDummy('test')
  },[theme])
  const getTheme = () => {
    theme = sessionStorage.getItem('theme');
    console.log(theme)
        if(theme?.toString()==="lighttheme")return LIGHTCOLOR
        return DARKCOLOR
  }
  return <>
  <div style={{height:"3rem", width:"100%", display:"flex", flexDirection:"row", padding:"2rem 0.5rem", alignItems:"center", marginBottom:"auto"}}>
    <input type="text" id="new-room-name" value={roomNameInput} onChange={e=>{setRoomNameInput(e.target.value)}} placeholder="Enter room name" style={{ width:"0", flex:"1 1 auto", borderRadius:"6px", marginRight:"0.5rem", padding:"0.4rem 1rem"}}/>
    <button style={{height:"35px",background:getTheme().text,color: getTheme().primary, flex:"0 1 auto",paddingInline:"5px",borderRadius:"10px"}} onClick={onClick}>
      Create
      {/* <FontAwesomeIcon icon={faCirclePlus} size="xl" style={{color: getTheme().line, flex:"0 1 auto"}} /> */}
    </button>
  </div>
  </>
}