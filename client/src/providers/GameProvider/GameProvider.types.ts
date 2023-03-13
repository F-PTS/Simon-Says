import React from "react";
import { GameRoomState, MoveColors } from "../../shared/enums";

export interface Props {
    children: React.ReactNode;
}

export interface IGameContext {
    roomState: GameRoomState;
    setPlayerMovesHandler: (moves: MoveColors[]) => void;
    playerMoves: MoveColors[];
    isOpponentReady: boolean;
    wantRematch: boolean;
    roundCount: number;
}
