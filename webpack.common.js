const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/home/js/index.js",
    about: "./src/about/js/about.js",
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              limit: 8000, // Convert images < 8kb to base64 strings
              name: "assets/img/[hash]-[name].[ext]",
            },
          },
        ],
      },
      {
         test: /\.(eot|woff|woff2|ttf|otf)(\?\S*)?$/,
         use: [{
                loader: 'file-loader',

                   options: {
                    name: '[name].[ext]',
                    outputPath: 'assets/fonts/',

                    }
                }]
            },
    ],
  },
  resolve: { extensions: [".js", ".ts"] },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      inject: true,
      chunks: ["index"],
      template: path.resolve(__dirname, "src/home", "index.html"),
    }),
    new HtmlWebpackPlugin({
      filename: "about.html",
      inject: true,
      chunks: ["about"],
      template: path.resolve(__dirname, "src/about", "about.html"),
    }),

    new CopyWebpackPlugin({
      patterns: [
        { from: "src/img", to: "assets/img" },

      ],
    }),
  ],
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
};
