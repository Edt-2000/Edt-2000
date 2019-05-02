"use strict";
import { socketPort } from "../../../Shared/config";
import * as SocketIO from "socket.io";
import { fromEvent } from "rxjs";

const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
    origins: "*:*",
    transports: ["websocket"],
});

server.listen(socketPort);

export const controlSocket$ = fromEvent<SocketIO.Socket>(
    io.of("/control"),
    "connection",
);
export const vidtSocket$ = fromEvent<SocketIO.Socket>(
    io.of("/vidt"),
    "connection",
);
