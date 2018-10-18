const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const webpackConfig = (mode) => {
  const isDev = mode === 'development';
  const isProd = mode === 'production';

  const outputPath = isDev ? '/' : path.resolve(__dirname, 'public/dist');
  const publicPath = isDev ? 'http://localhost:3000' : '/dist';

  let plugins = [
    new ManifestPlugin(),
    new HtmlWebpackPlugin({
      template: './src/template-index.html',
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output [optional]
      filename: isDev ? 'styles.css' : 'styles.[contentHash].css',
    }),
  ];

  if (isProd) {
    plugins = plugins.concat([new CleanWebpackPlugin(['public/dist']),
      new webpack.HashedModuleIdsPlugin()]);
  }

  if (isDev) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  return {
    entry: './src/index.js',
    output: {
      path: `${outputPath}`,
      publicPath: `${publicPath}`,
      filename: (isDev) ? '[name].js' : '[name].[contentHash].js',
      // Files created by loaders aren't affected.
      // In this case you would have to try the specific loader's available options.
      //  '[name].bundle.js' ->  entry name:
      // '[id].bundle.js' -> internal chunk id
      // '[name].[hash].bundle.js' ->  unique hash generated for every build
      // '[chunkhash].bundle.js' -> using hashes based on each chunks' content
      // '[contenthash].bundle.css' -> Using hashes generated for extracted content
      // substitution which is the hash of the content of a file, which is different for each asset.
      // --
      // chunkFilename: This option determines the name of non-entry chunk files
      // Note that these filenames need to be
      // generated at runtime to send the requests for chunk.
    },
    resolve: {
      alias: {
        src: path.join(__dirname, 'src'),
      },
      extensions: ['*', '.js', '.jsx'],
    },
    optimization: {
      // namedModules: true,
      // [for-debug] Tells webpack to use readable module identifiers for better debugging
      runtimeChunk: 'single',
      // split out runtime code into a separate chunk(s)
      splitChunks: {
        chunks: 'initial',
        // "initial" -> optimizes modules/splitting imported statically,
        // and produces new chuncks that must loaded specifically which increase loading time
        // "all" -> Tries to optimize statics as dynamics modules imports
        // "async" -> optimizes modules imported dynamically, default confiugurations are
        // optimized to work better with this option. No need to load chuncls/bundles separately
        // it does load it only when is required.
        cacheGroups: {
          vendors: {
            name: 'vendor'
          },
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true
          }
        },
      },
      noEmitOnErrors: true,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        // {
        //   test: /\.css$/,
        //   use: ['style-loader', 'css-loader'],
        // },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'],
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
              },
            },
          ],
        },
      ],
    },
    devServer: {
      contentBase: path.join(__dirname, '/'),
      port: 3000,
      publicPath: `${publicPath}`,
      hotOnly: true,
    },
    plugins,
  };
};

module.exports = (env, argv) => webpackConfig(argv.mode);
