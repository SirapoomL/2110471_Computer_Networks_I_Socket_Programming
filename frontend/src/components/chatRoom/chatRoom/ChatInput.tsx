import { StickerSelector } from "./StickerSelector"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../../UserProvider";
import { useSocket } from "../../SocketProvider"
import { MessageInterface } from "../../../interfaces/MessageInterface";
import styled from "@emotion/styled";
import { LIGHTCOLOR, DARKCOLOR } from "../../../utils/theme";

let theme = sessionStorage.getItem('theme');
const getTheme = () => {
    theme = sessionStorage.getItem('theme');
      if(theme==="lighttheme")return LIGHTCOLOR
      return DARKCOLOR
}

// const backgroundColor = "#f9fafb";
const backgroundColor = getTheme().secondary;
const backgroundColor1 = getTheme().lighter;

// border-top: 1px solid #d1d5db;
const Container = styled("div")`
    display: flex;
    flex-direction: column;
    background-color: ${backgroundColor1};
`;

const InputContainer = styled("div")`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
`;

const Input = styled("textarea")`
    flex-grow: 1;
    margin-right: 1rem;
    padding: 0.5rem;
    border-radius: 999px;
    background-color: ${backgroundColor};
    border: none;
    outline: none;
    resize: none;
    font-size: 16px;
`;

const Button = styled("button")`
    background-color: ${backgroundColor};
    border: none;
    padding: 0.5rem;
    border-radius: 999px;
    outline: none;
    cursor: pointer;
`;

export default function ChatInput () {
    const { username, avatarIndex, room } = useUser();
    const [showStickerSelector, setShowStickerSelector] = useState(false);
    const { sendMessage } = useSocket();

    const handleSendMsg = () => {
        const msg = (document.getElementById("input-message") as HTMLTextAreaElement).value;
        if(msg.trim() === "") return;
        const msgObj: MessageInterface = {
            author: {
                name: username,
                avatar: avatarIndex
            },
            message: msg,
            isSticker: false,
            sticker: -1,
        }
        console.log(msgObj);
        console.log('submitting msg ');
        if(sendMessage) sendMessage(msgObj);
        (document.getElementById("input-message") as HTMLTextAreaElement).value = "";
        
    }

    const handleSendSticker = (sticker: number) => {
        const msgObj: MessageInterface = {
            author: {
                name: username,
                avatar: avatarIndex
            },
            isSticker: true,
            sticker: sticker,
        }
        console.log(msgObj);
        console.log('sending sticker to room ' + room);
        if(sendMessage) sendMessage(msgObj);
        setShowStickerSelector(false);
    }


    return (
        <Container>
            <StickerSelector onSelect={handleSendSticker} />
            <InputContainer>
                <Input
                    id="input-message"
                    rows={1}
                    // value={message}
                    placeholder="Type a message"
                    // onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMsg();
                        }
                    }}
                />
                <Button onClick={handleSendMsg}>
                    <FontAwesomeIcon icon={faPaperPlane} className="text-gray-400" />
                </Button>
                <Button onClick={() => setShowStickerSelector(!showStickerSelector)}>
                    <FontAwesomeIcon icon={faSmile} className="text-gray-400" />
                </Button>
            </InputContainer>
        </Container>
    );
}