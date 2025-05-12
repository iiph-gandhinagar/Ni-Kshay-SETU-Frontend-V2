import {
  appConfig,
  fontStyles,
  uiStyles,
} from '@nikshay-setu-v3-monorepo/constants';
import { StepProps } from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import Button from '../../../components/buttons/primaryButtons';

const Step0: React.FC<StepProps> = React.memo(
  ({ onChange, translateY, opacity, colors }) => {
    const styles = StyleSheet.create({
      buttonContainer: {
        padding: RFValue(15),
        marginVertical: RFValue(5),
      },
      loginBtnContainer: {
        borderWidth: 0.5,
        padding: RFValue(15),
        marginVertical: RFValue(10),
      },
      text: {
        ...fontStyles.Maison_500_18PX_24LH,
        color: colors?.BLACK_000000,
        textAlign: 'center',
      },
    });
    return (
      <Animated.View
        style={{
          ...uiStyles.onBoardingCenterView,
          opacity: opacity,
          transform: [{ translateY: translateY }],
        }}
      >
        <View style={uiStyles.padding15}>
          <Text style={styles?.text}>
            {appConfig.APP_DO_YOU_WANT_LOGIN_CREATE_ACCOUNT}
          </Text>
          <Button
            bgColor={colors.WHITE_FFFF}
            title={appConfig.APP_LOGIN}
            textStyle={{ color: colors.DARK_BLUE_394F89 }}
            containerStyle={[
              styles.loginBtnContainer,
              { borderColor: colors.DARK_BLUE_394F89 },
            ]}
            onPress={() => onChange(true)}
          />
          <Button
            bgColor={colors.DARK_BLUE_394F89}
            textStyle={{ color: colors.LIGHT_BLUE_E8F1FF }}
            title={appConfig.APP_CREATE_ACCOUNT}
            containerStyle={styles.buttonContainer}
            onPress={() => onChange(false)}
          />
          <View style={uiStyles.space20Percentage} />
        </View>
      </Animated.View>
    );
  }
);

Step0.displayName = 'Step0';
export default Step0;
