import { stickers_url } from "../../../data/Sticker";
import { LIGHTCOLOR, DARKCOLOR } from "../../../utils/theme";

interface StickerSelectorProps {
    onSelect: (sticker: number) => void,
    className?: string,
}

export function StickerSelector({ onSelect, className }: StickerSelectorProps) {
    let theme = sessionStorage.getItem('theme');
    const getTheme = () => {
          if(theme==="lighttheme")return LIGHTCOLOR
          return DARKCOLOR
    }

    return (
        <div className={`flex flex-row flex-wrap justify-evenly items-center p-2 w-full 'block': 'hidden'}` + ` ${className}`}>
        {stickers_url.map((sticker, index) => (
            <div style={{}} key={index}>
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