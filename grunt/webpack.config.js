var webpack = require('webpack');

module.exports = {
  entry: './hologram/mnd.js',
  output: {
    path: '<%= PUBLIC %>',
    filename: 'mnd.js'
  },
  module: {
    loaders: [
      {
        test: /\.coffee$/,
        exclude: /node_modules/,
        loaders: ['jsx-loader', 'coffee-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules|hologram/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.coffee'],
    alias: {
      components: __dirname + '/../<%= SRC %>/react-components',
      utils: '/src/js/utils'
    }
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin()
  ]
};
