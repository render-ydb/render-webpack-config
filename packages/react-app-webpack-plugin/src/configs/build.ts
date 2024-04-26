import Chain from "webpack-chain";
import path = require("path");
import fs = require("fs");
import { filesize } from "filesize";
import gzipSize = require("gzip-size");
import { PluginOptions } from "../types";
import { Compiler } from "@x.render/render-builder";
import { log } from "@x.render/render-node-utils";
import recursive = require("recursive-readdir");
import chalk = require("chalk");

const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

interface Memo {
  filename: string;
  size: number;
}

const getBuildConfig = (
  config: Chain,
  // templateConfigInfo: TemplateConfigInfo,
  rootDir: string,
  hooks: Compiler["hooks"],
  options: PluginOptions
) => {
  const {
    splitChunks = {} as PluginOptions["splitChunks"],
    useAnalyzer = false,
  } = options;
  const outputPath = path.resolve(rootDir, "build");
  config.devtool(false);
  config.output
    .path(outputPath)
    .filename("[name].[contenthash].js")
    .chunkFilename("[name].[id].[contenthash].js");

  useAnalyzer &&
    config.plugin("BundleAnalyzerPlugin").use(BundleAnalyzerPlugin);

  // splitChunks
  config.optimization.splitChunks({
    ...splitChunks,
  });

  // templateConfigInfo.config.forEach((templateConfig) => {
  //   const { pageTitle, pageName, meta, script } = templateConfig;

  //   const faviconPath = path.resolve(rootDir, "public", "favicon.ico");
  //   const hasFavicon = fse.pathExistsSync(faviconPath);
  //   config.plugin("html-" + pageName).use(HtmlWebpackPlugin, [
  //     {
  //       inject: "body",
  //       favicon: hasFavicon ? faviconPath : "",
  //       filename: `${pageName}.html`,
  //       chunks: [pageName],
  //       template: path.resolve(__dirname, "../views", "template.ejs"),
  //       templateParameters: () => ({
  //         title: pageTitle,
  //         devChunkJs: "",
  //         meta,
  //         script,
  //         vconsole: false,
  //       }),
  //     },
  //   ]);
  // });

  const measureFileSizesBuild = async (
    buildFolder: string
  ): Promise<Memo[]> => {
    return new Promise((resolve, reject) => {
      recursive(buildFolder, (err, fileNames) => {
        if (err) {
          reject(err);
        }
        let sizes: Memo[] = [];

        if (!err && fileNames) {
          fileNames.forEach((fileName, index) => {
            const contents = fs.readFileSync(fileName);
            const filename =
              index + 1 + ". " + path.relative(rootDir, fileName);
            const size = gzipSize.sync(contents);
            sizes.push({
              filename,
              size,
            });
          });
        }
        resolve(sizes);
      });
    });
  };

  // print bundle info
  hooks.afterBuild.tap("afterBuild", () => {
    setImmediate(() => {
      log.info("Compilation completed, bundle information is being output");
      measureFileSizesBuild(path.resolve(outputPath))
        .then((sizes) => {
          const maxLength = Math.max(
            ...sizes.map(({ filename }) => filename.length)
          );
          sizes.forEach((file) => {
            const { filename, size } = file;
            const paddedName = filename.padEnd(maxLength);
            console.log(
              `${chalk.green("  " + paddedName)} ${chalk.yellow(
                filesize(size)
              )}`
            );
          });
        })
        .catch((err) => {
          log.error(err.message);
        });
    });
  });
};
export = getBuildConfig;
