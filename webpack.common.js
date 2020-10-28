const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  target: "web",

  // Where webpack looks to start building the bundle
  entry: {
    index: "./src/home/js/index.js",
    about: "./src/about/js/about.js",
  },

  // Where webpack outputs the assets and bundles
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },

  // Determine how modules within the project are treated
  module: {
    rules: [
      // JavaScript: Use Babel to transpile JavaScript files
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      // Images: Copy image files to build folder
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
      // Fonts: Copy Fonts to build folder
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
    // Generates an HTML file from a template
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
     // Copy image files to build folder
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/img", to: "assets/img" },

      ],
    }),
  ],
};
