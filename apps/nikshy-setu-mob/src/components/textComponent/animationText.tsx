import { componentStyles } from '@nikshay-setu-v3-monorepo/constants';
import { ThemeProps } from '@nikshay-setu-v3-monorepo/types';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Animated } from 'react-native';

export const AnimatedText = ({ label, isSelected }) => {
  const { colors } = useTheme() as ThemeProps;
  const backgroundColor = new Animated.Value(isSelected ? 1 : 0);
  const color = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.BLACK_000000, 'white'],
  });
  const bgColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['white', colors.DARK_BLUE_394F89],
  });

  React.useEffect(() => {
    Animated.timing(backgroundColor, {
      toValue: isSelected ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isSelected]);

  return (
    <Animated.Text
      style={[
        componentStyles.dropdownAnimatedText,
        { backgroundColor: bgColor, color: color },
      ]}
    >
      {label}
    </Animated.Text>
  );
};
