import { Json } from '@x.render/render-builder';
import getCompileBabel from './getCompileBabel';

const getBabelConfig = ({
  target,
  rootDir,
  babelPlugins,
  babelOptions,
  alias,
}: {
  target: string;
  rootDir: string;
  babelPlugins: any[];
  babelOptions: Json;
  alias: Json;
}) => {
  const params = target === 'es' ? { modules: false } : {};
  let babelConfig;
  babelConfig = getCompileBabel(params, {
    babelPlugins,
    babelOptions,
    rootDir,
  });

  if (alias) {
    const aliasRelative = {};
    Object.keys(alias).forEach((aliasKey) => {
      aliasRelative[aliasKey] = alias[aliasKey].startsWith('./')
        ? alias[aliasKey]
        : `./${alias[aliasKey]}`;
    });
    babelConfig.plugins = babelConfig.plugins.concat([
      [
        require.resolve('babel-plugin-module-resolver'),
        {
          root: ['./src'],
          alias: aliasRelative,
        },
      ],
    ]);
  }
  return babelConfig;
};

export = getBabelConfig;
