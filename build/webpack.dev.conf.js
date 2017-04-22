var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
// webpack-merge合并配置文件
var merge = require('webpack-merge')
// baseWebpackConfig能被开发和生产环境公用
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks，即热加载：我们改变源码，在浏览器不用刷新的情况下，也能看到改变后的效果，如果这个过程失败了，则自动刷新浏览器
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

// 将baseWebpackConfig与当前代码合并
module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    // 将process.env替换成config.dev.env中的内容
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage，热加载插件
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true// 将css、js的路径自动添加到打包文件中，css路径默认添加到head标签，js路径默认添加到波电压中
    }),
    new FriendlyErrorsPlugin()
  ]
})
