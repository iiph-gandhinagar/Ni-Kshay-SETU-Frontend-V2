import { sliderThumbPng } from '@nikshay-setu-v3-monorepo/assets';
import { fontStyles } from '@nikshay-setu-v3-monorepo/constants';
import { ThemeProps } from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import { Slider } from '@react-native-assets/slider';
import { useTheme } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Row } from '../commonComponents/row_column';

interface ProgressBarProps {
  progress: number;
  height?: number;
  containerStyle?: ViewStyle;
  fillColor?: string;
  gradientColor?: [string, string];
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = RFValue(10),
  containerStyle,
  fillColor,
  gradientColor = ['#4B5FC2', '#1E90FF'],
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const { colors } = useTheme() as ThemeProps;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const widthInterpolated = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });
  return (
    <View
      style={[
        styles.container,
        { height, backgroundColor: colors.LIGHT_GREY_CCC },
        containerStyle,
      ]}
    >
      <Animated.View style={[{ width: widthInterpolated }]}>
        {fillColor ? (
          <View style={[styles.progressBar, { backgroundColor: fillColor }]} />
        ) : (
          <LinearGradient
            colors={gradientColor} // Example gradient colors
            style={[styles.progressBar, { height }]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }} // Horizontal gradient
          />
        )}
      </Animated.View>
    </View>
  );
};

interface CustomSliderProps {
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  value?: number;
  onValueChange?: (value: number) => void;
  onSlidingComplete?: (value: number) => void;
  minimumTrackTintColor?: string;
  maximumTrackTintColor?: string;
  thumbSize?: number;
  header?: string;
}

export const CustomSlider: React.FC<CustomSliderProps> = ({
  minimumValue = 0,
  maximumValue = 100,
  step = 1,
  thumbSize = 25,
  value = 0,
  onValueChange,
  onSlidingComplete,
  minimumTrackTintColor,
  maximumTrackTintColor,
  header = '',
}) => {
  const { colors } = useTheme() as ThemeProps;

  return (
    <View style={styles.container}>
      <Row
        style={{ justifyContent: 'space-between', paddingBottom: RFValue(10) }}
      >
        <Text style={fontStyles.Maison_500_14PX_18LH}>{header}</Text>
        <TextInput
          key={header}
          value={String(value)}
          style={{
            width: RFValue(40),
            height: RFValue(30),
            borderWidth: 1,
            borderColor: colors.DARK_BLUE_394F89,
            borderRadius: RFValue(5),
            textAlign: 'center',
            padding: RFValue(5),
          }}
          keyboardType='number-pad'
          onChangeText={(text) => {
            const numericValue = parseInt(text, 10);
            if (!isNaN(numericValue)) {
              onValueChange(numericValue);
            }
          }}
          onBlur={() => {
            if (value < minimumValue) {
              onValueChange(minimumValue);
            } else if (value > maximumValue) {
              onValueChange(maximumValue);
            }
          }}
        />
      </Row>
      <Slider
        onValueChange={onValueChange}
        onSlidingComplete={onSlidingComplete}
        style={styles.slider}
        inverted={false}
        step={step}
        trackStyle={{ height: RFValue(10), borderRadius: RFValue(20) }}
        thumbSize={thumbSize}
        slideOnTap={true}
        minimumValue={minimumValue}
        value={value}
        maximumValue={maximumValue}
        minimumTrackTintColor={minimumTrackTintColor || colors.DARK_BLUE_394F89}
        maximumTrackTintColor={
          maximumTrackTintColor || colors.LIGHT_GREY_F2F2F2
        }
        thumbImage={sliderThumbPng}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: RFValue(10),
    overflow: 'visible',
  },
  slider: {
    width: '100%',
  },
  valueText: {
    marginTop: RFValue(10),
    fontSize: RFValue(16),
  },
  progressBar: {
    height: '100%',
    borderRadius: RFValue(10),
  },
});
