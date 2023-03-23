import React from "react";
import { Socket } from "socket.io-client";
import { GameRoomState, MoveColors } from "../../shared/enums";
import { PlayerRoles } from "../../shared/types";

export interface Props {
    children: React.ReactNode;
}

export interface IGameContext {
    roomState: GameRoomState;
    addPlayerMove: (move: MoveColors) => void;
    playerMoves: MoveColors[];
    opponentMoves: MoveColors[];
    isOpponentReady: boolean;
    opponentNick: string | null;
    roundCount: number;
    wantRematch: boolean;
    socket: Socket;
    username: string;
    handleChangeUsername: (nick: string) => void;
    playRematch: () => void;
    handleChangeRoundCount: () => void;
    playerRole: React.MutableRefObject<PlayerRoles | undefined>;
    handleChangePlayerRole: (newRole: PlayerRoles) => void;
    gameResult: "Playing" | "Win" | "Lose";
}
