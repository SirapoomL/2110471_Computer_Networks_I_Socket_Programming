import { avatars_url } from "../../../data/Avatar";
import { useSocket } from "../../SocketProvider"
import { UserInterface } from "../../../interfaces/UserInterface";
import { useUser } from "../../UserProvider";
import { styled } from "@mui/material/styles";
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { LIGHTCOLOR, DARKCOLOR } from "../../../utils/theme";

let theme = sessionStorage.getItem('theme');
const getTheme = () => {
  let theme = sessionStorage.getItem('theme');
  console.log(theme)
      if(theme?.toString()==="lighttheme")return LIGHTCOLOR
      return DARKCOLOR
}

export function UserListContainer() {
  const { users, checkDm, socket } = useSocket();
  const { room } = useUser();
  const handleClick = (user: UserInterface) => {
    if(checkDm && user.id && user.id !== socket?.id && user.id !== room){
      checkDm(user.id);
    }
  }
  return (
    <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"center",backgroundColor:getTheme().primary}}>
      <div style={{color:getTheme().text,marginTop:"2rem"}}>
        <h2>{users?.length} User(s) Online</h2>
      </div>
      <List sx={{width:"100%"}} >
        {users?.map((user, idx) => (
          <ListItem key={idx} button onClick={() => handleClick(user)} disablePadding sx={{width:"100%",marginTop:"1px", '&:hover': {background:getTheme().lighter} }}>
            <ListItemAvatar sx={{marginLeft:"20%",marginRight:"5%",marginBottom:"10px",paddingTop:1.5}}>
              <Avatar alt="profile" src={avatars_url[user.avatar ?? 0]} sx={{ width: 40, height: 40 }} />
            </ListItemAvatar>
            <ListItemText primary={user.name} primaryTypographyProps={{ sx: { paddingRight:"3%",color:getTheme().text, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" } }} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}