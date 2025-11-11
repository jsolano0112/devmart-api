import { on } from "events";
import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";

const app = express();
const httpServer = http.createServer(app);

const sockectServerIO = new Server(httpServer, {

    connectionStateRecovery: {},
    cors: {
        origin: "*",
    },
});

const socketEvents = {
    onConnection: "connection",
    onDisconnect: "disconnect",
    onMessage: "chat message",
}

sockectServerIO.on(socketEvents.onConnection, (socket: Socket) => {
    console.log("New client connected", socket.id);

    //puede faltar la interfaz del payload
    socket.on(socketEvents.onDisconnect, (payload) => {
        console.log("Client disconnected", payload);
    })



    socket.on(socketEvents.onMessage, (payload) => {
        console.log("[ON CHAT MESSAGE]", JSON.stringify(payload));
        sockectServerIO.emit(socketEvents.onMessage, payload);
    })
});


const PORT = 5000;

httpServer.listen(PORT, () => {
    console.log(`Socket server running at http://localhost:${PORT}/`);
});