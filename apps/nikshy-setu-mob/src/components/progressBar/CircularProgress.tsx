import React, { useEffect } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, {
  Circle,
  Defs,
  LinearGradient as SVGLinearGradient,
  Stop,
} from 'react-native-svg';

interface CircularProgressProps {
  size?: number; // Diameter of the progress bar
  strokeWidth?: number; // Stroke width for both circles
  outerProgress?: number; // Progress value for the outer circle (0 to 1)
  innerProgress?: number; // Progress value for the inner circle (0 to 1)
  duration?: number; // Animation duration
  hideInnerProgressBar?: boolean;
  outerStokeColor?: string;
  centerContentStyle?: ViewStyle;
  innerStokeColor?: string;
  outerGradientColors?: string[]; // Gradient colors for the outer circle
  innerGradientColors?: string[]; // Gradient colors for the inner circle
  children?: React.ReactNode; // Children to render in the center of the progress bar
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularProgress: React.FC<CircularProgressProps> = React.memo(
  ({
    size = 200,
    strokeWidth = 20,
    outerProgress = 0.0,
    innerProgress = 0.0,
    hideInnerProgressBar = false,
    innerStokeColor = '#e0e0e0',
    outerStokeColor = '#e0e0e0',
    duration = 1500,
    centerContentStyle,
    outerGradientColors = ['#0C3896', '#0C3896'],
    innerGradientColors = ['#53B5D9', '#53B5D9'],
    children,
  }) => {
    const outerRadius = (size - strokeWidth) / 2;
    const innerRadius = outerRadius - strokeWidth * 1.5;

    const outerCircumference = 2 * Math.PI * outerRadius;
    const innerCircumference = 2 * Math.PI * innerRadius;

    const outerProgressValue = useSharedValue(0);
    const innerProgressValue = useSharedValue(0);

    const outerAnimatedProps = useAnimatedProps(() => ({
      strokeDashoffset: outerCircumference * (1 - outerProgressValue.value),
    }));

    const innerAnimatedProps = useAnimatedProps(() => ({
      strokeDashoffset: innerCircumference * (1 - innerProgressValue.value),
    }));

    useEffect(() => {
      outerProgressValue.value = withTiming(outerProgress, {
        duration: duration,
        easing: Easing.out(Easing.ease),
      });

      innerProgressValue.value = withTiming(innerProgress, {
        duration: duration,
        easing: Easing.out(Easing.ease),
      });
    }, [outerProgress, innerProgress]);

    return (
      <View style={[styles.container, { width: size, height: size }]}>
        <Svg height={size} width={size}>
          <Defs>
            <SVGLinearGradient id='gradOuter' x1='0%' y1='0%' x2='100%' y2='0%'>
              <Stop offset='0%' stopColor={outerGradientColors[0]} />
              <Stop offset='100%' stopColor={outerGradientColors[1]} />
            </SVGLinearGradient>
            {!hideInnerProgressBar && (
              <SVGLinearGradient
                id='gradInner'
                x1='0%'
                y1='0%'
                x2='100%'
                y2='0%'
              >
                <Stop offset='0%' stopColor={innerGradientColors[0]} />
                <Stop offset='100%' stopColor={innerGradientColors[1]} />
              </SVGLinearGradient>
            )}
          </Defs>

          {/* Outer Circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={outerRadius}
            stroke={outerStokeColor}
            strokeWidth={strokeWidth}
            fill='none'
          />
          <AnimatedCircle
            cx={size / 2}
            cy={size / 2}
            r={outerRadius}
            stroke='url(#gradOuter)'
            strokeWidth={strokeWidth}
            fill='none'
            strokeLinecap='round'
            strokeDasharray={outerCircumference}
            animatedProps={outerAnimatedProps}
          />

          {/* Inner Circle */}
          {!hideInnerProgressBar && (
            <>
              <Circle
                cx={size / 2}
                cy={size / 2}
                r={innerRadius}
                stroke={innerStokeColor}
                strokeWidth={strokeWidth}
                fill='none'
              />
              <AnimatedCircle
                cx={size / 2}
                cy={size / 2}
                r={innerRadius}
                stroke='url(#gradInner)'
                strokeWidth={strokeWidth}
                fill='none'
                strokeLinecap='round'
                strokeDasharray={innerCircumference}
                animatedProps={innerAnimatedProps}
              />
            </>
          )}
        </Svg>

        {/* Center content */}
        <View
          style={[
            styles.centerContent,
            {
              width: size - strokeWidth * 2,
              height: size - strokeWidth * 2,
              borderRadius: (size - strokeWidth * 2) / 2,
            },
            // centerContentStyle,
          ]}
        >
          {children}
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContent: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // Ensures child content stays within bounds
  } as ViewStyle,
});

export default CircularProgress;
