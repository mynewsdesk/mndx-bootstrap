var path = require('path')
module.exports = {
  entry: './mnd.js',
  output: {
    path: path.join(__dirname, 'doc_assets'),
    filename: 'mnd.js'
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
    ]
  }
}
