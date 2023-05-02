export interface AuthorInterface {
    name?: string;
    profile?: number;
}

export interface MessageInterface {
    author?: AuthorInterface;
    message?: string;
    timestamp?: string | Date;
    isSticker?: boolean;
    sticker?: number;
    echoeBack?: boolean;
}