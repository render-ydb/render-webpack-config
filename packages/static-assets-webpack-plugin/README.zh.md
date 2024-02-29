# @x.render/static-assets-webpack-plugin

<p>
<a href="https://www.npmjs.com/package/@x.render/static-assets-webpack-plugin" target="__blank"><img src="https://img.shields.io/npm/v/@x.render/static-assets-webpack-plugin" alt="NPM version" /></a>

<a href="https://www.npmjs.com/package/@x.render/static-assets-webpack-plugin" target="__blank"><img src="https://img.shields.io/npm/dm/%40x.render%2Fstatic-assets-webpack-plugin" alt="NPM Downloads" /></a>

</p>

[English doucment](./README.md)

## 介绍

静态资源处理插件

## 使用

```bash
npm i @x.render/static-assets-webpack-plugin -D
```

```javascript
import StaticAssetsWebpackPlugin from "@x.render/static-assets-webpack-plugin";

StaticAssetsWebpackPlugin.getConfig(compiler, config, options);
```

### Options

| **名称**       | **类型** | **必填** | **默认值**         | **描述**                                                      |
| -------------- | -------- | -------- | ------------------ | ------------------------------------------------------------- |
| imageSizeLimit | `Number` | No       | 8192               | 图像处理的大小限制。 小于该值的图像将以 base64 格式输出。     |
| imageFilename  | `String` | No       | images/[name][ext] | 图片的输出名称                                                |
| fontSizeLimit  | `Number` | No       | 8192               | 字体文件处理的大小限制。 小于该值的图像将以 base64 格式输出。 |
| fontFilename   | `String` | No       | font/[name][ext]   | 字体输出名称                                                  |
