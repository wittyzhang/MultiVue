const pageMethod = require('./util/getPages.js');
const pages = pageMethod.pages();
const path = require('path')
const webpack = require('webpack')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  transpileDependencies: ["*"],
  /* 指定生成的index.html 输出路径 相对 default: index.html */
  pages,
  /* 部署应用包的基本URL */
  /* baseUrl 从 Vue CLI 3.3 起已弃用 ，请使用publicPath */
  //  baseUrl: process.env.NODE_ENV === "production" ? "./" : "./",
  // publicPath: process.env.NODE_ENV === 'production' ? 'https://h5.miabaobei.com' : '/',
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  /* 生产环境构建文件的目录 defalut: dist */
  outputDir: 'dist',
  /* 放置生成的静态文件目录（js css img） */
  assetsDir: 'assets',
  /* 指定生成的index.html 输出路径 相对 default: index.html */
  // indexPath: 'index.html',
  /* 指定生成文件名中包含hash default: true */
  filenameHashing: true,
  /* 是否保存时 lint 代码 */
  // lintOnSave: process.env.NODE_ENV === "production",
  lintOnSave: false,
  /* 是否使用编译器 default: false */
  runtimeCompiler: false,
  /* 默认babel-loader会忽略node_modules中的文件，你想显示的话在这个选项中列出来 */
  // transpileDependencies: [],
  /* 生产环境的source map */
  productionSourceMap: false,
  // crossorigin: "",
  integrity: false,
  chainWebpack: config => {
    Object.keys(pages).forEach((item, index)=>{
      config.entry(item).add('@babel/polyfill');
    });

    config.module.rule('compile')
    .test(/\.js$/)
    .include
    .add(resolve('src'))
    .add(resolve('test'))
    .add(resolve('node_modules/webpack-dev-server/client'))
    .add(resolve('node_modules'))
    .end()
    .use('babel')
    .loader('babel-loader')
    .options({
      presets: [
        ['@babel/preset-env', {
          modules: false
        }]
      ]
    });

    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 1024 }));
    
  },
  configureWebpack: {
    externals: {
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex':'Vuex',
      'axios':'axios',
      'mint-ui': 'MINT',
      'vue-lazyload': 'lazyLoad',
    },
    resolve: {
      extensions: ['.js', '.json', '.vue', '.scss', '.css', '.png'],
      alias: {
        assets: '@/assets',
        components: '@/components',
        pages: '@/pages',
        utils: '@/utils',
        css: '@/css',
      },
    },
    // 警告 webpack 的性能提示
    performance: {
      hints: false,
      // 入口起点的最大体积
      maxEntrypointSize: 50000000,
      // 生成文件的最大体积
      maxAssetSize: 30000000,
      // 只给出 js 文件的性能提示
      assetFilter(assetFilename) {
        return assetFilename.endsWith('.js');
      },
    },
  },
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: true,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    modules: false,
  },
  devServer: {
    allowedHosts: [
      'h5.miabaobei.com',
    ],
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://m.miabaobei.com/',
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '^/api': '/',
        },
      },
      '/proxy': {
        target: 'http://api.mia.com/',
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '^/proxy': '/',
        },
      },
      '/apilocal': {
        target: 'http://m.miabaobei.com/',
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '^/api': '/',
        },
      },
    },
  },
};
