import Chain from 'webpack-chain';
import path = require('path');
import getDemoEntryFilename = require('../utils/getDemoEntryFilename');
import { Json } from '@x.render/render-builder';

const getBuildConfig = (
  config: Chain,
  rootDir: string,
  pkg: Json,
  entryDir?: string,
) => {
  const appIndexPath = path.resolve(
    rootDir as string,
    entryDir || 'src/mobile',
  );
  const entryFileName = getDemoEntryFilename(
    path.resolve(appIndexPath, entryDir || 'src/mobile'),
  );
  const entryPath = path.join(appIndexPath, entryFileName);
  config.entryPoints.clear();
  config.merge({ entry: { index: entryPath } });
  const outputPath = path.resolve(rootDir, 'build/dist');

  config.devtool(false);

  config.output
    .path(outputPath)
    .filename('index.js')
    .library(pkg.name)
    .libraryTarget('umd')
    .umdNamedDefine(true);

  config.externals({
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'ReactDOM',
      root: 'ReactDOM',
    },
  });
};
export = getBuildConfig;
