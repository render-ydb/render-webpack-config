# @x.render/react-app-webpack-plugin

<p>
<a href="https://www.npmjs.com/package/@x.render/react-app-webpack-plugin" target="__blank"><img src="https://img.shields.io/npm/v/@x.render/react-app-webpack-plugin" alt="NPM version" /></a>

<a href="https://www.npmjs.com/package/@x.render/react-app-webpack-plugin" target="__blank"><img src="https://img.shields.io/npm/dm/%40x.render%2Freact-app-webpack-plugin" alt="NPM Downloads" /></a>

</p>

[中文文档](./README.zh.md)

## Introduce

Compile plugin for react app

## Usage

```bash
npm i @x.render/react-app-webpack-plugin -D
```

```javascript
import ReactAppWebpackPlugin from "@x.render/react-app-webpack-plugin";

ReactAppWebpackPlugin.getConfig(compiler, config, options);
```

### Options

| **Name** | **Type**  | **Required** | **Default** | **Description**                                                                                     |
| -------- | --------- | ------------ | ----------- | --------------------------------------------------------------------------------------------------- |
| define   | `Object`  | No           |             | refer to [webpack.DefinePlugin](https://webpack.js.org/plugins/define-plugin/#root)                 |
| VConsole | `Boolean` | No           | true        | Development environment plus vconsole.js                                                            |
| alias    | `Object`  | No           |             | refer to [webpack alias](https://webpack.js.org/configuration/resolve/#resolvealias)                |
| entryDir | `Boolean` | No           | src/mobile  | Project entry file directory （The entry directory is relative to the project root directory path） |
