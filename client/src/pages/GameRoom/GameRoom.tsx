import { Spinner } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GamePlaying } from "../../components/GamePlaying";
import { GameWaiting } from "../../components/GameWaiting";
import { GameContext } from "../../providers/GameProvider/GameProvider";
import { IGameContext } from "../../providers/GameProvider/GameProvider.types";
import { GameRoomState } from "../../shared/enums";

export function GameRoom() {
    const invitationLink = window.location.href;
    const { roomState, opponentNick, socket, username, isOpponentReady } =
        useContext(GameContext) as IGameContext;

    switch (roomState) {
        case GameRoomState.Loading:
            return <Spinner />;
        case GameRoomState.Waiting:
            return (
                <GameWaiting
                    invitationLink={invitationLink}
                    opponentNick={opponentNick}
                    currentUsername={username}
                    socket={socket}
                    isOpponentReady={isOpponentReady}
                />
            );
        case GameRoomState.Playing:
            return <GamePlaying />;
        case GameRoomState.Left:
            return <>The host left</>;
        case GameRoomState.Full:
            return <>full temp</>;
        case GameRoomState.Error:
            return <></>;
    }
}
