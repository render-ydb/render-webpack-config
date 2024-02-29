# @x.render/emit-esm-cjs-webpack-plugin

<p>
<a href="https://www.npmjs.com/package/@x.render/emit-esm-cjs-webpack-plugin" target="__blank"><img src="https://img.shields.io/npm/v/@x.render/emit-esm-cjs-webpack-plugin" alt="NPM version" /></a>

<a href="https://www.npmjs.com/package/@x.render/emit-esm-cjs-webpack-plugin" target="__blank"><img src="https://img.shields.io/npm/dm/%40x.render%2Femit-esm-cjs-webpack-plugin" alt="NPM Downloads" /></a>

</p>

[English document](./README.md)

## 介绍

Code optimization plugin

## 使用

```bash
npm i @x.render/emit-esm-cjs-webpack-plugin -D
```

```javascript
import EmitEsmCjsWebpackPlugin from "@x.render/emit-esm-cjs-webpack-plugin";

EmitEsmCjsWebpackPlugin.getConfig(compiler, config, options);
```

### Options

| **名称** | **类型** | **必填** | **默认值** | **描述**               |
| -------- | -------- | -------- | ---------- | ---------------------- |
| alias    | `Object` | No       |            | 配置模块引用路径的别名 |
