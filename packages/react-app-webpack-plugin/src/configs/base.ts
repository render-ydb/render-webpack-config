import path = require("path");
import Chain from "webpack-chain";
import webpack from "webpack";
import fse from "fs-extra";
import { PluginOptions, TemplateConfigInfo } from "../types";

const WebpackBar = require("webpackbar");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");

const getbaseConfig = (
  config: Chain,
  rootDir: string,
  options: PluginOptions,
  mode: "development" | "production",
  templateConfigInfo: TemplateConfigInfo
) => {
  const { define = {}, alias = {} } = options;

  config.mode(mode);
  config.target("web");
  config.context(rootDir);
  config.resolve.modules
    .add("node_modules")
    .add(path.join(rootDir, "node_modules"))
    .add(path.resolve(__dirname, "../../node_modules"));
  config.optimization.splitChunks({ cacheGroups: {} });

  const defineMap = {};
  Object.entries(define).forEach(([key, value]) => {
    defineMap[key] = JSON.stringify(value);
  });
  config.plugin("define").use(webpack.DefinePlugin, [defineMap]);

  [
    ".js",
    ".jsx",
    ".json",
    ".html",
    ".ts",
    ".tsx",
    "css",
    "less",
    "sass",
    "scss",
  ].forEach((extension) => {
    config.resolve.extensions.add(extension);
  });

  // add packagename to webpack alias
  config.resolve.alias.set("@", path.resolve(rootDir, "src"));
  Object.keys(alias).forEach((key) => {
    config.resolve.alias.set(key, path.resolve(rootDir, alias[key]));
  });

  config
    .plugin("WebpackBar")
    .use(WebpackBar)
    .end()
    .plugin("CaseSensitivePathsPlugin")
    .use(CaseSensitivePathsPlugin);

  // html template handle
  const templateHtmlSrc = path.resolve(rootDir, "public/template.html");
  templateConfigInfo.config.forEach((templateConfig) => {
    const { pageTitle, pageName, meta, script } = templateConfig;

    const faviconPath = path.resolve(rootDir, "public", "favicon.ico");
    const hasFavicon = fse.pathExistsSync(faviconPath);
    config.plugin("html-" + pageName).use(HtmlWebpackPlugin, [
      {
        inject: "body",
        favicon: hasFavicon ? faviconPath : "",
        filename: `${pageName}.html`,
        chunks: [pageName],
        template: templateHtmlSrc,
        templateParameters: () => ({
          title: pageTitle,
          devChunkJs: "",
          meta,
          script,
          vconsole: false,
        }),
      },
    ]);
  });
};

export = getbaseConfig;
