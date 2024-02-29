# @x.render/optimization-webpack-plugin

<p>
<a href="https://www.npmjs.com/package/@x.render/optimization-webpack-plugin" target="__blank"><img src="https://img.shields.io/npm/v/@x.render/optimization-webpack-plugin" alt="NPM version" /></a>

<a href="https://www.npmjs.com/package/@x.render/optimization-webpack-plugin" target="__blank"><img src="https://img.shields.io/npm/dm/%40x.render%2Foptimization-webpack-plugin" alt="NPM Downloads" /></a>

</p>

[中文文档](./README.zh.md)

## Introduce

Code optimization plugin

## Usage

```bash
npm i @x.render/optimization-webpack-plugin -D
```

```javascript
import OptimizationWebpackPlugin from "@x.render/optimization-webpack-plugin";

OptimizationWebpackPlugin.getConfig(compiler, config, options);
```

### Options

| **Name**                  | **Type** | **Required** | **Default** | **Description**                                                                                     |
| ------------------------- | -------- | ------------ | ----------- | --------------------------------------------------------------------------------------------------- |
| terserPluginOptions       | `Object` | No           |             | refer to [terser-webpack-plugin](https://www.npmjs.com/package/terser-webpack-plugin)               |
| cssMinimizerPluginOptions | `Object` | No           |             | refer to [css-minimizer-webpack-plugin](https://www.npmjs.com/package/css-minimizer-webpack-plugin) |
