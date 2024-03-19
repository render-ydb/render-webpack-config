import EmitEsmCjsWebpackPlugin from "@x.render/emit-esm-cjs-webpack-plugin";
import StaticAssetsWebpackPlugin from "@x.render/static-assets-webpack-plugin";
import StyleWebpackPlugin from "@x.render/style-webpack-plugin";
import OptimizationWebpackPlugin from "@x.render/optimization-webpack-plugin";
import ReactBabelWebpackPlugin from "@x.render/react-babel-webpack-plugin";
import ReactComponentWebpackPlugin from "@x.render/react-component-webpack-plugin";

const buildReactComponentWebpackPreset = {
  install() {
    return [
      EmitEsmCjsWebpackPlugin,
      StaticAssetsWebpackPlugin,
      StyleWebpackPlugin,
      OptimizationWebpackPlugin,
      ReactBabelWebpackPlugin,
      ReactComponentWebpackPlugin,
    ];
  },
};
export * from "./types";
export default buildReactComponentWebpackPreset;
