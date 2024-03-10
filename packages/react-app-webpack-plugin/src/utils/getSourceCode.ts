import path = require('path');
import getPropsData = require('./getPropsData');
import { formatPathForWin } from '@x.render/render-node-utils';
import { MockConfig } from '@x.render/render-builder';

const getSourceCode = (mockConfig: MockConfig, entryDir?: string) => {
  const propsData = getPropsData(mockConfig);
  const appSrcPath = formatPathForWin(
    path.resolve(process.cwd(), entryDir || 'src/mobile'),
  );
  const code = `
import { createRoot } from 'react-dom/client';
import App from '${appSrcPath}'
const rest = ${JSON.stringify(propsData)};
require('./reset.css');
createRoot(
    document.getElementById('root')
).render(
     <App {...rest}/>
);`;
  return code;
};

export = getSourceCode;
