import { AlertSvg, PenSvg } from '@nikshay-setu-v3-monorepo/assets';
import {
  componentStyles,
  fontStyles,
  uiStyles,
} from '@nikshay-setu-v3-monorepo/constants';
import {
  ErrorProps,
  InputContainerProps,
  LabelProps,
  ThemeProps,
} from '@nikshay-setu-v3-monorepo/types';
import {
  CustomRFValue as RFValue,
  transformText,
} from '@nikshay-setu-v3-monorepo/utils';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Platform, Pressable, Text, TouchableOpacity } from 'react-native';
import { Row } from '../commonComponents/row_column';

export const Label: React.FC<LabelProps> = ({
  label,
  touched,
  edit,
  onPressEdit,
  labelStyles,
  error,
  isRequired,
}) => {
  return (
    <Row style={uiStyles.justifyContentSB}>
      <Text style={[componentStyles.InputTextLabel, labelStyles]}>
        {' '}
        {transformText(label, 'capitalizeEachWord')}{' '}
        {(error || isRequired) && (
          <Text style={fontStyles.InputTextErrorText}>*</Text>
        )}
      </Text>
      {edit && (
        <TouchableOpacity
          style={{ alignItems: 'center', flexDirection: 'row' }}
          onPress={onPressEdit}
        >
          <PenSvg />
        </TouchableOpacity>
      )}
    </Row>
  );
};

export const Error: React.FC<ErrorProps> = ({ error }) => {
  return (
    <Row style={{ alignItems: 'center' }}>
      <AlertSvg
        style={{ marginTop: RFValue(4) }}
        height={RFValue(18)}
        width={RFValue(18)}
      />
      <Text
        style={[
          fontStyles.InputTextErrorText,
          Platform.OS === 'ios' ? { letterSpacing: 0.3 } : {},
        ]}
      >
        {transformText(error, 'capitalizeFirstLetter')}
      </Text>
    </Row>
  );
};

export const InputContainer: React.FC<InputContainerProps> = ({
  error,
  touched,
  label,
  edit,
  isRequired,
  onPressEdit,
  onPressContainer,
  children,
  containerStyle,
  labelStyles,
}) => {
  const { colors } = useTheme() as ThemeProps;
  return (
    <React.Fragment>
      <Pressable
        onPress={onPressContainer}
        style={[
          componentStyles.InputTextContainer,
          {
            borderColor:
              error && touched ? colors.RED_C62828 : colors.GREY_D9DBDB,
          },
          containerStyle,
        ]}
      >
        {label && (
          <Label
            label={label}
            touched={touched}
            edit={edit}
            isRequired={isRequired}
            onPressEdit={onPressEdit}
            error={error}
            labelStyles={labelStyles}
          />
        )}
        {children}
      </Pressable>
      {touched && error && <Error error={error} />}
    </React.Fragment>
  );
};
