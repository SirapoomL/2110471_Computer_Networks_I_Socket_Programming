import { MessageInterface } from "../../../interfaces/MessageInterface";
import Markdown from "./MarkdownedText";

export function ChatNoti({message, show}: {message: MessageInterface, show:boolean}) {
    return (
        <div className={`fixed z-50 bottom-10 right-5 rounded-3xl bg-white w-80  shadow-md transition-all duration-500 ${show ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            <div className="flex flex-col justify-center h-full p-6">
                <div className="text-md font-bold">{`${message.author?.name}:`}</div>
                <div className="line-clamp-1 text-gray-800 text-sm">
                    {/* {message.isSticker 
                    ? <img src={stickers_url[message.sticker ?? 0]} alt="sticker" className="w-[75px] h-[75px]" />
                    : <Markdown text={message.isSticker ? 'sent a sticker.' : message.message ?? ""}/>
                    } */}
                </div>
            </div>
        </div>
    )
}