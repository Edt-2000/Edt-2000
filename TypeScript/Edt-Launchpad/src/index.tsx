const Launchpad = require('launchpad-mini'),
    pad = new Launchpad();

pad.connect().then(() => {
    pad.reset(2);
    pad.on('key', k => {
        pad.col(k.pressed ? pad.red : pad.green, k);
    });
}).catch(() => console.log('NO LAUNCHPAD CONNECTED!'));
