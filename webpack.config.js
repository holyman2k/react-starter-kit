const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");

const build = {
    path: path.resolve(__dirname, "src")
}

module.exports = {
    context: path.resolve(__dirname, "src"),
    devtool: "inline-sourcemap",
    entry: "./app/main.jsx",

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
                test: /\.css$/,
                use: ExtractTextPlugin.extract({ use: "css-loader", publicPath: "../" }),
            },
            {
                test: /\.(scss)$/,
                use: [{
                    loader: 'style-loader', // inject CSS to page
                },
                {
                    loader: 'css-loader', // translates CSS into CommonJS modules
                },
                {
                    loader: 'postcss-loader', // Run post css actions
                    options: {
                        plugins: function () { // post css plugins, can be exported to postcss.config.js
                            return [
                                require('precss'),
                                require('autoprefixer')
                            ];
                        }
                    }
                },
                {
                    loader: 'sass-loader' // compiles Sass to CSS
                }],
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
        new ExtractTextPlugin({
            filename: "css/style.css"
        }),
    ],
};