import { Fragment, useEffect, useState } from "react"
import { Button, Modal, Box, Grid, IconButton } from "@mui/material";
import { useUser } from "../UserProvider"
import { useNavigate } from "react-router-dom";
import { avatars_url } from "../../data/Avatar";
import ReactSwitch from "react-switch";

import { LIGHTCOLOR, DARKCOLOR } from "../../utils/theme";
import "./Login.css";

export function Login() {
  const [username, setUsername ] = useState("");
  const [userProfilePic, setUserProfilePic ] = useState<number>(0);
  const [errorName, setErrorName] = useState(false);
  const [theme, setTheme] = useState("darktheme");
  const navigate = useNavigate();
  const handleNext = () => {
      if(username===""){
          setErrorName(true)
          return;
      }
      setErrorName(false)
      console.log(username,userProfilePic)
      sessionStorage.setItem('username', username)
      sessionStorage.setItem('avatarIndex', String(userProfilePic))
      navigate("/chat");
  }
  const handleChooseProfile = (profileNumber : number) => {
      setUserProfilePic(profileNumber);
  }
  const toggleTheme = () => {
    sessionStorage.setItem('theme', theme.toString()  === "lighttheme" ? "darktheme" : "lighttheme")
    setTheme(theme.toString()  === "lighttheme" ? "darktheme" : "lighttheme");
  };
  useEffect(()=>{
    sessionStorage.setItem('theme', "darktheme")
  },[])
  const getTheme = () => {
      if(theme==="lighttheme")return LIGHTCOLOR
      return DARKCOLOR
  }
  getTheme().primary
  return (
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",width:"100vw",height:"100vh",gap:"20px",backgroundColor:getTheme().primary}}>
        <div style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",width:"100vw",gap:"20px",color:getTheme().text}}>
            <h3>Dark Theme</h3>
            <ReactSwitch onChange={toggleTheme} checked={theme === "darktheme"} />
        </div>
        <div style={{display:"flex",flexDirection:"row",gap:"10px",justifyContent:"center",alignItems:"center"}}>
        {[0,1,2,3].map((i) => 
            <div key={i} onClick={()=>{handleChooseProfile(i)}}>
                {String(i)===String(userProfilePic)?
                    <img className="login-profile-selected" src={avatars_url[i]}/>:
                    <img className="login-profile" src={avatars_url[i]}/>
                }
            </div>)
        }
        </div>
        <div style={{marginTop:'20px',display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",width:"100vw",gap:"20px",color:getTheme().text}}>
            {/* <h3>Enter your name</h3> */}
            <form style={{}} className="login-form">
                <input
                    type="text"
                    id="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{width:"200px",height:"25px",color:getTheme().text,background:getTheme().secondary}}
                />
                <Button style={{height:"30px"}} variant="contained" onClick={handleNext}>Join</Button>
                {errorName?<label>Name required</label>:<Fragment/>}
            </form>
        </div>
    </div>
  );
}