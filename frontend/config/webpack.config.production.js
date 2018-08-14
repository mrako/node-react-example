const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const MinifyPlugin = require('babel-minify-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const WebpackCdnPlugin = require('webpack-cdn-plugin');

// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const config = require('./webpack.config.base');

// eslint-disable-next-line global-require, import/order
const GITHASH = process.env.GITHASH || require('child_process').execSync('git rev-parse --short HEAD').toString().trim();

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  'process.env.ENDPOINT': JSON.stringify(process.env.ENDPOINT || 'http://0.0.0.0:9000/api'),
};

module.exports = merge(config, {
  mode: 'production',
  entry: {
    main: ['@babel/polyfill', path.join(__dirname, '../src/client.jsx')],
  },
  plugins: [
    new CleanWebpackPlugin(['build/*'], { root: path.resolve(__dirname, '..') }),
    new CopyWebpackPlugin([{ from: path.join(__dirname, '../src/public/images'), to: 'images' }]),
    new CopyWebpackPlugin([{ from: path.join(__dirname, '../src/public/locales'), to: 'locales' }]),
    new WebpackCdnPlugin({
      modules: {
        react: [
          { name: 'react', var: 'React', path: 'umd/react.production.min.js' },
          { name: 'react-dom', var: 'ReactDOM', path: 'umd/react-dom.production.min.js' },
        ],
      },
      publicPath: '/node_modules',
    }),
    new MinifyPlugin({}, { sourceMap: null }),
    new webpack.DefinePlugin(GLOBALS),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en|fi/),
    // new BundleAnalyzerPlugin(),
  ],
  module: {
    rules: [
      {
        test: /i18n\.js$/,
        loader: 'string-replace-loader',
        options: {
          search: '[githash]',
          replace: GITHASH,
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  },
});
