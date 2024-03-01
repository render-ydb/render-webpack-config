# @x.render/build-react-component-webpack-preset

<p>
<a href="https://www.npmjs.com/package/@x.render/build-react-component-webpack-preset" target="__blank"><img src="https://img.shields.io/npm/v/@x.render/build-react-component-webpack-preset" alt="NPM version" /></a>

<a href="https://www.npmjs.com/package/@x.render/build-react-component-webpack-preset" target="__blank"><img src="https://img.shields.io/npm/dm/%40x.render%2Fbuild-react-component-webpack-preset" alt="NPM Downloads" /></a>

</p>

[English document](./README.md)

## 介绍

render-builder 用来编译 react 组件的插件

## 使用

```bash

npm i @x.render/build-react-component-webpack-preset -D
```

在 render-builder 配置文件中使用以下配置：

```json
{
  "builder": "webpack",
  "presets": ["@x.render/build-react-component-webpack-preset"]
}
```

or

```json
{
  "builder": "webpack",
  "presets": [["@x.render/build-react-component-webpack-preset",options]]
}
```

### Options

该 preset 支持以下插件的所有配置：

- [@x.render/emit-esm-cjs-webpack-plugin](https://github.com/render-x/render-webpack-config/blob/master/packages/emit-esm-cjs-webpack-plugin/README.md)
- [@x.render/static-assets-webpack-plugin](https://github.com/render-x/render-webpack-config/blob/master/packages/static-assets-webpack-plugin/README.md)
- [@x.render/style-webpack-plugin](https://github.com/render-x/render-webpack-config/blob/master/packages/style-webpack-plugin/README.md)
- [@x.render/optimization-webpack-plugin](https://github.com/render-x/render-webpack-config/blob/master/packages/optimization-webpack-plugin/README.md)
- [@x.render/react-babel-webpack-plugin](https://github.com/render-x/render-webpack-config/blob/master/packages/react-babel-webpack-plugin/README.md)
- [@x.render/react-component-webpack-plugin](https://github.com/render-x/render-webpack-config/blob/master/packages/react-component-webpack-plugin/README.md)
