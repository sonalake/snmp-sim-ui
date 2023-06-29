const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const BUILD_DIR = path.resolve(__dirname, './bundle')
const APP_DIR = path.resolve(__dirname, 'src')

module.exports = {
  entry: {
    app: `${APP_DIR}/index.tsx`,
  },
  devtool: 'source-map',
  devServer: {
    port: 5000,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8180/',
        pathRewrite: { '^/api': '' },
      },
    },
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].[contenthash].js',
    publicPath: '/',
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpe?g|otf|svg)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [new CleanWebpackPlugin(), new HtmlWebpackPlugin({ template: path.resolve(__dirname, './src/index.html') })],
}
