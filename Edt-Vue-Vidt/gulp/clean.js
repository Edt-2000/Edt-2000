const targets   = require("./_config").clean;
const del       = require("del");

function clean() {
    return del(targets);
}

exports.clean = clean;
