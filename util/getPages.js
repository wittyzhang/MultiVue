/*
 * @Author: your name
 * @Date: 2020-09-28 10:26:01
 * @LastEditTime: 2021-01-14 17:27:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MultiVue/util/getPages.js
 */
const glob = require('glob');
// 模块Glob: glob主要用处为筛选文件
const fs = require('fs');
const path = require('path');
// jmia.js / header.js  版本号
const jmia_version = '20200903';
const header_version = '20200902';
/* 
* example： npm run serve --maicaijie or npm run serve --maicaijie,item,link_game
* 
* 运行单个页面
* npm run serve --[page_name]
*
* 运行多个页面
* npm run serve --[page_name, page_name1, page_name1]
*
* 运行全部页面
* npm run serve
*/

let original = [];
let argv = null;
if (process && process.env && process.env.npm_config_argv) {
  // 获取命令行参数 Array
  const configArgv = JSON.parse(process.env.npm_config_argv);
        original = configArgv.original.slice(1);
}
// npm run serve 生效
if (original[0] == 'serve' && original[1]) {
  argv = original[1].replace(/-/g, '');
  if (argv !== '') {
    argv = argv.split(',');
  } else {
    console.log('\x1B[33m%s\x1b[0m:', `参数有误`);
    process.exit();
  }
}

function init_default_config(fileName) {
  return {
    "babel-polyfill":"babel-polyfill",
    entry: `src/pages/${fileName}/js/${fileName}.js`,  // 入口文件 
    // 模板来源
    template: `src/pages/${fileName}/template/${fileName}.html`, // vue 模板
    // 在 dist/index.html 的输出
    filename: process.env.NODE_ENV === 'development' ? `${fileName}.html` : `${fileName}/${fileName}.html`,
    // 提取出来的通用 chunk 和 vendor chunk。
    chunks: ['chunk-vendors', 'chunk-common', fileName],
    jmia_version,
    header_version,
    favicon: `./public/favicon.ico`,
  };
}
module.exports = {
  pages() {
    let pages = {};
    // 本地开发
    if (argv && argv.length) {
      argv.forEach((item)=>{
        let file= `${path.join(__dirname, '../src/pages/')}${item}/`; // 拼接 文件夹名 生成文件夹
        if (item && fs.existsSync(file)) {
          const fileName = item;
          pages[fileName] = init_default_config(fileName);
        } else if (item != null) {
          console.log('\x1B[33m%s\x1b[0m:', `参数有误 或 没有${item}目录`);
          process.exit();
        }
      })
      return pages;
    } else {
      // 线上
      glob.sync('./src/pages/*').forEach(filepath => { // 获取pages下的所有文件夹循环 example：./src/pages/detail
        let fileList = filepath.split('/') // 分割路径
        let fileName = fileList[fileList.length - 1] // 获取到 detail 文件夹名
        pages[fileName] = init_default_config(fileName);
      });
      return pages;
    }
  },
};

