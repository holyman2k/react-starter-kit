const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const build = {
    path: path.resolve(__dirname, "src")
}

module.exports = {
    context: path.resolve(__dirname, "src"),
    devtool: "inline-sourcemap",
    entry: "./app/main.jsx",
    mode: "development",
    devServer: {
        inline: true,
        port: 3000,
        hot: true,
        contentBase: "src",  // New
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    query: {
                        presets: ["react", "stage-0", "es2015"],
                        plugins: ["react-html-attrs"],
                    },
                },
            },
            {
                test: /\.(eot|ttf|woff2|woff|svg)$/,
                use: "file-loader?name=font/[name].[ext]",
            },
            {
                test: /\.(css|sass|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')
                            ],
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
        ]
    },

    output: {
        path: build.path,
        filename: "js/main.min.js",
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new MiniCssExtractPlugin({
            filename: "css/style.css"
        }),
    ],
};