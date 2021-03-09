const path = require('path');
const fs = require('fs');

module.exports = {
  entry: ['babel-polyfill', './src/public/client.js'],
  output: {
    path: path.join(__dirname, '/src/public/webpack-dist/'),
    filename: 'src/public/bundle.js'
  },
  module: {
    rules: [
      {
        exclude: /(node_modules)/,
        use: [{
          loader: 'babel-loader',
          options: {
            ...JSON.parse(fs.readFileSync(path.resolve(__dirname, '.babelrc'))),
          }
        }]
      }
    ]
  },
  devtool: 'source-map',
  watch: true
};
