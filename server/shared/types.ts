import { MoveColors } from "./enums";

export interface GameRoom {
    roomID: string;
    host: Player;
    opponent?: Player;
    hostMoves: MoveColors[];
    opponentMoves: MoveColors[];
    rematch: string;
}

export type Player = {
    socketID: string;
    username: string;
};
