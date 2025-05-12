import { CalenderSvg } from '@nikshay-setu-v3-monorepo/assets';
import { uiStyles } from '@nikshay-setu-v3-monorepo/constants';
import { DatePickerProps } from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import { useState } from 'react';
import { Pressable, Text } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Row } from '../commonComponents/row_column';
import { InputContainer } from './inputContainer';

export const _DatePicker: React.FC<DatePickerProps> = ({
  value = '',
  onChange,
  onBlur,
  onTouched,
  error,
  onPressEdit,
  touched,
  label,
  edit,
  containerStyle,
  labelStyles,
}) => {
  // const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false);
  const withDateObj = new Date(value);
  return (
    <InputContainer
      edit={edit}
      onPressEdit={onPressEdit}
      error={error}
      touched={touched}
      label={label}
      labelStyles={labelStyles}
      containerStyle={containerStyle}
    >
      <Pressable
        onPress={() => {
          setOpen(true);
          if (onTouched) {
            onTouched();
          }
        }}
      >
        <DatePicker
          modal
          open={open}
          date={(value && withDateObj) || new Date()}
          mode='date'
          onConfirm={(date) => {
            setOpen(false);
            onChange(date.toString());
            if (onBlur) {
              onBlur();
            }
          }}
          onCancel={() => {
            setOpen(false);
            if (onBlur) {
              onBlur();
            }
          }}
        />
        <Row style={uiStyles?.flex1Padding10}>
          <CalenderSvg />
          <Text
            style={{
              fontSize: RFValue(15),
              color: value ? 'black' : '#CCCCCC',
            }}
          >
            {' '}
            {'  '}
            {value
              ? `${withDateObj.getDate()}-${
                  withDateObj.getUTCMonth() + 1
                }-${withDateObj.getFullYear()}`
              : ' dd/mm/yyyy'}
          </Text>
        </Row>
      </Pressable>
    </InputContainer>
  );
};
