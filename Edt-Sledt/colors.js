const OSC = require('osc-js');

var hue = 0;

module.exports = {
    noteIndexToTOP: function (index) {
        "use strict";
        let OSCTOP = {
            1: new OSC.Message('/TP', 2, 0, 14, 50, 255, 255, 127),
            2: new OSC.Message('/TP', 2, 2, 4, 70, 255, 255, 127),
            3: new OSC.Message('/TP', 2, 15, 29, 90, 255, 255, 127),
            4: new OSC.Message('/TP', 2, 7, 8, 110, 255, 255, 127),
            5: new OSC.Message('/TP', 2, 9, 10, 130, 255, 255, 127),
            6: new OSC.Message('/TP', 2, 4, 9, 150, 255, 255, 127),
            7: new OSC.Message('/TP', 2, 2, 6, 170, 255, 255, 127),
            8: new OSC.Message('/TP', 2, 0, 6, 190, 255, 255, 127),
            9: new OSC.Message('/TP', 2, 22, 29, 210, 255, 255, 127),
            10: new OSC.Message('/TP', 2, 19, 20, 230, 255, 255, 127),
            11: new OSC.Message('/TP', 2, 21, 22, 250, 255, 255, 127),
            12: new OSC.Message('/TP', 2, 23, 24, 270, 255, 255, 127),
            'default': new OSC.Message('/TP', 2, 0, 29, 0, 0, 0, 0)
        };

        console.log('Note: ', index);
        return index in OSCTOP ? OSCTOP[index] : OSCTOP['default'];
    },
    velocityToTOP: function (velocity, note) {
        "use strict";

        return new OSC.Message('/TP', 100, 0, 29, 14, 0, 128, velocity * 2);
    },
    noteIndexToCycle: function (note) {
        "use strict";
        if (note === 1) {
            hue = (hue + 50) % 255;
        }
        return new OSC.Message('/TP', 1, 0, 29, hue, 255, 255);
    }
};