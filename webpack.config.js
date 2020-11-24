const path = require('path')

module.exports = {
  entry: {
    app: './src/App.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist'
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000
  }
}
