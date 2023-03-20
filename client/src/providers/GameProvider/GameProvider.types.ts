import React from "react";
import { Socket } from "socket.io-client";
import { GameRoomState, MoveColors } from "../../shared/enums";
import { Player } from "../../shared/types";

export interface Props {
    children: React.ReactNode;
}

export interface IGameContext {
    roomState: GameRoomState;
    setPlayerMovesHandler: (moves: MoveColors[]) => void;
    playerMoves: MoveColors[];
    opponentMoves: MoveColors[];
    isOpponentReady: boolean;
    opponentNick: string | null;
    roundCount: number;
    wantRematch: boolean;
    socket: Socket;
    username: string;
    handleChangeUsername: (nick: string) => void;
}
