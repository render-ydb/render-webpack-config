# @x.render/optimization-webpack-plugin

<p>
<a href="https://www.npmjs.com/package/@x.render/optimization-webpack-plugin" target="__blank"><img src="https://img.shields.io/npm/v/@x.render/optimization-webpack-plugin" alt="NPM version" /></a>

<a href="https://www.npmjs.com/package/@x.render/optimization-webpack-plugin" target="__blank"><img src="https://img.shields.io/npm/dm/%40x.render%2Foptimization-webpack-plugin" alt="NPM Downloads" /></a>

</p>

[English document](./README.md)

## 介绍

代码优化插件

## 使用

```bash
npm i @x.render/optimization-webpack-plugin -D
```

```javascript
import OptimizationWebpackPlugin from "@x.render/optimization-webpack-plugin";

OptimizationWebpackPlugin.getConfig(compiler, config, options);
```

### Options

| **名称**                  | **类型** | **必填** | **默认值** | **描述**                                                                                        |
| ------------------------- | -------- | -------- | ---------- | ----------------------------------------------------------------------------------------------- |
| terserPluginOptions       | `Object` | No       |            | 参考 [terser-webpack-plugin](https://www.npmjs.com/package/terser-webpack-plugin)               |
| cssMinimizerPluginOptions | `Object` | No       |            | 参考 [css-minimizer-webpack-plugin](https://www.npmjs.com/package/css-minimizer-webpack-plugin) |
