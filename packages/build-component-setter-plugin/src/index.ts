import {
  Compiler,
  ChainConfig,
  WebpackBuilderPluginClass,
  Json,
} from '@x.render/render-builder';
import StyleWebpackPlugin from '@x.render/style-webpack-plugin';
import OptimizationWebpackPlugin from '@x.render/optimization-webpack-plugin';
import ReactBabelWebpackPlugin from '@x.render/react-babel-webpack-plugin';
import path = require('path');

class BuildComponentSetterPlugin extends WebpackBuilderPluginClass {
  run(compiler: Compiler, config: ChainConfig, options: Json): ChainConfig {
    const { context } = compiler;
    const { rootDir, pkg } = context;
    // 对setter进行样式处理
    StyleWebpackPlugin.getConfig(compiler, config, {
      useRpx: false,
      loaderOptions: {
        miniCssExtractPluginOptions: {
          filename: 'setter.css',
        },
      },
    });
    // babel处理
    ReactBabelWebpackPlugin.getConfig(compiler, config, {});
    // 资源优化
    OptimizationWebpackPlugin.getConfig(compiler, config, {});

    // 指定入口文件
    config.entryPoints.clear();
    config.merge({
      entry: { index: path.resolve(rootDir, __dirname, '../src/setter.js') },
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
