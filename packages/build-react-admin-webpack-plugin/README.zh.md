# @x.render/build-react-admin-webpack-plugin

<p>
<a href="https://www.npmjs.com/package/@x.render/build-react-admin-webpack-plugin" target="__blank"><img src="https://img.shields.io/npm/v/@x.render/build-react-admin-webpack-plugin" alt="NPM version" /></a>

<a href="https://www.npmjs.com/package/@x.render/build-react-admin-webpack-plugin" target="__blank"><img src="https://img.shields.io/npm/dm/%40x.render%2Fbuild-react-admin-webpack-plugin" alt="NPM Downloads" /></a>

</p>

[English document](./README.md)

## 介绍

render-builder 的插件，用于在 React 中编译后端项目

## 使用

```bash

npm i @x.render/build-react-admin-webpack-plugin -D
```

在 render-builder 配置文件中使用以下配置：

```json
{
  "builder": "webpack",
  "presets": ["@x.render/build-react-component-webpack-plugin"]
}
```

or

```json
{
  "builder": "webpack",
  "presets": [["@x.render/build-react-admin-webpack-plugin",options]]
}
```

### Options

| **名称**    | **类型**  | **必填** | **默认值** | **描述**                                                                                                        |
| ----------- | --------- | -------- | ---------- | --------------------------------------------------------------------------------------------------------------- |
| splitChunks | `Object`  | No       |            | refer to [optimizationsplitchunks](https://webpack.js.org/plugins/split-chunks-plugin/#optimizationsplitchunks) |
| useAnalyzer | `Boolean` | No       | false      | refer to [css-minimizer-webpack-plugin](https://www.npmjs.com/package/webpack-bundle-analyzer)                  |

该插件还支持以下插件的所有配置：

- [@x.render/static-assets-webpack-plugin](https://github.com/render-x/render-webpack-config/blob/master/packages/static-assets-webpack-plugin/README.md)
- [@x.render/style-webpack-plugin](https://github.com/render-x/render-webpack-config/blob/master/packages/style-webpack-plugin/README.md)
- [@x.render/optimization-webpack-plugin](https://github.com/render-x/render-webpack-config/blob/master/packages/optimization-webpack-plugin/README.md)
- [@x.render/react-babel-webpack-plugin](https://github.com/render-x/render-webpack-config/blob/master/packages/react-babel-webpack-plugin/README.md)
