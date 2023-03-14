const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

process.env.BABEL_ENV = "development";
module.exports = {
  mode: "development",
  entry: "./src/index.js", // main js
  devtool: "source-map",
  stats: { warnings: false },

  output: {
    path: path.resolve(__dirname, "dist"), // output folder
    publicPath: "/",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
    // fallback: {
    //   path: false,
    //   stream: false,
    //   http: false,
    //   https: false,
    //   url: false,
    //   util: false,
    //   os: false,
    //   zlib: false,
    //   assert: false,
    //   crypto: false,
    //   tty: false,
    //   fs: false,
    //   net: false,
    //   http2: false,
    //   async_hooks: false,
    //   worker_threads: false,
    //   tls: false,
    //   dns: false,
    // },
  },
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader", // for styles
          "postcss-loader",
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.API_URL": JSON.stringify("http://localhost:3001"),
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: "src/favicon.ico",
      templateParameters: {
        foo: "",
      },
    }),
  ],
};
