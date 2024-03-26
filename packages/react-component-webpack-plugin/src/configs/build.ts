import Chain from "webpack-chain";
import path = require("path");
import fse from "fs-extra";
import getDemoEntryFilename = require("../utils/getDemoEntryFilename");
import { Compiler, Json } from "@x.render/render-builder";

const getBuildConfig = (
  config: Chain,
  rootDir: string,
  pkg: Json,
  entryDir = "src",
  hooks?: Compiler["hooks"]
) => {
  const appIndexPath = path.resolve(rootDir as string, entryDir);
  const entryFileName = getDemoEntryFilename(
    path.resolve(appIndexPath, entryDir)
  );
  const entryPath = path.join(appIndexPath, entryFileName);
  config.entryPoints.clear();
  config.merge({ entry: { index: entryPath } });
  const outputPath = path.resolve(rootDir, "build/dist");

  config.devtool(false);

  config.output
    .path(outputPath)
    .filename("index.js")
    .library(pkg.name)
    .libraryTarget("umd")
    .umdNamedDefine(true);

  config.externals({
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "React",
      root: "React",
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "ReactDOM",
      root: "ReactDOM",
    },
  });

  // copy schema.json
  hooks.afterBuild.tap("afterBuild", () => {
    const schemaJsonPath = path.resolve(appIndexPath, "schema.json");
    const hasSchemaJson = fse.pathExistsSync(schemaJsonPath);

    if (hasSchemaJson) {
      fse.copyFileSync(schemaJsonPath, path.resolve(outputPath, "schema.json"));
    }
  });
};
export = getBuildConfig;
