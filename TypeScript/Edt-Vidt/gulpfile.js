const gulp          = require("gulp");
const clean         = require("./gulp/clean");
const copy          = require("./gulp/copy");
const typescript    = require("./gulp/typescript");
const sass          = require("./gulp/sass");
const serve         = require("./gulp/serve");
const lint          = require("./gulp/lint");
const svg           = require("./gulp/svg");

const build = gulp.series(
    gulp.parallel(
        copy.copyHtml,
        copy.copyAssets,
        copy.copyAssetsImg
    ),
    gulp.parallel(
        sass.compileSass,
        typescript.compile
    )
);

gulp.task("default", gulp.series(
    build,
    serve.serve
));

gulp.task("build", gulp.parallel(
    build
));

gulp.task("icons", gulp.parallel(
    svg.generateUI,
    svg.generateIcons
));

gulp.task("clean", gulp.parallel(
    clean.clean
));
