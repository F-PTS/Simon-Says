import { Socket } from "socket.io-client";
import { Player } from "../../shared/types";

export interface Props {
    invitationLink: string;
    opponentNick: string | null;
    socket: Socket;
    currentUsername: string;
}
