const gulp = require("gulp");
const webpack = require("webpack");
const gulpWebpack = require("webpack-stream");
const paths = require("./_config").paths;
const config = require("../webpack.config.js");

function compile() {
    return gulp.src("./")
        .pipe(gulpWebpack(config, webpack))
        .pipe(gulp.dest(paths.target.scripts));
}

exports.compile = compile;
