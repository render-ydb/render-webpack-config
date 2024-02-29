import { ChainConfig } from '@x.render/render-builder';
import { PluginOptions } from '../types';

const URL_LOADER_LIMIT = 8192;
const configAssetsRule = (
  config: ChainConfig,
  type: any,
  testReg: any,
  loaderOpts = {},
  maxSize,
  filename,
) => {
  config.module
    .rule(type)
    .test(testReg)
    .use(type)
    .loader(require.resolve('url-loader'))
    .options({
      name: filename || 'font/[name][ext]',
      limit: maxSize || URL_LOADER_LIMIT,
      ...loaderOpts,
    });
};
const setLoaders = (config: ChainConfig, options: PluginOptions) => {
  const { imageSizeLimit, imageFilename, fontSizeLimit, fontFilename } =
    options;

  const assets = [
    ['woff2', /\.woff2?$/, { mimetype: 'application/font-woff' }],
    ['ttf', /\.ttf$/, { mimetype: 'application/octet-stream' }],
    ['eot', /\.eot$/, { mimetype: 'application/vnd.ms-fontobject' }],
    ['svg', /\.svg$/, { mimetype: 'image/svg+xml' }],
  ];

  assets.forEach(([type, reg, opts]) => {
    configAssetsRule(
      config,
      type,
      reg,
      opts || {},
      fontSizeLimit,
      fontFilename,
    );
  });

  config.module
    .rule('images')
    .test(/\.(png|jpg|webp|jpeg|gif)$/i)
    // @ts-ignore
    .type('asset/resource')
    .set('generator', {
      filename: imageFilename || 'images/[name][ext]',
    })
    .parser({
      dataUrlCondition: {
        maxSize: imageSizeLimit || URL_LOADER_LIMIT,
      },
    });
};
export = setLoaders;
