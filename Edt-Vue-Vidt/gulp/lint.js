const paths     = require("./_config").paths;

const gulp      = require("gulp");
const sasslint  = require("gulp-sass-lint");
// const phplint   = require("gulp-phplint");
const newer     = require("gulp-newer");

function lintSass() {
    return gulp.src(paths.src.styles + "**/*.scss")
        .pipe(newer(paths.target.styles))
        .pipe(sasslint())
        .pipe(sasslint.format())
}
//
// function lintTheme() {
//     return gulp.src(paths.src.wpTheme + "**/*.php")
//         .pipe(newer(paths.target.wpTheme))
//         .pipe(phplint("", {}))
//         .pipe(phplint.reporter(function(file) {
//             const report = file.phplintReport || {};
//             if (report.error) {
//                 console.error(report.message + " on line " + report.line + " of " + report.filename);
//             }
//         }));
// }
//
// function lintPlugin() {
//     return gulp.src(paths.src.wpPlugin + "**/*.php")
//         .pipe(newer(paths.target.wpPlugin))
//         .pipe(phplint("", {}))
//         .pipe(phplint.reporter(function(file) {
//             const report = file.phplintReport || {};
//             if (report.error) {
//                 console.error(report.message + " on line " + report.line + " of " + report.filename);
//             }
//         }));
// }
exports.lintSass = lintSass;

// exports.lintPHP = gulp.series(lintTheme, lintPlugin);
