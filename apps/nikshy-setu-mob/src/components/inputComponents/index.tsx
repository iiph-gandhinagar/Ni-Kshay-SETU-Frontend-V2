import {
  DatePickerProps,
  DropDownPropsNew,
  InputFieldProps,
  InputProps,
  InputWithCountryProps,
  MessageInputProps,
  MultiSelectProps,
} from '@nikshay-setu-v3-monorepo/types';
import React from 'react';
import { View } from 'react-native';
import { _CheckBox } from './checkBox';
import { _DatePicker } from './datePicker';
import { _DropDown, _MultiSelectDropDown } from './dropdown';
import { _Input, _InputWithCountryCode, _MessageInput } from './inputText';

export const InputField: React.FC<InputFieldProps> & {
  DatePicker: React.FC<DatePickerProps>;
  CheckBox: React.FC<DropDownPropsNew>;
  DropDown: React.FC<DropDownPropsNew>;
  MultiSelect: React.FC<MultiSelectProps>;
  Input: React.FC<InputProps>;
  InputWithCountryCode: React.FC<InputWithCountryProps>;
  MessageInput: React.FC<MessageInputProps>;
} = ({ children }) => {
  return <View>{children}</View>;
};

InputField.DropDown = _DropDown;
InputField.Input = _Input;
InputField.InputWithCountryCode = _InputWithCountryCode;
InputField.MultiSelect = _MultiSelectDropDown;
InputField.DatePicker = _DatePicker;
InputField.CheckBox = _CheckBox;
InputField.MessageInput = _MessageInput;
