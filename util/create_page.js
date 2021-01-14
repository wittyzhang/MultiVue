#!/usr/bin/env node;
// 具体使用方法 详见REANDME.md;
const fs = require('fs');
const path = require('path');

process.stdin.setEncoding('utf8');

let fileArray = ['.html', '.vue', '.scss', '.js']; // 默认四个文件
let file_name_args = process.argv.slice(2)[0] // 可以通过process.argv这里获得你输入文件夹参数
let create_router = process.argv.slice(3)[0] // 可以通过process.argv这里获得你输入是否创建router.js参数
let Ie_edge = `<meta http-equiv="X-UA-Compatible" content="IE=edge">`;
let device = `<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">`;
let icon = `<script src="/header.js?v=<%= htmlWebpackPlugin.options.header_version%>"></script>`;
let jweixin = `<script src="https://res.wx.qq.com/open/js/jweixin-1.4.0.js"></script>`;
let jmia = `<script src="https://mfile03.miyabaobei.com/resources/scripts/m/jmia.js?v=<%= htmlWebpackPlugin.options.jmia_version%>"></script>`;
let vue = '<script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js"></script>';
let router = '<script src="https://cdn.jsdelivr.net/npm/vue-router@3.1.2/dist/vue-router.min.js"></script>';
let axios = '<script src="https://cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js"></script>';
let mint_ui = '<script src="https://cdn.jsdelivr.net/npm/mint-ui@2.2.13/lib/index.js"></script>';
let mint_ui_css = '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mint-ui@2.2.13/lib/style.min.css">';

if (!file_name_args) {  // 判断是否输入 文件名
  console.log('\x1B[33m%s\x1b[0m:', '请输入正确的参数! example: npm run create_page pageName true[是否创建router]');
  return;
}
function create_file_content (key, fileName) { // 创建 各个文件的内容
  let fileContent = {
    '.html': {
      dirName: 'template',
    content: `<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n${Ie_edge}\n${device}\n${icon}\n${jweixin}\n${jmia}\n${mint_ui_css}\n${vue}\n${router}\n${axios}\n${mint_ui}\n<title>${fileName}</title>\n</head>\n<body>\n  <div id="${fileName}"></div>\n</body>\n</html>`,
    },
    '.vue': {
      dirName: '', // 不需要文件夹
      content: `<template>\n  <div id="${fileName}">${fileName}</div>\n</template>\n<script>\nexport default {};\n</script>\n<style lang="scss" scoped>\n @import './style/${fileName}.scss';\n\n</style>\n`,
    },
    '.scss': { // 子文件名
      dirName: 'style', // 子文件夹名
      content: `#${fileName}{\n\n}`, // 子文件内容
    },
    '.js': {
      dirName: 'js',
      content: `import App from '../${fileName}.vue';\nimport 'babel-polyfill';\nimport Es6Promise from 'es6-promise';\nrequire('es6-promise').polyfill();\nEs6Promise.polyfill();\nimport '@/css/main.scss';\n\nVue.config.productionTip = false;\nnew Vue({\n  render: h => h(App),\n}).$mount('#${fileName}');`,
    },
    'router.js': {
      dirName: 'router',
      content: `const router = new VueRouter({\n  mode: 'history',\n  routes: []\n});\nexport default router;`,
    },
  };
  if (create_router === 'true'){ // 是否 import router
    fileContent['.js']['content'] = `import router from '../router/router.js';\nimport App from '../${fileName}.vue';\nimport 'babel-polyfill';\nimport Es6Promise from 'es6-promise';\nrequire('es6-promise').polyfill();\nEs6Promise.polyfill();\nimport '@/css/main.scss';\n\nVue.config.productionTip = false\nnew Vue({\n router,\n render: h => h(App)\n }).$mount('#${fileName}')`;
  }
  return fileContent[key];
};

if (create_router === 'true'){ // 是否创建router
  fileArray.push('router.js');
}
stdout(`确认创建 ${file_name_args} 文件夹吗(y or n)？`, function(file_name_args) {
  let dirName = path.join(__dirname, '../src/pages/'); // 指定pages文件夹
  let fileName = `${dirName}${file_name_args}/`; // 拼接 文件夹名 生成文件夹
  if (!fs.existsSync(fileName)) { // 判断将要创建的文件夹是否存在 
    fs.mkdirSync(fileName); // 创建 父文件夹
    fileArray.forEach((item, index)=>{
      let fileContent_item = create_file_content(item, file_name_args);
      let _file_name = fileName;
      if (fileContent_item.dirName) {
        _file_name += fileContent_item.dirName;
        if (!fs.existsSync(_file_name)){
          fs.mkdirSync(_file_name); // 创建 子文件夹
        }
      } 
      if (item === 'router.js') { // 是否创建router
        fs.writeFileSync(`${_file_name}/${item}`, create_file_content(item, null).content); // 创建文件并写入内容
      } else {
        fs.writeFileSync(`${_file_name}/${file_name_args}${item}`, fileContent_item.content); // 创建文件并写入内容
      }
    })
    console.log('\x1B[36m%s\x1B[0m', `${file_name_args}创建成功`);
    return false;
  };
  console.log('\x1B[33m%s\x1b[0m:', `创建失败： ${file_name_args} 文件夹已存在, 请查看文件目录确认：${dirName}`);
}, function(){
  console.log('\x1B[33m%s\x1b[0m:', 'see you later');
});

function stdout(text, success, error){
  process.stdout.write(text);
  process.stdin.on('data',(input)=>{
    input = input.toString().trim();
    if (['Y', 'y', 'YES', 'yes'].indexOf(input) > -1) {
      success && success(file_name_args);
      process.exit();
    };
    if (['N', 'n', 'NO', 'no'].indexOf(input) > -1) {
      error && error(file_name_args);
      process.exit();
    };
  });
}
