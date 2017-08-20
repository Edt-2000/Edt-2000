const OSC = require('osc-js');

const options = {
    type: 'udp4',
    open: {
        host: 'localhost',
        port: 12345,
        exclusive: false
    },
    send: {
        host: '10.0.0.255',
        port: 12345
    }
};

const osc = new OSC({
    plugin: new OSC.DatagramPlugin(options)
});

let udpActive: boolean = false;

osc.on('open', () => {
    udpActive = true;
});

osc.open({
    port: 12345
});

export function sendToOSC(adress: string, params: number[]): void {
    if(udpActive) osc.send(new OSC.Message(adress, ...params));
}

// /TP/* 4 0 31 0 127 127