import { Fragment, useEffect, useState } from "react";
import { Button } from "@mui/material";

import "./component.css"

export default function LoginPage() {
    const [username, setUsername ] = useState("");
    const [userProfilePic, setUserProfilePic ] = useState<Number>(1);
    const [errorName, setErrorName] = useState(false);
    const handleNext = () => {
      if(username===""){
        setErrorName(true)
        return;
      }setErrorName(false)
    //   startChatRoomPage();
    }
    const handleChooseProfile = (profileNumber : Number) => {
        setUserProfilePic(profileNumber)
    }
  
    return (
        <>
            <div>
                <div>
                    <div style={{display:"flex",flexDirection:"row",gap:"10px",justifyContent:"center",alignItems:"center"}}>
                        <div onClick={()=>{handleChooseProfile(1)}}><img className="login-profile" src="./profile1.png"/></div>
                        <div onClick={()=>{handleChooseProfile(2)}}><img className="login-profile" src="./profile2.png"/></div>
                        <div onClick={()=>{handleChooseProfile(3)}}><img className="login-profile" src="./profile3.png"/></div>
                        <div onClick={()=>{handleChooseProfile(4)}}><img className="login-profile" src="./profile4.png"/></div>
                    </div>
                    <h2>Please enter your name</h2>
                    <form className="login-form">
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Button variant="contained" onClick={handleNext}>Join</Button>
                    {errorName?<label>Please Enter Youe Name!</label>:<Fragment/>}
                    </form>
                </div>
            </div>
        </>
    )
}