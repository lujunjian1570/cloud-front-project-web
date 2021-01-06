cloud-front-project-web
===

- 文档地址：[https://doc.ygzykj.com:5602/pages/viewpage.action?pageId=14615136](https://doc.ygzykj.com:5602/pages/viewpage.action?pageId=14615136)
- UI框架：[ant-design-vue](https://www.antdv.com/)

## 项目使用

### yarn
```bash
$ yarn install
$ yarn serve
```
### or npm
```
$ npm install
$ npm run serve
```

## 项目打包

### yarn
```bash
生产环境：
$ yarn build
测试环境：
$ yarn build:stage
```
### or npm
```
生产环境：
$ npm run build
测试环境：
$ npm run build:stage
```

## 代码检测
检测代码是否规范

### yarn
```bash
$ yarn lint
```
### or npm
```
$ npm run lint
```

## 代码修复
自动修复不规范的代码

### yarn
```bash
$ yarn lint:fix
```
### or npm
```
$ npm run lint:fix
```

## 单元测试
此命令可以进行单元测试

### yarn
```bash
$ yarn test:unit
```
### or npm
```
$ npm run test:unit
```

## 删除node_modules依赖
window系统手动删除node_modules目录较慢，可以使用该命令来进行快速删除

### yarn
```bash
$ yarn clean
```
### or npm
```
$ npm run clean
```