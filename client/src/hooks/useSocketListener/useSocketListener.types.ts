import { Socket } from "socket.io-client";
import { GameResult, GameRoomState, MoveColors } from "../../shared/enums";
import { PlayerRoles } from "../../shared/types";

export interface Props {
    socket: Socket;
    setRoomState: React.Dispatch<React.SetStateAction<GameRoomState>>;
    setIsOpponentReady: React.Dispatch<React.SetStateAction<boolean>>;
    setRoundCount: React.Dispatch<React.SetStateAction<number>>;
    setOpponentNick: React.Dispatch<React.SetStateAction<string | null>>;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    handleChangePlayerRole: (newRole: PlayerRoles) => void;
    playRematch: () => void;
    setGameResult: React.Dispatch<React.SetStateAction<GameResult>>;
    setActiveButtonColor: React.Dispatch<
        React.SetStateAction<MoveColors | null>
    >;
}
