import path from 'path';
import webpack, { Configuration as WebpackConfiguration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const isDevelopment = process.env.NODE_ENV !== 'production';

const config: Configuration = {
  name: 'sleact-clone',
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'eval-source-map' : 'hidden-source-map',

  entry: './src/index',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'static/[name].[contenthash].js',
    clean: true,
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@layouts': path.resolve(__dirname, 'src/layouts'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@typings': path.resolve(__dirname, 'src/typings'),
      '@apis': path.resolve(__dirname, 'src/apis'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: 'defaults or ie 10',
                  debug: isDevelopment,
                },
              ],
              ['@babel/preset-react', { runtime: 'automatic' }],
              '@babel/preset-typescript',
            ],
            plugins: ['@emotion'],
            env: {
              development: {
                plugins: [require.resolve('react-refresh/babel')],
              },
            },
          },
        },
      },
      {
        test: /\.css?$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new webpack.EnvironmentPlugin({ NODE_ENV: isDevelopment ? 'development' : 'production' }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      chunks: ['main'],
      publicPath: '/',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'public',
          filter: (filePath) => path.normalize(filePath) !== path.normalize(path.join(__dirname, '/public/index.html')),
        },
      ],
    }),
  ],
  devServer: {
    static: './build',
    historyApiFallback: true,
    proxy: {
      '/api/': {
        target: 'http://localhost:3095',
        changeOrigin: true,
      },
      '/uploads/': {
        target: 'http://localhost:3095',
        changeOrigin: true,
      },
      '/socket.io/': {
        target: 'ws://localhost:3095',
        ws: true,
      },
    },
  },
};

if (config.mode == 'development') {
  config.plugins?.push(new ReactRefreshWebpackPlugin());
  config.plugins?.push(new BundleAnalyzerPlugin());
} else if (config.mode == 'production') {
  config.plugins?.push(new BundleAnalyzerPlugin({ analyzerMode: 'static' }));
}

export default config;
