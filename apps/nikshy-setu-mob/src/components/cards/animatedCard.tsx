import { AnimatedGradientCardProps } from '@nikshay-setu-v3-monorepo/types';
import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';

const AnimatedGradientCard: React.FC<
  PropsWithChildren<AnimatedGradientCardProps>
> = ({ colors, style, children }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const animate = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 4000,
            easing: Easing.linear,
            useNativeDriver: false,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 4000,
            easing: Easing.linear,
            useNativeDriver: false,
          }),
        ])
      ).start();
    };
    animate();
  }, [animatedValue]);

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: colors,
  });

  return (
    <Animated.View style={[styles.card, style, { backgroundColor }]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
  },
  content: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
});

export default AnimatedGradientCard;
