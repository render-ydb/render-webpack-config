import Chain from "webpack-chain";
import path = require("path");
import { TemplateConfigInfo } from "../types";
import { Compiler } from "@x.render/render-builder";
import { log } from "@x.render/render-node-utils";
import chalk = require("chalk");

const openBrowser = require("react-dev-utils/openBrowser");

const getDevConfig = (
  config: Chain,
  templateConfigInfo: TemplateConfigInfo,
  hooks: Compiler["hooks"]
) => {
  config.output.filename("[name].js");
  config.devServer.hot(true);
  config.devServer.historyApiFallback(false);

  hooks.afterServerStarted.tap("afterServerStarted", ({ url }) => {
    openBrowser(url);
  });
  hooks.afterBuild.tap("afterBuild", ({ urls }) => {
    const { lanUrlForBrowser, localUrlForBrowser } = urls;
    const printUrl = (url) => {
      templateConfigInfo.config.forEach((pageConfig) => {
        log.info(
          chalk.blue.underline(
            `${url}${pageConfig.pageRealRoutePath.replace("/", "")}`
          )
        );
      });
    };
    setImmediate(() => {
      console.log();
      log.info("-Local:");
      printUrl(localUrlForBrowser);
      console.log();
      log.info("-Network:");
      printUrl(lanUrlForBrowser);
    });
  });
};

export = getDevConfig;
