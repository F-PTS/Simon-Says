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
    const [roundCount, setRoundCount] = useState<number>(0);
    const [gameResult, setGameResult] = useState<GameResult>(
        GameResult.Playing
    );
    const [isOpponentReady, setIsOpponentReady] = useState<boolean>(false);
    const socketRef = useRef(
        io(import.meta.env.VITE_BACKEND_URL, { autoConnect: false })
    );
    const socket = socketRef.current;
    const [opponentNick, setOpponentNick] = useState<string | null>(null);
    const [username, setUsername] = useState<string>("");
    const playerRole = useRef<PlayerRoles>();
    const [activeButtonColor, setActiveButtonColor] =
        useState<MoveColors | null>(null);

    const addPlayerMove = (move: MoveColors) => {
        socket.emit("user:addPlayerMove", move);
    };

    const handleChangePlayerRole = (newRole: PlayerRoles) => {
        playerRole.current = newRole;
    };

    const handleChangeUsername = (name: string) => {
        setUsername(name);
    };

    const playRematch = () => {
        setGameResult(GameResult.Playing);
        setIsOpponentReady(false);
        setRoundCount(0);
        socket.emit("room:rematch");
    };

    useSocketListener({
        socket,
        setRoomState,
        setIsOpponentReady,
        setRoundCount,
        setOpponentNick,
        playRematch,
        setUsername,
        handleChangePlayerRole,
        setGameResult,
        setActiveButtonColor,
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
                isOpponentReady,
                roundCount,
                socket,
                opponentNick,
                username,
                handleChangeUsername,
                playRematch,
                playerRole,
                gameResult,
                activeButtonColor,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};
