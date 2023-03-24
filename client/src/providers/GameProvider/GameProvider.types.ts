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
    isOpponentReady: boolean;
    opponentNick: string | null;
    roundCount: number;
    socket: Socket;
    username: string;
    handleChangeUsername: (nick: string) => void;
    playRematch: () => void;
    playerRole: PlayerRoles | null;
    gameResult: "Playing" | "Win" | "Lose";
    activeButtonColor: MoveColors | null;
}
