# @x.render/react-app-webpack-plugin

<p>
<a href="https://www.npmjs.com/package/@x.render/react-app-webpack-plugin" target="__blank"><img src="https://img.shields.io/npm/v/@x.render/react-app-webpack-plugin" alt="NPM version" /></a>

<a href="https://www.npmjs.com/package/@x.render/react-app-webpack-plugin" target="__blank"><img src="https://img.shields.io/npm/dm/%40x.render%2Freact-app-webpack-plugin" alt="NPM Downloads" /></a>

</p>

[English document](./README.md)

## 介绍

编译 react 应用的插件

## 使用

```bash
npm i @x.render/react-app-webpack-plugin -D
```

```javascript
import ReactAppWebpackPlugin from "@x.render/react-app-webpack-plugin";

ReactAppWebpackPlugin.getConfig(compiler, config, options);
```

### Options

| **名称**    | **类型**  | **必填** | **默认值** | **描述**                                                                                                        |
| ----------- | --------- | -------- | ---------- | --------------------------------------------------------------------------------------------------------------- |
| define      | `Object`  | No       |            | refer to [webpack.DefinePlugin](https://webpack.js.org/plugins/define-plugin/#root)                             |
| VConsole    | `Boolean` | No       | true       | 开发环境会自动使用 vconsole                                                                                     |
| alias       | `Object`  | No       |            | refer to [webpack alias](https://webpack.js.org/configuration/resolve/#resolvealias)                            |
| splitChunks | `Object`  | No       |            | refer to [optimizationsplitchunks](https://webpack.js.org/plugins/split-chunks-plugin/#optimizationsplitchunks) |
| useAnalyzer | `Boolean` | No       | false      | refer to [css-minimizer-webpack-plugin](https://www.npmjs.com/package/webpack-bundle-analyzer)                  |
