export interface AuthorInterface {
    name?: string;
    avatar?: number;
}

export interface MessageInterface {
    author?: AuthorInterface;
    message?: string;
    timestamp?: string | Date;
    isSticker?: boolean;
    sticker?: number;
    echoeBack?: boolean;
}