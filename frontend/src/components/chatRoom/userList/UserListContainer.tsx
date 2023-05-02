import { Fragment, useEffect, useState } from "react";
import { useSocket } from "../../SocketProvider"
import { UserInterface } from "../../../interfaces/UserInterface";
import { useUser } from "../../UserProvider";
import { styled } from "@mui/material/styles";
import { Avatar, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";

import "../../../pages/component.css"
import { LIGHTCOLOR, DARKCOLOR } from "../../../pages/theme";

const UserListContainerWrapper = styled('div')(({ theme }) => ({
  height: "100%",
  minWidth: "17vw",
  maxWidth: "20vw",
  padding: "14px 9px",
  backgroundColor: "#F3F4F6",
  flex: "1 1 auto",
  overflowY: "auto",
  borderTopLeftRadius: "20px",
  borderTopRightRadius: "20px",
}));

export function UserListContainer() {
  const { users, checkDm, socket } = useSocket();
  const { room } = useUser();
  const handleClick = (user: UserInterface) => {
    if(checkDm && user.id && user.id !== socket?.id && user.id !== room){
      checkDm(user.id);
    }
  }

  const [theme, setTheme] = useState("lighttheme");
  const toggleTheme = () => {
      setTheme((curr) => (curr === "lighttheme" ? "darktheme" : "lighttheme"));
  };
  const getTheme = () => {
      if(theme==="lighttheme")return LIGHTCOLOR
      return DARKCOLOR
  }

  return (
    <UserListContainerWrapper style={{display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"center",background:getTheme().primary}}>
      <div style={{color:getTheme().text}}>
        <h2>{users?.length} User(s) Online</h2>
      </div>
      <List sx={{width:"100%"}} >
        {users?.map((user, idx) => (
          <ListItem key={idx} button onClick={() => handleClick(user)} disablePadding sx={{width:"100%",marginTop:"1px", '&:hover': {background:getTheme().lighter} }}>
            <ListItemAvatar sx={{marginLeft:"20%",marginRight:"5%",marginBottom:"10px",paddingTop:1.5}}>
              <Avatar alt="profile" src={"/profile"+user.profile} sx={{ width: 40, height: 40 }} />
            </ListItemAvatar>
            <ListItemText primary={user.name} primaryTypographyProps={{ sx: { paddingRight:"3%",color:getTheme().text, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" } }} />
          </ListItem>
        ))}
      </List>
    </UserListContainerWrapper>
  );
}