import { WebSocket } from "ws";
import { DeviceIPs } from "../../config/config";
import { BehaviorSubject } from "rxjs";

export const powerBarSocket = new WebSocket(`ws://${DeviceIPs.edtPowerBar}/ws`);

export const powerBarConnected$ = new BehaviorSubject<boolean>(false);

powerBarSocket.addEventListener("open", () => {
    powerBarConnected$.next(true);
});

powerBarSocket.addEventListener("close", (event) => {
    powerBarConnected$.next(false);
});

powerBarSocket.addEventListener("error", (error) => {
    console.log(error);
    powerBarConnected$.next(false);
});
