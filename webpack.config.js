const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'examples/src/index.jsx'),
  output: {
    path: path.join(__dirname, 'examples/dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        resolve: { extensions: ['.js', '.jsx'] },
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './examples/src/index.html',
      filename: './index.html',
      favicon: 'examples/src/images/favicon.ico'
    })
  ],
  devServer: {
    port: 3007
  }
};
