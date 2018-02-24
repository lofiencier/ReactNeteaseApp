var webpack = require("webpack");
var path = require("path");
var axios = require("axios");
// var ExtractTextPlugin =require ('extract-text-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, "app/index.jsx"), //很直白，渲染层的唯一入口,无需require 'path'即可使用__dirname?存疑
  output: {
    path: path.join(__dirname, "../public"), //出口
    filename: "bundle.js" //可以添加hash值，id,name,使用不同名字的bundle时，可以使用html-webpack-plugin这个webpack插件生成生成一个自动引用你打包后的JS文件的新index.html,放在此webpack.config.js后面的plugins中
  },
  devtool: "eval-source-map", //生成source-map，方便调试，具体有什么用？
  devServer: {
    contentBase: "./public", //本地服务器所加载的页面所在的目录
    historyApiFallback: true, //不跳转
    inline: true,
    proxy: {
      "*": {
        target: "http://localhost:3000",
        changeOrigin: true
      }
    }
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/, //单个时如/\.jsx$/,或者说/\.jsx?$/直接代表了.js和.jsx  ???
        use: {
          loader: "babel-loader"
        },
        exclude: /node_modules/
      },
      {
        test: /(\.css|\.less)$/,
        use: ["style-loader", "css-loader", "less-loader"]
        // loader: ExtractTextPlugin.extract({
        //   // fallback: "style-loader",
        //   use: ["style-loader", "css-loader", "less-loader"]
        // })
      },
      // {
      //   test: /\.module\.css$/,
      //   loader: ExtractTextPlugin.extract(
      //     'css?sourceMap&-restructuring&modules&localIdentName=[local]___[hash:base64:5]!' +
      //     'postcss'
      //   ),
      // },
      // {
      //   test: /\.module\.less$/,
      //   loader: ExtractTextPlugin.extract(
      //     'css?sourceMap&modules&localIdentName=[local]___[hash:base64:5]!!' +
      //     'postcss!' +
      //     `less-loader?{"sourceMap":true,"modifyVars":${JSON.stringify(theme)}}`
      //   ),
      // },
      {
        test: /.(png|svg|jpg|gif)$/,
        use: ["url-loader?limit=2048&name=./static/images/[name].[ext]?[hash]"]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      axios: "axios",
      "window.axios": "axios"
    })
  ]
};
