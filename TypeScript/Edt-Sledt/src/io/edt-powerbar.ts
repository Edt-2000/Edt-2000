import { DeviceIPs } from "../../config/config";

const pbSocket = new WebSocket(`ws://${DeviceIPs.edtPowerBar}`);

pbSocket.onopen((event) => {
    console.log("Connected", event);
});
