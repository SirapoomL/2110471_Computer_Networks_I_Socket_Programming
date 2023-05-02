import { stickers_url } from "../../../data/Sticker";

interface StickerSelectorProps {
    onSelect: (sticker: number) => void,
    className?: string,
}

export function StickerSelector({ onSelect, className }: StickerSelectorProps) {
    return (
        <div className={`flex flex-row flex-wrap justify-evenly items-center p-2 w-full 'block': 'hidden'}` + ` ${className}`}>
        {stickers_url.map((sticker, index) => (
            <div key={index} className="flex justify-center p-2 h-fit w-fit rounded-lg hover:bg-gray-700 hover:bg-opacity-80 hover:cursor-pointer shadow-md">
            <img 
                src={sticker} 
                alt="sticker" 
                className="w-[60px] h-[60px] object-contain" 
                onClick={() => onSelect(index)} 
            />
            </div>
        ))}
        </div>
    )
}