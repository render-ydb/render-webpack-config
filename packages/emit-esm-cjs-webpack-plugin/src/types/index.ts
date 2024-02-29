export interface CompileInfo {
  filePath: string;
  sourceFile: string;
  destPath: string;
}

export interface PluginOptions {
  alias: Record<string, string>;
}
