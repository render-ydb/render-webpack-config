# @x.render/static-assets-webpack-plugin

<p>
<a href="https://www.npmjs.com/package/@x.render/static-assets-webpack-plugin" target="__blank"><img src="https://img.shields.io/npm/v/@x.render/static-assets-webpack-plugin" alt="NPM version" /></a>

<a href="https://www.npmjs.com/package/@x.render/static-assets-webpack-plugin" target="__blank"><img src="https://img.shields.io/npm/dm/%40x.render%2Fstatic-assets-webpack-plugin" alt="NPM Downloads" /></a>

</p>

[中文文档](./README.zh.md)

## Introduce

Static resource processing plug-in

## Usage

```bash
npm i @x.render/static-assets-webpack-plugin -D
```

```javascript
import StaticAssetsWebpackPlugin from "@x.render/static-assets-webpack-plugin";

StaticAssetsWebpackPlugin.getConfig(compiler, config, options);
```

### Options

| **Name**       | **Type** | **Required** | **Default**        | **Description**                                                                                          |
| -------------- | -------- | ------------ | ------------------ | -------------------------------------------------------------------------------------------------------- |
| imageSizeLimit | `Number` | No           | 8192               | The size limit for image processing. Images smaller than this value will be output in base64 format.     |
| imageFilename  | `String` | No           | images/[name][ext] | Image output name                                                                                        |
| fontSizeLimit  | `Number` | No           | 8192               | The size limit for font file processing. Images smaller than this value will be output in base64 format. |
| fontFilename   | `String` | No           | font/[name][ext]   | Font output name                                                                                         |
