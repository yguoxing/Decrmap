const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  target: 'web',
  entry: './src/interface.js',
  devtool: 'eval-source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  plugins: [
    new uglify(),
    new webpack.ProvidePlugin({
      ol: 'openlayers'
    }),
    new htmlPlugin({
    minify: {
      removeAttributeQuotes: true
    },
    hash: true
    // template: './resources/index.html'
  })],
  module: {
    rules: [{
      test: /\.css$/,
      use: [ 'style-loader', 'css-loader' ]
    },{
      test: /\.(png|jsp|gif)/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 500000
        }
      }]
    },{
      test: /\.less$/,
      use: [{
        loader: "style-loader" 
      }, {
        loader: "css-loader" 
      }, {
        loader: "less-loader"
      }]
    }]
  }
};