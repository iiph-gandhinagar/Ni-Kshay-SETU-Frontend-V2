import {
  RadioCheckedSvg,
  RadioUncheckedSvg,
} from '@nikshay-setu-v3-monorepo/assets';
import { fontStyles } from '@nikshay-setu-v3-monorepo/constants';
import { CheckBoxProps } from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import { Pressable, Text } from 'react-native';
import { Row } from '../commonComponents/row_column';
import { InputContainer } from './inputContainer';

export const _CheckBox: React.FC<CheckBoxProps> = ({
  placeholder = 'Select',
  value,
  options,
  onChange,
  onBlur,
  onTouched,
  error,
  touched,
  disable,
  labelStyles,
  containerStyle,
  label,
}) => {
  return (
    <InputContainer
      error={error}
      touched={touched}
      label={label}
      labelStyles={labelStyles}
      containerStyle={containerStyle}
    >
      {options?.map((v, index) => {
        return (
          <Pressable
            disabled={disable}
            key={'checkBox-' + index}
            onPress={() => {
              onChange(v.value === value.value ? { label: '', value: '' } : v);
            }}
          >
            <Row
              style={{
                alignContent: 'center',
                alignItems: 'center',
                margin: RFValue(5),
              }}
            >
              {v.value === value.value ? (
                <RadioCheckedSvg fill={'green'} stroke={'green'} />
              ) : (
                <RadioUncheckedSvg
                  fill={disable ? 'gray' : 'black'}
                  stroke={disable ? 'gray' : 'black'}
                />
              )}
              <Text
                style={{
                  marginStart: RFValue(5),
                  color:
                    v.value === value.value
                      ? 'green'
                      : disable
                      ? 'gray'
                      : 'black',
                  fontWeight: v.value === value.value ? '700' : '400',
                  ...(v.value === value.value
                    ? fontStyles.Maison_600_18PX_20LH
                    : fontStyles.Maison_400_13PX_20LH),
                  fontSize: RFValue(15),
                }}
              >
                {v.label}
              </Text>
            </Row>
          </Pressable>
        );
      })}
    </InputContainer>
  );
};
