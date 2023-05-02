import { Fragment, useEffect, useState } from "react";
import { Button } from "@mui/material";
import ReactSwitch from "react-switch";

import "./component.css"
import { LIGHTCOLOR, DARKCOLOR } from "./theme";
import { useNavigate } from "react-router-dom";
import { UserProvider, useUser } from "../components/UserProvider";

export default function LoginPage() {
    useEffect(() => {
        sessionStorage.setItem('serverUrl', 'http://localhost:6789');
    })
    const { changeUsername, changeAvatarIndex} = useUser();
    const [username, setUsername ] = useState("");
    const [userProfilePic, setUserProfilePic ] = useState<number>(1);
    const [errorName, setErrorName] = useState(false);
    const [theme, setTheme] = useState("lighttheme");
    const navigate = useNavigate();
    const handleNext = () => {
        if(username===""){
            setErrorName(true)
            return;
        }
        setErrorName(false)
        if(!changeUsername || !changeAvatarIndex){console.log("no fn");return;}
        changeUsername(username)
        changeAvatarIndex(userProfilePic)
        navigate("/chat");
    }
    const handleChooseProfile = (profileNumber : number) => {
        setUserProfilePic(profileNumber);
    }
    const toggleTheme = () => {
      setTheme((curr) => (curr === "lighttheme" ? "darktheme" : "lighttheme"));
    };
    const getTheme = () => {
        if(theme==="lighttheme")return LIGHTCOLOR
        return DARKCOLOR
    }
    getTheme().primary
    return (
        <>
        <UserProvider>
            <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",width:"100vw",height:"100vh",gap:"20px",backgroundColor:getTheme().primary}}>
                <div style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",width:"100vw",gap:"20px",color:getTheme().text}}>
                    <h3>Dark Theme</h3>
                    <ReactSwitch onChange={toggleTheme} checked={theme === "darktheme"} />
                </div>
                <div style={{display:"flex",flexDirection:"row",gap:"10px",justifyContent:"center",alignItems:"center"}}>
                {[1,2,3,4].map((number) => 
                    <div key={number} onClick={()=>{handleChooseProfile(number)}}>
                        {String(number)===String(userProfilePic)?
                            <img className="login-profile-selected" src={`./profile${number}.png`}/>:
                            <img className="login-profile" src={`./profile${number}.png`}/>
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
                        {errorName?<label>Please Enter Youe Name!</label>:<Fragment/>}
                    </form>
                </div>
            </div>
            </UserProvider>
        </>
    )
}