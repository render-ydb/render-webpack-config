import { getBaseBabelConfig } from '@x.render/react-babel-webpack-plugin';
import { Json } from '@x.render/render-builder';

const getCompileBabel = (
  options = {},
  { babelPlugins, babelOptions, rootDir },
) => {
  const { modules } = options as Json;
  const defaultBabelConfig = getBaseBabelConfig();
  const additionalPlugins: any = [
    // ES6/ES7转化为对babel-runtime的引用，减少代码体积
    [
      require.resolve('@babel/plugin-transform-runtime'),
      {
        corejs: false,
        helpers: true,
        regenerator: true,
        useESModules: false,
      },
    ],
    // 为类添加属性和方法的简写 loose是否启用宽松模式，减少代码体积
    [
      require.resolve('@babel/plugin-proposal-class-properties'),
      { loose: true },
    ],
    // 为类提供添加私有方法的语法
    [
      require.resolve('@babel/plugin-proposal-private-methods'),
      { loose: true },
    ],
    // 为类提供添加私有属性的语法
    [
      require.resolve('@babel/plugin-proposal-private-property-in-object'),
      { loose: true },
    ],
  ];

  // 传入的babelPlugin，使用require.resolve找到绝对路径，然后重新返回
  const formatedBabelPlugins = (babelPlugins || []).map((plugin) => {
    const [pluginName, pluginOptions, ...restOptions] = Array.isArray(plugin)
      ? plugin
      : [plugin];

    const pluginPath = require.resolve(pluginName, { paths: [rootDir] });
    return pluginOptions
      ? [pluginPath, pluginOptions, ...(restOptions || [])]
      : pluginPath;
  });

  defaultBabelConfig.plugins = [
    ...defaultBabelConfig.plugins,
    ...additionalPlugins,
    ...formatedBabelPlugins,
  ];

  /**
   * babelOptions配置对efaultBabelConfig中preset的修改
   * 1.对@babel/preset-env进行特殊处理
   * 2. 其他preset如果默认preset中有配置，babelOptions中也有配置，则返回合并后的新配置
   */
  defaultBabelConfig.presets = defaultBabelConfig.presets.map((preset) => {
    const [presetPath, presetOptions = {}] = Array.isArray(preset)
      ? preset
      : [preset];
    const targetConfig = babelOptions.find(
      ({ name }) => (presetPath as string).indexOf(name) > -1,
    );

    const modifyOptions = targetConfig && targetConfig.options;

    if ((presetPath as string).indexOf('@babel/preset-env') > -1) {
      // default preset-env options for component compile
      return [presetPath, { modules, loose: true, ...(modifyOptions || {}) }];
    }

    if (presetOptions && modifyOptions) {
      return [presetPath, { ...presetOptions, ...modifyOptions }];
    }
    return preset;
  });

  return defaultBabelConfig;
};
export = getCompileBabel;
