import { GameResult, MoveColors } from "../../shared/enums";
import { PlayerRoles } from "../../shared/types";

export interface Props {
    playRematch: () => void;
    addPlayerMove: (move: MoveColors) => void;
    roundCount: number;
    playerRole: PlayerRoles | null;
    gameResult: GameResult;
    activeButtonColor: MoveColors | null;
}
