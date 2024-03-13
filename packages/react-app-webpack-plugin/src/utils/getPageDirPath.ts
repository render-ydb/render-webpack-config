import path from 'path';

const getPageEntryPath = (dir: string, rootDir: string): string => {
  const PAGE_DIR_PATH = path.resolve(rootDir, 'src', dir);
  return PAGE_DIR_PATH;
};

export = getPageEntryPath;
