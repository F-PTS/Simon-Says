import { useEffect } from "react";
import { GameRoomState, MoveColors } from "../../shared/enums";
import * as Types from "./useSocketListener.types";

export function useSocketListener({
    socket,
    setRoomState,
    setIsOpponentReady,
    setWantRematch,
    setPlayerMoves,
    playRematch,
    setOpponentMoves,
    setPlayerName,
}: Types.Props) {
    useEffect(() => {
        socket.on("server:error", () => setRoomState(GameRoomState.Error));

        socket.on("room:create", () => setRoomState(GameRoomState.Waiting));
        socket.on("room:full", () => setRoomState(GameRoomState.Full));
        socket.on("room:left", () => setRoomState(GameRoomState.Left));
        socket.on("room:blocked", () => setRoomState(GameRoomState.Full));

        socket.on("room:opponentReady", () => setIsOpponentReady(true));
        socket.on("room:wantRematch", () => setWantRematch(true));
        socket.on("room:playRematch", () => playRematch);

        socket.on("user:playerMoves", (m: MoveColors[]) => setPlayerMoves(m));
        socket.on("user:opponentMoves", (m: MoveColors[]) =>
            setOpponentMoves(m)
        );
        socket.on("user:setName", (name: string) => setPlayerName(name));
    }, []);
}
