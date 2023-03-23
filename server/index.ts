import Filter from "bad-words";
import * as dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import { MoveColors, PlayerRoles } from "./shared/enums";
import { GameRoom } from "./shared/types";
import { filterRooms, findRoomForSocket } from "./utils/roomUtils";

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

            socket.emit("user:setPlayerRole", PlayerRoles.playing);
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

        if (foundRoom.opponent.socketID === socket.id) {
            foundRoom.opponentMoves = [...foundRoom.opponentMoves, move];

            if (
                foundRoom.hostMoves.length !== 0 &&
                foundRoom.hostMoves.length >= foundRoom.opponentMoves.length &&
                !foundRoom.opponentMoves.every(
                    (move, id) => move === foundRoom.hostMoves[id]
                )
            ) {
                console.log(`socket ${socket.id} własnie przegrał :(`);

                socket.emit("room:end", false);
                socket.broadcast.to(foundRoom.roomID).emit("room:end", true);

                return;
            }

            if (foundRoom.hostMoves.length < foundRoom.opponentMoves.length) {
                socket.emit("user:setPlayerRole", PlayerRoles.waiting);
                socket.emit("user:playerMoves", foundRoom.opponentMoves);

                socket.broadcast
                    .to(foundRoom.roomID)
                    .emit("user:setPlayerRole", PlayerRoles.playing);
                socket.broadcast
                    .to(foundRoom.roomID)
                    .emit("user:playerMoves", foundRoom.opponentMoves);

                foundRoom.hostMoves = [];

                gameRooms = gameRooms.map((room) => {
                    if (foundRoom.roomID === room.roomID) return foundRoom;
                    return room;
                });
            }
        }

        if (foundRoom.host.socketID === socket.id) {
            foundRoom.hostMoves = [...foundRoom.hostMoves, move];

            if (
                foundRoom.opponentMoves.length !== 0 &&
                foundRoom.hostMoves.length <= foundRoom.opponentMoves.length &&
                !foundRoom.hostMoves.every(
                    (move, id) => move === foundRoom.opponentMoves[id]
                )
            ) {
                console.log(`socket ${socket.id} własnie przegrał :(`);

                socket.emit("room:end", false);
                socket.broadcast.to(foundRoom.roomID).emit("room:end", true);

                return;
            }
            if (foundRoom.hostMoves.length > foundRoom.opponentMoves.length) {
                socket.emit("user:setPlayerRole", PlayerRoles.waiting);
                socket.emit("user:playerMoves", foundRoom.hostMoves);

                socket.broadcast
                    .to(foundRoom.roomID)
                    .emit("user:setPlayerRole", PlayerRoles.playing);
                socket.broadcast
                    .to(foundRoom.roomID)
                    .emit("user:playerMoves", foundRoom.hostMoves);

                foundRoom.opponentMoves = [];

                gameRooms = gameRooms.map((room) => {
                    if (foundRoom.roomID === room.roomID) return foundRoom;
                    return room;
                });
            }
        }

        socket.broadcast.to(foundRoom.roomID).emit("room:sendBackMove", move);

        setTimeout(() => {
            socket.broadcast
                .to(foundRoom.roomID)
                .emit("room:sendBackMove", null);
        }, 450);

        console.log(foundRoom);
    });

    socket.on("room:rematch", () => {
        const foundRoom = findRoomForSocket(gameRooms, socket.id);

        if (!foundRoom) return;
        if (!foundRoom.opponent) return;

        foundRoom.hostMoves = [];
        foundRoom.opponentMoves = [];

        gameRooms = gameRooms.map((room) => {
            if (foundRoom.roomID === room.roomID) return foundRoom;
            return room;
        });

        console.log(
            `players ${foundRoom.host.socketID} and ${foundRoom.opponent.socketID} play rematch!`
        );
    });
});

io.of("/").adapter.on("leave-room", (roomID, id) => {
    if (roomID !== id) {
        io.to(roomID).emit("room:left");
    }
});

io.of("/").adapter.on("delete-room", (roomId: string) => {
    const foundRoom = gameRooms.find((room) => room.roomID === roomId);
    if (foundRoom) {
        gameRooms = gameRooms.filter((x) =>
            filterRooms(x, foundRoom.roomID, () => {
                console.log(`room ${foundRoom.roomID} was deleted`);
            })
        );
    }
});
