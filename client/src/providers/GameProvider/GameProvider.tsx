import React, { createContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import * as Types from "./GameProvider.types";
import { io } from "socket.io-client";
import { GameResult, GameRoomState, MoveColors } from "../../shared/enums";
import { useSocketListener } from "../../hooks/useSocketListener";

export const GameContext = createContext<Types.IGameContext | null>(null);

export const GameProvider = ({ children }: Types.Props) => {
    const { id } = useParams();
    const [roomState, setRoomState] = useState<GameRoomState>(
        GameRoomState.Waiting
    );
    const [wantRematch, setWantRematch] = useState<boolean>(false);
    const [roundCount, setRoundCount] = useState<number>(0);
    const [gameResult, setGameResult] = useState<GameResult>(
        GameResult.Playing
    );

    const [opponentMoves, setOpponentMoves] = useState<MoveColors[]>([]);
    const [opponentName, setOpponentName] = useState<string>("");
    const [isOpponentReady, setIsOpponentReady] = useState<boolean>(false);

    const socketRef = useRef(
        io(import.meta.env.VITE_BACKEND_URL, { autoConnect: false })
    );
    const socket = socketRef.current;
    const [playerName, setPlayerName] = useState<string>(socket.id);
    const [playerMoves, setPlayerMoves] = useState<MoveColors[]>([]);

    const setPlayerMovesHandler = (moves: MoveColors[]) => {
        socket.emit("user:setMoves", moves);
    };

    const setPlayerNameHandler = (name: string) => {
        socket.emit("user:setName", name);
    };

    const rematch = () => {
        setWantRematch(true);
        socket.emit("room:rematch");
    };

    const playRematch = () => {
        setGameResult(GameResult.Playing);
        setPlayerMoves([]);
        setIsOpponentReady(false);
        setWantRematch(false);
        setRoundCount(0);
    };

    useSocketListener({
        socket,
        setRoomState,
        setIsOpponentReady,
        setWantRematch,
        setRoundCount,
        setPlayerMoves,
        playRematch,
        setOpponentMoves,
        setPlayerName,
    });

    useEffect(() => {
        if (!socket.connected) socket.connect();
        socket.emit("user:connecting", id);

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <GameContext.Provider
            value={{
                roomState,
                setPlayerMovesHandler,
                playerMoves,
                opponentMoves,
                playerName,
                setPlayerName,
                opponentName,
                isOpponentReady,
                wantRematch,
                roundCount,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};
