import { ThemeProps } from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

interface ToggleSwitchProps {
  options: string[];
  onChange?: (value: string) => void;
  sliderWidth?: number;
  containerStyle?: ViewStyle;
}

const { width } = Dimensions.get('window');
const TOGGLE_HEIGHT = 36;

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  options,
  onChange,
  sliderWidth = 0.8,
  containerStyle,
}) => {
  const [active, setActive] = useState(options[0]);
  const [translateX] = useState(new Animated.Value(0));
  const TOGGLE_WIDTH = (width * sliderWidth) / options.length; // Make toggle width dynamic based on options length
  const { colors } = useTheme() as ThemeProps;

  useEffect(() => {
    const index = options.indexOf(active);
    Animated.timing(translateX, {
      toValue: index * TOGGLE_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [active, TOGGLE_WIDTH, translateX]);

  const handleToggle = (value: string) => {
    setActive(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View
        style={[
          styles.toggleContainer,
          {
            width: TOGGLE_WIDTH * options.length,
            borderColor: colors.LIGHT_GREY_CCC,
            backgroundColor: colors.WHITE_FFFF,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.slider,
            { width: TOGGLE_WIDTH, transform: [{ translateX }] },
          ]}
        />
        {options.map((option, key) => (
          <TouchableOpacity
            key={option + key}
            style={styles.toggleButton}
            onPress={() => handleToggle(option)}
          >
            <Text
              style={[
                styles.text,
                { color: colors.BLACK_000000 },
                active === option && { color: colors.WHITE_FFFF },
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleContainer: {
    height: RFValue(TOGGLE_HEIGHT),
    borderRadius: RFValue(10),
    borderWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  slider: {
    height: RFValue(TOGGLE_HEIGHT),
    borderRadius: RFValue(10),
    backgroundColor: '#3b5998',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  toggleButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: RFValue(16),
  },
  activeText: {},
});

export default ToggleSwitch;
