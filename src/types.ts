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
  fieldName: string;
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
