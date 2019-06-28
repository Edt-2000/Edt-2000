"use strict";

const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const packageJson = require("./package.json");
const vendorDependencies = Object.keys(packageJson["dependencies"]);
const nodeModulesPath = path.resolve(__dirname, "node_modules");
const WebpackNotifierPlugin = require("webpack-notifier");

module.exports = {
    mode: "development",
    entry: {
        main: path.resolve(__dirname, "./src/typescript/main.ts"),
        // vendor: vendorDependencies
    },
    output: {
        path: path.join(__dirname, "dist/static/js"),
        publicPath: "/assets/js",
        filename: "[name].js",
        chunkFilename: "[name].js",
    },
    resolve: {
        extensions: [".ts", ".js", ".json"],
        alias: {
            "vue$": "vue/dist/vue.esm.js",
        },
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                },
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]?[hash]",
                },
            },
        ],
    },
    plugins: [
        new WebpackNotifierPlugin({title: "Webpack build", excludeWarnings: true}),
    ],
};

// module.exports = function(env) {
//     return require(`./webpack.config.${env}.js`)();
// };
