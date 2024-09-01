import {
  Compiler,
  WebpackBuilderPluginClass,
  ChainConfig,
} from '@x.render/render-builder';
import { glob } from 'glob';
import { CompileInfo, PluginOptions } from './types';
import path from 'path';
import fse from 'fs-extra';
import * as babel from '@babel/core';
import {
  REG_D_TS,
  REG_JS,
  APP_JSON,
  MOCK_JSON,
  REG_IMG,
  REG_APP_D_TS,
} from './constants';
import getBabelConfig from './utils/getBabelConfig';
import generateTypeFile from './utils/generateTypeFile';
import { runTask } from '@x.render/render-node-utils';

export default class EmitEsmCjsWebpackPlugin extends WebpackBuilderPluginClass {
  run(compiler: Compiler, config: ChainConfig, options: PluginOptions) {
    const { hooks, log, context } = compiler;
    const { rootDir } = context;
    const { alias } = options;

    const { beginTextStyle, endTextStyle } = runTask;

    const compileFn = () => {
      const sourcePath = `${rootDir}/src`;
      const compileInfo: CompileInfo[] = [];
      const compileTargets = ['esm', 'cjs'];
      const filesPath = glob.sync('**/*.*', {
        cwd: sourcePath,
        ignore: ['node_modules/**'],
      });
      compileTargets.forEach((target) => {
        const destPath = path.join(rootDir, `build/${target}`);
        fse.emptyDirSync(destPath);
        for (let i = 0; i < filesPath.length; i++) {
          const filePath = filesPath[i];
          const sourceFile = path.join(sourcePath, filePath);
          if (
            APP_JSON.test(filePath) ||
            MOCK_JSON.test(filePath) ||
            REG_IMG.test(filePath) ||
            REG_APP_D_TS.test(filePath)
          ) {
            continue;
          }

          if (!REG_JS.test(filePath) || REG_D_TS.test(filePath)) {
            try {
              fse.copySync(sourceFile, path.join(destPath, filePath));
            } catch (error) {
              log.error(error);
            }
          } else {
            const babelConfig = getBabelConfig({
              target,
              rootDir,
              babelPlugins: [],
              babelOptions: [],
              alias: {
                // "@": "src",
                ...alias,
              },
            });
            const rightPath = filePath.replace(REG_JS, '.js');

            const { code } = babel.transformFileSync(sourceFile, {
              filename: rightPath,
              ...babelConfig,
            });
            const targetPath = path.join(destPath, rightPath);
            fse.ensureDirSync(path.dirname(targetPath));
            fse.writeFileSync(targetPath, code, 'utf-8');
            compileInfo.push({
              filePath,
              sourceFile,
              destPath,
            });
          }
        }
        filesPath.forEach((filePath) => {});
      });

      generateTypeFile(compileInfo, log);
    };

    hooks.afterBuild.tap('afterBuild', () => {
      runTask([
        {
          beginText: beginTextStyle(
            'start generating packages with esm and cjs specifications.',
            '[emit-esm-cjs-webpack-plugin]:'
          ),
          fn: compileFn,
          endText: endTextStyle(
            'successfully generated packages with esm and cjs specifications.',
            '[emit-esm-cjs-webpack-plugin]:'
          ),
        },
      ]);
    });

    return config;
  }
}
