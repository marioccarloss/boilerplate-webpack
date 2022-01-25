const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const path = require('path');

module.exports = {
  devtool: 'eval-source-map',
  devServer: {
    port: 3100,
  },
  entry: {
    main: "./src/index.js",
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/i,
        use: [
          {
            loader: "html-loader",
            options: {
							esModule: true
						},
          },
        ],
      },
      {
        test: /\.(mov|mp4)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash:12].[ext]",
            },
          },
        ],
      },
      {
        test: /\.json$/,
        use: "json-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(css|scss)$/,
        include: /src/,
				use: [
          {
            loader: "style-loader",
          },
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            },
          },
          {
            loader: "css-loader",
          },
					{
						loader: "postcss-loader",
						options: {
              postcssOptions: {
                plugins: [
                  [
                    "autoprefixer",
                  ],
                ],
              },
						},
					},
					{
						loader: "import-glob-loader",
					},
					{
						loader: "resolve-url-loader",
					},
					{
						loader: "sass-loader",
						options: {
							implementation: require.resolve("sass")
						}
					}
        ],
      },
    ],
  },

  plugins: [
		new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['dist', '!.gitignore'],
		}),

    new BrowserSyncPlugin({
      host: "localhost",
      port: 3000,
      open: false,
      notify: false
    }),

    new MiniCssExtractPlugin({
      runtime: false,
      filename: "[name].[chunkhash].css",
      chunkFilename: "[id].css",
    }),

    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      chunks: ["main"],
      inject: "body",
    }),

  ],
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),
      new UglifyJsPlugin({
        sourceMap: true,
      }),
    ],
  },
  watch: true,
};
