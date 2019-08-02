module.exports = {
  mode: "production",
  entry: "./index.js",
  output: {
    library: '_$',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, "umd"),
    filename: `long-story-library.min.js`
  }
};
