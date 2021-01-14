// 如果eslint报错 请查看下面链接查看
// https://cloud.tencent.com/developer/chapter/12618

module.exports = {
  root: true,
  env: {
    'es6': true, // 不指定该项会导致检查某些环境变量报错，如'Promise' is not defined
    'browser': true, // 不指定该项会找不到BOM环境变量
    'node': true, // 不指定该项会找不到Node环境变量
  },
  'extends': [
    // 'plugin:vue/essential',
    // '@vue/airbnb',
    // 'eslint:recommended'
  ],
  rules: {
    'no-console': ['off'],
    'no-debugger': ['off'],
    "max-len": ["off"],
    "no-tabs": ["off"],
    'import/named': ["off"],
    'import/prefer-default-export': ["off"],
    'radix': ["off"],
    "camelcase": ["off"],
    "no-underscore-dangle": ['off'],
    "linebreak-style": [0, "error", "windows"], // 允许windows开发环境
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  }
}
