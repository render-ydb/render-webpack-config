import Chain from 'webpack-chain';
import { PageConfig } from '../types';

const setEntry = (config: Chain, pageConfigInfo: PageConfig[]) => {
  config.entryPoints.clear();

  pageConfigInfo.forEach((pageConfig) => {
    const { pageRealEntryPath, pageName } = pageConfig;
    config.entry(pageName).add(pageRealEntryPath);
  });
};
export = setEntry;
