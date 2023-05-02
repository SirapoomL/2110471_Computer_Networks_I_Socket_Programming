import { MessageInterface } from "../../../interfaces/MessageInterface";
// import { stickers_url } from "../../../data/Sticker";
import { dateToDateString, dateToTimeString } from "../../../utils/Utils";
import Markdown from "./MarkdownedText";

interface Props {
    msg: MessageInterface,
}

export default function Message({ msg } : Props) {
    return (
        <div className="flex flex-row items-start my-4 p-2">
            <div className={`flex flex-col w-full gap-y-2 px-2`}>
                <div className="flex w-full items-center h-fit">
                    <span className="text-md font-bold mr-2 text-white">
                        {msg.author?.name}
                    </span>
                    <span className="text-[10px] text-gray-500 pt-[4px]">
                        {`${dateToDateString(new Date(msg.timestamp ?? 0))} at ${dateToTimeString(new Date(msg.timestamp ?? 0))}`}
                    </span>
                </div> 
            </div>
        </div>

    )
}