import { ReactNode } from 'react';
import { KeyboardTypeOptions, TextStyle, ViewStyle } from 'react-native';

export interface InputFieldProps {
  children: ReactNode;
}
export interface LabelProps {
  touched: boolean;
  edit?: boolean;
  onPressEdit?: () => void;
  label: string;
  labelStyles?: TextStyle;
  error?: string;
  isRequired?: boolean;
}

export interface ErrorProps {
  error?: string;
  isRequired?: boolean;
}
export interface InputProps extends LabelProps, ErrorProps {
  placeholder?: string;
  value?: string | number;
  countryCode?: string | number;
  name?: string;
  type?: string;
  keyboardType?: KeyboardTypeOptions;
  onChange?: (text: string | number) => void;
  onBlur?: () => void;
  onTouched?: () => void;
  containerStyle?: ViewStyle;
  numberOfLines?: number;
  multiline?: boolean;
  isRequired?: boolean;
  isFormik?: boolean;
  secureTextEntry?: boolean;
  editable?: boolean;
}
export interface DatePickerProps extends LabelProps, ErrorProps {
  value?: string | Date;
  onChange?: (text: string | Date) => void;
  onBlur?: () => void;
  onTouched?: () => void;
  containerStyle?: ViewStyle;
}

export interface InputWithCountryProps extends InputProps {
  countryCodeDisable?: boolean;
  isInternational?: boolean;
  onCodeChange?: (text: string | number) => void;
}
export interface MessageInputProps extends ErrorProps {
  placeholder?: string;
  value?: string;
  inputTextContainerStyle?: ViewStyle;
  onChangeText?: (text: string) => void;
  onSendClick?: (text: string) => void;
  scrollDown?: () => void;
  hideCameraIcon?: boolean;
  hideMicIcon?: boolean;
  hideAttachmentsIcon?: boolean;
  hideKeyboardUI?: boolean;
  hideSendIcon?: boolean;
}

export interface DropDownProps extends LabelProps, ErrorProps {
  placeholder?: string;
  value?: string;
  disable?: boolean;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onTouched?: () => void;
  options: Array<{ label: string; value: string }>;
  containerStyle?: ViewStyle;
}
export interface DropDownPropsNew extends LabelProps, ErrorProps {
  placeholder?: string;
  value?: { label: string; value: string };
  disable?: boolean;
  onChange?: (value: { label: string; value: string }) => void;
  onBlur?: () => void;
  search?: boolean;
  onTouched?: () => void;
  options: Array<{ label: string; value: string }>;
  containerStyle?: ViewStyle;
  placeholderStyle?: TextStyle;
  dropdownPosition?: 'auto' | 'top' | 'bottom';
}
export type CheckBoxProps = DropDownPropsNew;
export interface MultiSelectProps extends LabelProps, ErrorProps {
  placeholder?: string;
  value?: string[] | null | undefined;
  disable?: boolean;
  onChange: (value: string[]) => void;
  onBlur?: () => void;
  onTouched?: () => void;
  options: Array<{ label: string; value: string }>;
  containerStyle?: ViewStyle;
}
export interface InputContainerProps extends LabelProps, ErrorProps {
  children?: ReactNode;
  containerStyle?: ViewStyle;
  onPressContainer?: () => void;
}
