const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const path = require("path");

const build = {
	path: path.join(__dirname, "build")
};

module.exports = {
	context: path.join(__dirname, "src"),
	devtool: false,
	entry: "./app/main.jsx",
	mode: "production",

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader",
					query: {
						presets: ["@babel/preset-env", "@babel/preset-react"],
						plugins: ["react-html-attrs"]
					}
				}
			},
			{
				test: /\.(eot|ttf|woff2|woff|svg)$/,
				use: "file-loader?name=font/[name].[ext]"
			},
			{
				test: /\.(css|sass|scss)$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							plugins: () => [require("precss"), require("autoprefixer")]
						}
					},
					"sass-loader"
				]
			}
		]
	},

	output: {
		path: build.path,
		filename: "./js/main.min.js",
		chunkFilename: "./js/[name].main.js",
		publicPath: "/"
	},

	plugins: [
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("production")
			}
		}),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery"
		}),
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin([
			{ from: "index.html", to: "index.html" },
			{ from: "country.json", to: "country.json" },
			{ from: "_redirects", to: "_redirects", toType: "file" }
		]),

		new MiniCssExtractPlugin({
			filename: "css/style.css"
		})
	],
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				uglifyOptions: {
					output: {
						comments: false,
						beautify: false
					},
					mangle: true,
					sourcemap: false
				}
			})
		]
	}
};
