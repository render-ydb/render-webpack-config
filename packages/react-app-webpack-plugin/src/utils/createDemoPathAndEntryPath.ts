import fse = require('fs-extra');
import getSourceCode = require('./getSourceCode');
import { PageConfig } from '../types';

export = (pageConfigInfo: PageConfig[]) => {
  pageConfigInfo.forEach((pageConfig) => {
    const {
      pageRealEntryPath,
      pageRealDirPath,
      pageRealJsonPath,
      pageName,
      pageSourceEntryPath,
    } = pageConfig;

    fse.ensureDirSync(pageRealDirPath);

    fse.writeFileSync(
      pageRealJsonPath,
      `{"version": "1.0.0","name": "app-${pageName}"}`,
    );

    fse.writeFileSync(pageRealEntryPath, getSourceCode(pageSourceEntryPath), {
      encoding: 'utf-8',
    });
  });
};
