import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
type SkeletonLoaderProps = {
  containerStyles?: StyleProp<ViewStyle>;
  colors?: [string, string, string];
  borderRadius?: number;
};
const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  containerStyles,
  colors = ['#e0e0e0', '#f8f8f8', '#e0e0e0'],
  borderRadius = RFValue(10),
}) => {
  const translateX = useRef(new Animated.Value(-200)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Shimmer Animation
    Animated.loop(
      Animated.timing(translateX, {
        toValue: 200,
        duration: 1500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      })
    ).start();

    // Pulsating Glow Animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.05,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [translateX, scaleAnim]);

  return (
    <View style={[styles.skeletonContainer, containerStyles]}>
      <Animated.View
        style={[
          styles.skeletonWrapper,
          {
            transform: [{ scale: scaleAnim }],
            backgroundColor: colors?.[0],
            borderRadius: borderRadius,
          },
        ]}
      >
        <AnimatedLinearGradient
          colors={colors}
          style={[styles.gradient, { transform: [{ translateX }] }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  skeletonContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    padding: RFValue(5),
  },
  skeletonWrapper: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: RFValue(10),
    // marginBottom: 15,
  },
  gradient: {
    position: 'absolute',
    width: '200%',
    height: '100%',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: RFValue(30),
    // marginRight: 20,
  },
});
export default SkeletonLoader;
