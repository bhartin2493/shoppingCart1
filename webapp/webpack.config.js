const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");

// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  entry: "./src/app.jsx",
  output: {
    path: path.join(__dirname, "/build"),
    filename: "bundle.js",
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        loader: "style-loader ! css-loader",
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: "url-loader",
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
};
