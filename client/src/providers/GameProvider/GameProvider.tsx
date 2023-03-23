import { createContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { useSocketListener } from "../../hooks/useSocketListener";
import { GameResult, GameRoomState, MoveColors } from "../../shared/enums";
import { PlayerRoles } from "../../shared/types";
import * as Types from "./GameProvider.types";

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
    const [playerMoves, setPlayerMoves] = useState<MoveColors[]>([]);
    const [opponentMoves, setOpponentMoves] = useState<MoveColors[]>([]);
    const [isOpponentReady, setIsOpponentReady] = useState<boolean>(false);
    const socketRef = useRef(
        io(import.meta.env.VITE_BACKEND_URL, { autoConnect: false })
    );
    const socket = socketRef.current;
    const [opponentNick, setOpponentNick] = useState<string | null>(null);
    const [username, setUsername] = useState<string>("");
    const playerRole = useRef<PlayerRoles>();

    const addPlayerMove = (move: MoveColors) => {
        socket.emit("user:addPlayerMove", move);
    };

    const handleChangePlayerRole = (newRole: PlayerRoles) => {
        playerRole.current = newRole;
    };

    const handleChangeRoundCount = () => {
        setRoundCount((current) => current + 1);
    };

    const handleChangeUsername = (name: string) => {
        setUsername(name);
    };

    const askForRematch = () => {
        setWantRematch(true);
    };

    const playRematch = () => {
        setGameResult(GameResult.Playing);
        setPlayerMoves([]);
        setIsOpponentReady(false);
        setWantRematch(false);
        setRoundCount(0);
        socket.emit("room:rematch");
    };

    useSocketListener({
        socket,
        setRoomState,
        setIsOpponentReady,
        setWantRematch,
        setRoundCount,
        setPlayerMoves,
        setOpponentMoves,
        setOpponentNick,
        playRematch,
        setUsername,
        handleChangePlayerRole,
        setGameResult,
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
                addPlayerMove,
                playerMoves,
                opponentMoves,
                isOpponentReady,
                wantRematch,
                roundCount,
                socket,
                opponentNick,
                username,
                handleChangeUsername,
                playRematch,
                handleChangeRoundCount,
                playerRole,
                handleChangePlayerRole,
                gameResult,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};
