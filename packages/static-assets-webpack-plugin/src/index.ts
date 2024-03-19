import {
  Compiler,
  ChainConfig,
  WebpackBuilderPluginClass,
} from "@x.render/render-builder";
import { PluginOptions } from "./types";
import setLoaders from "./config/setLoaders";

export default class StaticAssetsWebpackPlugin extends WebpackBuilderPluginClass {
  run(compiler: Compiler, config: ChainConfig, options: PluginOptions) {
    setLoaders(config, options);
    return config;
  }
}

export * from "./types";
