var webpack = require("webpack");
var path = require("path");

module.exports = {
  entry: path.join(__dirname, "app/index.jsx"), //很直白，渲染层的唯一入口,无需require 'path'即可使用__dirname?存疑
  output: {
    path: path.join(__dirname, "../public"), //出口
    filename: "bundle.js" //可以添加hash值，id,name,使用不同名字的bundle时，可以使用html-webpack-plugin这个webpack插件生成生成一个自动引用你打包后的JS文件的新index.html,放在此webpack.config.js后面的plugins中
  },
  devtool: "eval-source-map", //生成source-map，方便调试，具体有什么用？
  devServer: {
    //可能是webpack-dev-server那个的？当你没有使用react/nodejs/等时开的服务器？
    contentBase: "./public", //本地服务器所加载的页面所在的目录
    historyApiFallback: true, //不跳转
    inline: true //实时刷新
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/, //单个时如/\.jsx$/,或者说/\.jsx?$/直接代表了.js和.jsx  ???
        use: {
          loader: "babel-loader"
        },
        exclude: /node_modules/ //include/exclude:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）；
        //这里还有一个可选参数，query:xxx?
        //例如option:{xxx}??
      },
      {
        test: /(\.css|\.less)$/,
        use: ["style-loader", "css-loader", "less-loader"],
        include: "/node_modules/antd/dist/"
      },
      {
        test: /.(png|svg|jpg|gif)$/,
        use: ["url-loader?limit=2048&name=./static/images/[name].[ext]?[hash]"]
      }
    ]
  }
};
