import {midiMsgTypes} from "./types";
const easymidi = require('easymidi');
const listenToChannel: number = 15;

const virtualInput = new easymidi.Input('EDT-SLEDT', true);

// Init callbacks array object
let callbacks: any = {};
midiMsgTypes.forEach((midiMsgType: string) => {
    callbacks[midiMsgType] = [];
});

/**
 * Try connecting to a live device
 */
try {
    const liveInput = new easymidi.Input('TouchOSC Bridge'); // TODO: add right one
    console.log('Connected to LIVE MIDI device!');

} catch(error) {
    console.info('No LIVE MIDI device available!');
}

module.exports = {
    addListener: addListener
};

/**
 * Add a listener
 * @param midiMsgType
 * @param callback
 * @return {()=>void}
 */
function addListener(midiMsgType: string, callback: any): any {
    callbacks[midiMsgType].push(callback);
    return ():void => {
        let index = callbacks[midiMsgType].indexOf(callback);
        if (index >= 0) {
            callbacks[midiMsgType].splice(index, 1);
        }
    };

}

