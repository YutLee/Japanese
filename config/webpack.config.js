const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const NODE_ENV = process.env.NODE_ENV || 'development';
const isEnvProduction = NODE_ENV !== 'development';
const outputPath = '../dist/' + NODE_ENV;

const env = {
  // 'process.env.NODE_ENV': JSON.stringify('production'),
}

module.exports = {
	mode: isEnvProduction ? 'production' : 'development',
  entry: {
    'polyfill': '@babel/polyfill',
    'app': [
      path.resolve(__dirname, '../src/index.js')
    ]
  },
  output: {
    publicPath: '/',
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[name].[hash].js',
    path: path.resolve(__dirname, outputPath)
  },
  plugins: [
    new webpack.DefinePlugin(env),
		new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
    	filename: 'index.html',
      template: path.resolve(__dirname, '../public/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      // chunkFilename: 'css/[name].[hash].css'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: isEnvProduction ? 'source-map' : 'eval-source-map',
  devServer: {
  	contentBase: outputPath,
    historyApiFallback: true,
    disableHostCheck: true,
    hot: true,
    host: '0.0.0.0',
    port: 5000,
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:4002',
    //     changeOrigin: true
    //   }
    // }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.css$/,
        use: [
          isEnvProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                require('precss'),
                require('postcss-preset-env')({
                  browsers: ['>1%', 'iOS >= 7', 'Android >= 5.0']
                }),
                require('postcss-pxtorem')({
                  rootValue: 12,
                  propList: ['*'],
                  selectorBlackList: ['html']
                }),
                require('cssnano')({preset: 'default'})
              ]
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ],
            plugins: [
              '@babel/plugin-transform-runtime'
            ]
          }
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            outputPath: 'images/',
            limit: 8192
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'font/'
          }
        }
      }
    ]
  }
};
