import { getChatRooms } from "../db/chatroom.js";

const RoomController = {
    /**
     * 
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     */
    async getAllRooms(req, res, next) {
        try {
            const rooms = getChatRooms();
            return res.status(200).json({
                code: 200,
                data: rooms,
                message: "OK",
            });
        } catch (error) {
            return next(error);
        }
    },
}

export default RoomController;