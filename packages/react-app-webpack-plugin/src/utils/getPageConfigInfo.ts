import { AppConfig, PageConfig } from '../types';
import path = require('path');
import getPageDirPath = require('./getPageDirPath');
import getPageEntryPath = require('./getPageEntryPath');
import { APP_DEMO_DIR_PATH } from '../constants';

const getPageConfigInfo = (
  appConfig: AppConfig,
  rootDir: string,
): PageConfig[] => {
  const { routes } = appConfig;
  if (!routes) {
    throw new Error('the routes field must be filled in app.json.');
  }
  if (!Array.isArray(routes)) {
    throw new Error('the routes field in app.json must be an array type.');
  }
  return routes.map((route) => {
    const { title, source } = route;
    const pageSoureDirPath = getPageDirPath(source, rootDir);
    const pageSourceEntryPath = getPageEntryPath(pageSoureDirPath);
    const pageRealDirPath = path.resolve(APP_DEMO_DIR_PATH, source);
    const pageRealFaviconPath = path.resolve(pageRealDirPath, 'favicon.ico');
    const pageResetCssPath = path.resolve(pageRealDirPath, 'reset.css');
    const pageRealJsonPath = path.resolve(pageRealDirPath, 'package.json');
    const pageRealEntryPath = path.resolve(pageRealDirPath, 'index.jsx');
    const pageRealRoutePath = route.path + '.html';
    return {
      pageName: route.path.replace('/', ''),
      pageTitle: title,
      pageSoureDirPath,
      pageSourceEntryPath,
      pageRoutePath: route.path,
      pageSourcePath: source,
      pageResetCssPath,
      pageRealJsonPath,
      pageRealEntryPath,
      pageRealFaviconPath,
      pageRealDirPath,
      pageRealRoutePath,
    };
  });
};

export = getPageConfigInfo;
