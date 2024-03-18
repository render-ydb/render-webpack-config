import { Json } from '@x.render/render-builder';

export interface PluginOptions {
  define?: Json;
  VConsole?: boolean;
  alias?: Json;
  splitChunks: Record<string, any>;
  useAnalyzer: boolean;
}

interface AppRoute {
  title: string;
  path: string;
  source: string;
  metas?: string[];
  scripts?: string[];
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
  pageMetas: string[];
  pageScripts: string[];
  pageRoutePath: string;
  pageSoureDirPath: string;
  pageSourceEntryPath: string;
  pageSourcePath: string;
  pageRealDirPath: string;
  pageRealJsonPath: string;
  pageRealEntryPath: string;
  pageRealRoutePath: string;
}

export interface TemplateConfigInfo {
  config: Array<{
    pageTitle: PageConfig['pageTitle'];
    pageName: PageConfig['pageName'];
    pageRealRoutePath: PageConfig['pageRealRoutePath'];
    meta: string;
    script: string;
  }>;
  extra: {
    vconsole: boolean;
  };
}
