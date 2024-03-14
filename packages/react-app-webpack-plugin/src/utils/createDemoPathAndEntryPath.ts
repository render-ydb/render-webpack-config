import fse = require('fs-extra');
import { APP_RESET_CSS_PATH, APP_FAVICON_PATH } from '../constants';
import getSourceCode = require('./getSourceCode');
import { PageConfig } from '../types';

export = (pageConfigInfo: PageConfig[]) => {
  pageConfigInfo.forEach((pageConfig) => {
    const {
      pageRealEntryPath,
      pageRealDirPath,
      pageRealFaviconPath,
      pageResetCssPath,
      pageRealJsonPath,
      pageName,
      pageSourceEntryPath,
    } = pageConfig;

    fse.ensureDirSync(pageRealDirPath);

    fse.copyFileSync(APP_FAVICON_PATH, pageRealFaviconPath);

    fse.copyFileSync(APP_RESET_CSS_PATH, pageResetCssPath);

    // add package.json to prevent webpack's webpack.FileSystemInfo warning.
    fse.writeFileSync(
      pageRealJsonPath,
      `{"version": "1.0.0","name": "app-${pageName}"}`,
    );

    fse.writeFileSync(pageRealEntryPath, getSourceCode(pageSourceEntryPath), {
      encoding: 'utf-8',
    });
  });
};
