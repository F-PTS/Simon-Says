import { useEffect } from "react";
import { GameRoomState, MoveColors } from "../../shared/enums";
import { Player } from "../../shared/types";
import * as Types from "./useSocketListener.types";

export function useSocketListener({
    socket,
    setRoomState,
    setIsOpponentReady,
    setWantRematch,
    setPlayerMoves,
    playRematch,
    setOpponentMoves,
    setOpponentNick,
    setUsername,
}: Types.Props) {
    useEffect(() => {
        socket.on("server:error", () => setRoomState(GameRoomState.Error));

        socket.on("room:setOpponentNick", (newNickName: string) =>
            setOpponentNick(newNickName)
        );
        socket.on("room:setUsername", (username: string) =>
            setUsername(username)
        );
        socket.on("room:create", () => setRoomState(GameRoomState.Waiting));
        socket.on("room:full", () => "");
        socket.on("room:left", () => setRoomState(GameRoomState.Left));
        socket.on("room:blocked", () => setRoomState(GameRoomState.Full));

        socket.on("room:opponentReady", () => setIsOpponentReady(true));

        socket.on("room:wantRematch", () => setWantRematch(true));
        socket.on("room:playRematch", () => playRematch());

        socket.on("user:playerMoves", (m: MoveColors[]) => setPlayerMoves(m));
        socket.on("user:opponentMoves", (m: MoveColors[]) =>
            setOpponentMoves(m)
        );

        return () => {
            socket.removeAllListeners().disconnect();
        };
    }, []);
}
