import fs = require('fs');
import path = require('path');

const getDemoEntryFilename = (projectDir: string) => {
  let entryPath = '';
  const searchFiless = ['tsx', 'jsx', 'js', 'ts'];
  for (let i = 0; i < searchFiless.length; i++) {
    const fileName = 'index.' + searchFiless[i];
    const searchPath = path.join(projectDir, fileName);
    if (fs.existsSync(searchPath)) {
      entryPath = fileName;
      break;
    }
  }
  return entryPath;
};
export = getDemoEntryFilename;
