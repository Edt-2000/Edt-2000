const watch = require("./watch");
const browserSync = require("browser-sync");

function serve() {
    browserSync({
        server: {
            baseDir: "./dist",
        },
        port: 3030,
        notify: false,
        open: false,
        ui: {
            port: 3031,
        },
    });

    const reload = (done) => {
        browserSync.reload();
        done();
    };

    const stream = (done) => {
        browserSync.stream();
        done();
    };

    watch.watchStyles();
    watch.watchScripts(reload);
    watch.watchHtml(reload);
}

exports.serve = serve;
