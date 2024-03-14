import { AppConfig, PageConfig, TemplateConfigInfo } from '../types';

const getTemplateConfigInfo = (
  pageConfigInfo: PageConfig[],
  appConfig: AppConfig,
  vconsole: boolean,
): TemplateConfigInfo => {
  const templateConfigInfo = {
    config: [],
    extra: {
      vconsole,
    },
  };

  const { metas = [], scripts = [] } = appConfig;
  pageConfigInfo.forEach((pageConfig) => {
    const {
      pageMetas = [],
      pageScripts = [],
      pageTitle,
      pageName,
      pageRealRoutePath,
    } = pageConfig;
    templateConfigInfo.config.push({
      pageTitle,
      pageName,
      pageRealRoutePath,
      meta: pageMetas.concat(metas).join('\n'),
      script: pageScripts.concat(scripts).join('\n'),
    });
  });
  return templateConfigInfo;
};

export = getTemplateConfigInfo;
