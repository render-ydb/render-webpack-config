import { CompileInfo } from '../types';
import ts from 'typescript';
import fse from 'fs-extra';
import path from 'path';
import { REG_JS } from '../constants';
import { BuilderLog } from '@x.render/render-builder';

const compileOptions = {
  allowJs: true,
  declaration: true,
  emitDeclarationOnly: true,
};
const generateTypeFile = (compileInfo: CompileInfo[], log: BuilderLog) => {
  const needCompileList = compileInfo
    .filter(({ filePath }) => REG_JS.test(filePath))
    .map((data) => {
      const { filePath, destPath, sourceFile } = data;
      const targetPath = path.join(destPath, filePath.replace(REG_JS, '.d.ts'));
      const fileNamesDTS = sourceFile.replace(REG_JS, '.d.ts');
      return {
        ...data,
        targetPath,
        fileNamesDTS,
      };
    });
  if (needCompileList.length === 0) {
    return;
  }
  let createdFiles = {};
  const host = ts.createCompilerHost(compileOptions);
  host.writeFile = (fileName, contents) => {
    createdFiles[fileName] = contents;
  };

  const program = ts.createProgram(
    needCompileList.map(({ sourceFile }) => sourceFile),
    compileOptions,
    host,
  );

  const emitResult = program.emit();
  if (emitResult.diagnostics && emitResult.diagnostics.length > 0) {
    emitResult.diagnostics.forEach((diagnostic) => {
      const message = ts.flattenDiagnosticMessageText(
        diagnostic.messageText,
        '\n',
      );
      if (diagnostic.file) {
        const { line, character } =
          diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
        log.error(
          `${diagnostic.file.fileName} (${line + 1}, ${
            character + 1
          }): ${message}`,
        );
      } else {
        log.error(message);
      }
    });
  }
  needCompileList.forEach(({ targetPath, fileNamesDTS }) => {
    const content = createdFiles[fileNamesDTS];
    if (content) {
      fse.ensureDirSync(path.dirname(targetPath));
      fse.writeFileSync(targetPath, content, 'utf-8');
    }
  });
};
export = generateTypeFile;
