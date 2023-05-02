import { Fragment, useState } from "react"
import { Button, Modal, Box, Grid, IconButton } from "@mui/material";
import { useUser } from "../UserProvider"
import { useNavigate } from "react-router-dom";
import { avatars_url } from "../../data/Avatar";
import ReactSwitch from "react-switch";

import { LIGHTCOLOR, DARKCOLOR } from "../../utils/theme";
import "./Login.css";

export function Login() {
  {
  // const { changeUsername, avatarIndex, changeAvatarIndex} = useUser();
  // const [openModal, setOpenModal] = useState(false);
  // const [usernameInput, setUsernameInput ] = useState<string>("");
  // const [errorMessage, setErrorMessage] = useState<string>("");
  // const navigate = useNavigate();

  // const goToChatRoomPage = () => {
  //   console.log("navigatingg........")
  //   navigate("/chat");
  // }

  // const onClick = () => {
  //   if(usernameInput===""){
  //     setErrorMessage("Please enter your username!")
  //     return;
  //   }
  //   if(!changeUsername)return;
  //   changeUsername(usernameInput)
  //   console.log("i amk navigatinggggg")
  //   goToChatRoomPage();
  // }

  // const handleOpenModal = () => {
  //   setOpenModal(true);
  // };
  
  // const handleCloseModal = () => {
  //   setOpenModal(false);
  // };

  // const handleSelectProfileImage = (avatarIndex: number) => {
  //   if(!changeAvatarIndex)return;
  //   changeAvatarIndex(avatarIndex);
  //   handleCloseModal();
  // };

  // return (
  //   <div className="login-page">
  //     <div className="login-container">
  //       <div className="login-logo" onClick={handleOpenModal}>
  //         <img
  //           src={avatars_url[avatarIndex||0]}
  //           alt="logo"
  //         />
  //       </div>
  //       <Modal open={openModal} onClose={handleCloseModal}>
  //         <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", borderRadius: "10px", boxShadow: 24, p: 4 }}>
  //           <h2 className="login-title">Choose Profile Picture</h2>
  //           <Grid container spacing={2}>
  //             {avatars_url.map((image,index) => (
  //               <Grid item xs={6} key={index}>
  //                 <IconButton onClick={() => handleSelectProfileImage(index)}>
  //                   <img src={image} alt={image} style={{ width: "100%", height: "auto" }} />
  //                 </IconButton>
  //               </Grid>
  //             ))}
  //           </Grid>
  //         </Box>
  //       </Modal>
  //       <h2 className="login-title">Login to Your Account</h2>
  //       <form className="login-form">
  //         <label htmlFor="username">Username</label>
  //         <input
  //           type="text"
  //           id="username"
  //           value={usernameInput}
  //           onChange={(e) => setUsernameInput(e.target.value)}
  //         />
  //         <span className="login-error">{errorMessage}</span>
  //         <Button variant="contained" onClick={onClick}>
  //         Start Chatting!
  //         </Button>
  //       </form>
  //     </div>
  //   </div>
  }
  const [username, setUsername ] = useState("");
  const [userProfilePic, setUserProfilePic ] = useState<number>(0);
  const [errorName, setErrorName] = useState(false);
  const [theme, setTheme] = useState("lighttheme");
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
      sessionStorage.setItem('theme', theme)
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