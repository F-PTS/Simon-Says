import { MoveColors } from "./enums";

export interface GameRoom {
    roomID: string;
    host: string; // host === simon
    opponent: string;
    hostMove: MoveColors;
    opponentMove: MoveColors;
    rematch: string;
}
