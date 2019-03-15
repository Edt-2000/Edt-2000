const paths = require('./_config').paths;
const gulp  = require('gulp');

function copyAssets() {
    return gulp.src(paths.src.assets + '**/*')
        .pipe(gulp.dest(paths.target.assets));
}

function copyHtml() {
    return gulp.src(paths.src.html + '**/*')
        .pipe(gulp.dest(paths.target.html));
}

exports.copyAssets = copyAssets;
exports.copyHtml = copyHtml;
