import {
  Compiler,
  ChainConfig,
  WebpackBuilderPluginClass,
} from "@x.render/render-builder";
import getbaseConfig from "./configs/base";
import getDevConfig from "./configs/dev";
import getBuildConfig from "./configs/build";
import { PluginOptions } from "./types";

const openBrowser = require("react-dev-utils/openBrowser");

export default class BuildReactComponentWebpackPlugin extends WebpackBuilderPluginClass {
  run(compiler: Compiler, config: ChainConfig, options: PluginOptions) {
    const { context, hooks } = compiler;
    const { command, commandArgs, pkg, rootDir, appConfig, mockConfig } =
      context;
    const { https } = commandArgs;

    const mode = command === "start" ? "development" : "production";
    config.mode(mode);
    getbaseConfig(config, rootDir, options);

    if (command === "start") {
      getDevConfig(
        config,
        https,
        mode === "development",
        options,
        appConfig,
        mockConfig
      );
    } else if (command === "build") {
      getBuildConfig(config, rootDir, pkg, options.entryDir);
    }

    hooks.afterServerStarted.tap("afterServerStarted", ({ url }) => {
      openBrowser(url);
    });
    return config;
  }
}
export * from "./types";
