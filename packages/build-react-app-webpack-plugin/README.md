# @x.render/build-react-component-webpack-plugin

<p>
<a href="https://www.npmjs.com/package/@x.render/build-react-component-webpack-plugin" target="__blank"><img src="https://img.shields.io/npm/v/@x.render/build-react-component-webpack-plugin" alt="NPM version" /></a>

<a href="https://www.npmjs.com/package/@x.render/build-react-component-webpack-plugin" target="__blank"><img src="https://img.shields.io/npm/dm/%40x.render%2Fbuild-react-component-webpack-plugin" alt="NPM Downloads" /></a>

</p>

[中文文档](./README.zh.md)

## Introduce

Plug-in used by render-builder to compile react components

## Usage

```bash

npm i @x.render/build-react-component-webpack-plugin -D
```

Use the following configuration in the render-builder configuration file

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
  "presets": [["@x.render/build-react-component-webpack-plugin",options]]
}
```

### Options

This plugin supports all configurations of the following plugins:

- [@x.render/emit-esm-cjs-webpack-plugin](https://github.com/render-x/render-webpack-config/blob/master/packages/emit-esm-cjs-webpack-plugin/README.md)
- [@x.render/static-assets-webpack-plugin](https://github.com/render-x/render-webpack-config/blob/master/packages/static-assets-webpack-plugin/README.md)
- [@x.render/style-webpack-plugin](https://github.com/render-x/render-webpack-config/blob/master/packages/style-webpack-plugin/README.md)
- [@x.render/optimization-webpack-plugin](https://github.com/render-x/render-webpack-config/blob/master/packages/optimization-webpack-plugin/README.md)
- [@x.render/react-babel-webpack-plugin](https://github.com/render-x/render-webpack-config/blob/master/packages/react-babel-webpack-plugin/README.md)
- [@x.render/react-component-webpack-plugin](https://github.com/render-x/render-webpack-config/blob/master/packages/react-component-webpack-plugin/README.md)
