import Filter from "bad-words";
import * as dotenv from "dotenv";
import { createServer } from "http";
import { shallowEqualArrays } from "shallow-equal";
import { Server } from "socket.io";
import { MoveColors, PlayerRoles } from "./shared/enums";
import { GameRoom } from "./shared/types";
import { findRoomForSocket } from "./utils/roomUtils";

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

        console.log(gameRooms);

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
            const foundRoom = findRoomForSocket(gameRooms, socket.id);
            if (!foundRoom) return;

            if (!isReady && !isOpponentReady) return;

            socket.emit("user:setPlayerRole", PlayerRoles.choosingNewColor);
            socket.broadcast
                .to(foundRoom.roomID)
                .emit("user:setPlayerRole", PlayerRoles.waiting);

            socket.emit("room:start");
            socket.broadcast.to(foundRoom.roomID).emit("room:start");
        }
    );

    socket.on("user:addPlayerMove", (move: MoveColors) => {
        console.log(`socekt ${socket.id} made a ${move} move`);

        const foundRoom = findRoomForSocket(gameRooms, socket.id);
        if (!foundRoom) return;
        if (!foundRoom.opponent) return;

        if (foundRoom.host.socketID === socket.id)
            foundRoom.hostMoves = [...foundRoom.hostMoves, move];

        if (foundRoom.opponent.socketID === socket.id) {
            foundRoom.opponentMoves = [...foundRoom.opponentMoves, move];
        }

        if (
            foundRoom.hostMoves.length === foundRoom.opponentMoves.length &&
            !shallowEqualArrays(foundRoom.hostMoves, foundRoom.opponentMoves)
        ) {
            socket.emit("room:end", false);
            console.log(`socekt ${socket.id} just lost :(`);
            return;
        }

        gameRooms = gameRooms.map((room) => {
            if (room.roomID === foundRoom.roomID) {
                return foundRoom;
            }
            return room;
        });

        socket.emit("user:playerMoves", foundRoom.opponentMoves);
        socket.emit("user:setPlayerRole", PlayerRoles.waiting);

        socket.broadcast
            .to(foundRoom.roomID)
            .emit("user:opponentMoves", foundRoom.opponentMoves);

        socket.broadcast
            .to(foundRoom.roomID)
            .emit("user:setPlayerRole", PlayerRoles.repeating);

        console.log(foundRoom);
        return;
    });
});

io.of("/").adapter.on("leave-room", (roomID, id) => {
    if (roomID !== id) {
        io.to(roomID).emit("room:left");
    }
});
