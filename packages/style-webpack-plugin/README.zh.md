# @x.render/style-webpack-plugin

<p>
<a href="https://www.npmjs.com/package/@x.render/style-webpack-plugin" target="__blank"><img src="https://img.shields.io/npm/v/@x.render/style-webpack-plugin" alt="NPM version" /></a>

<a href="https://www.npmjs.com/package/@x.render/style-webpack-plugin" target="__blank"><img src="https://img.shields.io/npm/dm/%40x.render%2Fstyle-webpack-plugin" alt="NPM Downloads" /></a>

</p>

[English document](./README.md)

## 介绍

处理样式的插件

## 使用

```bash
npm i @x.render/style-webpack-plugin -D
```

```javascript
import StyleWebpackPlugin from "@x.render/style-webpack-plugin";

StyleWebpackPlugin.getConfig(compiler, config, options);
```

### Options

| **名称**                          | **类型**  | **必填** | **默认值** | **描述**                                                                                                      |
| --------------------------------- | --------- | -------- | ---------- | ------------------------------------------------------------------------------------------------------------- |
| miniCssExtractPluginLoaderOptions | `Object`  | No       |            | 参考 [mini-css-extract-plugin's loader](https://www.npmjs.com/package/mini-css-extract-plugin#loader-options) |
| miniCssExtractPluginOptions       | `Object`  | No       |            | 参考 [mini-css-extract-plugin](https://www.npmjs.com/package/mini-css-extract-plugin)                         |
| styleLoaderOptions                | `Object`  | No       |            | 参考 [style-loader](https://www.npmjs.com/package/style-loader)                                               |
| cssLoaderOptions                  | `Object`  | No       |            | 参考 [css-loader](https://www.npmjs.com/package/css-loader)                                                   |
| lessLoaderOptions                 | `Object`  | No       |            | 参考 [less-loader](https://www.npmjs.com/package/less-loader)                                                 |
| sassLoaderOptions                 | `Object`  | No       |            | 参考 [sass-loader](https://www.npmjs.com/package/sass-loader)                                                 |
| postcssLoaderOptions              | `Object`  | No       |            | 参考 [postcss-loader](https://www.npmjs.com/package/postcss-loader)                                           |
| inlineStyle                       | `Boolean` | No       | false      | css 代码集成到输出代码中，不会生成单独的 css 文件。                                                           |
| styleSourceMap                    | `Boolean` | No       | true       | 是否生成 cssSourceMap 针对生产环境有效，开发环境始终启用。                                                    |
| useRpx                            | `Boolean` | No       | true       | 当 css 单位使用 rpx 时，插件会转换为 vm 单元，以实现移动端兼容。                                              |
