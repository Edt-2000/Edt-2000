const paths         = require("./_config").paths;

const gulp          = require("gulp");
const lint          = require("./lint");
const copy          = require("./copy");
const typescript    = require("./typescript");
const sass          = require("./sass");
const browserSync   = require('browser-sync');

function watchStyles() {
    return gulp.watch(
        paths.src.styles + "**/*.scss",
        gulp.series(lint.lintSass, sass.compileSass, streamStyles)
    );
}

function streamStyles() {
    return gulp.src(paths.target.styles + "*.css")
        .pipe(browserSync.stream());
}

function watchScripts(callback) {
    return gulp.watch(
        [
            paths.src.typescript + "**/*.ts"
        ],
        gulp.series(
            typescript.compile,
            callback
        )
    );
}

function watchHtml(callback) {
    return gulp.watch(
        [
            paths.src.html + "**/*.html"
        ],
        gulp.series(copy.copyHtml, callback)
    );
}

exports.watchStyles = watchStyles;
exports.watchScripts = watchScripts;
exports.watchHtml = watchHtml;
exports.streamStyles = streamStyles;
