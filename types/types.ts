export enum InputEnumType {
  Text = 'text',
  Checkbox = 'checkbox',
}

export interface FormInputType {
  label: string;
  inputName: string;
  value: string;
  type: InputEnumType;
}

export type FormValuesType = Array<FormInputType>