import { Socket } from "socket.io-client";
import { ChatRoomInterface } from "./ChatRoomInterface";
import { MessageInterface } from "./MessageInterface";
import { UserInterface } from "./UserInterface";

export interface SocketContextInterface {
  socket?: Socket;
  chatRooms?: ChatRoomInterface[];
  users?: UserInterface[];
  messages?: MessageInterface[];
  isDmRoom?: boolean;
  notiDm?: MessageInterface;
  createRoom?: (roomName:string)=>void;
  joinRoom?: (roomName:string)=>void;
  leaveRoom?: ()=>void;
  sendMessage?:(message:MessageInterface)=>void;
  checkDm?: (roomName:string)=>void;
}