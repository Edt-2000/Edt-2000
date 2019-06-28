const paths = require("./_config").paths;
const gulp = require("gulp");

function copyAssets() {
    return gulp.src(paths.src.assets + "**/*")
        .pipe(gulp.dest(paths.target.assets));
}

function copyAssetsImg() {
    return gulp.src(paths.src.assetsImg + "*")
        .pipe(gulp.dest(paths.target.assets + "img"));
}

function copyHtml() {
    return gulp.src(paths.src.html + "**/*")
        .pipe(gulp.dest(paths.target.html));
}

exports.copyAssets = copyAssets;
exports.copyAssetsImg = copyAssetsImg;
exports.copyHtml = copyHtml;
