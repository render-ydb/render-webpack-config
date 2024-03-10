import { Json } from '@x.render/render-builder';

export interface SchemaProperty {
  [key: string]: {
    type: string | 'color' | number | 'textArea' | 'select';
    required: boolean;
    value: any;
    mockValue: any;
  };
}

export type Schema = Partial<{
  title: string;
  properties: SchemaProperty;
}>;

export interface PluginOptions {
  define?: Json;
  VConsole?: boolean;
  alias?: Json;
  entryDir?: string;
}
