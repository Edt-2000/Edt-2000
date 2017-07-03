"use strict";

module.exports = {
    nnToOctave: (note: number) => Math.ceil(note / 12),
    nnToNote: (note: number) => (note % 12) + 1,
};