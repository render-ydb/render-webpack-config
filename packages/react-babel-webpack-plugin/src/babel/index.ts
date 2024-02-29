const getBabelConfig = (isEnvDevelopment = false) => {
  return {
    presets: [
      [require.resolve('@babel/preset-env')],
      [require.resolve('@babel/preset-react'), { runtime: 'automatic' }],
      require.resolve('@babel/preset-typescript'),
    ],
    plugins: [
      isEnvDevelopment && require.resolve('react-refresh/babel'),
    ].filter(Boolean),
    babelrc: false,
    configFile: false,
  };
};
export = getBabelConfig;
