import { GameRoom } from "../shared/types";

export const filterRooms = (
    gameRoom: GameRoom,
    roomID: string,
    callback: () => void
) => {
    const result = gameRoom.roomID !== roomID;
    if (!result) callback();

    return result;
};

export const findRoomForSocket = (
    gameRooms: GameRoom[],
    socketId: string
): GameRoom | undefined => {
    const foundRoom = gameRooms.find(
        (x) => x.host === socketId || x.opponent === socketId
    );

    return foundRoom;
};
