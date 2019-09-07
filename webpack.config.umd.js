const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "production",
  entry: "./index.js",
  output: {
    library: '_$',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, "umd"),
    filename: `long-story-library.min.js`
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
