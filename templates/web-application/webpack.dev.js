// @ts-check
import path from "node:path";
import { fileURLToPath } from "node:url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import open from "open";

import { loadSwcConfig } from "./loadSwcConfig.js";

/** @type {import("webpack").Configuration} */

class OpenBrowser {
    isFirstCompile = true;

    apply(compiler) {
        compiler.hooks.done.tap("done", async () => {
            if (this.isFirstCompile) {
                console.log("\nOpening browser at: \"http://localhost:8080/\"");

                await open("http://localhost:8080/");
            }
            this.isFirstCompile = false;
        });
    }
}

export default {
    mode: "development",
    target: "web",
    devtool: "eval-cheap-module-source-map",
    devServer: {
        port: 8080,
        historyApiFallback: true,
        hot: true
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
                test: /\.(js|ts|tsx)$/i,
                exclude: /node_modules/,
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
        new OpenBrowser()
    ],
    optimization: {
        runtimeChunk: true,
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false
    }
};
