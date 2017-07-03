"use strict";
const easymidi = require('easymidi');
const listenToChannel = 15;
const virtualInput = new easymidi.Input('EDT-SLEDT', true); // Ableton MIDI target
/**
 * Try connecting to a live device
 */
try {
    const liveInput = new easymidi.Input('TouchOSC Bridge'); // TODO: add right one
    console.log('Connected to LIVE MIDI device!');
}
catch (error) {
    console.info('No LIVE MIDI device available!');
}
