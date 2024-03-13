import { Json } from '@x.render/render-builder';

export interface PluginOptions {
  define?: Json;
  VConsole?: boolean;
  alias?: Json;
  entryDir?: string;
}

interface AppRoute {
  title: string;
  path: string;
  source: string;
}

interface AppWindow {
  title?: string;
}

export interface AppConfig {
  routes?: AppRoute[];
  window?: AppWindow;
  metas?: string[];
  scripts?: string[];
}

export interface PageConfig {
  pageTitle: string;
  pageName: string;
  pageRoutePath: string;
  pageSoureDirPath: string;
  pageSourceEntryPath: string;
  pageSourcePath: string;
  pageRealFaviconPath: string;
  pageRealDirPath: string;
  pageResetCssPath: string;
  pageRealJsonPath: string;
  pageRealEntryPath: string;
  pageRealRoutePath: string;
}
