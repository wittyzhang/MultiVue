# miah5

## 项目运行

### NODE 版本
```
node  >= 10.16.3
```
[传送门](http://nodejs.cn/download/)

### CNPM
```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

### 安装依赖
```
cnpm install
```

### 运行开发模式
```
npm run serve
```

### 编译打包
```
npm run build
```


### 整理和修复文件
```
npm run lint
```

getaddrinfo ENOTFOUND localhost

## 项目目录结构

```
|-- public  任何放置在 public 文件夹的静态资源都会被简单的复制，而不经过 webpack。你需要通过绝对路径来引用它们。  
|   |-- favicon.ico               favicon 图标
|   |-- index.html                页面404 模板
|-- src
|   |-- assets                    静态资源
|   |   |-- logo.png
|   |-- components                公共 components
|   |   |-- HelloWorld.vue
|   |-- css                       公共css
|   |   |-- main.scss
|   |   |-- base
|   |       |-- _animat.scss
|   |       |-- _common.scss
|   |       |-- _css3.scss
|   |       |-- _media.scss
|   |       |-- _media750.scss
|   |       |-- _mixin.scss
|   |       |-- _prefixer.scss
|   |       |-- _reset.scss
|   |       |-- _reset_pc.scss
|   |       |-- weui.css
|   |-- pages                       项目页面文件（只能建页面文件夹）
|   |   |-- newbornzone
|   |   |   |-- newbornzone.vue
|   |   |   |-- js
|   |   |   |   |-- newbornzone.js
|   |   |   |-- router
|   |   |   |   |-- router.js
|   |   |   |-- style
|   |   |   |   |-- newbornzone.scss
|   |   |   |-- template
|   |   |       |-- newbornzone.html
|   |-- utils                       项目页面 utils
|       |-- https.js
|       |-- jsonp.js
|-- util                            脚手架 util
    |-- create_page.js
    |-- getPages.js
├── README.md                       markdown 说明
├── .eslintrc.js                    eslint 配置文件
├── .gitignore                      git 忽略文件
├── .eslintignore                   eslint忽略文件说明
├── package-lock.json               npmb5.x以后自动生成文件 依赖管理树
├── package.json                    npm 项目所需的包管理文件
```

### vue.cofig.js自定义配置
[参考] ( https://cli.vuejs.org/zh/config/ )


## 生成页面
> 先执行 npm run create_page 在执行 npm run serve;

- 如有不合适的地方更改以下js
  - ./create_page.js;
  - ./util/getPages.js;

```
  执行 npm run create_page params1 @params2
  例如：npm run create_page detail true
  /**
  * 创建页面
  * @param {String} detail 文件夹名字
  * @param {Boolean} true 是否创建router.js
  */
```

##  vue cli
```
cnpm install -g @vue/cli
```

## nginx config
```
if (!-e $request_filename){
  rewrite ([^/]+)/(.*)$ /$1/$1.html last;
}
location / {
  set $dir_file '';
  if ($uri ~* "([^/]+)/(.*)$" ){
    set $dir_file $document_root/$1/$1.html;
  }
  if (-f $dir_file){
    rewrite ([^/]+)/(.*)$ /$1/$1.html break
  }
  index  index.html index.htm;
  #error_page  404  /index.html;
}
  location /api {
      proxy_pass http://m.miabaobei.com/;
  }
```
## 图片懒加载
```
cnpm install vue-lazyload  -D

import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
    error:'./static/error.png',
    loading:'./static/loading.png'
})
v-bind:src 修改为 v-lazy 

example: <img class="item-pic" v-lazy="newItem.picUrl"/>
```
[参考]（https://github.com/hilongjw/vue-lazyload )