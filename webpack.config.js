const webpack = require("webpack")
const path = require('path')
const main = {
  mode: 'development',
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, 'static'),
    filename: 'main.js'
  },
  target: 'electron-main',
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'static'),
    inline: true,
    hot: true,
    host: '127.0.0.1',
    port: 9000,
    stats: 'errors-only',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: path.resolve(__dirname, 'node_modules'),
      loader: 'babel-loader',
      query:{
        presets: ['env', 'stage-0'],
      }
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      process: {
        env: {
          'TARGET_ENV': JSON.stringify('development'),
        }
      },
    }),
  ]
}

const react = {
  mode: 'development',
  entry: './renderer/index.js',
  output: {
    path: path.resolve(__dirname, 'static'),
    filename: 'renderer.js',
    publicPath: '/',
  },
  resolve: {
    modules: ['renderer', 'node_modules'],
    extensions: ['.js', '.json'],
  },
  // for dev
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'static'),
    inline: true,
    hot: true,
    host: '127.0.0.1',
    port: 9000,
    stats: 'errors-only',
  },
  target: 'electron-renderer',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: path.resolve(__dirname, 'node_modules'),
      loader: 'babel-loader',
      query:{
        presets: ['react', 'env', 'stage-0'],
        plugins: [
          'react-hot-loader/babel',
          'transform-decorators-legacy',
          'transform-class-properties',
        ],
      }
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      process: {
        env: {
          'TARGET_ENV': JSON.stringify('development'),
        }
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
}

module.exports = [main, react]
