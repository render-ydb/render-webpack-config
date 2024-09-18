import {
  Compiler,
  ChainConfig,
  WebpackBuilderPluginClass,
  Json,
} from '@x.render/render-builder';
import BuildReactComponentPlugin from '@x.render/build-react-component-webpack-plugin';
import path = require('path');

class BuildComponentSetterPlugin extends WebpackBuilderPluginClass {
  run(compiler: Compiler, config: ChainConfig, options: Json): ChainConfig {
    const { context } = compiler;
    const { rootDir, pkg } = context;

    BuildReactComponentPlugin.getConfig(compiler, config, {
      useRpx: false,
      miniCssExtractPluginOptions: {
        filename: 'setter.css',
      },
      cssLoaderOptions: {
        modules: {
          localIdentName: `${pkg.name}.${pkg.version}.[contenthash:8]`,
        },
      },
    });

    // 指定入口文件
    config.entryPoints.clear();
    config.merge({
      entry: { index: path.resolve(rootDir, './src/setter.js') },
    });

    const outputPath = path.resolve(rootDir, 'build/dist');
    config.output
      .path(outputPath)
      .filename('setter.js')
      .library(`${pkg.name}-${pkg.version}-setter`)
      .libraryTarget('umd')
      .umdNamedDefine(true);
    return config;
  }
}

export default BuildComponentSetterPlugin;
