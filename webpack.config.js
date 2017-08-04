
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const BabiliPlugin = require("babili-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './js/index.js',
  output: {
    filename: './dist/bundle.js'
  },
  devtool: 'source-map',
  // debug: true,
  module: {
    rules: [
      {
        test: /.*\/js\/.*\.js$/, 
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['stage-2']
            }
          }
        ]
      },
      {
        test: /.*\/css\/.*\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
            loader: "css-loader",
            options: {
              minimize: true
            }
          }]
        })
      },
      { 
        test: /\.(png|jpg|gif)$/, 
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name:'../images/[name].[ext]'
            }
          }
        ]
      }
    ]
  }
  ,
  plugins: [
    new ExtractTextPlugin("./dist/index.css")
    // ,
    // new UglifyJsPlugin()
  ]
}


