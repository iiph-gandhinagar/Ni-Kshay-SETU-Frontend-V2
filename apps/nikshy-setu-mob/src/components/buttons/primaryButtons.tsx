import { buttonLoader } from '@nikshay-setu-v3-monorepo/assets';
import { fontStyles } from '@nikshay-setu-v3-monorepo/constants';
import { ThemeProps } from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import { useTheme } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

interface ButtonProps {
  title: string;
  disabled?: boolean;
  loaderEnable?: boolean;
  bgColor?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  textStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  title,
  bgColor,
  leftIcon,
  rightIcon,
  textStyle,
  containerStyle,
  iconStyle,
  onPress,
  disabled,
  loaderEnable = false,
}) => {
  const { colors } = useTheme() as ThemeProps;
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.container, { backgroundColor: bgColor }, containerStyle]}
    >
      {leftIcon && <View style={[styles.icon, iconStyle]}>{leftIcon}</View>}
      {loaderEnable && disabled ? (
        <LottieView
          autoPlay
          source={buttonLoader}
          loop={true}
          style={{
            height: RFValue(60),
            width: RFValue(60),
            margin: -RFValue(20),
            alignSelf: 'center',
            opacity: 1,
          }}
        />
      ) : (
        <Text style={[styles.text, { color: colors.WHITE_FFFF }, textStyle]}>
          {title}
        </Text>
      )}
      {rightIcon && <View style={[styles.icon, iconStyle]}>{rightIcon}</View>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: RFValue(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    padding: RFValue(7),
  },
  text: {
    ...fontStyles.Maison_600_16PX_21LH,
  },
  icon: {
    marginHorizontal: RFValue(5),
  },
});

export default Button;
