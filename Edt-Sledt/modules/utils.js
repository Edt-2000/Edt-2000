"use strict";
module.exports = {
    nnToOctave: note => Math.ceil(note / 12),
    nnToNote: note => (note % 12) + 1
};
