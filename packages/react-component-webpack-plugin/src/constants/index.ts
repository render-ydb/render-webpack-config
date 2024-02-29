import path = require('path');

const CWD = process.cwd();
export const APP_DEMO_DIR_PATH = path.resolve(
  CWD,
  'node_modules',
  'render-app-demo',
);
export const APP_DEMO_PACKAGE_PATH = path.resolve(
  APP_DEMO_DIR_PATH,
  'package.json',
);
export const APP_ENTRY_PATH = path.resolve(APP_DEMO_DIR_PATH, 'index.jsx');
export const APP_RESET_CSS_PATH = path.resolve(__dirname, '../../reset.css');
export const APP_FAVICON_PATH = path.resolve(__dirname, '../../favicon.ico');
export const TARGET_FAVICON_PATH = path.resolve(
  APP_DEMO_DIR_PATH,
  'favicon.ico',
);
