import * as SocketIO from "socket.io";
import { fromEvent } from "rxjs";
import { server } from "./server";

// tslint:disable-next-line:no-var-requires
export const io = require("socket.io")(server, {
    origins: "*:*",
    transports: ["websocket"],
    allowEIO3: true,
});

export const controlSocket$ = fromEvent<SocketIO.Socket>(
    io.of("/control"),
    "connection",
);

export const vidtSocket$ = fromEvent<SocketIO.Socket>(
    io.of("/vidt"),
    "connection",
);

export const launchpadSocket$ = fromEvent<SocketIO.Socket>(
    io.of("/launchpad"),
    "connection",
);

export const thomasSocket$ = fromEvent<SocketIO.Socket>(
    io.of("/thomas"),
    "connection",
);
