module.exports = {
  entry: {
    server: './src/server/index.js'
  },

  output: {
    filename: './dist/[name].js'
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

  devtool: 'inline-source-map',
  target: 'node'
};