import { PluginOptions } from "./types";
import setLoaders from "./config/setLoaders";
import setPlugins from "./config/setPlugins";
import {
  Compiler,
  ChainConfig,
  WebpackBuilderPluginClass,
} from "@x.render/render-builder";

export default class StyleWebpackPlugin extends WebpackBuilderPluginClass {
  run(compiler: Compiler, config: ChainConfig, options: PluginOptions) {
    const { context } = compiler;
    const { command } = context;
    const mode = command === "start" ? "development" : "production";
    setLoaders(mode, config, options);
    setPlugins(config, options);
    return config;
  }
}
export * from "./types";
export * from "./constants";
