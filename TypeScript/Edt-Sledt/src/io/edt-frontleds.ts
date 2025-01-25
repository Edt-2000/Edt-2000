import { WebSocket } from "ws";
import { DeviceIPs } from "../../config/config";
import { BehaviorSubject } from "rxjs";

export const frontLedsSocket = new WebSocket(
    `ws://${DeviceIPs.edtFrontleds}/ws`,
);

export const frontLedsConnected$ = new BehaviorSubject<boolean>(false);

frontLedsSocket.addEventListener("open", () => {
    frontLedsConnected$.next(true);
});

frontLedsSocket.addEventListener("close", (event) => {
    frontLedsConnected$.next(false);
});

frontLedsSocket.addEventListener("error", (error) => {
    console.log(error);
    frontLedsConnected$.next(false);
});

/**
 * Gewoon een kleurtje
 *
 * allSinglePartialPulse
 *
 * Deels een kleurtje
 * oneSinglePartialPulse
 *
 * Dubbele kleuren meesturen
 * allDoublePulse
 *
 *
 * oneDoublePulse
 *
 *
 *
 */
