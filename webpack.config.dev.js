const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

process.env.NODE_ENV = "development"; //this is important for babel to know that we are using development mode

module.exports = {
  mode: "development",
  target: "web",
  devtool: "source-map",
  entry: "./src/index",
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "bundle.js",
  },
  devServer: {
    port: 3000,
    // contentBase: path.join(__dirname, "dist"),
    // compress: true,
    static: "./dist",
    // stats: "minimal",
    // overlay: true, //send errors in the browser
    // historyApiFallback: true, // all request will be sent to index.html, we can send deep links and all will be maanaged by router
  },
  // optimization: {
  //   runtimeChunk: "single",
  // },
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
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"], //it is easier to put eslint into webpack, so it watches filechanges.
      },
      {
        test: /\.(css)$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
