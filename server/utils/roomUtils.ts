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
    socketID: string
): GameRoom | undefined => {
    const foundRoom = gameRooms.find(
        (x) => x.host.socketID === socketID || x.opponent?.socketID === socketID
    );

    return foundRoom;
};
