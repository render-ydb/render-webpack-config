import Chain from 'webpack-chain';

const path = require('path');
const { last } = require('lodash');

function getFilename(filePath: string) {
  return last((filePath || '').split('/'));
}
// TODO 修改
export = function setAssetsPath(
  config: Chain,
  outputAssetsPath = { js: '', css: '' },
) {
  const filename = getFilename(config.output.get('filename'));
  config.output.filename(path.join(outputAssetsPath.js, filename));
  const options = config.plugin('MiniCssExtractPlugin').get('args')[0];
  config.plugin('MiniCssExtractPlugin').tap((args) => [
    // @ts-ignore
    Object.assign(...args, {
      filename: path.join(outputAssetsPath.css, getFilename(options.filename)),
    }),
  ]);
};
