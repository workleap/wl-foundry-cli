// @ts-check
import path from "node:path";
import { fileURLToPath } from "node:url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";

import { loadSwcConfig } from "./loadSwcConfig.js";
import webpack from "webpack";

/** @type {(env: {mock: boolean}) => Promise<import("webpack").Configuration>} */
const config = async env => {
    return {
        mode: "development",
        target: "web",
        // For optimization reasons see: https://webpack.js.org/guides/build-performance/#devtool
        devtool: "eval-cheap-module-source-map",
        devServer: {
            port: 8080,
            historyApiFallback: true,
            hot: true,
            open: true
        },
        entry: "./src/index.tsx",
        output: {
            // The trailing / is very important, otherwise paths will not be resolved correctly.
            publicPath: "http://localhost:8080/"
        },
        cache: {
            type: "filesystem",
            allowCollectingMemory: true,
            buildDependencies: {
                config: [fileURLToPath(import.meta.url)]
            },
            cacheDirectory: path.resolve("node_modules/.cache/webpack")
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/i,
                    // Use include for optimization reason, see: https://webpack.js.org/guides/build-performance/#loaders
                    include: path.resolve("src"),
                    use: {
                        loader: "swc-loader",
                        options: await loadSwcConfig("./swc.dev.js")
                    }
                },
                {
                    test: /\.css$/i,
                    include: path.resolve("src"),
                    use: ["style-loader", "css-loader"]
                },
                {
                    test: /\.(png|jpe?g|gif)$/i,
                    include: path.resolve("src"),
                    type: "asset/resource"
                }
            ]
        },
        resolve: {
            // Must add ".js" for files imported from node_modules.
            extensions: [".js", ".ts", ".tsx", ".css"]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./public/index.html"
            }),
            new ReactRefreshWebpackPlugin(),
            new webpack.DefinePlugin({
                MOCK: JSON.stringify(env.mock)
            })
        ],
        optimization: {
            // For optimization reasons see: https://webpack.js.org/guides/build-performance/#avoid-extra-optimization-steps
            runtimeChunk: true,
            removeAvailableModules: false,
            removeEmptyChunks: false,
            splitChunks: false
        }
    };
};

export default config;
