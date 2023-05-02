import { MessageInterface } from "../../../interfaces/MessageInterface";
import { stickers_url } from "../../../data/Sticker";
import { avatars_url } from "../../../data/Avatar";
import { dateToDateString, dateToTimeString } from "../../../utils/Utils";
import Markdown from "./MarkdownedText";

import { LIGHTCOLOR, DARKCOLOR } from "../../../utils/theme";

interface Props {
    msg: MessageInterface,
}

export default function Message({ msg } : Props) {

    let theme = sessionStorage.getItem('theme');
    const getTheme = () => {
          if(theme==="lighttheme")return LIGHTCOLOR
          return DARKCOLOR
    }

    return (
        <div style={{width:"100%",height:"80px",display:"flex",flexDirection:"row",justifyContent:"flex-start",alignItems:"center",paddingInline:"3%"}}>
            <div style={{width:"15%",display:"flex",flexDirection:"column",color:getTheme().text,fontSize:"0.8rem",marginRight:"15px"}}>
                <div>{`${dateToDateString(new Date(msg.timestamp ?? 0))} at ${dateToTimeString(new Date(msg.timestamp ?? 0))}`}</div>
                <div style={{textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap"}}>{`from ${msg.author?.name}`}</div>
            </div>
            <img src={avatars_url[msg.author?.avatar ?? 0]} alt="avatar" style={{width:"50px",height:"50px",borderRadius:"50%"}}/>

            <div style={{marginLeft:"15px",color:getTheme().primary,background:getTheme().text,borderRadius:"13px",padding:"5px 2%"}}>
                { msg.isSticker ?
                <div>
                    <img src={stickers_url[msg.sticker ?? 0]} alt="sticker" style={{width:"50px",height:"50px"}}/>
                </div> : <div>
                    {msg.message ?? ""}
                </div>
                }
            </div>
        </div>
    )
}