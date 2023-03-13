import { createServer } from "http";
import { MoveColors } from "./shared/enums";
import { Server } from "socket.io";
import * as roomUtils from "./utils/roomUtils";
import { GameRoom } from "./shared/types";
import * as dotenv from "dotenv";

dotenv.config();

const server = createServer();
const io = new Server(server, { cors: { origin: "*" } });

let gameRooms: GameRoom[] = [];

server.listen(process.env.PORT || 3000, () =>
    console.log(`Server on ${process.env.PORT || 3000}`)
);

io.on("connection", (socket) => {
    console.log(`user ${socket.id} connected`);
});
