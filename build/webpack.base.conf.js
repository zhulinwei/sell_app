var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  // 入口配置
  entry: {
    app: './src/main.js'
  },
  // 输出配置
  output: {
    // path表示文件输出的路径，这里指向了dist文件夹
    path: config.build.assetsRoot,
    // filename指的是输出的文件名称，使用[name].js，可保持原文件的名称
    filename: '[name].js',
    // publicPath表示静态资源请求的绝对路径
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  // resolve用来配置文件中require
  resolve: {
    // extensions指的是我们可以在require中自动补全文件的路径
    extensions: ['.js', '.vue', '.json'],
    // 别名，可以缩短模块的字符串的长度
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'common': resolve('src/common'),
      'components': resolve('src/components')
    }
  },
  module: {
    rules: [
      {
        // 注意enfore，代表在所以loader前先加载此loader
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        // 当图片大小小于10KB的时候，打包到编译后的文件中，如果超过10KB则单独生成文件
        options: {
          limit: 10000,
          // 单独生成的文件在img下
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
