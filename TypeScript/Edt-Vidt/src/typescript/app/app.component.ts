import Vue from "vue";
import Component from "vue-class-component";

import { router } from "../services/router.service";
import * as io from "socket.io-client";
import { vidtSocketConfig } from "../../../../Shared/config";
import { Actions$, nextActionFromMsg } from "../../../../Shared/actions";
import { vidtPresets } from "../../../../Shared/vidt-presets";
import Socket = SocketIOClient.Socket;

@Component({
    name: "app",
    template: require("./app.template"),
    router: router,
})
export default class App extends Vue {
    public subscription: any;
    private socket: Socket;

    constructor() {
        super();
        this.socket = io(vidtSocketConfig.url, vidtSocketConfig.options);

        this.socket.on("connection", () => {
            // console.log('socket connectioned');
        });

        this.socket.on("toVidt", nextActionFromMsg);
    }

    mounted() {
        this.subscription = Actions$.prepareVidt.subscribe(
            (preset: number) => {
                router.push({ path: "/" + vidtPresets[preset] });
            },
        );
    }

    destroyed() {
        if (typeof this.subscription !== "undefined") {
            this.subscription.unsubscribe();
        }
    }
}
