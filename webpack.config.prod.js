const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "production",
  entry: ["./polyfills.js", "./index.js"],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: `_$.js`,
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.(m?jsx?)$/,
        exclude: /(build|umd)/,
        enforce: "pre",
        use: require.resolve("eslint-loader")
      }
    ]
  }
};
