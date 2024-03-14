import { AppConfig, PageConfig } from '../types';
import path = require('path');
import { APP_DEMO_DIR_PATH } from '../constants';
import getDemoEntryFilename = require('../utils/getDemoEntryFilename');

const getPageConfigInfo = (
  appConfig: AppConfig,
  rootDir: string,
): PageConfig[] => {
  const { routes, window } = appConfig;
  if (!routes) {
    throw new Error('the routes field must be filled in app.json.');
  }
  if (!Array.isArray(routes)) {
    throw new Error('the routes field in app.json must be an array type.');
  }
  return routes.map((route) => {
    const { title, source, metas = [], scripts = [] } = route;
    const pageSoureDirPath = path.resolve(rootDir, 'src', source);
    const entryFileName = getDemoEntryFilename(path.resolve(pageSoureDirPath));
    const pageSourceEntryPath = path.resolve(pageSoureDirPath, entryFileName);
    const pageRealDirPath = path.resolve(APP_DEMO_DIR_PATH, source);
    const pageRealFaviconPath = '';
    const pageRealJsonPath = path.resolve(pageRealDirPath, 'package.json');
    const pageRealEntryPath = path.resolve(pageRealDirPath, 'index.jsx');
    const pageRealRoutePath = route.path + '.html';
    return {
      pageName: route.path.replace('/', ''),
      pageTitle: title || window.title || 'render-app',
      pageMetas: metas,
      pageScripts: scripts,
      pageSoureDirPath,
      pageSourceEntryPath,
      pageRoutePath: route.path,
      pageSourcePath: source,
      pageRealJsonPath,
      pageRealEntryPath,
      pageRealFaviconPath,
      pageRealDirPath,
      pageRealRoutePath,
    };
  });
};

export = getPageConfigInfo;
