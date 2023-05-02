import { createContext, useContext, useState, useEffect } from "react";

import { useUser } from "./UserProvider";
import { SocketContextInterface } from "../interfaces/SocketContextInterface";
import { ChatRoomInterface } from "../interfaces/ChatRoomInterface";
import { io } from "socket.io-client";
import { MessageInterface } from "../interfaces/MessageInterface";
import { UserInterface } from "../interfaces/UserInterface";
import { useNavigate } from "react-router-dom";

const SocketContext = createContext<SocketContextInterface>({});

interface Props {
  children: React.ReactElement
}

export const SocketProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const { username, avatarIndex, room, changeRoom, } = useUser();
  const [ socket, setSocket] = useState<any>(null);
  const [ chatRooms, setChatRooms] = useState<ChatRoomInterface[]>([]);
  const [ messages, setMessages] = useState<MessageInterface[]>([]);
  const [ users, setUsers] = useState<UserInterface[]>([]);
  const [ isDmRoom, setIsDmRoom] = useState<boolean>(false);
  const [ notiDm, setNotiDm] = useState<MessageInterface>();

  useEffect(()=>{
    console.log(username)
    if(!username) return;
    const serverUrl = sessionStorage.getItem('serverUrl');
    if(!serverUrl || serverUrl === ''){
      console.log(serverUrl)
      console.log('no server url')
      navigate('/');
      return;
    }
    console.log(serverUrl)
    const s = io(serverUrl, { transports: ["websocket"] });
    s.connect();
    console.log(s);
    setSocket(s);
    return ()=>{
      s.disconnect();
    }
  },[username])

  useEffect(() => {
    if(!socket)return;
    // catch ready event from server
    socket.on("ready", ({chatRooms:allChatRooms, mySocketId}:{chatRooms:ChatRoomInterface[], mySocketId:string}) => {
      setChatRooms(allChatRooms);
      socket.emit("client-set-user",{
        name:username,
        avatar:avatarIndex,
      })
      if(room && room!==""){
        if(changeRoom) changeRoom("");
        //joinRoom(room);
      }
    });

    // catch new user join server
    socket.on("server-new-user",({data}:{data:UserInterface[]})=>{
      console.log("new user join the server!")
      setUsers(data);
    })

    // catch user disconnected
    socket.on("server-user-disconnected",({data}:{data:UserInterface[]})=>{
      console.log("user disconnected!")
      setUsers(data);
      console.log(data)
    })

    // catch newly created room 
    socket.on("server-room-created", ({data}:{data:ChatRoomInterface[]})=>{
      console.log(`new room created!`)
      setChatRooms(data);
    })

    // catch duplicate chat room messageqwe
    socket.on("server-room-duplicate", ()=>{
      console.log("Can't create duplicate room!");
    })

    // catch new user that just join room
    socket.on("server-user-joined-room", ({data}:{data:ChatRoomInterface[]})=>{
      console.log("new user joins the room")
      setChatRooms(data);
    })

    // join room success
    socket.on("server-room-joined", ({roomName}:{roomName:string})=>{
      console.log(`join room ${roomName} success!`);
      if(!changeRoom)return;
      changeRoom(roomName);
      setMessages([]);
    })

    // catch user leave room
    socket.on("server-user-left-room", ({data}:{data:ChatRoomInterface[]})=>{
      console.log("user left the room")
      setChatRooms(data);
    })

    // left room success
    socket.on("server-room-left", ({roomName}:{roomName:string})=>{
      console.log(`left room ${roomName} success!`);
      if(!changeRoom)return;
      if(room == roomName) changeRoom("");
    })

    // catch new message
    socket.on("server-send-message", (message:MessageInterface)=>{
      console.log(`new message!`);
      setMessages((messages)=>[...messages, message]);
    })

    socket.on("server-echo-message", (message:MessageInterface)=>{
      console.log(`new message!`);
      setMessages((messages)=>[...messages, message]);
    })

    socket.on("server-send-dm", ({message, senderId}: {message:MessageInterface, senderId:string})=>{
      console.log(`new dm!`)
      if(room == senderId) setMessages((messages)=>[...messages, message]);
      else if(socket.id!=senderId) setNotiDm(message);
    })

    socket.on("server-echo-dm", (message:MessageInterface)=>{
      console.log(`echo dm!`);
      setMessages((messages)=>[...messages, message]);
    })


    return ()=>{
      socket.off("ready");
      socket.off("server-new-user");
      socket.off("server-user-disconnected");
      socket.off("server-room-created");
      socket.off("server-room-duplicate");
      socket.off("server-user-joined-room");
      socket.off("server-room-joined");
      socket.off("server-user-left-room");
      socket.off("server-room-left");
      socket.off("server-send-message");
      socket.off("server-echo-message");
      socket.off("server-send-dm");
      socket.off("server-echo-dm");
    }
  }, [socket,room])

//
  function createRoom(roomName:string){
    console.log(`create room ${roomName}...`)
    socket.emit("client-create-room", {
      roomName,
      user:{
        name:username,
        avatar:avatarIndex
      }
    })
  }

  function joinRoom(roomName:string){
    console.log(`join room ${roomName}...`)
    socket.emit("client-join-room", {
      roomName,
      user:{
        name:username,
        avatar:avatarIndex
      }
    })
    setIsDmRoom(false);
  }

  function checkDm(roomName:string){
    console.log(`check dm ${roomName}...`)
    if(!isDmRoom) leaveRoom();
    if(changeRoom) changeRoom(roomName);
    setIsDmRoom(true);
    setMessages([]);
  }

  function leaveRoom(){
    console.log(`leave room ${room}...`)
    socket.emit("client-leave-room", {
      roomName:room,
      user:{
        name:username,
        avatar:avatarIndex
      }
    })
    setIsDmRoom(false);
  }

  function sendMessage(message:MessageInterface){
    console.log(`send message in ${room}...`)
    if(!isDmRoom) socket.emit("client-send-message", {
      message,
      roomName:room,
    });
    else socket.emit("client-send-dm", {
      message,
      receiverId:room,
    });
  }

  return (
    <SocketContext.Provider value={{socket, chatRooms, users, messages, createRoom, joinRoom, leaveRoom, sendMessage, checkDm, isDmRoom, notiDm}}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = () => useContext(SocketContext);