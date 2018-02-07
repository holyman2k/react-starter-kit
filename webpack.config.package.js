const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const build = {
    path: path.join(__dirname, 'build/js')
}

module.exports = {
    context: path.join(__dirname, 'src'),
    devtool: false,
    entry: './app/main.jsx',


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
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        "css-loader", // translates CSS into CommonJS modules
                        {
                            loader: "postcss-loader", // Run post css actions
                            options: {
                                options: {
                                    plugins: () => [require("precss"), require("autoprefixer")]
                                },
                            }
                        },
                        "sass-loader" // compiles Sass to CSS
                    ]
                }),
            },
        ]
    },


    output: {
        path: build.path,
        filename: 'main.min.js'
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new CleanWebpackPlugin(['build'], {
            verbose: true,
            dry: false,
        }),
        new CopyWebpackPlugin([
            { from: 'index.html', to: '../index.html' },
        ]),
        new webpack.optimize.UglifyJsPlugin({
            output: { comments: false },
            compress: {
                sequences: true,
                dead_code: true,
                conditionals: true,
                booleans: true,
                unused: true,
                if_return: true,
                join_vars: true,
                drop_console: true
            },
            mangle: false,
            sourcemap: false,
        }),
        new ExtractTextPlugin('../css/style.css'),
    ],
};