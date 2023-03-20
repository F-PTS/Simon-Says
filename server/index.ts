import { createServer } from "http";
import { MoveColors } from "./shared/enums";
import { Server } from "socket.io";
import * as roomUtils from "./utils/roomUtils";
import { GameRoom } from "./shared/types";
import * as dotenv from "dotenv";
import { findRoomForSocket } from "./utils/roomUtils";
import Filter from "bad-words";
import { Player } from "./shared/types";

dotenv.config();

const server = createServer();
const io = new Server(server, { cors: { origin: "*" } });

let gameRooms: GameRoom[] = [];

server.listen(process.env.PORT || 3000, () =>
    console.log(`Server on ${process.env.PORT || 3000}`)
);

io.on("connection", (socket) => {
    console.log(`user ${socket.id} connected`);

    socket.on("user:connecting", (roomID: string) => {
        const foundRoom = gameRooms.find((room) => room.roomID === roomID);
        socket.emit("room:setUsername", socket.id);

        if (!foundRoom) {
            gameRooms = [
                ...gameRooms,
                {
                    roomID,
                    host: { socketID: socket.id, username: socket.id },
                    hostMoves: [],
                    opponentMoves: [],
                    rematch: "",
                },
            ];

            socket.join(roomID);
            socket.emit("room:create");
            console.log(`room ${roomID} created`);
            return;
        }

        if (foundRoom.opponent) {
            socket.emit("room:full");
            return;
        }

        if (foundRoom.host.socketID === socket.id) return;

        gameRooms = gameRooms.map((room) => {
            if (foundRoom.roomID === room.roomID) {
                return {
                    ...foundRoom,
                    opponent: { socketID: socket.id, username: socket.id },
                };
            }

            return room;
        });

        console.log(gameRooms);
        socket.join(foundRoom.roomID);

        socket.emit("room:setOpponentNick", foundRoom.host.username);
        socket
            .to(foundRoom.host.socketID)
            .emit("room:setOpponentNick", socket.id);
    });

    socket.on("user:setName", (username: string) => {
        const foundRoom = findRoomForSocket(gameRooms, socket.id);
        if (!foundRoom) return;

        const filter = new Filter();
        if (filter.isProfane(username)) return;

        socket.emit("room:setUsername", username);
        socket.broadcast
            .to(foundRoom.roomID)
            .emit("room:setOpponentNick", username);
    });

    socket.on("user:setReady", () => {
        const foundRoom = findRoomForSocket(gameRooms, socket.id);
        if (!foundRoom) return;

        socket.broadcast.to(foundRoom.roomID).emit("room:setOpponentReady");
    });

    socket.on(
        "room:startGame",
        ([isReady, isOpponentReady]: [boolean, boolean]) => {
            console.log("i recieve readyness");

            const foundRoom = findRoomForSocket(gameRooms, socket.id);
            console.log("i tried to find room");
            if (!foundRoom) return;

            console.log("i found room and I check if they are ready");
            if (!isReady && !isOpponentReady) return;
            console.log("they are. I am sending back emits");

            socket.emit("room:start");
            socket.broadcast.emit("room:start");
            console.log("should be playing");
        }
    );
});

io.of("/").adapter.on("leave-room", (roomID, id) => {
    if (roomID !== id) {
        io.to(roomID).emit("room:left");
    }
});
