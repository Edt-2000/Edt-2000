import { WebSocket } from "ws";
import { DeviceIPs } from "../../config/config";
import { BehaviorSubject } from "rxjs";

export const backdropSocket = new WebSocket(`ws://${DeviceIPs.edtBackdrop}/ws`);

export const backdropConnected$ = new BehaviorSubject<boolean>(false);

backdropSocket.addEventListener("open", () => {
    backdropConnected$.next(true);
});

backdropSocket.addEventListener("close", (event) => {
    backdropConnected$.next(false);
});

backdropSocket.addEventListener("error", (error) => {
    console.log(error);
    backdropConnected$.next(false);
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
