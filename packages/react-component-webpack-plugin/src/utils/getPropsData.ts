import { MockConfig } from '@x.render/render-builder';

const getPropsData = (mockConfig: MockConfig) => {
  let PropsData: Record<string, any> = {};
  return Object.keys(mockConfig).reduce((result, key) => {
    PropsData[key] = mockConfig[key];
    return result;
  }, PropsData);
};
export = getPropsData;
