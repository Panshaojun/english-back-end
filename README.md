# 简介
一个英语学习app的后台，基于node平台的[Sails v1](https://sailsjs.com)

# 部署
## 打包前端项目
将配对的前端项目直接运行构建：
```
npm run build
```

## 放进该项目指定目录
将构建的项目放入该目录下：
```
./assets/
```

## 运行
+ 直接安装node执行命令`npm run app`或者`sails lift`;
+ 或者您安装自带node的管理器，诸如PM2这种，直接将启动文件指向该目录下的`app.js`，然后启动即可


