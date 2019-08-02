module.exports = {
  mode: "production",
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: `_$.js`,
    libraryTarget: 'commonjs2'
  }
};
