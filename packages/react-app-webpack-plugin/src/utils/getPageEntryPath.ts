import path from 'path';
import fse = require('fs-extra');
import getDemoEntryFilename = require('../utils/getDemoEntryFilename');

const getPageEntryPath = (pageDirPath: string): string => {
  const entryFileName = getDemoEntryFilename(path.resolve(pageDirPath));
  return path.resolve(pageDirPath, entryFileName);
};

export = getPageEntryPath;
