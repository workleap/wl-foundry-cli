// @ts-check
import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";

import { loadSwcConfig } from "./loadSwcConfig.js";

/** @type {import("webpack").Configuration} */
export default {
    mode: "production",
    target: "web",
    entry: "./src/index.tsx",
    output: {
        path: path.resolve("dist"),
        // The trailing / is very important, otherwise paths will not be resolved correctly.
        publicPath: "http://localhost:8080/",
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.(js|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "swc-loader",
                    options: await loadSwcConfig("./swc.build.js")
                }
            },
            {
                // https://stackoverflow.com/questions/69427025/programmatic-webpack-jest-esm-cant-resolve-module-without-js-file-exten
                test: /\.js$/,
                resolve: {
                    fullySpecified: false
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                type: "asset/resource"
            }
        ]
    },
    resolve: {
        // So Webpack can map ".js" extension files in import to their original file.
        // For more info, view https://github.com/webpack/webpack/issues/13252
        extensionAlias: {
            ".js": [".ts", ".tsx", ".js"]
        },
        // Must add ".js" for files imported from node_modules.
        extensions: [".js", ".ts", ".tsx", ".css"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                minify: TerserPlugin.swcMinify,
                // `terserOptions` options will be passed to `swc` (`@swc/core`)
                // Link to options - https://swc.rs/docs/config-js-minify
                terserOptions: {
                    compress: true,
                    mangle: true
                }
            })
        ]
    }
};
