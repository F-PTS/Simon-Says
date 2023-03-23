import { Socket } from "socket.io-client";
import { GameResult, MoveColors } from "../../shared/enums";
import { PlayerRoles } from "../../shared/types";

export interface Props {
    opponentNick: string | null;
    currentUsername: string;
    playRematch: () => void;
    addPlayerMove: (move: MoveColors) => void;
    playerMoves: MoveColors[];
    opponentMoves: MoveColors[];
    roundCount: number;
    wantRematch: boolean;
    socket: Socket;
    handleChangeRoundCount: () => void;
    playerRole: React.MutableRefObject<PlayerRoles | undefined>;
    handleChangePlayerRole: (newRole: PlayerRoles) => void;
    gameResult: GameResult;
}
