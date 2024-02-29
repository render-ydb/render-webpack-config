import {
  Compiler,
  WebpackBuilderPluginClass,
  ChainConfig,
  Json,
} from '@x.render/render-builder';
import setLoaders from './config/setLoaders';
import setPlugins from './config/setPlugins';
import getBabelConfig = require('./babel');

export default class OptimizationWebpackPlugin extends WebpackBuilderPluginClass {
  run(compiler: Compiler, config: ChainConfig, options: Json) {
    const { context } = compiler;
    const { command } = context;
    const mode = command === 'start' ? 'development' : 'production';
    setLoaders(mode, config, options);
    if (mode === 'development') {
      setPlugins(config);
    }
    return config;
  }
}

export const getBaseBabelConfig = getBabelConfig;
