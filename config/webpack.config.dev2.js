var webpack = require("webpack");

module.exports = {
  devtool: "cheap-module-eval-source-map",

  entry: {
    app: [
      "eventsource-polyfill",
      "webpack-hot-middleware/client",
      "webpack/hot/only-dev-server",
      "react-hot-loader/patch",
      "./src/index.js"
    ],
    vendor: ["react", "react-dom"]
  },

  output: {
    path: __dirname,
    filename: "[name].js",
    publicPath: "http://0.0.0.0:8000/"
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        // exclude: /node_modules/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: function() {
                return [
                  require("postcss-smart-import"),
                  require("postcss-cssnext")({
                    features: {
                      customProperties: {
                        warnings: false,
                        variables: {
                          headerHeight: "70px",
                          subWidth: "200px",
                          navWidth: "370px",
                          rianColor: "#00da82"
                        }
                      },
                      autoprefixer: {
                        browsers: ["last 2 versions", "safari >= 8", "ie 11", "ios >= 8"],
                        // grid: false
                      }
                    }
                  })
                  // require("precss")
                ];
              }
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: "url-loader"
      },
      {
        test: /\.jsx*$/,
        exclude: [/node_modules/, /.+\.config.js/],
        loader: "babel-loader",
        query: {
          cacheDirectory: true, //cache directory = node_modules/.cache
          presets: ["es2017-node7/webpack2", "react"]
        }
      },
      {
        test: /\.png$/,
        use: { loader: "url-loader", options: { limit: 100000 } }
      },
      {
        test: /\.jpg$/,
        use: "file-loader"
      },
      {
        test: /\.json$/,
        use: "json-loader"
      },
      {
        test: /\.(woff|woff2|ttf|eot)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
        use: "url-loader?limit=100000"
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: ["vendor"]
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ["manifest"]
    }),
    new webpack.DefinePlugin({
      "process.env": {
        CLIENT: JSON.stringify(true),
        NODE_ENV: JSON.stringify("development"),
        AWS_IP: JSON.stringify(process.env.IP || "0.0.0.0")
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true
      },
      mangle: false,
      beautify: true,
      output: {
        comments: true
      }
    })
  ],

  node: {
    fs: "empty"
  }
};
