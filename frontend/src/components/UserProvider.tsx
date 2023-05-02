import { createContext, useContext, useState, useEffect } from "react";
import { UserContextInterface } from "../interfaces/UserContextInterface";

const UserContext = createContext<UserContextInterface>({});

interface Props {
  children: React.ReactElement
}

export const UserProvider = ({ children }: Props) => {
  const [username, setUsername] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [avatarIndex, setAvatarIndex] = useState<number>(0);

  useEffect(()=>{
    if(sessionStorage.getItem('username') !== null){
      setUsername(sessionStorage.getItem('username')!);
    }
    if(sessionStorage.getItem('room') !== null){
      setRoom(sessionStorage.getItem('room')!);
    }
    if(sessionStorage.getItem('avatarIndex') !== null){
      setAvatarIndex(Number(sessionStorage.getItem('avatarIndex')!));
    }
  },[])

  function changeUsername(newName:string) {
    setUsername(newName);
    sessionStorage.setItem('username', newName)
  }

  function changeRoom(newRoom:string) {
    setRoom(newRoom);
    sessionStorage.setItem('room', newRoom)
  }

  function changeAvatarIndex(newAvatarIndex:number) {
    setAvatarIndex(newAvatarIndex);
    sessionStorage.setItem('avatarIndex', String(newAvatarIndex))
  }
  

  return (
    <UserContext.Provider value={{username, changeUsername, room, changeRoom, avatarIndex, changeAvatarIndex}}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext);