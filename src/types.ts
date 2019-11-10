export interface FieldUiState {
  id: string;
  order: number; // これはunityに unityInstance.SendMessage('Canvas', 'ChangeTemplate', JSON.stringify(data)); で送って並び順を保障した方がいいかも知れない
  expand: boolean;
}

export interface Template {
  name: string;
  image: string | null;
  size: {
    width: number;
    height: number;
  };
  fontName: 'NotoSansCJKjp';
  fields: Field[];
}

interface BaseField {
  id: string;
  name: string;
  sampleData: string;
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
}

export interface TextField extends BaseField {
  type: 'text';
  style: {
    alignment: 'left' | 'center' | 'right';
    fontSize: number;
    characterSpacing: number;
    lineHeight: number;
  };
}

export interface ImageField extends BaseField {
  type: 'image';
  style: {};
}

export type Field = TextField | ImageField;

export function isTextField(field: Field): field is TextField {
  return field.type === 'text';
}
