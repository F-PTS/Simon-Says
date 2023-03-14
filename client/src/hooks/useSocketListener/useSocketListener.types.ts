import { Socket } from "socket.io-client";
import { GameResult, GameRoomState, MoveColors } from "../../shared/enums";

export interface Props {
    socket: Socket;
    setRoomState: React.Dispatch<React.SetStateAction<GameRoomState>>;
    setIsOpponentReady: React.Dispatch<React.SetStateAction<boolean>>;
    setWantRematch: React.Dispatch<React.SetStateAction<boolean>>;
    setRoundCount: React.Dispatch<React.SetStateAction<number>>;
    setPlayerMoves: React.Dispatch<React.SetStateAction<MoveColors[]>>;
    setOpponentMoves: React.Dispatch<React.SetStateAction<MoveColors[]>>;
    setPlayerName: React.Dispatch<React.SetStateAction<string>>;
    playRematch: () => void;
}
