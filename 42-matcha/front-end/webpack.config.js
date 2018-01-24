'use strict'

const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {

  entry: {
    index: ['./index.js']
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: 'http://localhost:3000/'
  },

  resolve: {
    extensions: ['.js', '.json']
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['babel-loader']
      },
      {
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['babel-loader']
      },
      {
        test: /\.json$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['json']
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              root: '/assets/style'
            }
          }
        ]
      },
      {
        test: /\.(scss|sass)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    compress: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    port: 3000,
    historyApiFallback: {
      index: '/'
    }
    // proxy: {
    //   '/*.*': { // Match all URL's with period/dot
    //     target: 'http://[::1]:8080/',  // send to webpack dev server
    //     rewrite: function(req) {
    //       req.url='index.html'  // Send to react app
    //     }
    //   }
    // }
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new ExtractTextPlugin('styles.css')
  ]
}
