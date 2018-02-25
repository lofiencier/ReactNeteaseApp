"use strict";

module.exports = function(env) {
  // 生成环境下webpack使用-p参数开启代码压缩
  // webpack[-dev-server]使用--env dev参数指定编译环境
  var isDev = env == "dev";
  var path = require("path");
  var webpack = require("webpack");
  var CleanWebpackPlugin = require("clean-webpack-plugin");
  var HtmlWebpackPlugin = require("html-webpack-plugin");
  var WebkitPrefixer = require("autoprefixer");
  var BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;

  var sourcedir = path.resolve(__dirname, "app/"); // 源码和资源文件的放置位置
  var outputdir = path.resolve(__dirname, "../public"); // 编译结果的放置位置
  var theme = require(path.resolve(__dirname, "./theme.js"));
  console.log("theme:", theme);
  var webContextRoot = "/"; // 应用的实际访问路径，默认是'/'
  var hasValue = function(item) {
    return item != null;
  };
  var axios = require("axios");
  return {
    devtool: "source-map",
    // contentBase: "./public",
    devServer: {
      port: 8080,
      historyApiFallback: true,
      proxy: {
        "*": {
          target: "http://localhost:3000",
          changeOrigin: true
        }
      }
    },
    resolve: {
      // 让less-loader等插件能找到以~相对定位的资源
      modules: [sourcedir, "node_modules"]
    },
    entry: {
      main: [
        // 编译新版本js的新api(如Promise)，主要是让IE11能够执行编译后的代码
        "babel-polyfill",
        //使用react-hot-loader@3.0.0-beta.6，
        // 搭配webpack-dev-server --hot命令实现react组件的hot reload
        isDev ? "react-hot-loader/patch" : null,
        path.resolve(sourcedir, "index.jsx")
      ].filter(hasValue)
    },
    output: {
      path: outputdir,
      filename: isDev ? "js/[name].js" : "js/[name]_[chunkhash:8].js",
      // 使用require.ensure造成的延迟加载的代码文件
      chunkFilename: isDev
        ? "js/chunk_[id]_[name].js"
        : "js/chunk_[name]_[chunkhash:8].js",
      publicPath: webContextRoot
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: [
            {
              // 编译新版本js语法为低版本js语法
              loader: "babel-loader",
              options: {
                presets: [
                  // 编译es2015版本的js
                  [
                    "babel-preset-es2015",
                    {
                      modules: false
                    }
                  ],
                  "babel-preset-stage-0",
                  // 编译jsx
                  "babel-preset-react"
                ],

                plugins: [
                  // 支持热加载react组件
                  isDev ? "react-hot-loader/babel" : null,
                  // 减少重复的编译后的辅助方法
                  "babel-plugin-transform-runtime",
                  "babel-plugin-transform-decorators-legacy",
                  // 按需加载组件的代码和样式
                  [
                    "babel-plugin-import",
                    {
                      libraryName: "antd",
                      style: true
                    }
                  ]
                ].filter(hasValue)
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                // 第三方组件未以module方式引入css，所以不能在全局开启css module
                modules: false
              }
            },
            { loader: "postcss-loader", options: { plugins: [WebkitPrefixer] } }
          ]
        },
        {
          test: /\.less$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: false
              }
            },
            {
              loader: "postcss-loader",
              options: { plugins: [WebkitPrefixer] }
            },
            {
              loader: "less-loader",
              options: {
                modules: false,
                modifyVars: theme
              }
            }
          ]
        },
        {
          test: /\.(jpg|png|gif|svg)$/,
          use: {
            loader: "url-loader",
            options: {
              // 编码为dataUrl的最大尺寸
              limit: 10000,
              // 输出路径，相对于publicPath
              outputPath: "./static/images/",
              name: isDev ? "[name].[ext]" : "[name]_[hash:8].[ext]"
            }
          }
        },
        {
          test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
          use: {
            loader: "url-loader",
            options: {
              limit: 10000,
              mimetype: "application/font-woff",
              outputPath: "./static/fonts/",
              name: isDev ? "[name].[ext]" : "[name]_[hash:8].[ext]"
            }
          }
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          use: {
            loader: "url-loader",
            options: {
              limit: 10000,
              mimetype: "application/octet-stream",
              outputPath: "./static/fonts/",
              name: isDev ? "[name].[ext]" : "[name]_[hash:8].[ext]"
            }
          }
        }
      ]
    },
    plugins: [
      new webpack.ProvidePlugin({
        axios: "axios",
        "window.axios": "axios"
      }),
      // momentjs包含大量本地化代码，需筛选
      // 复制无需编译的文件至输出目录
      // 自动填充js、css引用进首页
      new HtmlWebpackPlugin({
        title: "wzp react",
        template: path.resolve(outputdir, "index.html"),
        inject: "body" // Inject all scripts into the body
      }),
      // 设置环境变量
      new webpack.DefinePlugin({
        process: {
          env: {
            // process.env.NODE_ENV==="production"
            // 应用代码里，可凭此判断是否运行在生产环境
            NODE_ENV: isDev
              ? JSON.stringify("development")
              : JSON.stringify("production")
          }
        }
      }),
      // print more readable module names on HMR updates
      isDev ? new webpack.NamedModulesPlugin() : null,
      // 先清理输出目录
      isDev ? null : new CleanWebpackPlugin([outputdir]),
      // 排除特定库
      isDev ? null : new webpack.IgnorePlugin(/.*/, /react-hot-loader$/),
      // 输出报告，查看第三方库的大小
      isDev
        ? null
        : new BundleAnalyzerPlugin({
            analyzerMode: "static",
            reportFilename: "report.html",
            openAnalyzer: true,
            generateStatsFile: false
          })
    ].filter(hasValue)
  };
};
