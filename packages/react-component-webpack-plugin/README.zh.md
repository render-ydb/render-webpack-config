# @x.render/react-component-webpack-plugin

<p>
<a href="https://www.npmjs.com/package/@x.render/react-component-webpack-plugin" target="__blank"><img src="https://img.shields.io/npm/v/@x.render/react-component-webpack-plugin" alt="NPM version" /></a>

<a href="https://www.npmjs.com/package/@x.render/react-component-webpack-plugin" target="__blank"><img src="https://img.shields.io/npm/dm/%40x.render%2Freact-component-webpack-plugin" alt="NPM Downloads" /></a>

</p>

[English document](./README.md)

## 介绍

react 组件编译插件

## 使用

```bash
npm i @x.render/react-component-webpack-plugin -D
```

```javascript
import ReactComponentWebpackPlugin from "@x.render/react-component-webpack-plugin";

ReactComponentWebpackPlugin.getConfig(compiler, config, options);
```

### Options

| **名称** | **类型**  | **必填** | **默认值** | **描述**                                                                         |
| -------- | --------- | -------- | ---------- | -------------------------------------------------------------------------------- |
| define   | `Object`  | No       |            | 参考 [webpack.DefinePlugin](https://webpack.js.org/plugins/define-plugin/#root)  |
| VConsole | `Boolean` | No       | true       | 开发环境使用 vconsole.js，便于移动端调试                                         |
| alias    | `Object`  | No       |            | 参考 [webpack alias](https://webpack.js.org/configuration/resolve/#resolvealias) |
| entryDir | `Boolean` | No       | src/mobile | 项目入口文件所在目录 （相对于项目根目录路径）                                    |
