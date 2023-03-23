import { Socket } from "socket.io-client";

export interface Props {
  invitationLink: string;
  opponentNick: string | null;
  socket: Socket;
  currentUsername: string;
  isOpponentReady: boolean;
}
