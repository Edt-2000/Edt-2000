import { io } from "../communication/sockets";
import { DeviceIPs } from "../../config/config";

console.log("---- Attempting to connect to FastLED socket.....");

const socket = io(`${DeviceIPs.edtFastSock}/ws`, {
    transports: ["websocket"],
});

socket.on("connected", (test: any) => {
    console.log(test);
});

socket.emit("");
