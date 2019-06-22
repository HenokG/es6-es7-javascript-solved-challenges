module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  entry: "./src/js/index.js",
  devServer: {
    publicPath: "/dist/",
    contentBase: __dirname + "/src/"
  }
};
