const path = require('path');

module.exports = {
  entry: {
    client: './src/client/index.js'
  },

  output: {
    filename: './dist/[name].js'
  },

  devServer: {
    contentBase: path.join(__dirname, "./assets/"),
    port: 9000
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: ['transform-object-rest-spread']
          }
        }
      }
    ]
  },
  devtool: 'inline-source-map'
};