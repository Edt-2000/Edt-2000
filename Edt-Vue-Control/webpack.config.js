'use strict';

const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const packageJson = require('./package.json');
const vendorDependencies = Object.keys(packageJson['dependencies']);
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const WebpackNotifierPlugin = require('webpack-notifier');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: {
        main:    path.resolve(__dirname, './src/typescript/main.ts'),
        server:  path.resolve(__dirname, './src/typescript/server.ts'),
        // vendor: vendorDependencies
    },
    output: {
        path: path.resolve(__dirname, 'dist/static/js'),
        publicPath: '/assets/js',
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    resolve: {
        extensions: ['.ts', '.js', '.json'],
    },

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                loader: ['babel-loader', 'ts-loader'],
                exclude: [/node_modules/, nodeModulesPath]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    plugins: [
        new WebpackNotifierPlugin({ title: 'Webpack build', excludeWarnings: true })
    ],

    target: 'node',
    externals: [nodeExternals()],
};
