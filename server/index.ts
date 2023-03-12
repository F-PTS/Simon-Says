import { createServer } from "http";
import { MoveColors } from "./shared/enums";
import { Server } from "socket.io";
import * as roomUtils from "./utils/roomUtils";
import { GameRoom } from "./shared/types";

const PORT = 3000;

const server = createServer();
const io = new Server(server, { cors: { origin: "*" } });

let gameRooms: GameRoom[] = [];

server.listen(PORT, () => console.log(`Server on ${PORT}`));

io.on("connection", (socket) => {
    console.log(`user ${socket.id} connected`);
});
