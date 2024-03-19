# @x.render/build-react-admin-webpack-plugin

<p>
<a href="https://www.npmjs.com/package/@x.render/build-react-admin-webpack-plugin" target="__blank"><img src="https://img.shields.io/npm/v/@x.render/build-react-admin-webpack-plugin" alt="NPM version" /></a>

<a href="https://www.npmjs.com/package/@x.render/build-react-admin-webpack-plugin" target="__blank"><img src="https://img.shields.io/npm/dm/%40x.render%2Fbuild-react-admin-webpack-plugin" alt="NPM Downloads" /></a>

</p>

[中文文档](./README.zh.md)

## Introduce

plug-in for render-builder to compile backend projects in react

## Usage

```bash

npm i @x.render/build-react-admin-webpack-plugin -D
```

Use the following configuration in the render-builder configuration file

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

| **Name**    | **Type**  | **Required** | **Default** | **Description**                                                                                                 |
| ----------- | --------- | ------------ | ----------- | --------------------------------------------------------------------------------------------------------------- |
| splitChunks | `Object`  | No           |             | refer to [optimizationsplitchunks](https://webpack.js.org/plugins/split-chunks-plugin/#optimizationsplitchunks) |
| useAnalyzer | `Boolean` | No           | false       | refer to [css-minimizer-webpack-plugin](https://www.npmjs.com/package/webpack-bundle-analyzer)                  |

This plugin also supports all configurations of the following plugins:

- [@x.render/static-assets-webpack-plugin](https://github.com/render-x/render-webpack-config/blob/master/packages/static-assets-webpack-plugin/README.md)
- [@x.render/style-webpack-plugin](https://github.com/render-x/render-webpack-config/blob/master/packages/style-webpack-plugin/README.md)
- [@x.render/optimization-webpack-plugin](https://github.com/render-x/render-webpack-config/blob/master/packages/optimization-webpack-plugin/README.md)
- [@x.render/react-babel-webpack-plugin](https://github.com/render-x/render-webpack-config/blob/master/packages/react-babel-webpack-plugin/README.md)
