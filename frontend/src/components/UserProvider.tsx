import { createContext, useContext, useState, useEffect } from "react";
import { UserContextInterface } from "../interfaces/UserContextInterface";

const UserContext = createContext<UserContextInterface>({});

interface Props {
  children: React.ReactElement
}

export const UserProvider = ({ children }: Props) => {
  const [username, setUsername] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [profileIndex, setProfileIndex] = useState<number>(0);

  useEffect(()=>{
    if(sessionStorage.getItem('username') !== null){
      setUsername(sessionStorage.getItem('username')!);
    }
    if(sessionStorage.getItem('room') !== null){
      setRoom(sessionStorage.getItem('room')!);
    }
    if(sessionStorage.getItem('profileIndex') !== null){
      setProfileIndex(Number(sessionStorage.getItem('profileIndex')!));
    }
  },[])
  function changeRoom(newRoom:string) {
    setRoom(newRoom);
    sessionStorage.setItem('room', newRoom)
  }


  return (
    <UserContext.Provider value={{username, room, changeRoom, profileIndex}}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext);