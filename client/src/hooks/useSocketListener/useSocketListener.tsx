import { useEffect } from "react";
import { GameResult, GameRoomState, MoveColors } from "../../shared/enums";
import { PlayerRoles } from "../../shared/types";
import * as Types from "./useSocketListener.types";

export function useSocketListener({
    socket,
    setRoomState,
    setIsOpponentReady,
    playRematch,
    setOpponentNick,
    setUsername,
    handleChangePlayerRole,
    setGameResult,
    setActiveButtonColor,
}: Types.Props) {
    useEffect(() => {
        socket.on("room:setOpponentNick", (newNickName: string) =>
            setOpponentNick(newNickName)
        );
        socket.on("room:setUsername", (username: string) =>
            setUsername(username)
        );

        socket.on("room:end", (isWinner: boolean) =>
            setGameResult(isWinner ? GameResult.Win : GameResult.Lose)
        );
        socket.on("room:create", () => setRoomState(GameRoomState.Waiting));
        socket.on("room:full", () => setRoomState(GameRoomState.Full));
        socket.on("room:left", () => setRoomState(GameRoomState.Left));
        socket.on("room:blocked", () => setRoomState(GameRoomState.Full));
        socket.on("room:start", () => setRoomState(GameRoomState.Playing));
        socket.on("server:error", () => setRoomState(GameRoomState.Error));
        socket.on("room:setOpponentReady", () =>
            setIsOpponentReady((current) => !current)
        );
        socket.on("room:playRematch", () => playRematch());
        socket.on("room:sendBackMove", (moveColor: MoveColors) =>
            setActiveButtonColor(moveColor)
        );

        socket.on("user:setPlayerRole", (newRole: PlayerRoles) =>
            handleChangePlayerRole(newRole)
        );

        return () => {
            socket.removeAllListeners().disconnect();
        };
    }, []);
}
