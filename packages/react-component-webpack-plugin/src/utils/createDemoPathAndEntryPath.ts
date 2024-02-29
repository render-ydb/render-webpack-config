import fse = require('fs-extra');
import path = require('path');
import {
  APP_DEMO_DIR_PATH,
  APP_ENTRY_PATH,
  APP_RESET_CSS_PATH,
  APP_FAVICON_PATH,
  TARGET_FAVICON_PATH,
  APP_DEMO_PACKAGE_PATH,
} from '../constants';
import getSourceCode = require('./getSourceCode');
import { MockConfig } from '@x.render/render-builder';

export = (mockConfig: MockConfig, entryDir?: string) => {
  fse.ensureDirSync(APP_DEMO_DIR_PATH);

  fse.copyFileSync(
    APP_RESET_CSS_PATH,
    path.resolve(APP_DEMO_DIR_PATH, 'reset.css'),
  );
  // add package.json to prevent webpack's webpack.FileSystemInfo warning.
  fse.writeFileSync(
    APP_DEMO_PACKAGE_PATH,
    // eslint-disable-next-line @typescript-eslint/quotes
    `{"version": "1.0.0","name": "app-demo"}`,
  );

  fse.copyFileSync(APP_FAVICON_PATH, TARGET_FAVICON_PATH);

  fse.writeFileSync(APP_ENTRY_PATH, getSourceCode(mockConfig, entryDir), {
    encoding: 'utf-8',
  });
};
