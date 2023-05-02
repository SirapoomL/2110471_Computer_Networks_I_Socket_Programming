import { Fragment, useEffect, useState } from "react";
import { List, ListItem, ListItemText, TextField, Button, Modal } from "@mui/material";
import { SocketProvider,useSocket } from "../components/SocketProvider";
import { UserProvider } from "../components/UserProvider";
import { useUser } from "../components/UserProvider";
import { TopBar } from "../components/chatRoom/TopBar";
import { RoomListContainer } from "../components/chatRoom/roomList/RoomListContainer";
import { ChatRoomContainer } from "../components/chatRoom/chatRoom/ChatRoomContainer";
import { UserListContainer } from "../components/chatRoom/userList/UserListContainer";
import ChatInput from "../components/chatRoom/chatRoom/ChatInput";
import { ChatNoti } from "../components/chatRoom/chatRoom/ChatNoti";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Message from "./Message";

import "./component.css"
import { LIGHTCOLOR, DARKCOLOR } from "./theme";

export default function ChatPage() {
    const { room } = useUser();
    const { isDmRoom, users, notiDm } = useSocket();
    const { joinRoom } = useSocket();
    const { chatRooms } = useSocket(); 
    const { createRoom } = useSocket();
    const { messages } = useSocket();
    const [showNoti, setShowNoti] = useState<boolean>(false);
    const [searchRoomInput, setSearchRoomInput] = useState<string>("");
    const [ roomNameInput, setRoomNameInput] = useState<string>(""); 

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
    
    const filteredChatRooms = chatRooms?.filter((chatRoom)=>{
        return chatRoom.roomName.startsWith(searchRoomInput);
    })
    return (
        <UserProvider>
        <SocketProvider>
        <div>
            <div style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",width:"100vw",height:"100vh",gap:"20px"}}>
                {/* Select Chat Room */}
                <div style={{display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"center",width:"30vw",height:"100vh",backgroundColor:getTheme().primary}}>
                    <div style={{ display:"flex", flexDirection:"column", height:"100%", maxWidth:"15vw", minWidth:"200px", flex:"1 1 auto", overflowY:"auto", backgroundColor:"#1A202C"}}>
                        <hr className="w-2/4 mx-auto border-slate-500"/>
                        <div style={{ flexGrow:1, display:"flex", flexDirection:"column", overflow:"auto", width:"100%"}}>
                        {filteredChatRooms && filteredChatRooms.map((chatRoom,index)=>
                            <div key={index}>
                                <button 
                                className="hover:bg-slate-700 hover:cursor-pointer rounded-lg"
                                style={{display:"inline-block", width:"calc(100% - 1rem)", padding:"0.5rem", margin:"0.2rem 0.5rem", alignItems:"center", fontSize:"1.2rem", fontWeight:"bold", color:"white" }}
                                onClick={()=>{if(joinRoom){joinRoom(chatRoom.roomName)}}}
                                >
                                {chatRoom.roomName}
                                </button>
                            </div>
                        )}
                        </div>
                        <div style={{height:"3rem", width:"100%", display:"flex", flexDirection:"row", padding:"2rem 0.5rem", alignItems:"center", marginBottom:"auto"}}>
                            <input type="text" id="new-room-name" value={roomNameInput} onChange={e=>{setRoomNameInput(e.target.value)}} placeholder="Add new room . . ." style={{ width:"0", flex:"1 1 auto", borderRadius:"6px", marginRight:"0.5rem", padding:"0.4rem 1rem"}}/>
                            <button className="rounded-full bg-slate-700 text-slate-900 w-10 h-10 hover:rounded-lg hover:bg-slate-950 hover:text-slate-400" onClick={()=>{
                                if(roomNameInput==="")return;if(!createRoom)return;createRoom(roomNameInput);setRoomNameInput("");}}>
                            <FontAwesomeIcon icon={faPlus} size="xl" style={{flex:"0 1 auto"}} />
                            </button>
                        </div>
                    </div>
                </div>
                {/* Chat Zone */}
                <div style={{display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"center",width:"50vw",height:"100vh",backgroundColor:getTheme().secondary}}>
                    <div id="chat-messages-container" style={{
                        minWidth:"20rem", flex:"1 1 auto", overflowY:"auto",
                        // background: "linear-gradient(90deg, #2E3440, #4C566A)"
                        backgroundColor: "#2E3440"
                        // backgroundColor: "#f9fafb"
                    }}>
                    {room !== "" ? 
                        messages?.map((msg, idx) => (<Message key={idx} msg={msg}/>))
                        : <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"100%"}}>
                            <label style={{fontSize:"22px", paddingLeft:"6px", fontWeight:"bold", color:"white"}}>Select a room to start chatting</label>
                        </div>
                    }
                    </div>
                    <ChatInput/>
                </div>
                {/* List of People */}
                <div style={{display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"center",width:"20vw",height:"100vh",backgroundColor:getTheme().primary}}>

                </div>
                    <UserListContainer/>
                <div>
                </div>
            </div>
        </div>
                </SocketProvider>
            </UserProvider>
    )
}