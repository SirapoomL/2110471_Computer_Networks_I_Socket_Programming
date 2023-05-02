export interface UserContextInterface {
  username?: string;
  changeUsername?:  (newName:string)=>void;
  room?: string;
  changeRoom?: (newRoom:string)=>void;
  avatarIndex?: number;
  changeAvatarIndex?: (newRoom:number)=>void;
}