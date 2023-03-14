import { Spinner } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GameWaiting } from "../../components/GameWaiting";
import { GameContext } from "../../providers/GameProvider/GameProvider";
import { IGameContext } from "../../providers/GameProvider/GameProvider.types";
import { GameRoomState } from "../../shared/enums";

export function GameRoom() {
    const invitationLink = window.location.href;
    const { roomState, opponentName, playerName } = useContext(
        GameContext
    ) as IGameContext;

    switch (roomState) {
        case GameRoomState.Loading:
            return <Spinner />;
        case GameRoomState.Waiting:
            return (
                <GameWaiting
                    invitationLink={invitationLink}
                    playersInRoom={[playerName, opponentName]}
                />
            );
        case GameRoomState.Playing:
            return;
        case GameRoomState.Left:
            return;
        case GameRoomState.Full:
            return;
        case GameRoomState.Error:
            return;
    }
}
