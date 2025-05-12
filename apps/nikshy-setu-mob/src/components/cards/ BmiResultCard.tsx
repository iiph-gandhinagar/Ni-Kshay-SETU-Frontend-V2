import { ArrowSvg } from '@nikshay-setu-v3-monorepo/assets';
import { fontStyles } from '@nikshay-setu-v3-monorepo/constants';
import {
  BmiResultProps,
  RootReducerStates,
  ThemeProps,
} from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Column, Row } from '../commonComponents/row_column';

export const BmiResult: React.FC<BmiResultProps> = ({
  user_bmi = '',
  type = '',
}) => {
  const { colors } = useTheme() as ThemeProps;
  const bmi = [
    {
      name: 'APP_SCREENING_EXTREMELY_UNDERWEIGHT',
      color: colors.RED_FF6666,
      type: 'Extremely Underweight',
      width: '95%',
    },
    {
      name: 'APP_SCREENING_SEVERELY_UNDERWEIGHT',
      color: colors.BROWN_AF7B2D,
      type: 'Severely Underweight',
      width: '85%',
    },
    {
      name: 'APP_SCREENING_MODERATELY_UNDERWEIGHT',
      color: colors.ORANGE_FFC56D,
      type: 'Moderately Underweight',
      width: '75%',
    },
    {
      name: 'APP_SCREENING_MILD_UNDERWEIGHT',
      color: colors.BLUE_62C6E5,
      type: 'Mild Underweight',
      width: '65%',
    },
    {
      name: 'APP_SCREENING_NORMAL',
      color: colors.GREEN_51F16B,
      type: 'Normal',
      width: '55%',
    },
    {
      name: 'APP_SCREENING_OVERWEIGHT',
      color: colors.YELLOW_F8E74F,
      type: 'Overweight',
      width: '45%',
    },
    {
      name: 'APP_SCREENING_OBESE',
      color: colors.SALMON_FF906D,
      type: 'Obese',
      width: '35%',
    },
  ];
  const bmiType = bmi.find((v) => v.type === type);
  const appTranslations = useSelector(
    (state: RootReducerStates) => state.appContext?.data?.appTranslations
  );
  return (
    <View style={styles.container}>
      <Row style={{ justifyContent: 'space-between' }}>
        <View>
          <Row style={{ alignItems: 'center' }}>
            <Text
              style={{
                color: bmiType?.color,
                ...fontStyles.Maison_500_20PX_25LH,
                marginEnd: RFValue(5),
              }}
            >
              ●
            </Text>
            <Text
              style={[fontStyles.Maison_500_20PX_25LH, { textAlign: 'center' }]}
            >
              BMI
            </Text>
          </Row>
          <Text
            style={[
              fontStyles.Maison_500_16PX_21LH,
              { color: colors.GREY_797979 },
            ]}
          >
            Body Mass Index
          </Text>
        </View>

        <View>
          <Text
            style={[fontStyles.Maison_500_20PX_25LH, { color: bmiType?.color }]}
          >
            {(user_bmi && parseFloat(user_bmi).toPrecision(4)) || '00'} kg/m2
          </Text>
          <Text
            style={[
              fontStyles.Maison_500_16PX_21LH,
              { color: colors.GREY_797979, textAlign: 'right' },
            ]}
          >
            {appTranslations[bmiType?.name]}
          </Text>
        </View>
      </Row>
      <Column
        style={{
          flex: 1,
          padding: RFValue(10),
          paddingStart: RFValue(30),
          marginTop: RFValue(20),
        }}
      >
        {bmi.map((data, i) => {
          return (
            <Row
              key={i + 'bmi'}
              style={{
                height: RFValue(40),
                width: data.width,
                backgroundColor: data.color,
                borderBottomEndRadius: RFValue(12),
                flex: 1,
                borderTopEndRadius: [0].includes(i) ? RFValue(12) : 0,
                borderTopStartRadius: [0].includes(i) ? RFValue(12) : 0,
                borderWidth: data.type === type ? 1 : 0,
                borderBottomStartRadius: [6].includes(i) ? RFValue(12) : 0,
              }}
            >
              <ArrowSvg
                style={{ marginStart: -RFValue(30), marginEnd: RFValue(20) }}
                opacity={data.type === type ? 1 : 0.05}
                fill={colors.BLACK_000000}
                color={colors.BLACK_000000}
                stroke={colors.BLACK_000000}
              />
              <Text
                style={[
                  {
                    textAlign: 'left',
                    color:
                      data.type === type
                        ? colors.BLACK_000000
                        : colors.BLACK_000000,
                    textAlignVertical: 'center',
                    ...fontStyles.Maison_400_13PX_20LH,
                    fontWeight: 'bold',
                  },
                ]}
              >
                {data.type === type && '●'} {appTranslations[data?.name]}
              </Text>
            </Row>
          );
        })}
      </Column>
    </View>
  );
};

let styles = StyleSheet.create({
  container: {
    flex: 0.65,
    padding: RFValue(10),
    backgroundColor: 'white',
    elevation: RFValue(5),
    margin: RFValue(10),
    borderRadius: RFValue(10),
  },
  BmiText: {
    textAlign: 'center',
  },
  image: {
    width: RFValue(20),
    height: RFValue(20),
  },
  BmiCard: {
    paddingVertical: RFValue(16),
    paddingHorizontal: RFValue(10),
    marginHorizontal: RFValue(24),
    marginBottom: RFValue(39),
    marginTop: RFValue(20),
    borderWidth: 1,
    borderRadius: RFValue(10),
  },
  BmiComponent: {
    flex: 1,
  },
});
