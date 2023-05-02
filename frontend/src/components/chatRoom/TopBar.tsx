import { useUser } from "../UserProvider"
import { avatars_url } from "../../data/Avatar";
import { LIGHTCOLOR, DARKCOLOR } from "../../utils/theme";

let theme = sessionStorage.getItem('theme');
const getTheme = () => {
  theme = sessionStorage.getItem('theme');
  if(theme)sessionStorage.setItem('theme',theme)
  if(theme?.toString()==="lighttheme")return LIGHTCOLOR
  return DARKCOLOR
}

export function TopBar(){
  const { username, avatarIndex } = useUser();
  return (
    <div style={{ 
      display: "flex", justifyContent: "center", alignItems: "center",
      minWidth: "15rem", minHeight: "10rem", backgroundColor: getTheme().primary, padding: "0.5rem" 
    }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <img src={avatars_url[avatarIndex || 0]} alt="avatar" className="w-[80px] h-[80px] rounded-full mb-2" />
        <span style={{ fontSize: "16px", fontWeight: "bold", textAlign: "center", color: getTheme().text }}>{username}</span>
      </div>
    </div>
  );
}
