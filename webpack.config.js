var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
process = require("process")
  module.exports = {
    entry: {
      src: [
        "./src"
      ]
    },
    output: {
      path: path.resolve("build"),
      publicPath: "/",
      filename: "[hash:8].[name].js"
    },
    resolve: {
      root: path.resolve("src/"),
      extensions: ["", ".js", ".cjsx", ".coffee"]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "src/index.html",
        favicon: "src/vendor/favicon.ico",
        inject: "body"
      }),
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
      }),
      new ExtractTextPlugin("[hash:8].[name].css")
    ],
    module: {
      loaders: [
        { test: /\.jsx?$/, exclude: /node_modules/, loaders: ["react-hot-loader", "babel-loader"] },
        { test: /\.cjsx$/, loaders: ['coffee-loader', 'cjsx-loader'] },
        { test: /\.coffee$/, loader: 'coffee-loader' },
        { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
        { test: /\.(png|jpg|gif)$/, loader: "url-loader?limit=100000" },

        //for bootstrap
        {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
        {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
        {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
        {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
      ]
    },
    externals: {
    }
  };
